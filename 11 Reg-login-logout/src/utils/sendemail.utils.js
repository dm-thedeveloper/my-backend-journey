import nodemailer from "nodemailer"

 export const sendEmail = (to,subject,text,html)=>{


    try {

        const trasnporter = nodemailer.createTransport({

            service:"gmail" ,
            auth:{
                user:process.env.COMPANY_EMAIL ,
                pass:process.env.EMAIL_PASSWORD
            }


        });


        const mailOptions = {

            from:process.env.COMPANY_EMAIL,
            to,
            subject,
            text,
            html

        }


        trasnporter.sendMail(mailOptions , (err,info)=>{
console.log("Email Sent To : "  ,info.response)  ;


        })
        
    } catch (error) {
        console.log("Email Not Sent : " , error);
        
        
    }
}