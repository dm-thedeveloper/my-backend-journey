import mongoose from "mongoose";
import { DbName } from "../constants.js";
import chalk from "chalk";


const DataConnection = async ()=>{

    try {
 console.log("\n\t\t\t\t\t\tloading.....");
       const hamareDB = await mongoose.connect(`${process.env.MONGODB_URL}/${DbName}`);
console.log(chalk.bgBlueBright(`Hamare MongoDB Connect Ho gaye hai, Ye dekho \n ${hamareDB.connection.host}`));


    } catch (error) {
        console.error("ERROE IS : "+error);
        throw error;
        process.exit(1);
    }
}

export default DataConnection;