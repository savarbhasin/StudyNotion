import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import {AiFillDelete} from 'react-icons/ai'
import { removeFromCart } from '../../../../slices/cartSlice';
import { useState } from 'react';
import getAvgRating from '../../../utils/avgRating'; 
import { removeCart } from '../../../service/operations/cartAPI';
const RenderCartCourses = () => {
    const {token} = useSelector(s=>s.auth)
    const {cart} = useSelector(state=>state.cart)
    const [avgRatingCount,setAvgRatingCount] = useState(0)
    const dispatch = useDispatch()
    const handleRemove = async(course)=>{
        await removeCart({item:course._id},token)
        dispatch(removeFromCart(course))
    }
  return (
    <div className="flex flex-1 flex-col">
        {
            cart.map((course,index)=>(
                <div key={index} className={`flex w-full flex-wrap items-start justify-between gap-6 ${
            index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
          } ${index !== 0 && "mt-6"}`}>
                    <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                        <img src={course.thumbnail} className="h-[148px] w-[220px] rounded-lg object-cover"/>
                        <div className="flex flex-col space-y-1">
                            <p className="text-lg font-medium text-richblack-5">{course.courseName}</p>
                            <p className="text-sm text-richblack-300">{course.category.name}</p>
                            <div className="flex items-center gap-2">
                                <ReactStars value={getAvgRating(course.ratingAndReviews)} count={5} size={20} edit={false} activeColor={'#ffd700'}/>
                                <span className="text-richblack-400">{course.ratingAndReviews.length} Reviews</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                        <button onClick={()=>handleRemove(course)} className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200">
                            <AiFillDelete/>
                            <span>Remove</span>
                        </button>
                        <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {course.price}</p>
                    </div>
                    
                </div>
            ))
        }
    </div>
  )
}

export default RenderCartCourses