import { User } from "../models/user.model.js";
import { APIError } from "../utils/apierror.utils.js";
import { APIResponse } from "../utils/apiresponse.utils.js";
import { asyncHandler } from "../utils/asynHandler.utils.js";
import { sendEmail } from "../utils/sendmail.utils.js";
import { uploadOnCloudinary } from './../utils/uploadoncloudinar.utils.js';


const generateAccessTokenAndRefreshToken = async (user_id)=>{
    try {
        // User find :: findById()
        // generate AccessToke & refreshToken
        // save refreshToken in Db .save()
        // return
        

const findUser = await User.findById(user_id);
const AccessToken = await findUser.generateAccessToken() 
const RefreshToken = await findUser.generateRefreshToken();
findUser.refreshToken = RefreshToken ; 
 await findUser.save({validateBeforeSave:false});

return { AccessToken, RefreshToken}
    } catch (error) {
        console.log("Error While Generate Access And Refresh Token  " ,error);
    }
}

const Register   = asyncHandler( async (req,res,_)=>{
    console.log(req.url);

// Get Data - text 
// Valaidation
// comapre password And confrimPassword 
// check if user already exists : username, email
// get  files 
// Upload Images On Cloudinary ;
// Entr in  DB
// check for user Creation - - - - -  Remove Sensitive / unessesary Fields 
// sendEmail
// return res   

const {fullname,username,bio,followers,likes,posts,theme,github_link,location,email,password,confirmPassword } = req.body; 
console.log(fullname,username,bio,followers,likes,posts,theme,github_link,location,email,password,confirmPassword);

const requiredFields =  ["fullname" , "email" , "password" ,"confirmPassword" ]


for(let filed of requiredFields){
    if(!req.body[filed]){
        throw new APIError(`${filed} is required :)_`,403 )
    }
}

if(password !== confirmPassword){
    throw new APIError("Password And Confirm Passwords Are not Matched " ,402)
}



const findUser = await User.findOne({
    $and :[ {fullname}, {email }]
})

if(findUser){
    throw new APIError("User Already Exist .. Try Another User" ,404)
}


let profile;
let coverImage;


if(req.files.profile){
let profilePath = await   req.files.profile[0].path    
    profile = await uploadOnCloudinary(profilePath);
    
}
else {
    let firstLetter = fullname.trim().slice(0,1)  ; 
    profile = `https://placehold.co/600x400/03fcf8/ffff?text=${firstLetter}`
}

if(req.files.coverImage) {
 let    coverImagePath =  await req.files?.coverImage[0].path;
    coverImage = await uploadOnCloudinary(coverImagePath)
} else {
coverImage = ""; 
}
// console.log("profile : " , profile ,"Coverimage : "  ,coverImage);

// 
let mathFolowers = Math.floor(Math.random()*99)+Math.random(); 
let mathLikes  = Math.floor(Math.random()*999)+Math.random()
let mathPosts = Math.floor(Math.random()*999) ;

const createdUser = await User.create({
    fullname,
    username :username || "", 
    bio :bio || "",
    profile,
    coverImage : coverImage || "",
    followers :`${mathFolowers.toFixed(1)}M`,
    likes: `${mathLikes.toFixed(1)}M`,
    posts :`${mathPosts}`,
    theme,
    github_link : github_link || "",
    location :location || "",
    email,
    password,
    confirmPassword,
})
// console.log(createdUser);
const userResponse = await User.findById(createdUser._id).select("-refreshToken -password -confirmPassword");;;
if(userResponse){
    sendEmail(email ,"Testing For Backend Ediditng v2","",`<h1>Hello Dear ${fullname}</h1>`)
}else{
    throw new APIError("Error On User Creation ." ,402);

}
    res
    .status(200)
    .json (
        new APIResponse("User Created Success Fully",userResponse, 202)
    )
    
})

const loginUser = asyncHandler (async (req,res,_)=>{
console.log(req.url);


// get data
// Validation -- !empty -- !password===confrimPassword
// findUser ,
// compare the hashed and palin password 
// refreshToken Access Token
// return res

const { fullname,email,password,confirmPassword} = req.body;
console.log(fullname , email, password ,confirmPassword);


const requiredFields = ["fullname","email","password","confirmPassword"];

for(let field of requiredFields){
if(!req.body[field]){
    throw new APIError(`${field} is Required :)` , 401)
}
}

if(password !== confirmPassword){
    throw new APIError("Password And ConfirmPassword are Not Matched :)" , 403)
}



const findUser = await User.findOne({
    $and:[{fullname} ,{email }]
})

// console.log(findUser);

if(!findUser){
    throw new APIError("User Does not Exist :) First Register then Login  ",404)
}


const isPasswordValid = await findUser.isPasswordCorrect(password);
const isConfirmPasswordValid = await findUser.isPasswordCorrectCorrect(confirmPassword)
console.log(isPasswordValid ,isConfirmPasswordValid) ;


if (!(isPasswordValid || isConfirmPasswordValid)){
    throw new APIError("Password And ConfirmPassword Are not Valid",402)
}



const {AccessToken,RefreshToken} = await generateAccessTokenAndRefreshToken(findUser._id);
console.log(AccessToken ,"\n",RefreshToken);


const options = {
    httpOnly:true,
    secure:true
}


const loginUser  = await User.findById(findUser._id).select("-refreshToken -password -confirmPassword")

res
.status(200)
.cookie("accessToken" , AccessToken , options)
.cookie("refreshToken", RefreshToken , options)
.json(
    new APIResponse("Hello Of Login " , loginUser , 203)
)


})

const logOutUser = asyncHandler( async(req,res)=>{
    // access The User _id , and find User
    // $unset the refreshToken 
    // clearCookie()

    console.log(req.url);
console.log(req.user?._id);

const dbLogOutUser = await User.findByIdAndUpdate(req.user?._id,{

    $unset :{
        refreshToken : ""
    }
},
{
    new :true
}) ; 

console.log(dbLogOutUser);








const options = {
    httpOnly:true,
    secure:true
}

    res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new APIResponse("User LogOut Success Fully !!! ",{},203)
    )
});

const changePassword  = asyncHandler( async (req,res)=>{
    console.log(req.url);

// get Data 
// Validation for empty Fields
// comapare the new and oldPasswords
// Access User's Id .. if not accessed the Error
// compare the old hashed and palin passwords
// $set old to new values



const { oldPassword ,oldConfirmPassword , newPassword,newConfirmPassword} = req.body; 
console.log(oldPassword , oldConfirmPassword ,newPassword ,newConfirmPassword);
const requiredFields = ["oldPassword","oldConfirmPassword","newPassword","newConfirmPassword"]

for(let field of requiredFields){
    if(!req.body[field]){
        throw new APIError(`${field} is Required` , 403)
    }
}


if(oldPassword !== oldConfirmPassword){
    throw new APIError("oldPasswor And oldConfirmPassword Are not Matched !!" , 403)
}

if(newPassword !== newConfirmPassword){
    throw new APIError("newPassword And newConfirmPassword Are not Matched !!",403)
}

const userId = req.user?._id; 

if(!userId){
    throw new APIError("You Are not LoggedIn .." , 302)
}

console.log(userId);

const findUser = await User.findById(userId)

if(!findUser){
    throw new APIError("You Are not LoggedIn .." , 302)
}
// console.log(findUser);


const isPasswordValid = await findUser.isPasswordCorrect(oldPassword);
const isConfirmPasswordValid = await findUser.isPasswordCorrectCorrect(oldConfirmPassword)
console.log(isPasswordValid , isConfirmPasswordValid);

if(!(isPasswordValid || isConfirmPasswordValid)){
    throw new APIError("newPassword And confirmNewPassword Are not Exist" , 404)
}


// Password $2b$10$C2lTDcqEeXFV2brSpPtLdO.DHO80kdcLqG2D9/5Or.W7YZVKkBoPu.
// confirmPAssword $2b$10$DdejqsWXbA/zHjl8S8hyc.Pl94o1MIKrq1nk.PLESQw.ORbGSU8Fq
findUser.password = newPassword ;
findUser.confirmPassword  = newConfirmPassword;

await findUser.save({validateBeforeSave:false})


    res
    .status(200)
    .json(
        new APIResponse("Password Changed " , {} , 201)
    )
    
});

const getCurrentUser = asyncHandler(async (req,res)=>{
    console.log(req.url);
const user = req.user;

let message = "User Fetched Success Fully !!" ; 

if(!user){
    message = "You Are not Exist .. First Register Then fetch '/profile'"
}



    res
    .status(200)
    .json(
        new APIResponse(message , user,203)
    )
})

const editProfile = asyncHandler( async (req,res)=>{

    console.log(req.url);

// check verifyJWT
// get Edited Fields = fullname,username,bio,theme github_link ,location email
// create a object of providing  Fields with Values
// findByIdAndUpdate --- use $set : { ...ProvideingFieldsObject }


let userId =  await req.user?._id 

if(!userId){
    throw new APIError("User Not Legged In ... First LoggedIn Then Edit Profile" ,403)
}
console.log(userId);





let {newUsername ,newFullname ,newBio , newTheme,newGithub_link, newLocation ,newEemail } = req.body;

console.log(newUsername , newFullname, newBio,newTheme,newGithub_link , newLocation,newEemail);

let providedFields = {}
if(newUsername) providedFields.username = newUsername; 
if(newFullname) providedFields.fullname = newFullname
if(newBio) providedFields.bio = newBio
if(newTheme) providedFields.theme = newTheme
if(newGithub_link) providedFields.github_link = newGithub_link
if(newLocation) providedFields.location = newLocation
if(newEemail) providedFields.email = newEemail


if(req.files.newProfile){
let newProfile =  await uploadOnCloudinary(req.files.newProfile[0].path)
// console.log(newProfile);
providedFields.profile = newProfile
}

if(req.files.newCoverImage){
    let newCoverImage = await uploadOnCloudinary(req.files.newCoverImage[0].path) ; 
    // console.log(newCoverImage);
    providedFields.coverImage = newCoverImage; 
}
// newCoverImage
console.log(providedFields);


const modifiedUser  = await  User.findByIdAndUpdate(userId , {
    $set:{
        ...providedFields
    }
} ,
{
    new:true
}).select("-password -confirmPassword -refreshToken");
console.log(modifiedUser);


    res.
    status(200)
    .json(
        new APIResponse("Profiled Edited Success Fullly !!" , editProfile , 202)
    )
})
export {Register,loginUser,logOutUser,changePassword,getCurrentUser,editProfile}