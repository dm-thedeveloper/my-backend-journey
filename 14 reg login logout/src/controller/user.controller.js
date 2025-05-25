import { APIError } from "../utils/apierror.utils.js";
import { APIResponse } from "../utils/apiresponse.utils.js";
import { asynHandler } from "../utils/asyncHandler.utils.js";
import {unlinkSync } from 'node:fs';
import { uploadOnCloudinary } from "../utils/uploadOncloudianry.utils.js";
import { User } from "../model/user.model.js";
import { SendEmail } from "../utils/sendemail.utils.js";


const generateAccessAndRefreshToken = async (userId)=>{
    try {
// first find the user FindById
// finded user generateaccessand refresh Token
// update refreshToken in finded user  
// return access and refresh token
        // const accessToke  = await
const findUser = await User.findById(userId); 
const generateDAccessToken  =  await findUser.generateAccessToke();
const generateDRefreshToken  =  await findUser.generateRefreshToken (); 
findUser.refreshToken = generateDRefreshToken ; 
 await findUser.save({validateBeforeSave:false});

 return {generateDAccessToken, generateDRefreshToken}
    } catch (error) {
        console.log("ERROR When Generate Access and Refresh Token" , error);       
    }
}








const Register =  asynHandler ( async (req,res,_) =>{
console.log(req.url);

    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar req.files
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // check for user creation findById() --- if create then remove password and refresh token field from response  and SendEmail for creation Success
    // return res


const {username, email,password} = req.body;
const avatar  = req.files.avatar[0].path;
let coverImage ;

if(req.files.coverImage){
    coverImage = req.files.coverImage[0].path;
}else {coverImage =""}
console.log(username,email,password);

console.log(avatar ,coverImage);

const requiredFileds = ["username","email","password"]

for(let filed of requiredFileds){

    if(!req.body[filed]){
        unlinkSync(avatar)
        unlinkSync(coverImage)
        throw new APIError(`${filed}  is Required :)`  ,402)
    }
}

const avatarURL = await uploadOnCloudinary(avatar);
const coverImageURL = await uploadOnCloudinary(coverImage);




const createdUser  = await User.create({
    username,
    email,
    password,
    avatar: avatarURL,
    coverImage: coverImageURL || ""
})


// User Find

const responseUser = await User.findById(createdUser._id).select("-refreshToken -password");

if(responseUser){
    
    console.log("Yes User Finded " ,responseUser);

SendEmail("786dostm@gmail.com" , "Checking The User Red login LogOut" , " " , `<h1> Hello User Register Login Logut <br /> I am Dost Muhammad <i>Developer</i>  </h1>`)    // Send Email

}else{
    console.log("User Not Finded");

}
// console.log(createdUser);





res.status(200).json(
new APIResponse(responseUser , "Register Success Full" , 201)
)

})



const logInUser =  asynHandler( async (req,res,next) =>{
    console.log(req.url);
            // Login User 
// Get Data -- username && email && password
// Validation ::: Empty
// user find with username and email
// if user Finded then comapre the current plain password and the our saved hashed password
// access and refresh token
// set Response remove password refresh token etc SendEmail
//  return res ;;


const {username,email,password} = req.body;
console.log(username,email,password);

const requiredFileds = ["username","email","password"]
for(let field of requiredFileds ){

    if(!req.body[field]){
        throw new APIError(`${field} is Required :)`, 401)
    }
}


const findUSer  = await User.findOne( { 
    $and:[{username} , {email}]
})

if(findUSer){
    console.log("Yes User Regitered " , findUSer) ;
}else{
    throw  new APIError("User Not Regitered  ::: :)" , 401)
}


const isPasswordValid = await findUSer.isPasswordCorrect(password)


if(isPasswordValid){
    console.log("is Password Valid :" ,isPasswordValid);
}
else{
    throw new APIError("In Correct Passowrd " , 402)
}


const {generateDAccessToken, generateDRefreshToken}  = await generateAccessAndRefreshToken(findUSer._id) 
console.log(generateDAccessToken,generateDRefreshToken);

const loggedInUser = await User.findById(findUSer._id).select("-password -refreshToken")



const options = {
    httpOnly:true,
    secure:true
}


    res.status(200)
    .cookie("accessToken",generateDAccessToken,options)
    .cookie("refreshToken",generateDRefreshToken,options)
    // .cookie("refreshToken " , generateDRefreshToken , options)
    .json(
        new APIResponse(loggedInUser , "Login In Success" , 201)
    )
})


const logOutUser = asynHandler( async (req,res,_) =>{

  console.log(req.url);
  
  const upadtedUser = await User.findByIdAndUpdate (req.user._id , {   
    $set:{
        refreshToken :undefined 
        // upadate
    },
   
  },
  {
    new :true
    // options
}

)
console.log("Updated User"  , upadtedUser );

const options = {
    httpOnly:true,
    secure:true
}

return res
.status(200)
.clearCookie("accessToken" ,options)
.clearCookie("refreshToken" , options)
.json (
    new APIResponse({} , "User _LOGOUT_ success fully !!!" , 201)
)

    // User.findByIdAndUpdate()


})

export {Register,logInUser , logOutUser}