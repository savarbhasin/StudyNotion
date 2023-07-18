const mailSender = require('../utils/mailSender');
require('dotenv').config()

exports.contactUs = async(req,res)=>{
    try{
        const {email,firstname,lastname,contactno,message} = req.body;
        await mailSender(email,"Received your contact information","Our team will soon be in contact with you")
        await mailSender(process.env.MAIL_USER,"Contact Information",`Someone has contacted you email:${email},${firstname},${lastname},${message}`)
        return res.status(200).json({
            success: true,
            message: 'Successfully sent contact information'
        })
    } catch(err){
        console.error(err)
        return res.json({
            success: false,
            message: 'Could not send form'
        })
    }
}