import { Router } from "express";
import { changePassword, editProfile, getCurrentUser, loginUser, logOutUser, Register } from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router();
router.route("/register").post(upload.fields([{ name:"profile" , maxCount:1} , {name:"coverImage" , maxCount:1 }]),Register)
router.route("/login").post(upload.none(),loginUser);

// Secure Routes ..
router.route("/logout").post(verifyJWT,logOutUser) ; 
router.route("/change-password").post(upload.none(),verifyJWT,changePassword);
router.route("/profile").get(verifyJWT,getCurrentUser)
router.route("/edit-profile").post(verifyJWT,upload.fields([{name:"newProfile" , maxCount:1} , {name:"newCoverImage" , maxCount:1}]),editProfile)
export {router}



