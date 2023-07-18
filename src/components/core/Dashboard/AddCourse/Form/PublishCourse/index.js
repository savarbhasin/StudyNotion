import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, setStep } from '../../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { useEffect } from 'react'
import { editCourseDetails } from '../../../../../service/operations/courseAPI'
import { useNavigate } from 'react-router-dom'

const PublishCourse = () => {
    const {register,setValue,handleSubmit,getValues,formState:errors} = useForm()
    const {course} = useSelector(s=>s.course)
    const {token} = useSelector(s=>s.auth)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public",true)
        }
    },[])
    const goToCourses = ()=>{
        dispatch(resetCourseState());
        navigate('/dashboard/my-courses')
    }
    const handleCoursePublish = async()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true || 
        course.status === COURSE_STATUS.DRAFT && getValues("public") === false){
            // no updation
            // no api call
            goToCourses()
        }

        const formData = new FormData()
        formData.append("courseId",course._id)
        const status = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
        formData.append("status",status)
        setLoading(true)
        const result = await editCourseDetails(formData,token)
        if(result){
            goToCourses()
        }
        setLoading(false)
    }
    
    const goBack = ()=>{
        dispatch(setStep(2))
    }
  return (
    <div className='rounded-md border-[1px] bg-richblack-800 p-6  border-richblack-700'>
        <p className='text-2xl font-semibold text-richblack-5'>Publish Course</p>
        <form onSubmit={handleSubmit(handleCoursePublish)}>
            <div className='flex gap-3 mt-5'>
                <label className='flex items-center gap-5 text-richblack-5'>
                    <input type="checkbox" id='public' {...register("public")} className='rounded h-4 w-4'/>
                    Make this course as public
                </label>
            </div>
            <div className='flex justify-end gap-2 mt-5'>
                <button disabled={loading} className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900' type='button' onClick={goBack}>Back</button>
                <button disabled={loading} className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined'>Save Changes</button>
            </div>
        </form>
        
    </div>
  )
}

export default PublishCourse