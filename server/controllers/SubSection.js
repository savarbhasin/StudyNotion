const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const {uploadImageToCloudinary} = require('../utils/imageUploader')
const Course = require('../models/Course');
exports.createSubSection = async(req,res)=>{
    try{
        const {sectionId,title,description,courseId} = req.body;
        const video = req.files.videoFile; 
        console.log(video,title,description)
        if(!sectionId || !title || !description || !video){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        const videoUpload = await uploadImageToCloudinary(video,process.env.FOLDER_NAME)

        const newSubSection = await SubSection.create({
            title,
            description,
            videoUrl:videoUpload.secure_url,
            timeDuration:videoUpload.duration
        })

        const updatedSection = await Section.findByIdAndUpdate(sectionId,{$push:{subSection:newSubSection._id}},{new:true}).populate("subSection").exec()
        
        

        return res.status(200).json({
            success:true,
            message:'SubSection created successfully',
            updatedSection
        })
    
    } catch(e){
        console.log(e)
        return res.status(400).json({
            success:false,
            message: 'Error creating SubSection'
        })
    }
}

exports.updateSubSection = async(req,res)=>{
    try{
        const {sectionId,title,description,subSectionId} = req.body
        const subSection = await SubSection.findById(subSectionId)
        if(!subSection) {
            return res.status(404).json({
                success: false,
                message: 'No Subsection found'
            })
        }
        if (title !== undefined) {
            subSection.title = title
        }
      
        if (description !== undefined) {
        subSection.description = description
        }
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await uploadImageToCloudinary(
              video,
              process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }
        await subSection.save()
        const updatedSection = await Section.findById(sectionId).populate("subSection").exec()
        return res.json({
            success: true,
            message: "Section updated successfully",
            updatedSection

        })


       
    } catch(e){
        console.error(e)
        return res.status(400).json({
            success: false,
            message: 'Error updating subsection'
        })
    }
    

}

exports.deleteSubSection = async(req,res)=>{
    try{
        const {subSectionId,courseId,sectionId} = req.body;
        const subSection = await SubSection.findById(subSectionId)
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
              $pull: {
                subSection: subSectionId,
              },
            }
          )
        if(!subSection){
            return res.status(404).json({
                success: false,
                message: 'Could not find sub section'
            })
        }
        await SubSection.findByIdAndDelete(subSectionId)
        const updatedSection = await Section.findById(sectionId).populate("subSection").exec()
        return res.status(200).json({
            success:true,
            message: 'SubSection deleted successfully',
            updatedSection
            
        })
    } catch(e){
        return res.json({
            success: false,
            message: 'Error deleting subsection'
        })
    }
}