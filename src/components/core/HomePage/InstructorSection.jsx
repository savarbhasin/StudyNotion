import React from 'react'
import HighlightText from './HighlightText'
import Instructor from '../../../assets/Images/Instructor.png'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
const InstructorSection = () => {
  return (
    <div className='flex gap-10 items-center mt-20'>
        <div className='w-[50%]'>
            <img src={Instructor} className='shadow-white shadow-[-20px_-20px_0_0]'/>
        </div>
        <div className='flex flex-col gap-10 items-start w-[45%]'>
            <p className='text-4xl font-semibold'>Become an <br/> <HighlightText text={'instructor'}/></p>
            <p className='text-[16px] font-[500] leading-[24px] text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love</p>
            <CTAButton active={true} linkto={'/signup'}><div className='flex gap-2 items-center'>Start Teaching Today <FaArrowRight/></div></CTAButton>
        </div>
    </div>
  )
}

export default InstructorSection