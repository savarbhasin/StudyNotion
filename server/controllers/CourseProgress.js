const CourseProgress = require('../models/CourseProgress')
const SubSection = require('../models/SubSection')

exports.updateCourseProgress = async(req,res)=>{
    const {courseId,subSectionId} = req.body
    const userId = req.user.id;

    try{
        const subSection = await SubSection.findById({_id:subSectionId})
        if(!subSection){
            return res.status(404).json({
                success:false,
                message:'Sub Section not found'
            })
        }
        let courseProgress = await CourseProgress.findOne({courseId,user:userId})
        if(!courseProgress){
            return res.status(401).json({
                success:false,
                message:"No course progress found"
            })
        } else{
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    success:false,
                    message:"Already marked as completed"
                })
            }
            courseProgress.completedVideos.push(subSectionId)
        }
        await courseProgress.save()
        return res.status(200).json({
            success:true
        })
    } catch(e){
        console.log(e)
        return res.json({
            success:false,
            message:e.mesage
        })
    }
}