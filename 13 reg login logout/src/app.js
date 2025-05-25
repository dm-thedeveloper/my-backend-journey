import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"
const app  = express(); 

// App Configuartion


app.use(express.urlencoded({limit:"200kb", extended:true}))
app.use(express.json({limit:true}));
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors())



// Route Importing
import { router } from "./route/user.routes.js";

// Route Declaration

app.use("/api",router )

export {app}; 