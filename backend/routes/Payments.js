// Import the required modules
const express = require("express")
const router = express.Router()

const { auth, isStudent } = require("../middleware/auth")
const { capturePayment, verifySignature, sendPaymentSuccessEmail, getPaymentHistory } = require("../controllers/Payments")


router.post('/capturePayment',auth, isStudent, capturePayment)
router.post('/verifySignature',auth, isStudent, verifySignature)
router.post('/sendPaymentSuccessEmail',auth, isStudent, sendPaymentSuccessEmail)

module.exports = router