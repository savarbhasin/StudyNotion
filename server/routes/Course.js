// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  showAllCourses,
  getCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
  getFullCourseDetails,
} = require("../controllers/Course")

const {updateCourseProgress} = require('../controllers/CourseProgress')
// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category")

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection")

// Rating Controllers Import
const {
  createReview,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview")
const {addToCart,removeFromCart,resetCart} = require('../controllers/Cart')
// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", showAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
//delete course
router.post("/deleteCourse",deleteCourse)
// edit course
router.post('/editCourse',auth,isInstructor,editCourse)
// get instructor courses
router.get('/getInstructorCourses',auth,isInstructor,getInstructorCourses)
// full course details
router.post('/getFullCourseDetails',auth,getFullCourseDetails)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createReview)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

//*********************************************************************************************************
//                                      Course Progress
//*********************************************************************************************************
router.post('/updateCourseProgress',auth,isStudent,updateCourseProgress)

router.post('/addToCart',auth,isStudent,addToCart)
router.post('/removeFromCart',auth,isStudent,removeFromCart)
router.post('/resetCart',auth,isStudent,resetCart)

module.exports = router;