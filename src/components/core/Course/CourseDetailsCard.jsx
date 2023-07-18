import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addToCart } from '../../../slices/cartSlice'
import { toast } from 'react-hot-toast' 
import { ACCOUNT_TYPE } from '../../utils/constants'
import {AiOutlineShareAlt} from 'react-icons/ai'
import { addCart } from '../../service/operations/cartAPI'
const CourseDetailsCard = ({setOpen,course,handleBuyCourse}) => {
    const {user} = useSelector(s=>s.profile)
    const {token} = useSelector(s=>s.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const handleAddToCart = async()=>{
        if(user){
            await addCart({item:course._id},token)
            dispatch(addToCart(course))
            return; 
        } 
        setOpen(true)
        
    }
    const handleShare = ()=>{
        navigator.clipboard.writeText(window.location.href)
        toast.success("Link copied to clipboard!")
    }
  return (
    <div className='right-[1rem] z-10 top-[60px] text-richblack-5 mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block'>
        <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5'>
            <img src={course.thumbnail} alt="" className='max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full'/>
            <div className='px-4'>
                <div className='space-x-3 pb-4 text-3xl font-semibold'>
                    Rs. {course.price}
                </div>
                <div className='flex flex-col gap-4'>
                    {
                        user?.accountType!=ACCOUNT_TYPE.INSTRUCTOR && !course.studentsEnrolled.includes(user?._id) &&
                        <button onClick={()=>handleBuyCourse()}
                        className='text-center text-lg sm:text-[16px] px-5 py-2 bg-yellow-50 text-black rounded-md font-bold'>Buy Now</button>
                    }
                    {
                        user?.accountType!=ACCOUNT_TYPE.INSTRUCTOR && course.studentsEnrolled.includes(user?._id) &&
                        <button onClick={()=>navigate(`/dashboard/enrolled-courses`)}
                        className='text-center text-lg sm:text-[16px] px-5 py-2 bg-yellow-50 text-black rounded-md font-bold'>Go to Course</button>
                    }
                    {
                        user?.accountType!=ACCOUNT_TYPE.INSTRUCTOR && !course.studentsEnrolled.includes(user?._id) &&
                        <button onClick={handleAddToCart}
                        className='cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900'>Add to Cart</button>
                    }
                </div>
                <div className='w-full text-center'>
                    <p className='pb-3 pt-6 text-center text-sm text-richblack-25'>30-Day Money-Back Guarantee</p>
                </div>
                <div>
                    <p className='my-2 text-xl font-semibold '>This Course Includes:</p>
                    {
                        (JSON.parse(course?.instructions))?.map((instruction,i)=>(
                            <p className='flex flex-col gap-3 text-sm text-caribbeangreen-100' key={i}>{instruction}</p>
                        ))
                    }
                </div>
                <div className='text-center'>
                    <button onClick={handleShare} className='cursor-pointer mx-auto flex items-center gap-2 py-6 text-yellow-100 '><AiOutlineShareAlt/>Share</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseDetailsCard