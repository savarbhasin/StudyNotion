const nodemailer = require('nodemailer')
require('dotenv').config()
const mailSender = async(email,title,body) =>{
    try{
        let transport = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }

        })
        let info = await transport.sendMail({
            from:'Savar Bhasin',
            to:email,
            subject:title,
            html:`${body}`
        })
        console.log(info)
        return info;
    } catch(e){
        console.log('error in sending mail')
        console.error(e)
    }
}
module.exports = mailSender;