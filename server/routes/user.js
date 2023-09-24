const express = require('express')
const router = express.Router()

const {sendOtp, verifyOtp} = require('../beans/user')

router.route("/send-otp").post(sendOtp)
router.route('/verify-otp').post(verifyOtp)

module.exports = router