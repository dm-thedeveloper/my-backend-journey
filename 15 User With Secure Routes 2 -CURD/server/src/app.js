import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"

const app = express()

// App Configuration


app.use(express.urlencoded({extended:true , limit:"200kb"}));
app.use(express.json({limit:"200kb"}));
app.use(express.static("public")); 
app.use(cookieParser());
app.use(cors());

// Route Importing

import { router } from "./routes/user.routes.js";

// Route Declaration

app.use("/user" , router)




export {app}
