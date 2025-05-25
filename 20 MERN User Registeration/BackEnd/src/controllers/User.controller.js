import { User } from "../Models/User.model.js";
import { APiError } from "../utils/APIError.utilis.js";
import { asyncHandler } from "../utils/ayncHandler.utils.js";
import {UploadOnCloudinary} from "../utils/uoloadOnCloudinary.utils.js";
import {APiResponse } from "../utils/APiResponse.utilis.js";



// const registerUser = asyncHandler(async (req,res,next)=>{

// // get Data from FrontEnd
// // check every field is filled , not empty
// // check user or email alredy exists 
// // check for images k temprory aaye hai ya nahe 
// // upload on clodinary- get url
// // create user object - create DB entry .create({})
// // remove password or any other field .select("-item1 -item2")
// // check for user creation .findById(_id)
// // return res



// let {name,fName,caste,phone,address,email,msg,password} = await req.body;
// console.log({name,fName,caste,phone,address,email,msg,password});


// if(name===""){
//     APiError(400,"Name Field is Required !!!")
// }
// if(fName===""){
//   throw new  APiError(400,"Father Name  Field is Required !!!")
// }
// if(caste===""){
//   throw new  APiError(400,"Caste Field is Required !!!")
// }
// if(phone===""){
//   throw new  APiError(400,"Phone Field is Required !!!")
// }
// if(address===""){
//   throw new  APiError(400,"address Field is Required !!!")
// }
// if(email===""){
//   throw new  APiError(400,"Email Field is Required !!!")
// }
// if(password===""){
//   throw new  APiError(400,"Password Field is Required !!!")
// }

// // const existedUser= await User.findOne({
// //     $or:[{name,email}]
// // })

// const existedUser = await User.findOne({email});

// if(existedUser){
//     throw new APiError(402, "Email Alredy existed ,try new email Id");
// }

// const profile = await UploadOnCloudinary(req.files.profile[0].path);
// const bgImage = await UploadOnCloudinary(req.files.bgImage[0].path);
// // console.log(req.files);


// // console.log(profile.url);






//     // console.log(req.body.name);
//     // console.log(req.url);
//     // res.send("hello World !!!!!!");
// });


const registerUser = asyncHandler(async (req, res, next) => {


    // // get Data from FrontEnd
// // check every field is filled , not empty
// // check user or email alredy exists 
// // check for images k temprory aaye hai ya nahe 
// // upload on clodinary- get url
// // create user object - create DB entry .create({})
// // remove password or any other field .select("-item1 -item2")
// // check for user creation .findById(_id)
// // return res
    let { name, fName, caste, phone, address, email, msg, password } = req.body;

    const requiredFields = ['name', 'fName', 'caste', 'phone', 'address', 'email', 'password'];

    for (let field of requiredFields) {
        if (!req.body[field]) {
            throw new APiError(400, `${field} Field is Required !!!`);
        }
    }

    // Check if email already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new APiError(402, "Email Already Exists, Please Use a Different Email Address");
    }

const profile = await UploadOnCloudinary(req.files.profile[0].path);
const bgImage = await UploadOnCloudinary(req.files.bgImage[0].path);
// console.log(req.files);



const createdUaerInDB=  await User.create({
    name,
    fName,
    caste,
    phone,
    address,
    email,
    msg,
    password,
    profile:profile.url,
    bgImage:bgImage.url

})


const UpdatedUserWithMinusRefrshtokenAndPassword= await User.findById(createdUaerInDB._id).select("-refrshtoken");

if(!UpdatedUserWithMinusRefrshtokenAndPassword){
    throw new APiError(500,"something wend Wrong When User Created :)");
}
// const 

// console.log();


// const userData = {
//     name,
//     fName,
//     caste,
//     phone,
//     email,
//     password,
//     profile: profile.url,
//     bgImage: bgImage.url,
//     ...(address && { address }),
//     ...(msg && { msg })
// };

// const createdUserInDB = await User.create(userData);





    // Example: Upload images to Cloudinary
    // let profile, bgImage;
    // if (req.files && req.files.profile && req.files.profile[0]) {
    //     profile = await UploadOnCloudinary(req.files.profile[0].path);
    // }
    // if (req.files && req.files.bgImage && req.files.bgImage[0]) {
    //     bgImage = await UploadOnCloudinary(req.files.bgImage[0].path);
    // }

    // Example: Create user object and save to database
    // const newUser = await User.create({ name, fName, caste, phone, address, email, password });
    // const savedUser = await User.findById(newUser._id).select('-password');

    // Example: Return response
    // res.status(200).json(savedUser);


    console.log(req.body);
res.status(200).json(
    new APiResponse(201,req.body,"Success !!!!")
)





});


export {registerUser};