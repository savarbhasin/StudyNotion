import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CTAButton from '../HomePage/CTAButton'
import {AiOutlineEdit} from 'react-icons/ai'
const MyProfile = () => {
    const {user} = useSelector(state=>state.profile)
    useEffect(()=>{
        console.log(user)
    },[])
    const navigate = useNavigate()
  return (
    <div>
        <h1 className='mb-14 text-3xl font-medium text-richblack-5'>My Profile</h1>
        
        {/* section1 */}
        <div className='flex items-center rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
            <div className='flex items-center gap-20 justify-between w-full'>
                <div className='flex items-center gap-3 '>
                    <img src={user.img} alt="profile" className='aspect-square rounded-full w-[78px] object-cover'/>
                    <div>
                        <p className='text-lg font-semibold text-richblack-5'>{user.firstName} {user.lastName}</p>
                        <p className='text-richblack-300'>{user.email}</p>
                    </div>
                </div>
                <CTAButton active={true} linkto={'/dashboard/settings'} >Edit<AiOutlineEdit/></CTAButton>
            </div>
        </div>
        {/* section2 */}
        <div className='my-10 flex flex-col w-full items-start gap-[3rem] justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
            <div className='flex w-full justify-between items-center'>
                <p  className='text-lg font-semibold text-richblack-5'>About</p>
                <CTAButton active={true} linkto={'/dashboard/settings'}>Edit<AiOutlineEdit/></CTAButton>
            </div>
            
            <p className='text-richblack-300'>{user?.additionalDetails?.about ? user.additionalDetails.about : "Write something about yourself"}</p>
        </div>
        {/* section 3 */}
        <div className='my-10 flex flex-col w-full items-start gap-[3rem] justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
            <div className='flex w-full justify-between items-center'>
                <p className='text-lg font-semibold text-richblack-5'>Personal Details</p>
                <CTAButton active={true} linkto={'/dashboard/settings'}>Edit<AiOutlineEdit/></CTAButton>
            </div>
            <div className='grid grid-cols-2 gap-10'>
                <div>
                    <p className='mb-2 text-sm text-richblack-600'>First Name</p>
                    <p className='text-sm font-medium text-richblack-5'>{user.firstName}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-richblack-600'>Last Name</p>
                    <p className='text-sm font-medium text-richblack-5'>{user.lastName}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-richblack-600'>Email</p>
                    <p className='text-sm font-medium text-richblack-5'>{user.email}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-richblack-600'>Gender</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.gender ??"Add gender"}</p>
                </div>
                
                <div>
                    <p className='mb-2 text-sm text-richblack-600'>Phone Number</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.contactNumber ?? "Add contact number"}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-richblack-600'>Date of Birth</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.dateOfBirth ?? "Add date of birth"}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyProfile