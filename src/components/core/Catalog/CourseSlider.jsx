import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Pagination,Navigation } from 'swiper'
import CourseCard from './CourseCard'

const CourseSlider = ({courses}) => { 
  
  return (
    <div>
      {
        courses?.length ? 
        <Swiper breakpoints={{
          1023:{slidesPerView:3}
        }} slidesPerView={1} className='max-h-[30rem]' loop={true} spaceBetween={20} navigation={true} pagination={true} modules={[Pagination,Autoplay,Navigation]}
        autoplay={{
          delay:1000,
          disableOnInteraction:false
        }}>
        {
          courses.map((course)=>(
            <SwiperSlide key={course._id}>
                <CourseCard course={course} Height={"h-[250px]"}/>
            </SwiperSlide>
          ))
        }
        </Swiper> : <p className="text-xl text-richblack-5">No courses found</p>
      }
    </div>
  )
}

export default CourseSlider