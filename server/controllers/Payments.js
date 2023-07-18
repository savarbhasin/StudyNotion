const {instance} = require('../config/razorpay')
const User = require('../models/User')
const Course = require('../models/Course')
const mailSender = require('../utils/mailSender')
const {default:mongoose} = require('mongoose')
const { courseEnrollmentEmail } = require('../mail/courseEnrollmentEmail')
const crypto = require('crypto')
const CourseProgress = require('../models/CourseProgress')
require('dotenv').config()
// initiate the order
exports.capturePayment = async(req,res)=>{
    const {courses} = req.body;
    const userId = req.user.id;
    

    if(courses.length===0){
        return res.json({success:false,message:"Please provide courseId"})
    }

    let totalAmount = 0;
    for (const course_id of courses){
        let course;
        try{
            course = await Course.findById(course_id)
            if(!course){
                return res.status(404).json({success:false,message:"Course not found"})
            }
            const uid = new mongoose.Types.ObjectId(userId)
            if(course.studentsEnrolled.includes(userId)){
                return res.status(401).json({success:false,message:"Student already enrolled"})
            }
            totalAmount += course.price
            
        } catch(e){
            return res.status(500).json({
                success:false,
                message:"error"
            })
        }
    }
    const options = {
        amount:totalAmount*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString()
    }
    
    try{
        const paymentResponse = await instance.orders.create(options)
        return res.status(200).json({
            success:true,
            message:paymentResponse
        })
    } catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:e.message
        })
    }




}

exports.verifyPayment = async(req,res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
    const userId = req.user.id

    if(!razorpay_payment_id || !razorpay_order_id || !razorpay_signature){
        return res.status(400).json({
            success:false,
            message:"Payment failed"
        })
    }
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
    .createHmac(
        "sha256",process.env.RAZORPAY_SECRET
    )
    .update(body.toString())
    .digest("hex")

    if(expectedSignature === razorpay_signature){
        await enrollStudents(courses,userId)
        return res.status(200).json({
            success:true,
            message: "Payment successful"
        })
    }
    else{
        return res.status(404).json({
            success:false, 
            message: "Payment not verified"
        })
    }
}


const enrollStudents = async(courses,userId,res)=>{
    
    if(!courses || !userId){
        return res.status(400).json({
            sucess:false,
            message:"Please provide valid data"
        })
    }
    for(const course of courses){
        try{
            const enrolledCourse = await Course.findByIdAndUpdate(course,{$push:{studentsEnrolled:userId}},{new:true})
            if(!enrolledCourse){
                return res.json({success:false,message:"Course not found"})
            }
            const courseProgress = await CourseProgress.create({
                courseId:course,
                completedLectures:[],
                user:userId
            })
            const enrolledStudent = await User.findByIdAndUpdate(userId,{$push:{courses:course,courseProgress:courseProgress._id}},{new:true})
            // send mail to student
            const emailResponse = await mailSender(enrolledStudent.email,"Enrolled to course",courseEnrollmentEmail(enrolledCourse.courseName,enrolledStudent.firstName))
            console.log("email sent to student:",emailResponse)
            
        } catch(e){
            console.log(e)
           
        }
        
    }
        
    
}


exports.sendPaymentSuccessEmail = async(req,res)=>{
    const {orderId,paymentId,amount} = req.body
    const userId = req.user.id;
    if(!orderId || !paymentId || !amount){
        return res.status(404).json({
            success: false,
            message: "Please provide valid details"
        })
    }
    try{
        const enrolledStudent = await User.findById(userId)
        await mailSender(enrolledStudent.email,`Payment Received`,`<div>Payment successful</div>`)
    } catch(e){
        console.log("error in sending mail",e)
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}









// exports.capturePayment = async(req,res)=>{
//     const {courseId} = req.body;
//     const userId = req.user.id;
//     if(!courseId){
//         return res.json({
//             success: false,
//             message: 'Please provide valid course ID'
//         })
//     }
//     let course;
//     try{
//         course = await Course.findById(courseId);
//         if(!course){
//             return res.json({
//                 success: false,
//                 message: 'No course details were found'
//             })
//         }
//         // if user already has course
//         const uid = new mongoose.Types.ObjectId(userId)
//         if(course.studentsEnrolled.includes(uid)){
//             return res.status(400).json({
//                 success: false,
//                 message: 'Student already enrolled to course'
//             })
//         }

//     } catch(err){
//         console.error(err)
//         return res.status(500).json({
//             success: false,
//             message: err.message
//         })
//     }   
//     // order create
//     try{
//         const paymentResponse = instance.orders.create({
//             amount:course.price*100,
//             currency: 'INR',
//             receipt: Math.random(Date.now()).toString(),
//             notes:{
//                 courseId:course._id,
//                 userId
//             }
//         })
//         return res.status(200).json({
//             success:true,
//             message: 'Payment successful',
//             courseName: course.courseName,
//             courseDescription: course.courseDescription,
//             thumbnail : course.thumbnail,
//             orderId: paymentResponse.id,
//             amount: paymentResponse.amount,
//             currency: paymentResponse.currency
//         })
//     } catch (e) {
//         return res.json({
//             success:false,
//             message: 'Couldnt initiate order'
//         })
//     }
// }

// exports.verifySignature = async(req,res)=>{
//     const webhookSecret = "12345678"
//     const signaure = req.headers["x-razorpay-signature"]

//     const shasum = crypto.createHmac('sha256',webhookSecret)
//     shasum.update(JSON.stringify(req.body))
//     const digest = shasum.digest("hex")

//     if(signaure === digest){
//         console.log("Payment is Authorized")
//         const {courseId,userId} = req.body.payload.payment.entity.notes;
//         try{
//             const enrolledCourse = await Course.findByIdAndUpdate(courseId,{$push:{studentsEnrolled:userId}},{new:true});
//             if(!enrolledCourse){
//                 return res.json({
//                     success: false,
//                     message: 'Course not found'
//                 })
//             }
//             const enrolledStudent = await User.findByIdAndUpdate(userId,{$push:{courses:courseId}},{new:true})

//             const emailResponse = await mailSender(enrolledStudent.email,"Orded Placed for Course","Ordered")

//             return res.status(200).json({
//                 success: true,
//                 message: 'Signature verified and course added successfully'
//             })
            
//         } catch (e) {
//             return res.status(500).json({
//                 success: false,
//                 message: e.message
//             })
//         }
//     } else{
//         return res.status(400).json({
//             success: false,
//             message: 'Signature not verified'
//         })
//     }
// }