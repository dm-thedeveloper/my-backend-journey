import DataConnection from './DB/data.js'
import dotenv from 'dotenv';
import { app } from './app.js';

dotenv.config({
    path:'./env'
})

DataConnection()
.then(()=>{
app.listen(process.env.PORT,()=>{
console.log(`app is listening on localhost:${process.env.PORT}`);

})
})
.catch((error)=>{
    console.log("connection Failed !!  :)"+error);
})
