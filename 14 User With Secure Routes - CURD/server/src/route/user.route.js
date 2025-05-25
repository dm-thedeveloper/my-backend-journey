import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, LoginUser, LogoutUser, Register, updateAccountDetails, updateAvatar } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/verifyJWT.utils.js";


const router = Router()
router.route("/register").post(upload.fields( [ {name:"avatar" , maxCount:1} ,{ name:"coverImage" , maxCount:1}]), Register)
router.route("/login").post(upload.none(), LoginUser);


// Secure Routes
router.route("/logout").post(verifyJWT, LogoutUser);
router.route("/change-password").post(verifyJWT, upload.none() , changeCurrentPassword);
router.route("/get").post(  verifyJWT,getCurrentUser);
router.route("/update").post(  upload.none(),verifyJWT, updateAccountDetails);
router.route("/change-avatar").post(upload.single("newAvatar"),verifyJWT, updateAvatar)

export{router}