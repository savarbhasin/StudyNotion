const Section = require('../models/Section')
const SubSection = require('../models/SubSection')
const Course = require('../models/Course')

exports.createSection = async(req,res)=>{
    try{
        // data fetch validate
        const {sectionName,courseId} = req.body
        if(!sectionName || !courseId){
            return res.json(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        // create section
        const newSection = await Section.create({
            sectionName
        })
        // update course
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},{$push:{courseContent:newSection._id}},{new:true}).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();
        
        return res.status(200).json({
            success:true,
            message:'Section created successfully',
            updatedCourseDetails
        })
    
    
    } catch(e){
        console.log(e)
        return res.json({
            success:false,
            message: 'Error creating section'
        })
    }
}

exports.updateSection = async(req,res)=>{
    try{
        const {sectionName,sectionId,courseId} = req.body;
        
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName});
        
        const updatedCourse = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();
        
        return res.status(200).json({
            success:true,
            message: 'Section updated successfully',
            updatedCourse
        })
    } catch(e){
        return res.json({
            success:false,
            message: 'Error creating section'
        })
    }
}

exports.deleteSection = async(req,res)=>{
    try{
        const {sectionId,courseId} = req.body;
        
        await Section.findByIdAndDelete(sectionId);
        
        console.log('here')
        const updatedCourse = await Course.findById({_id:courseId}).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();
        return res.status(200).json({
            success: true,
            message: 'Section deleted successfully',
            updatedCourse
        })
    }   catch(e){
        return res.json({
            success:false,
            message: 'Error creating section'
        })
    }
}