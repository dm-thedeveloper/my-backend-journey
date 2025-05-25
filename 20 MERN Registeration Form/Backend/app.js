import express from "express"

const app= express();

app.use(express.urlencoded({extended:true,limit:"90kb"}));
app.use(express.json({limit:"40kb"}))
app.use(express.static("public"));
// app.use(cors())
// app.use(CookiPaser())

// import the routes
import { Register} from "./src/Routes/user.route.js";


//declare the router

app.use("/user",Register);


export{app}



