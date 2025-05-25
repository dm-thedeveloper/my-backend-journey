import dotenv from "dotenv";
import { DBConnection } from "./src/DB/DBconnections.DB.js";
import {app} from "./app.js"


dotenv.config({path:".env"});
let port = process.env.PORT;
DBConnection()
.then(()=>{
    app.listen(port ,()=>{
        console.log(`app is listening on the http://localhost:${port}`);
    })
    
})
.catch((err)=>{console.log("(index.js > 15 line Error \n "+err);})