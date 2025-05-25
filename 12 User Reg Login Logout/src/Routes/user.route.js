import { Router } from "express";
import { RegisterUser } from "../controllers/Users.controller.js";
export {Router} from "express";
import { upload } from "../Middlewares/multer.middleware.js";

const router =Router();

 router.route("/user").post(
  upload.fields([{
    name:"profile",
    maxCount:1
  },{
    name:"bgImage",
    maxCount:1
  }])     
    ,RegisterUser);


export {router}
