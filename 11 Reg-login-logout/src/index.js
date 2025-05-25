import { app } from "./app.js";
import { DBConncection } from "./db/connection.db.js";
import dotenv from "dotenv";


dotenv.config({path:".env"})


const port = process.env.PORT || 2001

DBConncection()
.then( ()=>{
    app.listen(port , ()=>{
        console.log(` => App is listening On http://localhost:${port}`);
    })
})
.catch( (error)=>{
    console.log(" ERROR index.js:::18",error);
    
})