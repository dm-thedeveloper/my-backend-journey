
import { User } from "../Models/user.model.js";
// import { APIResponse } from "../utils/API.utilis.js";
import { asyncHandler } from "../utils/asynHnaler.js";
import { uploadToCloudinary } from "../utils/UploadOncloudinary.js";
import {APIError,APIResponse} from "../utils/API.utilis.js"


const RegisterUser =  asyncHandler( async (req,res)=>{
    // get the data
    // chack every field is not empty
    // check emil or name etc alredy exists
    //  check for images k wo temp server p aate hai .. or wahan se path lena
    // image ko cludinary p upload karna
    // create User object in DB//
    //remove passwrod or any other field .select("-item1 -item2 ")
    // check for user Creation findById(ttt_id)
    /// return Res 

const {name,profession,gender,email,password,contact,}=  await req.body;

const requiredFields = ['name', 'profession', 'gender', 'email', 'password', 'contact'];

for (const field of requiredFields) { 
    if (!req.body[field]) {
        // const errorMessage = `${field} is required`;
        throw new APIError(`${field} is Required`,400);
    }
};


const ExistedUser = await User.findOne({ $or: [{ email }, { contact }] });

if (ExistedUser) {    
    // alert("Email or phone number already exists")
    throw new APIError(`Email or contact  is already exists`, 400);
}

// console.log(req.body);
console.log(req.files.profile[0].path);


const profile = await uploadToCloudinary(req.files.profile[0].path);

// console.log(profile);

const CreatedUser = await User.create({
    name,
    profession,
    gender,
    email,
    password,
    contact,
    profile,

});




res.status(200).json(
    new APIResponse(req.body,"Success",201)
);


});

export {RegisterUser}
