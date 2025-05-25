import dotenv from "dotenv";
import {DBConnection} from "./src/DB/dbConnection.js"
import { app } from "./app.js";


dotenv.config({path:'.env'});


const port = process.env.PORT;
DBConnection()
.then(()=>{
app.listen(port,()=>{
    console.log(`App is lisening on http://localhost:${port}`);
})

})
.catch((err)=>console.error("Errror <index.js > : "+err));