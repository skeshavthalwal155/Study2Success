// Import the required modules
const express = require("express")
const router = express.Router()

const { login, signUp, sendOtp, changePassword } = require("../controllers/Auth")
const { auth } = require("../middleware/auth")
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword")

// Routes for Login, Signup and Authentication

// ****************************************************************************************************************************************************************
//                                  Authentication routes
// ****************************************************************************************************************************************************************

// routes for user login
router.post('/login',login)

// routes for user signup
router.post("/signup",signUp)

// routes for sending otp to the user's email
router.post("/sendotp",sendOtp)

// route for changing password
router.post("/changepassword",auth, changePassword)

// ****************************************************************************************************************************************************************
//                                          Reset Password
// ****************************************************************************************************************************************************************

router.post('/reset-password-token', resetPasswordToken)
router.post('/reset-password',resetPassword)




module.exports = router;