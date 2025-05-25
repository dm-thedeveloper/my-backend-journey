import dotenv from "dotenv";
import {DBConnection} from "./Src/DB/DBConnectio.DB.js";
import {app} from "./app.js"


dotenv.config({path:'.env'});
const port=process.env.PORT;
DBConnection()
.then(()=>{
    app.listen(port,()=>{
        console.log(`App is litening on the http://localhost:${port}`);
    }).on((err)=>{console.error(" (src/index.js) error on listening  ");})
    
})
.catch((err)=>{
    console.log("(src/index.js) Error : "+err);
})

console.log("hello World !!!!!");