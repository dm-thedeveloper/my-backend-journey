import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import chalk from 'chalk';


const dbConnection= async ()=>{
    try {
        console.log(chalk.yellow('Waiting ..............'));
        const connectios = await mongoose.connect(`mongodb+srv://user:user@dostmuhmmad.u4bvgcq.mongodb.net/${DB_NAME}`);
        console.log(chalk.bgYellow(` Data base connected success fully \n DB Name: ${connectios.connection.name} \nDB Port: ${connectios.connection.port}\n`));

    } catch (error) {
        console.log ( " DB error is data.js \n "+error);
        throw error;

    
    }


};

export default dbConnection;