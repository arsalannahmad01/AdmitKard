const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true, unique: true },
    otp: { type: String },
}, {timestamps:true})

module.exports = mongoose.model('login', loginSchema)