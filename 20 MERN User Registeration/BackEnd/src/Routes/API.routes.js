import { Router } from "express";
import { simpleController } from "../controllers/API.controlle.js";
// import { registerUser } from "../controllers/User.controller.js";
// import { upload } from "../middlewares/multer.middlerware.js";

const userRouter = Router();

userRouter.route("/API").get(simpleController);

export { userRouter };
