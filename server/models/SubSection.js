const mongoose = require('mongoose');

const subSection = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    timeDuration:{
        type:String,
    },
    description:{
        type:String,
    },
    videoUrl:{
        type:String,
    },
    additionalUrl:{
        type:String,
    }

})

module.exports = mongoose.model('SubSection',subSection)