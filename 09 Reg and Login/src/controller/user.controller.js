import { User } from "../model/user.model.js";
import { APIError } from "../utils/apierror.utils.js";
import { APIResponse } from "../utils/apiresponse.utils.js";
import { asyncHandler } from "../utils/asynchandler.utils.js";
import { sendEmail } from "../utils/sendemail.utils.js";
import { UploadOnCloudinary } from "../utils/uploadOnCloudinary.utils.js";
import { unlinkSync } from "node:fs";

const generateAccessAndRefereshToken = async (userId) => {
  try {
    const findUser = await User.findById(userId);
    const access = findUser.generateAccessToken();
    const refresh = findUser.generaterefereshToken();

    findUser.refereshToken = refresh;

    await findUser.save({ validateBeforeSave: false });

    return { access, refresh };
  } catch (error) {
    console.log("Error When Generating Access and Refresh Token: " + error);
  }
};

const Register = asyncHandler(async (req, res) => {
  console.log(req.url);

  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // access The images from req.files
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // check for user creation
  // remove password and refresh token field from response
  // Send User Email
  // send reaponse the unselect fileds objects

  const { name, email, password } = req.body;

  console.log(name, email, password);

  const requiredFields = ["name", "email", "password"];
  const avatar = req.files.avatar[0].path;
  let coverImage;

  if (req.files.coverImage) {
    coverImage = req.files.coverImage[0].path;
  } else {
    coverImage = null;
  }

  console.log(coverImage, avatar);

  for (let field of requiredFields) {
    if (!req.body[field]) {
      unlinkSync(avatar);
      unlinkSync(coverImage);
      throw new APIError(`${field} is Required : )`, 401);
    }
  }

  const avatarURL = await UploadOnCloudinary(avatar);
  const coverImageURL = await UploadOnCloudinary(coverImage);

  const existedUser = await User.findOne({
    $and: [{ name }, { email }],
  });

  if (existedUser) {
    console.log(`Welocme Agin Dear ${name}`);
  }

  const createdUser = await User.create({
    name,
    email,
    password,
    avatar: avatarURL,
    coverImage: coverImageURL,
  });

  const confirmUser = await User.findById(createdUser._id).select("-password");

  if (!confirmUser) {
    throw new APIError("Error When User Register", 500);
  } else {
    sendEmail(
      "786dostm@gmail.com",
      "Trying Reg and Login User",
      `<h1>Hello Dear</h1>`,
      "I am Text Message"
    );
    // Send Email
  }

  console.log(createdUser);

  res.status(200).json(new APIResponse(confirmUser, "User Register Success"));
});

// LogInUser
const LogInUser = asyncHandler(async (req, res, next) => {
  console.log(req.url);

  // --- req body --->--->--->---> data email and Password
  // --- validation  username or email
  // --- find the user
  // --- password check
  // --- access and referesh token
  // --- send cookie

  const { email, password } = req.body;
  console.log(email, password);

  const requiredFields = ["email", "password"];

  for (let field of requiredFields) {
    if (!req.body[field]) {
      throw new APIError(`${field} is Required :)`);
    }
  }

  const findUser = await User.findOne({ email });

  if (findUser) {
    console.log(findUser);
  } else {
    console.log("User Doe'nt Registered !! ");
  }

  const isPasswordVallid = await findUser.isPasswordCorrect(password);

  console.log(isPasswordVallid);

  let { access, refresh } = await generateAccessAndRefereshToken(findUser._id);

  console.log("Access: " + access, "Refresh Token: " + refresh);
  const logedInUser = await User.findById(findUser._id).select(
    "-password -refereshToken"
  );

  if (!logedInUser) {
    throw new APIError("USer not LOged in ");
  }
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", access, options)
    .cookie("refreshToken", refresh, options)
    .json(
      new APIResponse({
        user: logedInUser,
        access,
        refresh,
      })
    );
});

export { Register, LogInUser };
