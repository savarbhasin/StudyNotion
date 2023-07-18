import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signup } from '../components/service/operations/authapi';

const OTP = () => {
    const navigate = useNavigate()
    const {loading} = useSelector(state=>state.auth)
    const {signupData} = useSelector(state=>state.auth)
    const {token} = useSelector(state=>state.auth)
    const {accountType,firstName,lastName,email,password,confirmPassword} = signupData
    const dispatch = useDispatch()
    const [otp, setOtp] = useState('');
    function submitHandler(e){
        e.preventDefault()
        dispatch(signup(accountType,firstName,lastName,email,password,otp,confirmPassword,navigate))
    }
    
  return (
    <div>
        { loading ? <div className='flex flex-col justify-center items-center min-h-[93vh] gap-5 text-richblack-5 text-6xl'>Loading..</div> : 
        <div className='flex flex-col justify-center items-center min-h-[93vh] gap-5 text-richblack-5'>
            <h2 className='text-[30px] font-[600]'>Verify Email</h2>
            <p className='font-[400] text-[18px] text-center text-richblack-100 max-w-[444px]'>A verification code has been sent to you. Enter the code below</p>
            <form onSubmit={submitHandler} className='flex flex-col justify-center'>
                <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={({ style, ...restProps }) => (
                <input
                {...restProps}
                className='w-[48px] lg:w-[60px] border-0 mx-4 bg-richblack-800 mb-8 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50'
                />
                 )}
                placeholder={'------'}
                />  
                <button type='submit' className='bg-yellow-200 select-none  text-black rounded-lg p-2 text-[16px] font-semibold'>Verify Email</button>
            </form>
            <div className='flex gap-20'>
                <div>
                    <Link to={'/login'}>
                        Back to login
                    </Link>
                </div>
                <div>
                    <button onClick={()=>dispatch(sendOtp(signupData.email))}>
                        Resend it
                    </button>
                </div>
            </div>
        </div>
        }
    </div>
  )
}

export default OTP