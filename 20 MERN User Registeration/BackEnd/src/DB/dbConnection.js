import mongoose, { mongo } from "mongoose";
import { Failed, Success } from "../utils/DB.utils.js";
import chalk from "chalk";
import { DB_NAME } from "../constants.js";


const DBConnection= async ()=>{

try {
console.log(chalk.green("DB connection Processing..........."));
const DBInstane = await mongoose.connect(`${process.env.MONGO_DB_ATLAS_URL}/${DB_NAME}`);
Success(DBInstane);
console.log(` Mongo DB URL : ${process.env.MONGO_DB_ATLAS_URL}`);
} catch (error) {
    Failed(error);
    // process.exit(1)
    
}

}



export {DBConnection}