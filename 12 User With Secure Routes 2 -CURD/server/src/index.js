import { app } from "./app.js";
import { DBConnection } from "./db/connection.db.js";
import dotenv from "dotenv"


dotenv.config({path:".env"})

let port = process.env.PORT || 3001

DBConnection()
.then( ()=>{
    app.listen(port , ()=>{
        console.log(` ⚙️ => Server is Running  On http://localhost:${port}`);
        
    })
})
.catch( (error)=>{ console.log("ERROR on Index.js :::: 17" , error);
})