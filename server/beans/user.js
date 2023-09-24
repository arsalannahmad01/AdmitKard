const User = require('../model/user')
const {generateRandomNumber, isPhoneNumberValid} = require('../utils')
const {sendOtpViaFast2SMS} = require('../services')
const CustomAPIError = require('../errors')

const sendOtp = async (req, res) => {
    const { phoneNumber } = req.body

    if(!isPhoneNumberValid(req.body.phoneNumber)) {
        throw new CustomAPIError.BadRequestError("Number isn't valid")
    }

    const otp = generateRandomNumber(4);
    // sendOtpViaFast2SMS(phoneNumber, otp);

    await User.updateOne({ phoneNumber }, { otp }, { upsert: true });
    
    res.json({ message: 'OTP sent successfully!', otp });
}

const verifyOtp = async(req, res) => {
    const {phoneNumber, otp} = req.body;
    const tempUser = await User.findOne({phoneNumber:phoneNumber});

    if(otp != tempUser?.otp){
        // throw new CustomAPIError.BadRequestError("Invalid OTP")
        res.send("Invalid OTP")
    }

    if(tempUser) {
        await User.findOneAndDelete({phoneNumber:phoneNumber});
    }

    res.json({msg:"OTP Verified"})
}

module.exports = {sendOtp, verifyOtp}