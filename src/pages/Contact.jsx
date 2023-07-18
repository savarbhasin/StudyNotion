import React from 'react'
import {IoMdChatboxes} from 'react-icons/io'
import {BiWorld} from 'react-icons/bi'
import ContactUs from '../components/Common/ContactUs'
import RatingAndReview from '../components/core/HomePage/RatingAndReview'
import HighlightText from '../components/core/HomePage/HighlightText'
import Footer from '../components/Common/Footer'
const Contact = () => {
  return (
    <>
    <div className='w-11/12 max-w-maxContent mx-auto flex flex-row items-start gap-20 pt-[4rem]'>
        <div className='flex flex-col items-start gap-6 rounded-xl w-[40%] bg-richblack-800 p-4 lg:p-6'>
            <div className='flex flex-col gap-[2px] p-3 text-sm text-richblack-200'>
                <p className='text-lg font-semibold text-richblack-5'><IoMdChatboxes/> Chat with us</p>
                <p className='font-medium'>Our friendly team is here to help. <br/> <span className='font-semibold'>info@studynotion.com</span> </p>
            </div>
            <div className='flex flex-col gap-[2px] p-3 text-sm text-richblack-200'>
                <p className='text-lg font-semibold text-richblack-5'><BiWorld/> Visit us</p>
                <p className='font-medium'>Come and say hello at our office HQ</p>
                <p className='font-semibold'>XYZ Delhi,India</p>
            </div>
            <div className='flex flex-col gap-[2px] p-3 text-sm text-richblack-200'>
                <p className='text-lg font-semibold text-richblack-5'> Call us</p>
                <p className='font-medium'>Mon-Fri from 8am to 5pm</p>
                <p className='font-semibold'>+12312 14241</p>
            </div>
        </div>
        <div className='p-5 border border-richblack-600 rounded-xl pb-2'>
            <ContactUs/>
        </div>
        
    </div>
    <div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center gap-10 pt-[4rem]'>
        <h2 className='text-white text-center text-4xl font-semibold my-10'>Review from <HighlightText text={' other learners'}/></h2>
        <RatingAndReview/>
    </div>
    <Footer/>
    </>

  )
}

export default Contact