import chalk from "chalk";


const DBConnectionSuccess =(DBInstace)=>{

console.log(chalk.bgGreen(`DB Connected SuccessFully`));
console.log(chalk.bgYellow(`Host : ${DBInstace.connection.host} \n Name: ${DBInstace.connection.name}`));

}


const DBConnectionFailed =(error)=>{

    console.log(chalk.bgRed(`DB Connected failed`));
    console.log(chalk.red(`Error : ${error}`));
    
    }

    export {DBConnectionSuccess,DBConnectionFailed}