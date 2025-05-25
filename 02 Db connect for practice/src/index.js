import dotenv from "dotenv";
import { dbConnections } from "./DB/dbconnection.js";


dotenv.config({path:'/.env'});


dbConnections();