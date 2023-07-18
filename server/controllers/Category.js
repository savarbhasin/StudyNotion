const Category = require('../models/Category')
const mongoose = require('mongoose')
exports.createCategory = async(req,res)=>{
    try{
        const {name,description} = req.body

        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        const CategoryDetails = await Category.create({name, description})

        return res.status(200).json({
            success: true,
            message: 'Category created successfully'
        })
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
}

exports.showAllCategories = async(req,res)=>{
    try{
        const allCategories = await Category.find({})
        res.status(200).json({
            success: true,
            message: "All Categories fetched",
            allCategories
        })
    } catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        }) 
    }
}

exports.categoryPageDetails = async(req,res)=>{
    try{
        const {categoryId} = req.body;
        
        const selectedCategory = await Category.findById(categoryId).populate({
            path:"course",
            populate:{
                path:"instructor",
            },
            populate: {
                path: "ratingAndReviews",
              },
            match:{status:"Published"}
        }).exec();
        
        
        // if no category found
        if(!selectedCategory){
            return res.status(404).json({
                success: false,
                message: 'Data not found'
            })
        }


        // Handle the case when there are no courses
		if (selectedCategory.course.length === 0) {
			console.log("No courses found for the selected category.");
			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			});
		}
        
        const getRandomInt = (length)=>{
           return Math.floor(Math.random()*length)
        }
        
        // not this category for diff
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
          })
          let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
              ._id
          )
            .populate({
              path: "course",
              populate:{
                path:"instructor"
              },
              populate:{
                path:"ratingAndReviews"
              },
              match: { status: "Published" },
            })
            .exec()


        // top selling courses
        const allCategories = await Category.find({}).populate({
            path:"course",
            populate:{
                path:"instructor",
            },
            populate:{
                path:"ratingAndReviews"
            },
            match:{status:"Published"}
        }).exec()
        const allCourses = allCategories.flatMap(category=>category.course)
        const mostSellingCourses = allCourses.sort((a,b)=>b.studentsEnrolled-a.studentsEnrolled).slice(0,10)
        // limit to 10
        
        
        return res.status(200).json({
            success: true,
            data:{
                selectedCourses:selectedCategory.course,
                mostSellingCourses,
                differentCategories:differentCategory,
                selectedCategory
            }
        })
    } catch(e){
        console.log(e)
        return res.status(200).json({
            success: false,
            message:'error while getting data'
        })
    }
}