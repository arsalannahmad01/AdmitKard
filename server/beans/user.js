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
    sendOtpViaFast2SMS(phoneNumber, otp);

    await User.updateOne({ phoneNumber }, { otp }, { upsert: true });
    
    res.json({ message: 'OTP sent successfully!', otp });
}

const verifyOtp = async(req, res) => {

    const {phoneNumber, otp} = req.body
    const user = await User.findOne({phoneNumber})

    if(!user) {
        throw new CustomAPIError.BadRequestError('Resend OTP')        
    }
    
    if(otp != user?.otp){
        throw new CustomAPIError.BadRequestError('Invalid OTP')
    }

    if(user) {
        await User.findOneAndDelete({phoneNumber:phoneNumber});
        res.status(200).json({msg:"OTP Verified"})
    }

}

module.exports = {sendOtp, verifyOtp}