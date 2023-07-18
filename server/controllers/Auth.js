const User = require('../models/User');
const OTP = require('../models/OTP');
const Profile = require('../models/Profile');
const otpGenerator = require('otp-generator');
const passwordUpdate = require('../mail/passwordUpdate')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
require('dotenv').config()

exports.sendOTP = async(req,res)=>{
    try{
        const {email} = req.body;
    
        const checkUserPresent = await User.findOne({email})

        if (checkUserPresent){
            return res.status(401).json({
                success:false,
                message: 'User already exists'
            })
        }

        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
        const result = await OTP.findOne({otp:otp})
        

        // if otp already in database
        while (result){
            var otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            })
            const result = await OTP.findOne({otp:otp})
        }

        const otpPayload = {email,otp};
        const otpBody = await OTP.create(otpPayload)
        console.log(otpBody)

        return res.status(200).json({
            success: true,
            message:'otp sent successfully'
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
    

}
 
exports.signUp = async(req,res)=>{
    try{
        const {firstName,lastName,email,password,confirmPassword,accountType,otp} = req.body

        if(!firstName || !lastName || !email || !confirmPassword || !password  || !otp){
            return res.status(403).send({
                sucess:false,
                message: 'All fields are required'
            })
        }
        if(password !== confirmPassword){
            return res.status(400).send({
                success:false,
                message: 'Password does not match'
            })
        }
        const existingUser = await User.findOne({email})
        if (existingUser){
            return res.status(400).json({
                success:false,
                message:'User already exists'
            })
        }
        // find recent otp for this user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        if (recentOtp.length === 0){
            return res.status(400).json({
                success:false,
                message: 'no otp found'
            })
        
        } else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message: 'otp does not match'
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password,10)
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })
        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            img:`https://avatars.dicebear.com/api/initials/${firstName} ${lastName}.svg`
        })
        return res.status(200).json({
            success: true,
            message: 'User added successfully',
            user
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            sucess: false,
            message: 'User cannot be created. Please try again later!'
        })
    }
    

}
 
exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body
        if (!email || !password){
            return res.status(403).json({
                success: false,
                message: 'All fields are required'
            })
        }
        const userCart = await User.findOne({email}).populate("cart")
        const user = await User.findOne({email}).populate("additionalDetails").lean()
        if(!user){
            return res.status(401).json({
                success: false,
                message: 'User not registered'
            })
        }
       
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            // gen token
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'2h'
            })
            
            user.token = token;
            user.password = undefined;

            const option = {
                expiresIn : new Date(Date.now() + 3*24*60*60*100),
                httpOnly : true
            }
            // create cookie
            res.cookie("token",token,option).status(200).json({
                success: true,
                message: 'Logged in successfully',
                token,
                user,
                cart:userCart.cart
            })
        } else {
            return res.status(401).json({
                success:false,
                message: 'Incorrect Password'
            })
        }
        
    } catch(err){
        console.error(err)
        return res.status(500).json({
            success:false,
            message:err.response.data.message
        })
    }
}
 
exports.changePassword = async(req,res)=>{
    try{
        const {oldPassword,newPassword} = req.body;
        if (!oldPassword || !newPassword ){
            return res.status(403).json({
                success: false,
                message: 'All fields are required'
            })
        }
        
        const userId = req.user.id
        const user = await User.findById(userId).populate("additionalDetails").exec()
        const name = user.firstName + ' ' + user.lastName
       const passwordMatch = await bcrypt.compare(oldPassword,user.password);
       
        if(passwordMatch){
            

            try {
                const mail = await mailSender(user.email,`Password updated successfully for ${user.additionalDetails.firstName} ${user.additionalDetails.lastName}`,passwordUpdate(user.email,name));
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    success: false,
                    message: "Error occurred while sending email",
                    error: error.message,
                });
            }
            const encryptedPassword = await bcrypt.hash(newPassword,10)
            const updatedUser = await User.findByIdAndUpdate(userId,{password:encryptedPassword},{new:true})
            return res.status(200).json({
                success: true,
                message: "Password changed successfully"
            })   
        } else{
            return res.status(400).json({
                success:false,
                message:"Password incorrect"
            })
        }
       

    } catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error occurred while changing password"
        })
    }
} 

