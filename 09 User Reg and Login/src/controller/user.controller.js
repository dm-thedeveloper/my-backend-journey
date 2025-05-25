import { APIError } from "../utils/apierror.utils.js";
import { APIResponse } from "../utils/apiresponse.utils.js";
import { asyncHandler } from "../utils/asynhandler.utils.js";
import { UploadOnCloudinary } from "../utils/cloudinary.utils.js";
import { User } from "./../model/user.model.js";
import { unlinkSync } from "node:fs";

const generateAccessAndRefreshToke = async (userId) => {
  try {
    const confirmUeser = await User.findById(userId);

    const access = confirmUeser.generateAccessToken();
    const refreshToke = confirmUeser.generateRefreshToken();

    confirmUeser.refreshToken = refreshToke;

    await confirmUeser.save({ validateBeforeSave: false });

    return { access, refreshToke };
  } catch (error) {
    console.error("ERROR White Generate Aceess And Rwefresh Tokens");
  }
};
const registerUSer = asyncHandler(async (req, res, next) => {
  console.log(req.url);

  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { username, email, fullName, password } = req.body;
  const avatar = await req.files.avatar[0].path;
  const coverImage = await req.files.coverImage[0].path;

  const requiredFileds = ["username", "email", "fullName", "password"];

  for (let field of requiredFileds) {
    if (!req.body[field]) {
      unlinkSync(avatar);
      unlinkSync(coverImage);
      throw new APIError(`${field} is required :)`, 407);
    }
  }

  const ExistedCredentils = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (ExistedCredentils) {
    unlinkSync(avatar);
    unlinkSync(coverImage);
    throw new APIError(
      "username or Email is Already Existed. Try Another Credentials.",
      409
    );
  }

  console.log(avatar, coverImage);

  const avatarURL = await UploadOnCloudinary(avatar);
  let coverImageURL;

  try {
    coverImageURL = await UploadOnCloudinary(coverImage);
  } catch (error) {
    coverImage = null;
  }

  console.log(username, fullName, email, password);

  // watchHistory

  const createdUser = await User.create({
    username,
    fullName,
    email,
    password,
    avatar: avatarURL,
    coverImage: coverImageURL || " ",
  });

  // console.log(createdUser);

  const confirUserm = await User.findById(createdUser._id).select(
    "-password -watchHistory"
  );

  console.log(confirUserm);

  res
    .status(200)
    .json(new APIResponse(confirUserm, "Hello World Success Fully !!", 202));
});

const userLogin = asyncHandler(async (req, res) => {
  console.log(req.url);

  // req body -> data

  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie
  const { username, email, password } = req.body;
  console.log(username, email, password);

  const requiredFileds = ["username", "email"];

  for (let field of requiredFileds) {
    if (!req.body[field]) {
      throw new APIError(`${field} is Required !!!`, 407);
    }
  }

  const confirmUeser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (confirmUeser) {
    // console.log(confirmUeser);
  } else {
    console.log("User Not Registered", confirmUeser);
  }

  //  Check if passrod valid

  const checkpassword = await confirmUeser.isPasswordCorrect(password);

  console.log(`{ checkpassword : ${checkpassword} } `);

  const { access, refreshToke } = await generateAccessAndRefreshToke(
    confirmUeser._id
  );

  console.log("Access : ", access, " \n Refreshh : ", refreshToke);

  const logedInUser = await User.findById(confirmUeser._id).select(
    "-refreshToken -password"
  );

  if (logedInUser) {
    console.log("Yes Loged inn ", logedInUser);
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("AccessToken", access, options)
    .cookie("Refreshtoken", refreshToke, options)
    .json(
      new APIResponse(
        {
          user: logedInUser,
          access,
          refreshToke,
        },
        "Login Success !!",
        202
      )
    );
});

export { registerUSer, userLogin };
