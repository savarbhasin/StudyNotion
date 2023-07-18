import { toast } from 'react-hot-toast'
import {setLoading, setToken } from '../../../slices/authslice'
import {setUser} from '../../../slices/ProfileSlice'
import { apiConnector } from '../apiconnector'
import { endpoints } from '../apis'
import { resetCart, setCart } from '../../../slices/cartSlice'
const {RESETPASSTOKEN_API,SIGNUP_API,LOGIN_API,SENDOTP_API,RESETPASSWORD_API} = endpoints


export function getResetPasswordToken(email,setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true))
        const toastId = await toast.loading("Sending Mail..")
        try{
            const response = await apiConnector("POST",RESETPASSTOKEN_API,{email})
            console.log(response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success('Reset Email Sent!')
            setEmailSent(true)
        } catch(e){
            console.log(e)
            toast.error('Error sending email')
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function login(email,password,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Signing in...")
        dispatch(setLoading(true))
        try{
            
            const response = await apiConnector("POST",LOGIN_API,{email,password})
            
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            
            dispatch(setToken(response.data.token))
            dispatch(setUser(response.data.user))
            dispatch(setCart(response.data.cart))
            // if next time user visits this site
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            
            navigate("/")
            toast.success('Logged in!')
        } catch(e){
            console.log(e)
            toast.error('Login failed!')
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function resetPassword(password,confirmPassword,token,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try{
            const result = await apiConnector("POST",RESETPASSWORD_API,{password,confirmPassword,token});
            if(!result.data.success){
                throw new Error(result.data.message)
            }
            toast.success("Password reset successfully!")
            navigate('/login')
        } catch(e){
            console.log("error while resetting password",e)
            toast.error("Error while resetting password")
        } 
        dispatch(setLoading(false))
    }
}

export function signup(accountType,firstName,lastName,email,password,otp,confirmPassword,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true))
        const toastId = toast.loading('Signing up...')
        try{
            const result = await apiConnector("POST",SIGNUP_API,{email,accountType,firstName,lastName,password,confirmPassword,otp})
            console.log(result.data.success)
            if(!result.data.success){
                throw new Error(result.data.message)   
            }
            toast.success('Signed up successfully!')
            navigate('/login')
        } catch(e){
            console.log(e)
            toast.error("Error while signing up")
            navigate('/signup')
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
} 

export function sendOtp(email,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true))
        const toastId = toast.loading('Sending OTP...')
        try{
            const response = await apiConnector("POST",SENDOTP_API,{email,checkUserPresent:true})
            if (!response.data.success) {
                toast.error(response.data.message)
                // throw new Error(response.data.message)
            }
            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        } catch(e){
            console.log("SENDOTP API ERROR : ", e)
            
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout(navigate){
    return (dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        toast.success('Logged out!')
        navigate('/')
    }
}