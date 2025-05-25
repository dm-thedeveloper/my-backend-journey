import chalk from "chalk";
const Success =  (DBInstane)=>{

 console.log(chalk.bgGreen(`DB connection Success Fully`));
 console.log(chalk.bgYellow(`\n DB Host : ${DBInstane.connection.host}`));
 console.log(chalk.bgYellow(`\n DB name : ${DBInstane.connection.name}`));
     
}
const Failed =  (error)=>{

    console.log(chalk.bgRed(`DB connection Failed`));
    console.log(chalk.red(`\n Error: ${error}`));
    // console.log(chalk.bgYellow(`\n DB name : ${DBInstane.connection.name}`));
        
   }


   export {Success,Failed}
