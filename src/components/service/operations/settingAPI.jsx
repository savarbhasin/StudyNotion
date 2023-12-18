import { settingsEndpoints } from "../apis";
import { logout } from "./authapi"
import { apiConnector } from "../apiconnector"
import { toast } from "react-hot-toast";
import { setUser } from "../../../slices/ProfileSlice";

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,} = settingsEndpoints 


export function updateDisplayPicture(token,formData){
    return async(dispatch)=>{
        const toastId= toast.loading('Loading...')
        
        try{
            console.log(token)
            const response = await apiConnector("PUT",UPDATE_DISPLAY_PICTURE_API,formData,
            {
                Authorization:'Bearer ' + token,
            }
            )
            // console.log(response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Display Picture Updated Successfully")
            console.log(response.data.data)
            dispatch(setUser(response.data.data))
              
        } catch(e){
            toast.error("Could Not Update Display Picture")
            console.error(e)
        }
        toast.dismiss(toastId)
    }
}

 
export function updateProfile(token,data){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading..")
        try{
            const response = await apiConnector("PUT",UPDATE_PROFILE_API,
            data,
            {
                "Content-Type": "multipart/form-data",
                Authorization:'Bearer ' + token
            }
            )
            
            if (!response.data.success) {
                throw new Error(response.data.message)
              }
            const userImage = response.data.userDetails.img
            ?? `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
            console.log(response.data.userDetails)
            dispatch(
                setUser({ ...response.data.userDetails, img: userImage })
            )
            
            toast.success("Profile Updated Successfully")
        } catch(e){
            toast.error(e.message)
        }
        toast.dismiss(toastId);
    }
}

export function deleteProfile(token,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Deleting account...")
        try{
            
            const result = await apiConnector("DELETE",DELETE_PROFILE_API,null,
            {
                "Content-Type": "multipart/form-data",
                Authorization:'Bearer ' + token,
            }
            )
            
            if(!result.data.success) {
                throw new Error(result.data.message)
            }
            toast.success("Account deleted successfully!")
            dispatch(logout(navigate))
        } catch(e){
            toast.error(e)
        }
        toast.dismiss(toastId)
    }
}

export async function changeNewPass(data,token){
    const toastId = toast.loading("Changing password...")
    try{
        const res = await apiConnector("POST",CHANGE_PASSWORD_API,data,{
            Authorization: 'Bearer '+token,
        })
        if(!res.data.success){
            throw new Error(res.data.message)
        }
        toast.success("Password changed successfully!")
    } catch(e){
        toast.error(e.response.data.message)
        console.error(e)
    }
    toast.dismiss(toastId)
}
