import { Router } from "express";
import { registerUser } from "../controllers/User.controller.js";
import { upload } from "../middlewares/multer.middlerware.js";

const router = Router();

router.route("/register").post(upload.fields([
    {
        name:"profile",
        maxCount:1
    },
    {
        name:"bgImage",
        maxCount:1
    }
]),registerUser)



export {router}