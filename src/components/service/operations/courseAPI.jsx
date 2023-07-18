import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { courseEndpoints, ratingsEndpoints } from "../apis"

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints
const {REVIEWS_DETAILS_API} = ratingsEndpoints
// fetching the available course categories
export const fetchCourseCategories = async () => {
    let result = []
    try {
      const response = await apiConnector("GET", COURSE_CATEGORIES_API)
      
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Course Categories")
      }
      result = response?.data?.allCategories
    } catch (error) {
      console.log("COURSE_CATEGORY_API API ERROR............", error)
      toast.error(error.message)
    }
    return result
  }

export const editCourseDetails = async(data,token)=>{
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }
    toast.success("Course Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.error(error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
export const addCourseDetails = async(data,token)=>{
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: 'Bearer ' + token,
    })

    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
    }
    toast.success("Course Details Added Successfully")
    result = response?.data?.data
  } catch (error) { 
    console.error(error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result 
}

export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: 'Bearer '+token,
    })
    console.log(response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("Course Section Updated")
    
    result = response?.data?.updatedCourse
    console.log(result)
  } catch (error) {
    console.log("UPDATE SECTION API ERROR:", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: 'Bearer '+token,
    })
    
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    result = response?.data?.updatedCourseDetails
  } catch (error) {
    console.log("CREATE SECTION API ERROR : ", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: 'Bearer ' + token,
    })
    
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data?.updatedCourse
  } catch (error) {
    console.log("DELETE SECTION API ERROR : ", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    
    if (!response?.data?.success) {
      throw new Error("Could Not Delete SubSection")
    }
    toast.success("Course SubSection Deleted")
    result = response?.data?.updatedSection
  } catch (error) {
    console.log("DELETE SUBSECTION API ERROR : ", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const createSubSection = async(data,token)=>{
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: 'Bearer ' + token,
    })
    
    if (!response?.data?.success) {
      throw new Error("Could Not Create SubSection")
    }
    toast.success("Course SubSection Created")
    result = response?.data?.updatedSection
  } catch (error) {
    console.log("CREATE SUBSECTION API ERROR : ", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const updateSubSection = async(data,token)=>{
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: 'Bearer ' + token,
    })
    
    if (!response?.data?.success) {
      throw new Error("Could Not update SubSection")
    }
    toast.success("Course SubSection Updated")
    result = response?.data?.updatedSection
  } catch (error) {
    console.log("UPDATE SUBSECTION API ERROR : ", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const fetchInstructorCourses = async(token)=>{
  let result;
  const toastId = toast.loading("Loading...")
  try{
      const res = await apiConnector("GET",GET_ALL_INSTRUCTOR_COURSES_API,null,{
        Authorization:'Bearer ' +token
      })
      if(!res.data.success){
        throw new Error("Could not retrieve instructor courses")
      }
      console.log(res)
      result = res?.data?.instructorCourses

      
  } catch(e){
      toast.error("Error while retrieving instructor courses")
  }
  toast.dismiss(toastId)
  return result;
}

export const deleteCourse = async(data,token)=>{
  const toastId = toast.loading("Loading..")
  try{
    const result = await apiConnector("POST",DELETE_COURSE_API,data,{
      Authorization: "Bearer " + token,
    })
    if(!result.data.success){
      throw new Error("Error while deleting course")
    }
    toast.success("Course deleted successfully!")
  } catch(e){
    console.log("Error while deleting",e)
    toast.error(e.message)
  }
  toast.dismiss(toastId)
}


export const getFullCourseDetails = async(courseId,token)=>{
  const toastId = toast.loading("Loading...")
  let result;
  try{
    const response = await apiConnector("POST",GET_FULL_COURSE_DETAILS_AUTHENTICATED,{courseId:courseId},{
      Authorization: "Bearer " + token
    })
    console.log(response)
    if(!response.data.success){
      throw new Error(response.data.message)
    }
    result = response?.data?.courseDetails

  } catch(e){
    console.log("Error while fetching",e)
    toast.error(e.message)
  }
  toast.dismiss(toastId)
  return result;
  
}


export const fetchCourseDetails = async(courseId)=>{
  const toastId = toast.loading("Loading...")
  let result;
  try{
    const response = await apiConnector("POST",COURSE_DETAILS_API,{
      courseId
    })
    if(!response.data.success){
      throw new Error(response.data.message)
    }
    result = response.data.courseDetails
  } catch(e){
    toast.error(e.message)
  }
  toast.dismiss(toastId)
  return result
}


export async function markAsCompleted(data,token){
    const toastId = toast.loading("Marking..")
    try{
      const res = await apiConnector("POST",LECTURE_COMPLETION_API,data,{
        Authorization:'Bearer '+token, 
      })
      if(!res.data.success){
        throw new Error(res.data.message)
      }
      toast.success("Marked as completed!")
    } catch(e){
      console.error(e)
      toast.error(e.message)
    }
    toast.dismiss(toastId)
}

export async function createRating(data,token){
  const toastId = toast.loading("Marking..")
  try{
    const res = await apiConnector("POST",CREATE_RATING_API,data,{
      Authorization:'Bearer '+token, 
    })
    if(!res.data.success){
      throw new Error(res.data.message)
    }
    toast.success("Review published!")
  } catch(e){
    toast.error(e.message)
  }
  toast.dismiss(toastId)
}

export async function getRating(){
  try{
    const res = await apiConnector("GET",REVIEWS_DETAILS_API)
    if(!res.data.success){
      throw new Error(res.data.message)
    }
    return res.data
  } catch(e){
    console.log(e)
  }
}