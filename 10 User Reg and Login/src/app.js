import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";


const app  = express();

// App Configuration

app.use(express.json({limit:"200kb"}))
app.use(express.urlencoded({limit:"200kb",extended:true}))
app.use(express.static("public"))
app.use(cors());
app.use(cookieParser())

// Route Importing

import { userRouter } from "./route/user.route.js";
import { userLogin } from "./controller/user.controller.js";

//  Route Declaration

app.use("/api",userRouter)
app.use("/api",userLogin)


export {app}