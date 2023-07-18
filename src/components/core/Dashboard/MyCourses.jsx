import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../service/operations/courseAPI'
import CTAButton from '../HomePage/CTAButton'
import CoursesTable from './InstructorCourses/CoursesTable'
import { useEffect } from 'react'

const MyCourses = () => {
    const {token} = useSelector(state=>state.auth)
    const navigate = useNavigate()
    const [courses,setCourses] = useState([])
    const fetchCourses=async()=>{
      const result = await fetchInstructorCourses(token)
      if(result){
        setCourses(result)
      }
    }
    useEffect(()=>{
      fetchCourses()    
    },[])
  return (
    <div>
        <div className='flex justify-between items-center mb-10'>
          <h1 className='text-3xl font-medium text-richblack-5'>My Courses</h1>
          <CTAButton active={true} linkto={'/dashboard/add-course'}>Add Course +</CTAButton>
        </div>
        {
          courses &&
          <CoursesTable courses={courses} setCourses={setCourses}/>
        }
    </div>
  )
}

export default MyCourses