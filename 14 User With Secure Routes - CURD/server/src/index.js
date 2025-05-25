import { app } from "./app.js";
import { DBConnection } from "./db/connection.db.js";
import dotenv from "dotenv";

dotenv.config({path:".env"});

let port  = process.env.PORT || 2001

DBConnection()
.then( ()=>
{
    app.listen(port , ()=>{
        console.log(` => App is listening  On http://localhost:${port}`);
    })
})
.catch( (err) =>{
    console.log(" Error On Index.js 17" ,err);
    
})