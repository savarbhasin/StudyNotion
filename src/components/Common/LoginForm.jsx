import React, { useState } from 'react'
import { AiOutlineEye , AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { login } from '../service/operations/authapi'
import { useDispatch } from 'react-redux'

const LoginForm = () => {

  const [formData, setFormData] = useState({email:'',password:''})
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {email,password} = formData

  function changeHandler(e){
    setFormData( (prev) => ({
        ...prev,
        [e.target.name] : e.target.value
    })
        
  )}
  function submitHandler(e){
      e.preventDefault()   
      dispatch(login(email,password,navigate))
    }
  return (
    <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-4 mt-6'>
        <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
            <input required type="email" value={formData.email} name='email' onChange={changeHandler} 
                placeholder='Enter email address'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] mt-2'
            />
        </label>
        <label className='w-full relative'>
            <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem]'>Password<sup className='text-pink-200'>*</sup></p>
            <input required autoComplete='on' type={showPassword ? 'text':'password'} value={formData.password} 
            name='password' onChange={changeHandler} placeholder='Enter password'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] mt-2'
            />
            <span className="absolute cursor-pointer right-3 top-[40px]" onClick={()=>setShowPassword( (prev) => (!prev))}>
                {showPassword ? <AiOutlineEye fontSize={24} fill='#AFB2BF'/> : <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>}
            </span>
            <Link to="/forgot-password"><p className='text-blue-100 text-xs mt-1 max-w-max ml-auto'>Forgot Password</p></Link>
        </label>
        <button className='bg-yellow-50 px-[12px] py-[8px] w-full text-black rounded-lg font-semibold mt-6'>
        Sign In</button>
    </form>
  )
}

export default LoginForm;