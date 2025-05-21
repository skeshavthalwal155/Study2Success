const NodeMailer = require("nodemailer")
require('dotenv').config()

const mailSender = async(email, title, body)=>{
    try{
        const transporter = NodeMailer.createTransport({
            host:process.env.MAIL_HOST,
            port:587,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS 
            }
        })
        const info = await transporter.sendMail({
            from: `"study2success by Keshav Thalwal" <${process.env.MAIL_HOST}> ` ,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        // console.log("Email Sent : ",info)
        return info
        
    }catch(err){
        console.error("Error Sending Email : ",err);
        throw err;
    }
}

module.exports = mailSender