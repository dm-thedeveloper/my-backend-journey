import dotenv from "dotenv";
import { DBConnection } from "./src/DB/DBConnection.DB.js";
import { app } from "./app.js";
import chalk from "chalk";

dotenv.config({path:".env"});
let port = process.env.PORT;

DBConnection()
.then(()=>{
    app.listen(port ,()=>{
console.log(chalk.green(`App is listaening on the http://localhost:${port}`));

    })
})
.catch((err)=>{console.log("<index.js - 16 > Error : \n");})
