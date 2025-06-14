const mongoose = require("mongoose")
const mailSender = require("../utils/MailSender")
const emailTemplate = require("../mail/templates/emailVerificationTemplate")

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 5*60,
    },
})

// Define a function to send emails
async function sendVerficationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification Email From study2success", emailTemplate(otp));
        // console.log("Email Sent Successfully : ",mailResponse)

    }catch(err){
        console.log(`Error Occured while sending mail ${err}`)
        throw err
    }
}

otpSchema.pre("save", async function(next){
    // console.log("New Doucment saved to database")
    
    // only send a email when a new doucment is created
    if(this.isNew){

        await sendVerficationEmail(this.email, this.otp);
    }
    next();
    
})

module.exports = mongoose.model("Otp", otpSchema)