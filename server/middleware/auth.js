const jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require('../models/User')

exports.auth = async (req, res, next) => {
    try{
        const token = req.cookies.token || req.headers.authorization.split(' ')[1]
        
        if (!token){
            return res.status(401).json({
                success:false,
                message: 'No token found'
            })
        }
        try{
            
            const decode =  jwt.verify(token,process.env.JWT_SECRET)
            
            req.user = decode 
        } catch(e){
            console.log(e)
            return res.status(401).json({
                success:false,
                message:'token is invalid'
            })
        }
        next()
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message: 'something went wrong while validating token'
        })
    }
}

exports.isStudent = async(req,res,next)=>{
    try{
        if(req.user.accountType!=='Student'){
            return res.status(401).json({
                success:false,
                message: 'This route is for students only'
            })
        }
        next()
    } catch(err){
        return res.status(401).json({
            success:false,
            message:'something went wrong while validating user role'
        })
    }
}
exports.isInstructor = async(req,res,next)=>{
    try{
        if(req.user.accountType!=='Instructor'){
            return res.status(401).json({
                success:false,
                message: 'This route is for instructor only'
            })
        }
        next()
    } catch(err){
        return res.status(401).json({
            success:false,
            message:'something went wrong while validating user role'
        })
    }
}
exports.isAdmin = async(req,res,next)=>{
    console.log(req.user.accountType)
    try{
        if(req.user.accountType!=='Admin'){
            return res.status(401).json({
                success:false,
                message: 'This route is for admin only'
            })
        }
        next()
    } catch(err){
        return res.status(401).json({
            success:false,
            message:'something went wrong while validating user role'
        })
    }
}