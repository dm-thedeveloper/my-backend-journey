import {asyncHandler} from '../utils/asuncHandlesr.js';
import {ApiError} from '../utils/APIError.js'
import { user } from '../models/user.model.js';
import {FileUploadOnCloudinary} from "../utils/Clodinary.service.js"
import { ApiResponse } from '../utils/ApiResponse.js';


const RegisterUser= asyncHandler( async (req,res)=>{

//.1)   // get user's detail from frontend (now we can use postman)
//.2)   // Validation - k sare fields empty to nahe
//.3)   // check user alredy exists -check with : username & email etc
//.4)   //check for images ,check for avatar (files);
//.5)   //upload then cloudinary -- Avatar
//.6)  // Create User Object -- create entry in DB
//.7)  //remove Passwordand refresh token filed
//.8)  // Check For User Creation
//.9)  // return Response 

                    // it's the Logic Building And also the DSA
    
    
//    <!--                                  Step one                                        -->
// b body se jo bhe Data Aate ahi wo req.body k andar aate hai jab bhe Form ya Direct json m aate hai ..
// ab data Url se bhe aate hai mgr hum use aage dekhe ge
// ab body se kiya kiya data aae ge wo hame User K model se pata chlata hai k hum kon kon se fields baye hai
// Name, FullName,Email , password
// baqi watch history or Refresh token to hum programatically he add karde ge..
//req.body
// const {} =  req.body;
//now destrucure the all Fields


const {userName,email,password,fullName} = req.body;

// console.log("Email",email);
// console.log("userName",userName);
// console.log(" Password",password);
// ab hame jana hai postman ye Url open karne ha 
//Pstman Steps = Bode> raw> json
// ab hame data json k andar bhejnne hai /
//{ 
// "email": "dmds@gmail.dev"
//}
// ab dhiyan rahe k jo hum filed body k andar define kar rahe hai us ka nam hamare model ya k same hona chaye or /jo //hum  filed destructre karte hai to  undefined aaye ga jese postman body k andar > {"Email":"dmds@gmail.dev"} to jamre condole huwe field undefined hoge kiyon k spelling ka difference hai


//    <!--                                  Step two                                        -->
// Validation - k sare fields empty to nahe


if(userName === ""){
    throw new ApiError(400,"fullName is required :)");

}

if(email === ""){
    throw new ApiError(400,"Email is Required :)");

}

if(password === ""){
    throw new ApiError(400,"Password is Required :)");

}
if(fullName === ""){
    throw new ApiError(400,"fullName is Required :)");

}

//    <!--                                  Step three                                      -->
 // check user alredy exists -check with : username & email etc


const existedUser= await user.findOne({
    $or: [{userName},{email}]
});

if(existedUser){
    throw new ApiError(409," User with Email or Name Already Exists")
}


//    <!--                                  Step four                                         -->
  //check for images ,check for avatar (files);
const avatarLocalPath=req.files?.avatar[0]?.path;
const coverImageLocalPath=req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
    throw new ApiError(400,"avatar is required")
}



//    <!--                                  Step Five                                        -->
   //upload then cloudinary -- Avatar


const   avatar= await FileUploadOnCloudinary("/backened-level-two/public/temp/file.png");
const coverImage = await FileUploadOnCloudinary("/backened-level-two/public/temp/file.png");

if(!avatar){
    throw new ApiError(400,"Avatar file ")
}

//    <!--                                  Step Six                                        -->
 // Create User Object -- create entry in DB
const youser = await user.create({
    userName,
    avatar: avatar.url,
    coverImage: coverImage.url,
    email,
    password,
    fullName:fullName.toLowercase()
})

//    <!--                                  Step Seven                                          -->
//remove Password  and refresh token filed

const createdUser =  await user.findById(user._id).select(
    "-password -refreshtoken"
)

//    <!--                                  Step Eight                                          -->
//// Check For User Creation
if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user")
}

//    <!--                                  Step Nine                                          -->
//Return res


return res.status(200).json(
    new ApiResponse(200,createdUser,"User Registered SuccessFully")
)



} );

export {RegisterUser}