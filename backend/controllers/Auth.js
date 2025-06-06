const bcrypt = require("bcryptjs")
const User = require('../models/User')
const Otp = require('../models/Otp')
const jwt = require("jsonwebtoken");
const otpGenerator = require('otp-generator');
const mailSender = require('../utils/MailSender');
const { passwordUpdated } = require("../mail/templates/passwordUpdate")
const Profile = require("../models/Profile")
require('dotenv').config()

// Signup Controller for Registering Users

exports.signUp = async (req, res) => {
	try {
		// Destructure fields from the requrest body
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			contactNumber,
			otp
		} = req.body;

		// Check if All Details are there or not
		// if (!firstName || !lastName || !email || !password || !confirmpassword || !otp || !contactNumber) {
		//     return res.status(400).json({
		//         success: false,
		//         message: "All Fields are required"
		//     })
		// }

		// check if passwords and confirm passsword are not match
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "Password and Confirm Password do not matched. Please try again."
			})
		}

		// check user already exist or not
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: "User Already Exists"
			})
		}

		// find most recent otp for the email
		const recentOtp = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
		// console.log(recentOtp)

		// validate otp
		if (recentOtp.length === 0) {
			return res.status(404).json({
				success: false,
				message: 'OTP not found'
			})
		} else if (otp !== recentOtp[0].otp) {
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid"
			})
		}

		// hash password
		const hashedPassword = await bcrypt.hash(password, 10)

		// create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true)

		// create the Additional Profile for User
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null
		})

		const user = await User.create({
			firstName,
			lastName,
			email,
			contactNumber,
			password: hashedPassword,
			accountType: accountType,
			approved: approved,
			additionalDetails: profileDetails._id,
			image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`,

		})
		// success respone
		return res.status(200).json({
			success: true,
			user,
			message: `User is registered Successfully`
		})

	} catch (err) {
		res.status(500).json({
			success: false,
			message: "Error While Creating Account",
			error: err
		})
	}
}

// Login controller  for authencating users
exports.login = async (req, res) => {
    try {
        // Get email and password from request body
        const { email, password } = req.body;

        // Check if email or password is missing
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
            });
        }

        // Convert email to lowercase for case-insensitive comparison
        const emailLower = email.toLowerCase();

        // check user exist or not with case-insensitive email
        const user = await User.findOne({ 
            email: { $regex: new RegExp(`^${emailLower}$`, 'i') }
        }).populate('additionalDetails');

        // If user not found with provided email
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found, please sign up to Continue"
            });
        }

        // Generate JWT token and Compare Password
        if (await bcrypt.compare(password, user.password)) {
            const expiresIn = 24 * 60 * 60;
            const token = jwt.sign(
                { email: user.email, id: user._id, accountType: user.accountType },
                process.env.JWT_SECRET,
                { expiresIn }
            );

            // Save token to user document in database
            user.token = token;
            user.password = undefined;
            
            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };            
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                expiresIn,
                message: `User Login Success`,
            });
        } else {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            });
        }
    } catch (error) {
        console.error(error);
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        });
    }
};

// sendOTP
exports.sendOtp = async (req, res) => {
	try {
		// fetch email from req.body
		const { email } = req.body;

		// check user present or not
		const checkUserPresent = await User.findOne({ email })
		if (checkUserPresent) {
			return res.status(409).json({
				success: false,
				message: `User is Already Registered`,
			})
		}
		var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		const result = await Otp.findOne({ otp: otp });
		// console.log("Result is Generate OTP Func");
		// console.log("OTP", otp);
		// console.log("Result", result);
		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}
		const otpPayload = { email, otp };
		const otpBody = await Otp.create(otpPayload);
		// console.log("OTP Body", otpBody);

		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
	} catch (error) {
		// console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });
	}
};

// Controller for Changing Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (oldPassword === newPassword) {
			return res.status(400).json({
				success: false,
				message: "New Password cannot be same as Old Password",
			});
		}

		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The Old Password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				"Study Notion - Password Updated",
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			// console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};