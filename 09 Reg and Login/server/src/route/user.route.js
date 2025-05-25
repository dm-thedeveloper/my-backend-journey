import { Router } from "express";
import { LogInUser, Register } from "../controller/user.controller.js";
import { upload } from "../middleware/upload.middleware.js";


const router = Router();

router.route("/register").post(upload.fields([
    {
    name:"avatar" , maxCount: 1 
},
{
    name:"coverImage" , maxCount:1
}
]),Register);



router.route("/login").post(upload.none(),LogInUser)

export default router;