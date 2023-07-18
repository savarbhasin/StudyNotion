import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../service/operations/profileAPI'
import ProgressBar from '@ramonak/react-progress-bar'
import {useNavigate} from 'react-router-dom'
const EnrolledCourses = () => {
  const {token} = useSelector(state=>state.auth)
  const [enrolledCourses,setEnrolledCourses] = useState([])
  const navigate = useNavigate()
  const getEnrolledCourses = async()=>{
    try{
      const response = await getUserEnrolledCourses(token)
      setEnrolledCourses(response) 
      
    } catch(err){
      console.error(err)
    }
  }
  useEffect(()=>{
    getEnrolledCourses()
    
  },[])
  const totalTimeDuration = (course)=>{
    let totalDuration = 0
    course?.courseContent?.forEach((section)=>section.subSection?.forEach((ss)=>totalDuration+=parseFloat(ss.timeDuration)))
    let seconds = (totalDuration%60).toFixed(2)
    let minutes = Math.floor((totalDuration%3600)/60)
    let hours = Math.floor(seconds/3600)
    let timeStr=''
    if(hours!=0){ 
        timeStr+=`${hours}hours `
    }
    if(minutes!=0){
        timeStr+=`${minutes}minutes `
    }
    timeStr+=`${seconds}seconds`
    return timeStr
}
  return ( 
    <>
        <div className="text-3xl text-richblack-50">Enrolled Courses</div>
        {
          !enrolledCourses ? <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div> : !enrolledCourses.length ? <p className="grid h-[10vh] w-full place-content-center text-richblack-5">Not enrolled in any course</p>
          : <div className="my-8 text-richblack-5">
              <div className="flex rounded-t-lg bg-richblack-500 ">
                <p className="w-[45%] px-5 py-3">Course Name</p>
                <p className="w-1/4 px-2 py-3">Duration</p>
                <p className="flex-1 px-2 py-3">Progress</p>
              </div>
              {
                enrolledCourses.map((course,index,arr)=>(
                  <div key={index} className={`flex items-center border border-richblack-700 ${
                index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`} onClick={()=>navigate(`/view-course/${course._id}/section/${course.courseContent?.[0]._id}/sub-section/${course.courseContent?.[0].subSection?.[0]._id}`)}>
                    {/* left part */}
                    <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"> 
                      <img src={course.thumbnail}  className="h-14 w-14 rounded-lg object-cover"/>
                      <div className="flex max-w-xs flex-col gap-2">
                        <p className="font-semibold">{course.courseName}</p>
                        <p className="text-xs text-richblack-300">{course.courseDescription}</p>
                      </div>
                    </div>
                    {/* duration */}
                    <div className="w-1/4 px-2 py-3">{totalTimeDuration(course)}</div>
                    {/* progress */}
                    <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                      <p>Progress: {course.progressPercentage || 0}%</p>
                       <ProgressBar completed={course.progressPercentage||0} height='8px' isLabelVisible={false}/>
                    </div>
                  </div>
                ))
              }
          </div>
        }
    </>
  )
}

export default EnrolledCourses