import nodemailer from "nodemailer"



const SendEmail = (to,subject,text,html)=>{
    try {

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.COMPANY_EMAIL,
        pass:process.env.COMPANY_PASSWORD 
    }
})
const mailoptions = {
    from :process.env.COMPANY_EMAIL,
    to,
    subject,
    text,
    html
}



transporter.sendMail(mailoptions , (err,info)=>{
    console.log("Email Sent To : " ,info.response)  ;  
})
    } catch (error) {
        
        console.log("Email Not Sent : " , error);
        
    }
}


export {SendEmail}  
