import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams,Outlet } from 'react-router-dom'
import { getFullCourseDetails } from '../components/service/operations/courseAPI'
import { setCourseEntireData, setCourseSectionData, setTotalNoOfLectures } from '../slices/viewCourseSlice'
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar'

const ViewCourse = () => {
    const {courseId} = useParams()
    const {token} = useSelector(s=>s.auth)
    const dispatch = useDispatch()
    useEffect(()=>{
        const setCourseSpecificDetails = async()=>{
            const courseData = await getFullCourseDetails(courseId,token)
            dispatch(setCourseSectionData(courseData?.courseContent))
            dispatch(setCourseEntireData(courseData))
            let lectures = 0;
            courseData.courseContent.forEach((section)=>{
                lectures+=section.subSection.length;
            })
            dispatch(setTotalNoOfLectures(lectures))
        }
        setCourseSpecificDetails()
    },[])
  return (
    <div>
        <div className='flex min-h-[calc(100vh-3.5rem)]'>
            <VideoDetailsSidebar/>
            <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
                <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                    <Outlet/>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default ViewCourse