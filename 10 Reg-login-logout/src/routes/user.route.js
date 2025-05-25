import { Router } from "express";
import { LoginUser, logOutUser, Register } from "../controllers/user.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { veriftJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(upload.fields([{name:"photo" , maxCount:1} , {name:"coverPhoto" , maxCount:1}]) , Register);
router.route("/login").post(upload.none(),LoginUser);
// Secure Routes
router.route("/logout").post(veriftJWT, logOutUser);


export {router}