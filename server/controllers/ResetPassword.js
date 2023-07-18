const User = require('../models/User')
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
exports.resetPasswordToken = async(req,res)=>{
    try{
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                success: false,
                message: 'User not registered'
            })
        }
        const token = crypto.randomUUID()

        const updatedDetails = await User.findOneAndUpdate({email:email},
            {token:token,resetPasswordExpires:Date.now()+5*60*1000},{new:true})
        
        const url = `http://localhost:3000/update-password/${token}`

        await mailSender(email,'Password Reset Link',`Password Reset Link: ${url}`)

        return res.status(200).json({
            success: true,
            message: 'Email sent successfully, please check email and change password!'
        })
    } catch(err){
        return res.status(401).json({
            success: false,
            message: 'something went wrong while reseting password'
        })
    }
}

exports.resetPassword = async(req,res)=>{
    try{
        const {password,confirmPassword,token} = req.body
        if (!password || !confirmPassword){
            return res.status(401).json({
                success: false,
                message:'All fields are required'
            })
        }
        if(password !== confirmPassword){
            return res.json({
                success: false,
                message: 'password does not match'
            })
        }
        // get user from db using token
        const userDetails = await User.findOne({token:token})
        // check
        if(!userDetails){
            return res.json({
                success: false,
                message: 'Token invalid'
            })
        }
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: 'Token expired, please try again'
            })
        }
        const hashedPassword =await bcrypt.hash(password,10)

        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        )
        return res.status(200).json({
            success: true,
            message: 'password changed successfully'
        })
    } catch (err) {
        console.log(err)
        return res.json({
            success: false,
            message:'not able to reset password'
        })
    }
    
    
}