import mongoose  from "mongoose";
import { DB_name } from "../constants.js";


const dbConnections= async()=>{

try {
    console.log("DB processing........");
const dbinstance= await mongoose.connect(`mongodb+srv://new:new@dostmuhmmad.u4bvgcq.mongodb.net/${DB_name}`)
console.log(`DB connected successfully ${dbinstance.connection.host} \n${dbinstance.connection.name}`);
} catch (error) {
    console.log( "  :)  DB not connected \n Error :  ");
}



};


export{dbConnections}