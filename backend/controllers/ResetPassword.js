const mailSender = require('../utils/MailSender');
const User = require("../models/User")
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

//reset password token 
exports.resetPasswordToken = async (req, res) => {
    try {
        // fetching mail id from req body
        const email = req.body.email;

        // check email is exsits on db or not, email validation
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({
                message: 'Your Email is not registered with us'
            })
        }
        // generate token
        const token = crypto.randomUUID();

        // update user by adding token and expiration time
        await User.findOneAndUpdate({ email: email }, {
            token: token,
            resetPasswordExpires: Date.now() + 5 * 60 * 1000 //5 Minutes
        },
            { new: true });

        // create url
        const url = `https://study2success.vercel.app/update-password/${token}`

        // send mail containing url
        await mailSender(email, "Reset Password Link", `Password Reset Link : ${url}`)

        // send response
        res.status(200).json({
            success: true,
            message: "Reset Password Link is Sent Successfully"
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting password",
            error: err
        })
    }
}

// resetPassword in DB
exports.resetPassword = async (req, res) => {
    try {

        // fetching data from req body
        const { password, confirmPassword, token } = req.body;

        // validation
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New Password doesn't match with Confirm New Password"
            })
        }

        // get user details from db using token
        const userDetails = await User.findOne({ token: token });

        // if no entry - invalid token
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Token is invalid"
            })
        }

        // token time check
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Token is expired"
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // password update in db
        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true }
        )

        // send response
        res.status(200).json({
            success: true,
            message: "Password Reset Successfully"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}