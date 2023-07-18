import React from 'react'
import frame from  '../../assets/Images/frame.png'
import SignupForm from '../Common/SignupForm'
import LoginForm from "../Common/LoginForm"
import {FcGoogle} from "react-icons/fc"

const Template = ({title,desc1,desc2,image,formType}) => {

  return (
    <div className='max-w-[1160px] min-h-[92.4vh] w-11/12 mx-auto flex py-12 gap-x-12 gap-y-0 justify-between'>

        <div className='w-11/12 max-w-[450px]'>
        
            <h1 className='text-richblack-5 font-semibold text-[1.875rem]
            leading-[2.375rem]'>{title}</h1>
            <p className='text-[1.125rem] leadin-[1.625rem] mt-4'>
                <span className='text-richblack-100'>
                  {desc1}
                </span>
                <br/>
                <span className='text-blue-100 italic'>
                  {desc2}
                </span>
            </p>
            {formType === 'signup' ? <SignupForm/>:  <LoginForm/>}
          
            <div className='flex w-full items-center my-4 gap-x-2'>
              <div className='w-full h-[1px] bg-richblack-700'></div>
              <p className='text-richblack-700 font-medium leading-[1.375rem]'>OR</p>
              <div className='w-full h-[1px] bg-richblack-700'></div>
            </div>
            <button className='flex items-center w-full justify-center
             border rounded-[8px] border-richblack-700 text-richblack-100 px-[12px] py-[8px] gap-x-2 mt-6'>
              <FcGoogle/>
              <p>Sign {formType === 'signup' ? 'Up':'In'} with Google</p> 
            </button>

        </div>

        <div className='relative w-11/12 max-w-[450px] z-[0]'>
            <img src={image} width={558} height={493} alt='z-10'/>
            <img src={frame} width={558} height={504} loading='lazy' alt='' className='z-[-1] absolute -top-4 -right-4'/>
        </div>
    </div>
  )
}

export default Template