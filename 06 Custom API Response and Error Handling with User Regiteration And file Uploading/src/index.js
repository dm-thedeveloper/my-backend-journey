import dotenv from 'dotenv'
import dbConnection from './DB/data.js'
import { app } from './app.js';



dotenv.config({ 
    path:'.env'
});
 
dbConnection()
.then(()=>{
app.listen(`${process.env.PORT||4000}`,()=>{
    console.log(` * ==> app is listening on Port http://localhost:${process.env.PORT||4000}`);
})
.on((err)=>{
    console.log("ERROR:"+err);
    throw new err;
})

}
    
)
.catch((err)=>{
    console.log("connection failed"+err);
}

)