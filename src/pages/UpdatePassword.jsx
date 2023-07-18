import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { resetPassword } from '../components/service/operations/authapi'
const UpdatePassword = () => {

  const [formData,setFormData] = useState({
    password:"",
    confirmPassword:"",
  })
  
    const location = useLocation()
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const {loading} = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {password,confirmPassword} = formData;

    const handleOnChange = (e)=>{
      setFormData((prev)=>(
        {
        ...prev,
        [e.target.name] : e.target.value
      }
      ))
    }

    const submitHandler = (e)=>{
      e.preventDefault();
      const token = location.pathname.split('/')[2]
      console.log(token)
      dispatch(resetPassword(password,confirmPassword,token,navigate))
    }

  return (
    <div>
        {
            loading ? <div className='flex flex-col justify-center items-center min-h-[93vh] gap-5 text-richblack-5 text-6xl'>Loading...</div> : 
            <div className='flex flex-col justify-center items-center min-h-[93vh] gap-5 text-richblack-5'> 
              <h1 className='font-[600] text-[30px]'>Choose new Password</h1>
              <p className='text-[18px] max-w-[444px] text-richblack-100'>Almost done. Enter your new password and you're all set</p>

              <form onSubmit={submitHandler} className='flex flex-col gap-3'>
                <label>
                  <p className='text-[14px]'>New Password<span className='text-pink-200'>*</span></p>
                  <input autoComplete='on' name="password"
                  className='placeholder:select-none outline-none relative bg-richblack-800 rounded-[8px] p-[12px] w-[444px] h-[48px]' 
                  required value={password} onChange={handleOnChange} type={`${showPassword ? 'text':'password'}`} 
                  placeholder='Enter Password'/>
                  <span onClick={()=>setShowPassword(!showPassword)} className='absolute translate-y-3 -translate-x-8 text-2xl'>
                    {
                      !showPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>
                    }
                  </span>
                </label>
                <label>
                  <p className='text-[14px] select-none'>Confirm New Password<span className='text-pink-200'>*</span></p>
                  <input autoComplete='on' name="confirmPassword"
                  className='placeholder:select-none outline-none relative bg-richblack-800 rounded-[8px] p-[12px] w-[444px] h-[48px]' 
                  required value={confirmPassword} onChange={handleOnChange} type={`${showConfirmPassword ? 'text':'password'}`} 
                  placeholder='Confirm Password'/>
                  <span onClick={()=>setShowConfirmPassword(!showConfirmPassword)} className='absolute translate-y-3 -translate-x-8 text-2xl'>
                    {
                      !showConfirmPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>
                    }
                  </span>
                </label>
                    <button type='submit' className='bg-yellow-200 select-none text-black rounded-lg p-2 text-[16px] font-semibold'>Reset Password</button>
              </form>
              <div>
                <Link to={'/login'}>
                  <p>Back to login</p>
                </Link>
              </div>
            </div>
        }
    </div>
  )
}

export default UpdatePassword