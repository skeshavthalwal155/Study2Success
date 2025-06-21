// Import the required modules
const express = require("express")
const router = express.Router()

const { auth, isStudent } = require("../middleware/auth")
const { capturePayment, verifySignature, sendPaymentSuccessEmail } = require("../controllers/Payments")
const { default: PaymentHistory } = require("../../frontend/src/Pages/PaymentHistory")

router.post('/capturePayment',auth, isStudent, capturePayment)
router.post('/verifySignature',auth, isStudent, verifySignature)
router.post('/sendPaymentSuccessEmail',auth, isStudent, sendPaymentSuccessEmail)
router.get('/paymentHistory', auth, isStudent, PaymentHistory)

module.exports = router