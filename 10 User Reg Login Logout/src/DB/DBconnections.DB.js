import mongoose  from "mongoose";
import { DBConnecionFailed,DBConnecionSuccess } from "../utils/DB.utilis.js";
import { DB_NAME } from "../../constants.js";



const DBConnection = async ()=>{

    try {
    console.log("\n Processing...............");
const DBInstance = await mongoose.connect(`${process.env.MONGO_DB_AtLAS_URL}/${DB_NAME}`);
DBConnecionSuccess(DBInstance);
    } catch (error) {
        DBConnecionFailed(error)
        
    }
}



export{DBConnection};