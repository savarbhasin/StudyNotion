import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../apis"

const {GET_USER_ENROLLED_COURSES_API,GET_INSTRUCTOR_DASHBOARD_DATA_API} = profileEndpoints


export async function getUserEnrolledCourses(token){
    let result = []
    
    const toastId = toast.loading('Loading courses..')
    try{
        const res = await apiConnector('GET',GET_USER_ENROLLED_COURSES_API,null,
        {
          Authorization: 'Bearer ' + token,
        })
        if(!res.data.success){
            console.log(res.data.message)
        }
        result = res.data.data   
        
    } catch(e){ 
        console.log(e.message)
    }
    toast.dismiss(toastId)
    return result  
}

export async function getInstructorCourseData(token){
    let result=[]
    const toastId = toast.loading("Loading...")
    try{
        const res = await apiConnector("GET",GET_INSTRUCTOR_DASHBOARD_DATA_API,null,{
            Authorization:'Bearer '+token,
        })
        if(!res.data.success){
            throw new Error(res.data.message)
        }
        result = res?.data?.courses
        console.log(result)
    } catch(e){
        console.log(e)
    }
    toast.dismiss(toastId)
    return result
}