import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";
import { DbFail, DbSuccess } from "../utils/DBConnection.utilis.js";


const DBConnection = async ()=>{
try {
console.log("\t\t DB Connection Processing ...........");
    const DBInstance = await mongoose.connect(`${process.env.MONGO_DB_ATLAS_URL}/${DB_NAME}`)
    DbSuccess(DBInstance)


} catch (error) {
    DbFail(error)
}

}

export{DBConnection}