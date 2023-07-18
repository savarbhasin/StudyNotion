const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true
    },
    course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }],
    description:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Category',categorySchema) 