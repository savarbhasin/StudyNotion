const mongoose = require('mongoose')
require('dotenv').config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log('connected to db')
    })
    .catch((e)=>{
        console.log('error connecting to db')
        console.error(e)
        process.exit(1)
    })
}