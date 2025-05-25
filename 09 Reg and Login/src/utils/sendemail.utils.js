import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path:".env"})



const  sendEmail = async (to,subject,html,text)=>{

try {



    const transporter = await nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.COMPNY_EMAIL ,
            pass:process.env.AP_PASSWORD
        }
    })

const options = {
    from:process.env.COMPNY_EMAIL,
    to,
    subject,
    html,
    text
}



await transporter.sendMail(options , (err,info) =>{


    if(err){
        console.log("Email Not Send 28" , err);
    }

    else{

        console.log("Email Sended , " ,info.response);
        
    }
})




    
} catch (error) {

    console.error("Email Not Send 39 sendEmail.utils.js" , error);
    
    
}



}


export {sendEmail}