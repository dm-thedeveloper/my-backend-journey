import { Router } from "express";
import { user } from "../controllers/user.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";

const router = Router();


router.route("/user").post(
    
    upload.fields(
       [ {
        name:"profile",
        maxCount:1
       },{
        name:"coverImage",
        maxCount:1
       }]
    ),user);









export {router}