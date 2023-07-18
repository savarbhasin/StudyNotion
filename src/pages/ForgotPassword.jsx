import React from 'react'
import CTAButton from '../components/core/HomePage/CTAButton'
import {FaArrowLeft} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getResetPasswordToken } from '../components/service/operations/authapi'

const ForgotPassword = () => {
    const [emailSent,setEmailSent] = useState(false)
    const [email,setEmail] = useState('')
    const dispatch = useDispatch()
    const {loading} = useSelector((state)=>state.auth)

    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(getResetPasswordToken(email,setEmailSent))
    }
    
  return (
    <div>
        {
        loading ? (<div className='flex flex-col justify-center items-center min-h-[93vh] gap-5 text-richblack-5 text-6xl'>Loading...</div>): 
        <div className='flex flex-col justify-center items-center min-h-[93vh] gap-5 text-richblack-5'>
            <h2 className='text-[30px] font-[600]'>
            {
                emailSent ? "Check your email" : "Reset your password"
            }
            </h2>
            <p className='font-[400] text-[18px] text-center text-richblack-100 max-w-[444px]'>
            {
                emailSent ? `We have sent the reset email to ${email} `:`Have no fear. We'll email you instructions to reset  
                                                                                your password. If you dont have access to your 
                                                                                email we can try account recovery`
            }
            </p>
            <form onSubmit={handleOnSubmit} className='flex flex-col gap-5'>
            {
                emailSent ? "" : 
                <label>
                    <p className='text-[14px]'>Email Address<span>*</span></p>
                    <input required type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}
                        placeholder='Enter your email address'
                        className='p-[12px] w-[444px] h-[48px] bg-richblack-800 outline-none rounded-[8px]'
                    />
                </label>
            }
            
            <button type='submit' className='bg-yellow-200 select-none min-w-[300px] text-black rounded-lg p-2 text-[16px] font-semibold'>
            {
                emailSent ? <div>Resend Email</div> : 
                <div>Reset Password</div>
            }
            </button>
            </form>

            
            <div>
                <Link to={'/login'}>
                    <p className=''>Back to login</p>
                </Link>
            </div>
            
        </div>
        
    }
    
    </div>
    
  )
}

export default ForgotPassword