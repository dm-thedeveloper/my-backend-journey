import chalk from "chalk";



const DbSuccess=  (dbInsatnce) =>{


console.log(chalk.bgGreen("DB Connection SuccessFully !..!...!....!......!"));

console.log(chalk.yellow(` DB Host :  ${dbInsatnce.connection.host}`));
console.log(chalk.yellow(` DB Name :  ${dbInsatnce.connection.name}`));

}

const DbFail=  (error) =>{


    console.log(chalk.bgRed("DB Connection Failed :)..:)...:)....:)......:)"));
    console.log(chalk.red(` <DB Connectio /> Error :  ${error}`));
    
    }

    export {DbSuccess,DbFail}