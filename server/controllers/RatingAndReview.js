const ratingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const User = require('../models/User');
exports.createReview = async(req,res)=>{
    try{
        const {courseId,rating,review} = req.body
        const userId = req.user.id;
        if(!rating || !review){
            return res.status(401).json({
                success:false,
                message: 'All fields are required'
            })
        }
        // if user is student
        // if(user.accountType === "Instructor"){
        //     return res.status(400).json({
        //         success:false,
        //         message: 'Instructor cant add review'
        //     })
        // }
        // if user has bought course
        
        const courseDetails = await Course.findOne({_id:courseId, studentsEnrolled :{ $elemMatch:{$eq:userId}}})
        if(!courseDetails){
            return res.json({
                success: false,
                message: 'Student is not enrolled in the course'
            })
        }
        // if already reviewed
        const alreadyReviwed = await ratingAndReview.findOne({user:userId,course:courseId})
        if(alreadyReviwed){
            return res.status(400).json({
                success: false,
                message: 'Already reviewed'
            })
        }
        const ratedAndReviewed = await ratingAndReview.create({
            rating,
            review,
            course: courseId,
            user: userId,
        })
        await Course.findByIdAndUpdate(courseId, {$push:{ratingAndReviews:ratedAndReviewed._id}})

        return res.status(200).json({
            success: true,
            message: 'Rating and Review added successfully',
        })
        
    } catch(e){
        return res.status(500).json({
            success: false,
            message:'Couldnt add review'
        })
    }
}

exports.getAverageRating = async(req,res)=>{
    try{
        const {courseId} = req.body;
        // calc average rating
        const result = await ratingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating: {$avg:"$rating"}
                }
            }
        ])
        if(result.length>0){
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating
            })
        }
        return res.staus(200).json({
            success: true,
            averageRating: 0,
            message: 'Average Rating is 0, no reviews added till now.'
        })
    } catch(e){
        return res.status(500).json({
            success: false,
            message:'Couldnt get average rating'
        })
    }
}


exports.getAllRating = async(req,res)=>{
    try{
        const allReviews = await ratingAndReview.find({}).sort({rating:"desc"})
                                                .populate({
                                                    path:'user',
                                                    select:"firstName lastName email img"
                                                })
                                                .populate({
                                                    path:'course',
                                                    select: "courseName"
                                                }).exec()
        return res.status(200).json({
            success:true,
            message: 'fetched all ratings',
            allReviews
        }
        )
    }
    catch(e){
        return res.status(500).json({
            success: false,
            message:'Couldnt get ratings'
        })
    }
}