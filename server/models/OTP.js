const mongoose = require('mongoose')
const mailSender = require('../utils/mailSender')
const emailVerificationTemplate = require('../mail/emailVerificationTemplate')
const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
})

// email send
const sendVerificationEmail = async(email,otp)=>{
    try{
        const mailResponse = await mailSender(email,'Verification Mail',emailVerificationTemplate(otp));
        


    } catch(err){
        console.log(err.message)
    }
}

otpSchema.pre('save', async function(next){
    await sendVerificationEmail(this.email, this.otp)
    next();
})

module.exports = mongoose.model('OTP',otpSchema)