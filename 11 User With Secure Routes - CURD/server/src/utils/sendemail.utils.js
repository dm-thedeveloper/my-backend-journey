import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config( { path:".env"})

export const sendEmail = async (to,subject,text,html)=>{
    try {

        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.COMPANY_EMAIL ,
                pass:process.env.EMAIL_PASSWORD 
            }
        });


        const mailoptins ={

            from:process.env.COMPANY_EMAIL,
            to,
            subject,
            text,
            html


        };


        transporter.sendMail(mailoptins , (err,info)=>{
            console.log("Email Sent To L "  , info.response);
        })
    } catch (error) {
        console.log("Email Not Sent Due This Issue" , error);
        
        
    }
}