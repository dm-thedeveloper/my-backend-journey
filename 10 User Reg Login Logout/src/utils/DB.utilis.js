import chalk from "chalk";

const DBConnecionSuccess =(DBInstance)=>{

console.log(chalk.bgGreen(`  ** DB connection Success Fully !!!!!!!!! **`));

console.log(chalk.yellow(`Host : ${DBInstance.connection.host}`));
console.log(chalk.yellow(`Name : ${DBInstance.connection.name}`));
}


const DBConnecionFailed =(error)=>{

    console.log(chalk.bgRed(`DB connection Failed :) => :)`));
    
    console.log(chalk.red(`Error : ${error}`));
    // console.log(chalk.bgYellow(`Name : ${DBInstance.connection.name}`));
    }




    export{DBConnecionFailed,DBConnecionSuccess}

