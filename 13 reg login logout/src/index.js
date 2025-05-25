import dotenv from "dotenv" ;
import { DBConnection } from "./db/connection.db.js";
import { app } from "./app.js";
 ; 

dotenv.config({path:".env"});
let port = process.env.PORT || 2001


DBConnection()
.then( ()=>{
    app.listen(port , ()=>{
        console.log(` => app is listening On http://localhost:${port}`);
        
    })

})
.catch( (err) => console.error("ERROR On Index.js :::: 18  "  ,err))


