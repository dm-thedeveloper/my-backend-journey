import { Router } from "express";
import { registerUSer, userLogin } from "../controller/user.controller.js";
import { upload } from "../middleware/upload.middleware.js";


const userRouter  = Router();

userRouter.route("/register").post( upload.fields([
    {name:"avatar" , maxCount:1},
    {
        name:"coverImage",
        maxCount:1
    }]) , registerUSer)



    
    userRouter.route("/login").post(  upload.none(),userLogin)




export {userRouter}

