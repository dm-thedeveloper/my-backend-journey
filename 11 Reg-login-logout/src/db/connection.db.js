import chalk from "chalk";
import mongoose from "mongoose";
import { dbName } from "../constants.js";

const DBConncection = async ()=>{
    try {
        

        console.log(chalk.yellow("\t\t\t Connection..........."));
        const db = await mongoose.connect(`${process.env.DB_URL}/${dbName}`)
        console.log(chalk.bgGreen("** Data Base Connection Success Fully !!"));
        console.log("Host : " ,db.connection.host );
        console.log("Name : " ,db.connection.name )
    
    } catch (error) {
    console.log(chalk.bgRed(" :) Data Base Connection Failed !!") , chalk.red(error));
        
    }
}


export  {DBConncection}