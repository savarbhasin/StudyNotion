const express = require('express')
const app = express()
require('dotenv').config()

const userRoutes = require('./routes/User')
const paymentRoutes = require('./routes/Payment')
const profileRoutes = require('./routes/Profile')
const courseRoutes = require('./routes/Course')
const openRoutes = require('./routes/OpenRoute')

const database = require('./config/database')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {cloudinaryConnect} = require('./config/cloudinary')
const fileUpload = require('express-fileupload')    

const PORT = process.env.PORT

database.connect()
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true
    })
)
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:'/tmp'
}))

cloudinaryConnect()

app.use('/api/v1/auth',userRoutes)
app.use('/api/v1/profile',profileRoutes)
app.use('/api/v1/payment',paymentRoutes)
app.use('/api/v1/course',courseRoutes)
app.use('/api/v1/reach',openRoutes)


app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message:'Server is running'
    })
})

app.listen(PORT,()=>{
    console.log('listening on port: '+PORT)
})