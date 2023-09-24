var axios = require("axios");
const { BadRequestError } = require("./errors");

const sendOtpViaFast2SMS =async (phoneNumber, otp) => {

  if(phoneNumber.length > 13) throw new BadRequestError(`Invalid phone number: ${phoneNumber}`);

  phoneNumber = phoneNumber.startsWith("+91") ? phoneNumber.replace("+91", '') : phoneNumber;
  if(phoneNumber.length > 10) throw new BadRequestError(`Invalid phone number: ${phoneNumber}`);

  console.log("Phone Number: ", phoneNumber);
  console.log("OTP: ", otp);

    await axios.get(`https://www.fast2sms.com/dev/bulkV2?authorization=THp2QQI9J3GJCdLc5Ky84bZqwnGSIckyqAcDrVKV0fnFjypylTMIsYZl3X3u
    &route=otp
    &variables_values=${otp}
    &flash=0&numbers=${phoneNumber}`)

}

module.exports = {
  sendOtpViaFast2SMS,
}