import express from "express";


const  app = express();
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({limit:"17kb",extended:true}));
app.use(express.static("public"));
// app.use(cors())
// app.use(CookieParser())


// app.get("/",(req,res)=>{

// res.send("Hello World !!!!!!!!!1")
// });


// Import the Routes 
import { router } from "./Src/Routes/user.router.js";



// Declare the Route

app.use("/home",router)
export{app}