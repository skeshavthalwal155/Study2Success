const NodeMailer = require("nodemailer")
require('dotenv').config()

const mailSender = async (email, title, body) => {
    try {
        // Better configuration with service-based approach
        const transporter = NodeMailer.createTransport({
            service: 'gmail', // Use service instead of host for better reliability
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            // Add timeout settings to prevent hanging
            connectionTimeout: 10000,  // 10 seconds
            greetingTimeout: 10000,
            socketTimeout: 10000,
        })

        
        await transporter.verify();
        console.log("Email transporter verified successfully");

        const info = await transporter.sendMail({
            from: `"Study2Success by Keshav Thalwal" <${process.env.MAIL_USER}>`, // Fixed: use MAIL_USER instead of MAIL_HOST
            to: email,
            subject: title,
            html: body,
        })
        
        console.log("Email Sent Successfully:", info.messageId);
        return info
        
    } catch (err) {
        console.error("Error Sending Email:", err);
        throw err;
    }
}

module.exports = mailSender