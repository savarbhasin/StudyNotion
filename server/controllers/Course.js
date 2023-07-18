const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const RatingAndReview = require('../models/RatingAndReview')
exports.createCourse = async(req,res)=>{
    try{
        const {courseName,courseDescription,whatYouWillLearn,price,category,tag,status,instructions} = req.body;
        const thumbnail = req.files.thumbnailImage;
        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !tag){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        
        if(!instructorDetails){
            return res.json(404).json({
                success: false,
                message: 'No instructor found' 
            })
        }

        // check Category
        const categoryDetails = await Category.findById(category);

        if(!categoryDetails){
            return res.json(404).json({
                success: false,
                message: 'No Category found'
            })
        }
        
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME)

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            whatYouWillLearn,
            instructor : instructorDetails._id,
            price,
            tag,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            status,
            instructions
        })

        // add this course to instructor schema 
        await User.findByIdAndUpdate({_id:instructorDetails._id},{$push:{
            courses : newCourse._id
        }})
        // update Category schema
        await Category.findByIdAndUpdate({_id:categoryDetails._id},{$push:{
                course: newCourse._id
        }})

        // return res
        return res.status(200).json({
            success: true,
            message: 'Course created successfully',
            data:newCourse
        })


    } catch(e){
        return res.status(500).json({
            success: false,
            message: 'Error while creating course : ' + e.message
        })
    }
}

exports.showAllCourses = async(req,res)=>{
    try{
        const allCourses = await Course.find({},{courseName:true,courseDetails:true,price:true,instructor:true,
                                                thumbnail:true,studentsEnrolled:true,ratingAndReviews:true})
                                                .populate("instructor").exec();
        return res.status(200).json({
            success:true,
            message: "All courses fetched successfully",
            data:allCourses
        })
    } catch(e){
        return res.status(500).json({
            success: false,
            message: 'Error while fetching all courses'
        })
    }
}


exports.getCourseDetails = async(req,res)=>{
    try{
        const {courseId} = req.body;
        const courseDetails = await Course.findById(courseId)
        .populate({
            path:"instructor",
            populate:{path:"additionalDetails"}  
        })
        .populate("category").populate("ratingAndReviews")
        .populate({
            path:"courseContent",
            populate:{
                path: "subSection"
            }
        })
        .exec()

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message: 'Could not find course details with course id'
            })
        }
        return res.status(200).json({
            success:true,
            message: 'Successfully fetched course details',
            courseDetails

        })
    } catch(e){
        return res.status(500).json({
            success: false,
            message: 'Error while fetching course data'
        })
    }
}

exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else if(key!=="courseId") {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }


exports.getInstructorCourses = async(req,res)=>{
    try{
        const {id} = req.user

        const instructorCourses = await Course.find({instructor:id}).sort({createdAt: -1}).populate({
          path:"courseContent",
          populate:{
            path:"subSection"
          }
        }).exec()
       
        return res.status(200).json({
            success:true,
            message:'Fetched all instructor courses',
            instructorCourses
        })
    } catch(error){
        console.error(error)
        return res.status(400).json({
            success: false,
            message:'Could not get instructor courses'
        })
    }
}

exports.deleteCourse = async(req,res)=>{
  try{
    const {courseId} = req.body
    
    const course = await Course.findById(courseId)
    if(!course){
      return res.status(404).json({message: 'Course not found'})
    }
    // unenroll user
    const studentsEnrolled = course.studentsEnrolled
    for(const studentId of studentsEnrolled){
      await User.findByIdAndUpdate(studentId,{$pull:{course:courseId}})
    }
    // delete rating and reviews
    const ratings = course.ratingAndReviews
    for(const id of ratings){
      await RatingAndReview.findByIdAndDelete(id)
    }
    // delete sections subsections
    const sections = course.courseContent
    for(const sectionId of sections){
      const section = await Section.findById(sectionId)
      if(section){
        const subSections = section.subSection
        for(const subSectionId of subSections){
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }
      // delete section
      await Section.findByIdAndDelete(sectionId)
    }
    await Course.findByIdAndDelete(courseId)
    return res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    })
  } catch(error){
    console.error(error)
    return res.status(400).json({
      success: false,
      message:'Could not delete course'
    })
  }
}


exports.getFullCourseDetails = async(req,res)=>{
  try{
    const { courseId } = req.body;
    
    const course = await Course.findById(courseId).populate({
      path:"courseContent",
      populate:{
        path:"subSection"
      }
    }).populate("studentsEnrolled").populate("category").populate("instructor").exec()
    return res.status(200).json({
      success: true,
      message:'Course fetched',
      courseDetails:course
    })
  } catch(error){
    console.log(error)
    return res.status(400).json({
      success: false,
      message:'Could not get details'
    })
  }
}