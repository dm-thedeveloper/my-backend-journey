import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express(); 


// App configguratation

app.use(express.urlencoded({limit:"200kb" , extended:true}))
app.use(express.json({limit:"200kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors())


// Route Importing

import { router } from "./routes/user.route.js";

// Routes Declaration

app.use("/api",router);


export {app}