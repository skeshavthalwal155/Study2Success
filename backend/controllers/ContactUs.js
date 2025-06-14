const mailSender = require("../utils/MailSender")
require("dotenv").config()

exports.contactUs = async (req, res)=>{
    // get data from req body
    const { firstName, lastName, email, phoneNo, message } = req.body

    // Validation
   
    await mailSender(email, "Query For Contact", "YOUR MESSAGE IS SEND TO study2success")
    try {
        const data = {
            firstName,
            lastName: `${lastName ? lastName : "null"}`,
            email,
            message,
            phoneNo: `${phoneNo ? phoneNo : 'Null'}`
        }
        const info = await mailSender(
            process.env.CONTACTUS_MAIL,
            "Query For Contact",
            `<htm><body>${Object.keys(data).map((key) => {
                return `<p>${key} : ${data[key]}`;
            })}</body><html>`)
        if (info) {
            return res.status(200).send({
                success: true,
                message: "Your message has been sent successfully",
            })
        } else {
            return res.status(403).send({
                success: false,
                message: "Something went wrong",
            });
        }

    } catch (err) {
        return res.status(403).send({
            success: false,
            message: "Something went wrong",
          });
    }
}