import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config( {path:".env"});

export const sendEmail = async (to,subject,text,html)=>{
try {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.COMPANY_EMAIL ,
            pass:process.env.COMPANY_EMAIL_PASSWORD
        }
    })
    
    const mailOptions = {
        from :process.env.COMPANY_EMAIL,
        to,
        subject,
        text,
        html
    }
    
    let response  = await  transporter.sendMail(mailOptions)
console.log("Email Sent To : " , response.response) ;
} catch (error) {
    console.log("Email Not Sent To : " , error) ;
    
}

}