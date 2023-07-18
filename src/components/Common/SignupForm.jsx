import React, { useState } from 'react'
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai'
import { useNavigate } from 'react-router'
import {toast} from 'react-hot-toast'
import { setSignupData } from '../../slices/authslice'
import { sendOtp } from '../service/operations/authapi'
import { useDispatch } from 'react-redux'

const SignupForm = () => {
    const [formData, setFormData] = useState({firstName:"",lastName:"",email:"",password:"",confirmPassword:""})
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const [accountType,setAccountType] = useState('Student')
    const [showConfirmPassword,setConfirmShowPassword] = useState(false)
    function changeHandler(e){
        setFormData( (prev) => ({
            ...prev,
            [e.target.name] : e.target.value
    })
        )}
    const dispatch  = useDispatch()
    // signup handler
    function submitHandler(e){
      e.preventDefault()
      if(formData.password!==formData.confirmPassword){
        toast.error('Passwords do not match')
        return;
      }
      const signupData = {
        ...formData,
        accountType
      }
      // needs to be done else otp won't work
      console.log(signupData)
      dispatch(setSignupData(signupData)) 
      dispatch(sendOtp(formData.email, navigate))

      // Reset
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        setAccountType("Student")
    }
  return (
    <div>
        <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max shadowdo'>
            <button className={`${accountType === 'Student' ? "bg-richblack-900 text-richblack-5" : 
            "bg-transparent text-richblack-200"}
            py-2 px-5 rounded-full transition-all duration-200`} onClick={()=>setAccountType('Student')}>
                Student
            </button>
            <button className={`${accountType === 'Instructor' ? "bg-richblack-900 text-richblack-5" : 
            "bg-transparent text-richblack-200"}
            py-2 px-5 rounded-full transition-all duration-200`} onClick={()=>setAccountType('Instructor')}>
                Instructor
            </button>
        </div>

        <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-4 mt-6'>
            <div className='flex gap-4'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem]'>First Name<sup className='text-pink-200'>*</sup></p>
                        <input type="text" required onChange={changeHandler} name='firstName' value={formData.firstName} 
                        placeholder='Enter First Name' className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] mt-2'/>
                    </label>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem]'>Last Name<sup className='text-pink-200'>*</sup></p>
                        <input type="text" required onChange={changeHandler} name='lastName' value={formData.lastName} 
                        placeholder='Enter Last Name'  className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] mt-2'/>
                    </label>
            </div>
            <label>
                <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem]'>Email<sup className='text-pink-200'>*</sup></p>
                <input type="email" required onChange={changeHandler} name='email' value={formData.email} placeholder='Enter email address'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] mt-2' />
            </label>
            <div className='flex gap-4'>
                <label className='relative w-full'>
                    <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
                    <input autoComplete='on' type={showPassword ? 'text':'password'} required name='password' value={formData.password}
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] mt-2' placeholder='Enter Password' onChange={changeHandler} />
                    <span className="absolute cursor-pointer right-3 top-[42px]" onClick={()=>setShowPassword( (prev) => (!prev))}>
                        {showPassword ? <AiOutlineEye fontSize={24} fill='#AFB2BF'/> : <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>}
                    </span>
                </label>
                <label className='relative w-full'>
                    <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
                    <input autoComplete='on' type={showConfirmPassword ? 'text':'password'} required name='confirmPassword'
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] mt-2' value={formData.confirmPassword} placeholder='Confirm Password' onChange={changeHandler} />
                    <span className="absolute cursor-pointer right-3 top-[42px]" onClick={()=>setConfirmShowPassword( (prev) => (!prev))}>
                        {showConfirmPassword ? <AiOutlineEye fontSize={24} fill='#AFB2BF'/> : <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>}
                    </span>
                </label>

            </div>
            <button className='bg-yellow-50 px-[12px] py-[8px] w-full text-black rounded-lg font-semibold mt-6'>Create Account</button>   
        </form>
    </div>
  )
}

export default SignupForm