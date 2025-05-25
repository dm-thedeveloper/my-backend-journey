import mongoose from "mongoose";
import { DBConnectionFailed, DBConnectionSuccess } from "../Utils/DB.Utility.js";
import { DB_NAME } from "../../constants.js";


const DBConnection = async () => {


    try {
        console.log(" \t Processing...........");
        const DBInstance =  await mongoose.connect(`${process.env.MONGODBATLAS_URL}/${DB_NAME}`);
        DBConnectionSuccess(DBInstance);




    } catch (error) {
        DBConnectionFailed(error);
    }
};



export{DBConnection}