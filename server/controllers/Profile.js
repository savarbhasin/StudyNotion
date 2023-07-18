const Profile = require('../models/Profile')
const User = require('../models/User')
const cron = require('node-cron')
require('dotenv').config()
const{uploadImageToCloudinary} = require('../utils/imageUploader')
const Course = require('../models/Course')
const RatingAndReview = require('../models/RatingAndReview')
exports.updateProfile = async(req,res)=>{
    try{
        const userId = req.user.id;
        const {gender,contactNumber,dateOfBirth=null,about=""} = req.body;
        if(!contactNumber || !gender){
            return res.status(400).json({
                success: false,
                message: 'Please enter required fields'
            }) 
        }
        const userDetail = await User.findById(userId)
        const profileId = userDetail.additionalDetails;
        const updatedProfile = await Profile.findByIdAndUpdate(profileId,{gender,contactNumber,dateOfBirth,about},{new:true})
        const userDetails = await User.findById(userId).populate("additionalDetails").exec()
        
        return res.status(200).json({
            success:true,
            message: 'Updated profile',
            updatedProfile,
            userDetails,
        })
    } catch(e){
        console.log(e)
        return res.json({
            success:false,
            message:'Error updating profile.'
        })
    }

}

exports.deleteAccount = async(req,res)=>{
    try{
        const userId = req.user.id;
        // validate id
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:'No user found'
            })
        }
        const profileId =user.additionalDetails;
          
        await Profile.findByIdAndDelete(profileId)
        await RatingAndReview.deleteMany({user:userId})
        
        for(let course in user.courses){
            await Course.findByIdAndUpdate(course,{$pull:{studentsEnrolled:userId}})
        }

        await User.findByIdAndDelete(userId)

        return res.status(200).json({
            success: true,
            message: 'Account deleted successfully'
        })
    } catch(e){
        return res.json({
            success:false,
            message:'Error while deleting account'
        })
    }
}

exports.getAllUserDetails = async(req,res)=>{
    try{
        const userId = req.user.id;
        const userDetails = await User.findById(userId).populate("additionalDetails").exec();
        return res.status(200).json({
            success:true,
            message: 'Successfully fetched data',
            userDetails
        })
    } catch(e){
        return res.json({
            success:false,
            message:'Error while fetching account details'
        })
    }
}

exports.updateDisplayPicture = async(req, res)=>{
    try{
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        // upload to cloudinary 
        const image = await uploadImageToCloudinary(displayPicture,process.env.FOLDER_NAME,1000,1000)
        // change in user
        const updatedProfile=await User.findByIdAndUpdate(userId,{img:image.secure_url},{new:true}).populate("additionalDetails")

        return res.status(200).json({
            success: true,
            message: 'successfully updated profile picture',
            data:updatedProfile
        })

    } catch(e){
        console.error(e)
        return res.status(400).json({
            success:false,
            message: 'Error while updating display picture'
        })
    }
}

exports.getEnrolledCourses = async(req,res)=>{
    try{
        const userId = req.user.id;
        const userDetails = await User.findById(userId).populate({
            path:"courses",
            populate:{
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            },
        }).populate("courseProgress").exec()
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }
        
        const coursesWithProgress = userDetails.courses.map((course,index)=>{
            
            let totalLec = 0
            let lecCompleted = 0
            course.courseContent.forEach((section)=>{
                totalLec+=section.subSection.length
            })
           
            for(const c of userDetails.courseProgress){
                if(c.courseId.equals(course._id)){
                    lecCompleted+=c.completedVideos.length
                }
            }
            const progressPercentage = (lecCompleted/totalLec)*100
            
            return{
                ...course.toObject(),
                progressPercentage
            }
        })
        
        
        return res.status(200).json({
            success: true,
            data: coursesWithProgress,
        })

    } catch(e){
        console.log(e)
        return res.status(500).json({
            success: false,
            message: e.message,
        })
    }
}


exports.instructorDashboard = async(req,res)=>{
    try{
        const userId = req.user.id
        const courseDetails = await Course.find({instructor:userId})
        const courseData = courseDetails.map((course)=>{
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled*course.price;

            const courseDataWithStats = {
                _id:course._id,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated
            }
            return courseDataWithStats
        })
        return res.status(200).json({
            success:true,
            message:"Generated",
            courses:courseData
        })
    } catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:e.message
        })
    }
}