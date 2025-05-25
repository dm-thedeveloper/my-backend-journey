import { APIError } from '../utils/apierror.utils.js';
import { APIResponse } from '../utils/apiresponse.util.js';
import { asynHandler } from './../utils/asynhandler.utils.js';
import { unlinkSync } from 'node:fs';
import { User } from './../models/user.model.js';
import { removeFromCloudinary, uploadOnCloudinary } from '../utils/uploadoncloudinary.utils.js';
import { sendEmail } from '../utils/sendemail.utils.js';


const generateAccessAndRefreshToken = async (userId)=>{
try {
// find user
// access 
// refresh
// update refreshToken .save() 
 // return
 const findUser = await User.findById(userId);
 const accessToken  = await findUser.generateAccessToken();
 const refreshToken = await findUser.generateRefreshToken();
 findUser.refreshToken = refreshToken ;  
 await findUser.save({validateBeforeSave:false}); 
return {accessToken, refreshToken}
} catch (error) {
    console.log(" Error When Generate Access And Refresh Token" ,error); 
}
}


const Register  = asynHandler( async (req,res,_) =>{

console.log(req.url);


    // get user details from frontend
    // check for images  , check for avatar req.files
    // validation - not empty
    // Check password and Confirm Password 
    // check if user already exists: username, email
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // i) check for creation ii) remove fileds -:-:-:-:-:- Check User For creation findById(_id).select()
    // sendEmail()
    // return res

const {fullname,email, password,confirmPassword } = req.body;
console.log(fullname,email,password,confirmPassword);

const avatar = req.files.avatar[0].path;
let coverImage ;

if(req.files.coverImage){
    coverImage = req.files?.coverImage[0]?.path;
}else{
    coverImage = null
}
if(!avatar){
    throw new APIError("Avatar is Required :)" , 401 )
}

console.log(avatar,coverImage);

const requiredFields = [ "fullname","email","password","confirmPassword"];
for(let field of requiredFields){
if(!req.body[field]){
    unlinkSync(avatar)
    unlinkSync(coverImage)

    throw new APIError(`${field} is Required :))` , 403)
}

}

 

    // Check password and Confirm Password 
if(password !== confirmPassword){
    unlinkSync(avatar)
    unlinkSync(coverImage)
    throw new APIError("password And ConfirmPassword are not Matched"  , 403)
}



// Completed Validation of Frontend 

let response ; 
let message = ""; 



const existedUser = await User.findOne({
    $and:[ {fullname} , {email}]
}).select("-password -confirmPassword -refreshToken")



if(existedUser){
    unlinkSync(avatar) ;

    if(coverImage){
        unlinkSync(coverImage)
    }
    console.log(" User Created Already ");
    response = existedUser;
    message = "User Created Already"
}else{
     // upload them to cloudinary, avatar
    // create user object - create entry in db
    const AvatarURL = await uploadOnCloudinary(avatar);
    const coverImageURL = await uploadOnCloudinary(coverImage);

    const createdUser = await User.create({
        fullname,
        email,
        password,
        confirmPassword,
        avatar :AvatarURL,
        coverImage:coverImageURL || "",
    })

    const confirmUser = await User.findById(createdUser._id).select("-password -confirmPassword -refreshToken")

    console.log("New User Created ..");
    message = "new User Created..."
    

if(!confirmUser){
    throw new APIError("User Not Registered ..", 402)

}else{
    response= confirmUser;
sendEmail(email, "Testing for Backend_Continue_editing" , "" , `<h1>Hello Dear , welcome ${fullname}</h1>`)

}


}







res
.status(200)
.json(
    new APIResponse(response , message , 201)
)
 
}) 



const LoginUser  = asynHandler( async (req,res,_) =>{
    

    console.log(req.url);



    // Get Data 
    // Validation 
    // check password and confirmPassword  -- frontend Validation
    // find User
    // check compare hashed and palin password;
    // access and refresh token
    // send cookies

    // Get Data 
const {fullname,email ,password,confirmPassword} = req.body;
console.log(fullname,email , password,confirmPassword);

const requiredFields = [ "fullname","email","password","confirmPassword"]

for(let field of requiredFields){
    if(!req.body[field]){
        throw new APIError(`${field} is Required :)`, 403)
    }
}


if( password !== confirmPassword ){
    throw new APIError("Password and ConfirmPassowrd Dos'nt Match")
}
    // find User


const findUser = await User.findOne({
    $and:[ {fullname} , {email}]
})


if(findUser){
    console.log("Yes User Registed" )
}else{
    throw new APIError(" User Dos't Registered .... First Register Then Login" , 401)
}


const isPassowrdValid = await findUser.isPasswordCorrect(password);
const isConfimrPassowrdValid = await findUser.isPasswordCorrect(confirmPassword)

if(!(isPassowrdValid && isConfimrPassowrdValid)){
    throw new APIError("Incorrect Password .. Passoword Dos'nt Exixt" , 403)}

console.log("isPassowrdValid : ",isPassowrdValid);
console.log("isConfimrPassowrdValid : ", isConfimrPassowrdValid);

  const {accessToken,refreshToken} = await  generateAccessAndRefreshToken(findUser._id)
//   console.log(accessToken,"\n",refreshToken);
  

const options  = {
    httpOnly : true,
    secure:true
}


const loggedInUser = await User.findById(findUser._id).select("-password -confirmPassword -refreshToken")


    res
    .status(200)
    .cookie("accessToken" , accessToken , options)
    .cookie("refreshToken" , refreshToken , options)
    .json(
        new APIResponse(loggedInUser , "User LoggedIn" , 202)
    )
    
})


const LogoutUser = asynHandler (async (req,res,next)=>{
console.log(req.url);
// attach middleware on route verifyJWT .... and get access the req.user
// after completion of req.user we have _id emial full name::: now we call findByIdAndUpdate(id  , {} ,{ options} , cb)
// clearCookie()
console.log(req.user);
const loginuser = await User.findByIdAndUpdate(req.user._id , {
$unset:{refreshToken :""}
} ,{
new :true // it's return the new updated Object
});
console.log(loginuser);
const options = {
    httpOnly:true,
    secure:true
}
res
.status(200)
.clearCookie("accessToken" , options)
.clearCookie("refreshToken" ,options)
.json(
    new APIResponse({} , "User Log OUt " , 203)
)
})


const changeCurrentPassword = asynHandler ( async (req,res) =>{
console.log(req.url);
// Access user From req.user ::: attach verifyJWT middleware in route
// then access frontend fields oldPassword , oldConfirmPassword - newPassword , newPasswordConfirm 
// Validation for empty fields 
// match password and confrim Password 
// findUser with Id req.user?._id
// comapre the old password with db's Hashed Pssword  
// findUser.paaword =  newPassword same as for Confirm Password :::::  await  .save(validatebefore: flase)
// response data= {} "Password Chnged Success Fully "
const id = req.user?._id ; 

if(!id){
    throw new APIError("You Are Not Logged In ... First Log In Then Change Password" , 404)
}
console.log("User's ID " , id);

const {oldPassword,oldConfrimPassword  , newPassword , newConfrimPassword} = req.body; 

console.log(oldPassword,oldConfrimPassword , newPassword , newConfrimPassword);

const requiredFields  = ["oldPassword","oldConfrimPassword" ,"newPassword" , "newConfrimPassword"]; 

for(let field of requiredFields){
    if(!req.body[field]){
        throw new APIError(`${field} is Required :) ` , 403)
    }
}

if( oldPassword !== oldConfrimPassword){
    throw new APIError(" Old Password And ConfirmOldPassword Are Not Matched ...  ")
}

if(newPassword !== newConfrimPassword){
    throw new APIError("newPassword And confrirmNewPassword Are Not Matched..." ,403) 
}


const findUser = await User.findById(id)


const isPassowrdValid = await findUser.isPasswordCorrect(oldPassword); 

if(!isPassowrdValid){
    throw new APIError("Icorrect OldPassword " , 403)
}
console.log(isPassowrdValid);

findUser.password = newPassword ;
findUser.confirmPassword = newConfrimPassword

await findUser.save({validateBeforeSave:false})

//  Password : $2b$10$23i3PSe2U6lClhten6WyZefgEtOdjM26FH3uzE0T4G/Uw9P9/m8Jm
// oldPassword  : $2b$10$ah5mVikFchoU73TQqBbdmuxT9oEbzqiBVvrknUzKmybLV4roJ.VJi

console.log(findUser.password) ;
console.log(findUser.confirmPassword);








res
.status(200)
.json(
    new APIResponse({} , " Password Chaged Success Fully !!" , 201)
)







})


const getCurrentUser = asynHandler ( async (req,res) => {

    console.log(req.url);
    // console.log(req.user);
    

    res.status(200)
    .json(
        new APIResponse(req.user,  "User Fetched Success Fully !!"  ,203)
    )
    
    
})
    

    const updateAccountDetails  = async (req,res) => {
        console.log(req.url);

// get data from forntend  - - - - fullname? , emial? 
// filter the provided fileds 
// update the providing fileds 

// get data from forntend  - - - - fullname? , emial? 
const {newName, newEmail} = req.body;
console.log(newName , newEmail);

// filter the provided fileds 

const updateFileds = {}; 

if(newName !== undefined) updateFileds.fullname = newName ; 
if(newEmail !==undefined) updateFileds.email = newEmail

console.log(updateFileds);


const updateUser = await User.findByIdAndUpdate(req.user?._id ,{
$set :{
    ...updateFileds
}
} , {
    new :true
}).select("-password -confirmPassword -refreshToken") ;



console.log(updateUser);




        res.status(200)
        .json(
            new APIResponse({} , "Updated Complete The USer Data" , 200)
        )
        
        
    }


const updateAvatar = asynHandler ( async (req,res) =>{
    console.log(req.url);
// get avatar with req.file/files || upload.single/fields
// validation ..
// Uplod on cloudinary and get url if !Error
// Delete old Avatar from Cloudinary
// update vatar field |||||||||   req.user?._id

// get avatar with req.file/files || upload.single/fields

const newAvatar = req.file?.path
console.log(newAvatar);

// validation ..

if(!newAvatar){
    throw new APIError("Avatar File is missing" , 400)
}


// Uplod on cloudinary and get url if !Error
const newAvatarURL = await uploadOnCloudinary(newAvatar)
console.log("URL : " , newAvatarURL);


const oldAvatar = req.user?.avatar;
console.log(oldAvatar);
await removeFromCloudinary(oldAvatar)



// update vatar field |||||||||   req.user?._id
const updatedUser = await User.findByIdAndUpdate( req.user?._id,{
    $set:{
        avatar :newAvatarURL
    },  
},
{
    new :true
}
).select("-password -confirmPassword -refreshToken") ;


    res
    .status(200)
    .json(
        new APIResponse(updatedUser , "Avatar is Updated Success Fully")
    )
    
})

// const getCurrentUser  = asynHandler( async (req,res) =>{
//     console.log(req.url);


//    res.status(100)
//     .json(
//         new APIResponse({} , "user Fetched Success FullY !!!" , 203)
//     )
    
// })


export{Register , LoginUser , LogoutUser ,changeCurrentPassword , getCurrentUser  ,updateAccountDetails ,updateAvatar}