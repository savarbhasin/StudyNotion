import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactStars from "react-rating-stars-component"
// Import Swiper styles
import 'swiper/css';
import { Autoplay,Navigation,FreeMode,Pagination } from 'swiper';
import { useEffect } from 'react';
import { getRating } from '../../service/operations/courseAPI';
import { useState } from 'react';
const RatingAndReview = () => {
  const [reviews,setReviews] = useState([])
  useEffect(()=>{
    const getAllRating = async()=>{
      const res = await getRating()
      setReviews(res.allReviews)
    }
    getAllRating()
  },[])
  return (
    <div className='mb-10'>
      <Swiper
      spaceBetween={24}
      slidesPerView={4}
      autoplay={{
        delay:2000
      }}
      loop={true}
      modules={[Autoplay]}
    >
      { reviews.length>0 &&
        reviews.map((review)=>(
          <SwiperSlide key={review._id}>
            <div className='flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25'>
                <div className='flex items-center gap-4'>
                    <img src={review.user.img} alt="" className='h-9 w-9 rounded-full object-cover'/>
                    <div className='flex flex-col'>
                      <p className='font-semibold text-richblack-5'>{review.user.firstName} {review.user.lastName}</p>
                      <p className='text-[12px] font-medium text-richblack-500'>{review.course.courseName}</p>
                    </div>
                </div>
                <p className='font-medium text-richblack-25'>
                  {review.review}
                </p>
                <div className='flex items-center gap-2 '>
                    <p className='font-semibold text-yellow-100'>{review.rating.toFixed(1)}</p>
                    <ReactStars size={20} count={5} value={review.rating} activeColor={"#ffd700"} edit={false}/>
                </div>
            </div>
          </SwiperSlide>
        ))
      }
    </Swiper> 
    </div>
  )
}

export default RatingAndReview