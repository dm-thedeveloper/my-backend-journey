import express from "express";


const app= express();


app.use(express.urlencoded({extended:true,limit:"30kb"}))
app.use(express.json({limit:"15kb"}))
app.use(express.static("public"));
// app.use(CppkieParser())
// app.use(cors())


// app.get("/",(req,res)=>{
//     res.send("hello world")

// })

// app.listen(3000,()=>{
//     console.log(("http://localhost:3000"));
// })



// import the route

import { router } from "./src/Routes/User.route.js";
import { userRouter } from "./src/Routes/API.routes.js";


// declare the route

app.use("/user",router);
app.use("/APIUser",userRouter);


export{app}