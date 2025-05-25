import { APIResponse } from "../utils/apiresponse.utils.js";
import { asyncHandler } from "../utils/asynchandler.utils.js";
import { APIError } from "../utils/error.utils.js";
import { unlinkSync } from 'node:fs';
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.utils.js";
import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/sendemail.utils.js";


const generateAccessAndRefredToken = async (userId)=>{
    try {
// Find the User with ID
// generate access and ref4resh Toekns
// save refrefh token in DB .save()
//  return ref and acces token

const findUSer  = await User.findById(userId)
const generateD_AccessToken  = await findUSer.generateAccessToken();
const generateD_RefreshToken = await findUSer.generateRefreshToken() ;
findUSer.refreshToken = generateD_RefreshToken;
 await findUSer.save({validateBeforeSave:false})

return { generateD_AccessToken,generateD_RefreshToken}

    } catch (error) {
        throw new APIError("Erroor When Genearte access and Refresh Tokekn "  ,error)
        
    }
}



const Register = asyncHandler ( async (req,res,_) =>{
console.log(req.url);



// Get Data 
// Validation for Empty
// Check  password and confirmPassword 
// acces files(photos)
// Upload On Cloudinary
// Chekc if User is existed is DB
// Create User Objec
// unselect passord and refreshToken
// sendEmail
// send Response

// Get Data 


const { fullname ,email,password,confirmPassword,gender} = req.body;

console.log(fullname,email,password,confirmPassword,gender);


let photo ;
let coverPhoto; 

if(req.files.coverPhoto){
    coverPhoto = req.files.coverPhoto[0].path
}else{
    coverPhoto  = null}


if(req.files.photo){
    photo = req.files.photo[0].path;
}else{
    photo = null
    throw new APIError("Photo is required :)" ,403)}

    if(password != confirmPassword){
        unlinkSync(photo)
        unlinkSync(coverPhoto)
        throw new APIError("Passowrd and Confirm Password doe'nt Match"  ,401);
        
        }

console.log(photo,coverPhoto);

// Validation for Empty
const requiredFileds = ["fullname","email","password","confirmPassword","gender"]

for(let field of requiredFileds){

    if(!req.body[field]){
        unlinkSync(photo)
        unlinkSync(coverPhoto)
        throw new APIError(`${field} is required :) ` , 403)
    }
    
    }

    const photoURL = await uploadOnCloudinary(photo);
    const coverPhotoURL  = await uploadOnCloudinary(coverPhoto);


    const existedUser=  await User.findOne({

        $and :[{fullname} , {email}
]    })


    if(existedUser){
        

        console.log(`Welcome Again Dear ${fullname} ..`);
    }
// Files Upload On Cloudinary

const createdUser =  await User.create({
    fullname,
    email,
    password,
    confirmPassword,
    gender,
    photo : photoURL,
    coverPhoto : coverPhotoURL || ""
})



const response  = await User.findById(createdUser._id).select("-password -confirmPassword -refreshToken")

if(response){
    // SendEmail
    sendEmail("786dostm@gmail.com" , "Testing for User :: reg-login-logout" , "" ,  `<h1>Hello ${fullname} You Are Registered !!</h1>`)
}else{
    throw new APIError("Error When User Creating In DB")

}





    res
    .status(200)
    .json(
        new APIResponse(response , "Registeration Response Success" , 201)
    )
    
})


const LoginUser =  asyncHandler( async (req,res)=>{

    console.log(req.url);



    // get data 
    // validation --- Empty
    // check passord and confirm password as same
    // Check findUSer in DB
    // check passowrd Comapre 
    // access and refreesh Token
    // Send Cookies / res


    // get data 

    const {fullname , email,password,confirmPassword}  = req.body;
    console.log(fullname,email,password,confirmPassword);
    
    const requiredFileds = ["fullname" ,"email","password","confirmPassword"] ;
    
    for(let  field of requiredFileds ){

        if(!req.body[field]){
            throw new APIError(`${field} is Required` , 401)
        }
    }

    if(password != confirmPassword){
        throw new APIError("Password and ConfirmPassword  Do'nt match" , 402)
    }
    
    // Check findUSer in DB


    const existedUser = await User.findOne({
        $and:[{fullname} ,{email}]
    })

    if(existedUser){
        console.log("Yes User is Existed ");
    }
    else{
        throw new APIError(`Dear ${fullname} you are not Registerd .. First Registerd You Then Login`)
    }


    // check passowrd Comapre 

    const isPasswordValid  = await existedUser.isPasswordCorrect(password);
    console.log("Password_Valid  : " ,isPasswordValid);

if(!isPasswordValid){
    throw new APIError("Incorrect Pasword" , 401)
}

    // access and refreesh Token
    const {generateD_AccessToken , generateD_RefreshToken} = await generateAccessAndRefredToken(existedUser._id)
    // console.log(generateD_AccessToken,generateD_RefreshToken);

    const logedInUser = await User.findById(existedUser._id).select("-password -confirmPassword -refreshToken")


// Send Cookie

const options  = {
    httpOnly: true,
    secure:true
}
    res
    .cookie("accessToken" , generateD_AccessToken , options)
    .cookie("refreshToken" , generateD_RefreshToken , options)
    .status(200)
    .json(
        new APIResponse(logedInUser ,"Login User Success" , 201)
    )
})


const logOutUser= asyncHandler( async (req,res) =>{

console.log(req.url);

console.log(req.user._id);

const loggedOutUSer = await User.findByIdAndUpdate(req.user._id , 


    {
        $unset:{
            refreshToken:""
        }
    } ,{
        new : true
    }) 



    console.log("Logged Out User : "  , loggedOutUSer);

    


const options = {
    httpOnly:true,
    secure:true
}
res
.status(200)
.clearCookie("accessToken",options)
.clearCookie("refreshToken",options)
.json(
    new APIResponse("User LogOut " , "User Logout Controller Success Full!" , 201)
)

})

export {Register ,LoginUser , logOutUser}