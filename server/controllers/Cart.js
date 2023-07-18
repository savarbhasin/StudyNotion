const User = require('../models/User')


exports.addToCart = async(req,res)=>{
    const userId = await req.user.id
    const {item} = req.body
    
    try{
        const user = await User.findById(userId)
        if(user.cart.includes(item)){
            return res.status(400).json({
                sucess:false,
                message:'Item already in cart'
            })
        }
        await User.findByIdAndUpdate(userId,{$push:{cart:item}})
        return res.status(200).json({
            success:true,
            message:'Added to cart'
        })
    } catch(e){
        console.log(e)
        return res.json(400).json({
            success:false,
            message:e.message
        })
    }
}
exports.removeFromCart = async(req,res)=>{
    const userId = await req.user.id
    const {item} = req.body
    try{
        await User.findByIdAndUpdate(userId,{$pull:{cart:item}})
        return res.status(200).json({
            success:true,
            message:'Removed to cart'
        })
    } catch(e){
        return res.json(400).json({
            success:false,
            message:e.message
        })
    }
}

exports.resetCart = async(req,res)=>{
    const userId = await req.user.id
    
    try{
        await User.findByIdAndUpdate(userId,{cart:[]})
        return res.status(200).json({
            success:true,
            message:'Reseted Cart'
        })
    } catch(e){
        return res.json(400).json({
            success:false,
            message:e.message
        })
    }
}