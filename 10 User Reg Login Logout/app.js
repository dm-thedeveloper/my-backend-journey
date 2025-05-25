import express from "express"
import cookieParser from "cookie-parser";
const app= express();

app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"20kb",extended:true}));
app.use(express.static("public"));
// app.use(cors())
app.use(cookieParser());



// app.get("/",(req,res)=>{
// console.log(req.url);
// res.send("hello world");

// })

// import the Routes
import {router} from "./src/Routes/user.route.js";


// Routes Declaration 

app.use("/home",router);

// http://localhost:2000/home/user

export{app}