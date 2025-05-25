import { app } from "./app.js";
import { DBConnection } from "./db/connection.db.js";
import dotenv from "dotenv"

dotenv.config({path:".env"});
const port = process.env.PORT || 4032

DBConnection()
.then(()=>{

    app.listen(port , ()=>{
        console.log(`=> app is listening On ${port}`);
    })

})
.catch( (error)=>console.log("Error On index.js 16" ,error )
)