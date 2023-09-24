const generateRandomNumber = (noDigit) => {
  const max = Math.pow(10, noDigit - 1);
  const min = Math.pow(10, noDigit) - 1;
  const otp = Math.floor(Math.random() * (max - min + 1) + min);
  return otp;
};

const isPhoneNumberValid = (phoneNumber) => {
  const regexWithCountryCode = /^(\+91)?[6-9]\d{9}$/;
  const regexWithoutCountryCode = /^[6-9]\d{9}$/;

  return (
    //   REUSABLE_PHONE_NUMBERS.includes(phoneNumber) ||
    regexWithCountryCode.test(phoneNumber) ||
    regexWithoutCountryCode.test(phoneNumber)
  );
};



module.exports = {
  generateRandomNumber,
  isPhoneNumberValid
};
