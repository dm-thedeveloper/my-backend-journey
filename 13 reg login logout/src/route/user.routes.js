import { Router } from "express";
import { logInUser, logOutUser, Register } from "../controller/user.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.utils.js";

const router = Router();

router.route("/register").post(upload.fields([ {name:"coverImage" , maxCount:1},{name:"avatar",maxCount:1}]),Register)
router.route("/login").post(upload.none(),logInUser); 
// Secure Routes

router.route("/logout").post(verifyJWT , logOutUser)

export {router}