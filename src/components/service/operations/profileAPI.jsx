import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../apis"
import { setUser } from "../../../slices/ProfileSlice"
import { logout } from "./authapi"

const {GET_USER_ENROLLED_COURSES_API,GET_INSTRUCTOR_DASHBOARD_DATA_API,GET_USER_DETAILS_API} = profileEndpoints

export function getUserDetails(token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      
      try {
        const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
          Authorization: `Bearer ${token}`,
        })
        
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        const userImage = response.data.data.image
          ? response.data.data.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
        dispatch(setUser({ ...response.data.data, image: userImage }))
      } catch (error) {
        dispatch(logout(navigate))
        toast.error("Could Not Get User Details")
      }
      toast.dismiss(toastId)
     
    }
}

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
