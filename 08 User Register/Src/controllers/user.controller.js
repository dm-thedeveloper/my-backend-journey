import { asynHandler } from "../Utils/ayncHandler.js";
import { APIResponse } from "../Utils/apiResponse.utils.js";
import { APIError } from "../Utils/apiError.utilis.js";
import { User } from "../Models/user.model.js";
import { fileUploadOnCloudinary } from "../Utils/uploadOnCloudinary.utilis.js";

const user = asynHandler(async (req, res) => {
  //.1)  // get user's detail from frontend (now we can use postman)
  //.2)  // Validation - k sare fields empty to nahe
  //.3)  // check user alredy exists -check with : username & email etc
  //.4)  //check for images ,check for profile (files);
  //.5)  //upload then cloudinary -- Avatar
  //.6)  // Create User Object -- create entry in DB
  //.7)  //remove Passwordand refresh token filed
  //.8)  // Check For User Creation
  //.9)  // return Response

  //
  // let {firstName,lastName,email,password,}=req.body;

  // if(firstName===""){
  //     throw new APIError(401,"firstName is Required")
  // }
  // if(lastName===""){
  //     throw new APIError(401,"lastName is Required")
  // }
  // if(email===""){
  //     throw new APIError(401,"email is Required")
  // }
  // if(password===""){
  //     throw new APIError(401,"password is Required")
  // }

  let { firstName, lastName, email, password } = await req.body;

  if (firstName === "") {
    throw new APIError(401, "firstName is required");
  }
  if (lastName === "") {
    throw new APIError(401, "lastName is required");
  }
  if (email === "") {
    throw new APIError(401, "email is required");
  }
  if (password === "") {
    throw new APIError(401, "password is required");
  }

  const fullName = firstName.trim() + " " + lastName.trim();

  const existedUser = await User.findOne({
    $or: [{ email }, { fullName }],
  });

  if (existedUser) {
    throw new APIError(409, "Email is alredy Exists");
  }

  // const profile = req.files?.profile[0]?.url;
  // console.log("URL :  "+profile);

  // let profileUrl, coverImageUrl;
  //     if (req.files?.profile) {
  //       const profileResult = await fileUploadOnCloudinary(req.files.profile[0].path, { folder: 'profiles' });
  //       profileUrl = profileResult.url;
  //     }
  //     if (req.files?.coverImage) {
  //       const coverImageResult = await fileUploadOnCloudinary(, { folder: 'coverImages' });
  //       coverImageUrl = coverImageResult.url;
  //     }

  const profile = await fileUploadOnCloudinary(req.files?.profile[0].path);
  console.log("Profile URL :" + req.files?.profile[0].path);
  const coverImage = await fileUploadOnCloudinary(
    req.files?.coverImage[0].path
  );
  console.log("CoverImage URL :" + req.files?.coverImage[0].path);

  const youser = await User.create({
    firstName,
    email,
    lastName,
    password,
    profile: profile.url,
    coverImage: coverImage.url,
  });

  return await res
    .status(200)
    .json(new APIResponse(200, req.body, "Received user details"));
});

export { user };
