import { asyncHandler } from "../utils/ayncHandler.utils.js";
import {APIResposne} from "../utils/ApiRespose.utilis.js";
import {APIError} from "../utils/apiError.utilis.js"
import { User } from "../Models/user.model.js";
import {UploadOnCloudinary} from "../utils/uploadOnCloudinary.js";


const generateAccessAndRefreshtokens = async(userId)=>{
    try {

      const user =   await User.findById(userId);

      const accessToken= user.generateAceestoken();
      const RefreshTkoen  = user.generateRefreshtoken();
      user.refreshtoken = RefreshTkoen;
      await  user.save({ validateBeforeSave: true });
      return {accessToken,RefreshTkoen};

      



        
    } catch (error) {
        throw new APIError(500," Something went wrong while generating User Access & Refresh tokens")
        
    }
}



const RegisterUser= asyncHandler( async (req,res)=>{

//                    Regiter the USer
//                                                  Steps
//get Data from Frontend
// check every field is filled ,not empty
// check user alredy exists - email , name
// check for images K images aaye hai ya nahe
// upload on cloudinary -
// create user object - crate DB entry .create({});
// remove passwrod etc  or any thing useing .select( "-item1 -item2") ;
//check for user creattion
// retun res



let {name,caste,address,contact,email,password}= await req.body;


console.log({name,caste,address,contact,email,password});

if(name  === " "){
    throw new APIError(401,"Name Field is Required")
}
if(caste  === " "){
    throw new APIError(401,"Caste Field is Required")
}
if(address  === ""){
    throw new APIError(401,"Address Field is Required")
}

if(contact  === undefined){
    throw new APIError(401,"Contact Field is Required")
}


if(email  === ""){
    throw new APIError(401,"Email Field is Required")
}

if(password  === ""){
    throw new APIError(401,"Password Field is Required")
}


const existedUser = await User.findOne({
    $or: [{name},{email}]
})

if(existedUser){
    throw new APIError(403,"Email or name is alresdy Existed")
}

const profile= await UploadOnCloudinary(req.files.profile[0].path);
const bgImage= await UploadOnCloudinary(req.files.bgImage[0].path);

const createUserInDB = await User.create({
    name,
    caste,
    address,
    contact,
    email,
    password,
    profile: profile.url,
    bgImage:bgImage.url,
})
console.log(createUserInDB);

const CreatedUserMinuseRefretshoken = await User.findById(createUserInDB._id).select("-refreshtoken -password");

if(!CreatedUserMinuseRefretshoken){
    throw new APIError(500,"something went wrong when user created")
}




return await res.status(200).json(
    new APIResposne(200, req.body, "Received user details")
);

});



const loginUser = asyncHandler(async(req,res)=>{

                                  // steps for loginUer  the User...
    // Data const { } = req.body;
    // name or Email Check
    // find the User
    // Password check
    // access & Refresh token
    // Send cookie

const {name,email,password}= req.body;


if(!name || !email ){
    throw new APIError(404,"name or email is Required ")
}
 
const user= await User.findOne({
    $or:[{name},{email}]
});

if(!user){
    throw new APIError(401,"User Does't Exists")
}

const isPasswordValid = await user.isPasswordCorrect(password);

if(!isPasswordValid){
    throw new APIError(403,"Invalid User Credentials(Password)");
}


const {RefreshTkoen,accessToken}= await generateAccessAndRefreshtokens(user._id);

const loggdInUser = await User.findById(user._id).select("-password -refreshtoken");


const options= {
    httpOnly:true,
    secure: true
}

return res
.status(200)
.cookie("accesToken",accessToken,options)
.cookie("refreshtoken",RefreshTkoen,options)
.json(
    new APIResposne(200,{
        user: loggdInUser , accessToken,RefreshTkoen
    },
"User LoggedIn suucessFully"
)
)







    
})  ;



const logOutUser = asyncHandler( async (req,res)=>{
    

})
 


export {
    RegisterUser,
    loginUser,
    logOutUser
}