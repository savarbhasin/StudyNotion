import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import { toast } from 'react-hot-toast'
import { createSection, updateSection } from '../../../../service/operations/courseAPI'
import NestedView from './CourseBuilderComp/NestedView'

const CourseBuilder = () => {
    const {register,formState:{errors},handleSubmit,setValue} = useForm()
    const [editSectionName,setEditSectionName] = useState(null)
    const {course} = useSelector(s=>s.course)
    const dispatch = useDispatch()
    const [loading,setLoading]  = useState(false)
    const {token} = useSelector(s=>s.auth)

    const onSubmit = async(data)=>{
        setLoading(true)
        let result;
        if(editSectionName){
            result = await updateSection({
                sectionName:data.sectionName,
                sectionId:editSectionName,
                courseId:course._id
            },token)
        } else{
            result = await createSection({
                sectionName:data.sectionName,
                courseId:course._id
            },token)
            
        }
        // update values
        if(result){
            dispatch(setCourse(result))
            setEditSectionName(null)
            setValue("sectionName","")
        }
        setLoading(false)
    }
    const cancelEdit = ()=>{
        setEditSectionName(null)
        setValue('sectionName',"")
    }
    const goBack=()=>{
        dispatch(setStep(1))
        
    }
    const goToNext=()=>{
        if(course.courseContent.length===0){
            toast.error("Please add atleast one subsection")
            return;
        }
        if(course.courseContent.some((section)=>section.subSection.length===0)){
            toast.error("Please add atleast one lecture")
            return;
        }
        dispatch(setStep(3))
    }
    const handleChangeEditSectionName = (sectionId,sectionName)=>{
        if(editSectionName === sectionId){
            cancelEdit()
        }
        setEditSectionName(sectionId)
        setValue("sectionName",sectionName)
    }
    
  return (
    <div className='text-richblack-5'>
        
        <form onSubmit={handleSubmit(onSubmit)} className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'>
            <p className='text-2xl font-semibold text-richblack-5'>Course Builder</p>
            <div>
                <label htmlFor="" className='text-richblack-5'>Section Name <sup className='text-pink-200'>*</sup> </label>
                <input type="text" id='sectionName' placeholder='Add section name' {...register('sectionName',{required:true})}
                    className='w-full form-style '
                />
                {
                    errors.sectionName &&
                    <span className='text-xs text-pink-200'>Enter section name</span>
                }
            </div>
            <div className='flex gap-2'>
                <button type='submit' className='flex items-center border border-yellow-50 bg-transparent cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-yellow-50 undefined'>{editSectionName ? 'Edit Section Name' : "Create Section +"}</button>
                {
                        editSectionName &&
                        <button type='button' className='text-sm text-richblack-300 underline' onClick={cancelEdit}>Cancel Edit</button>
                }
            </div>
        </form>
        {
            course.courseContent.length>0 && <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
        }
        <div className='flex justify-end w-full gap-x-3 mt-5'>
            <button onClick={()=>goBack()} className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'>Back</button>
            <button onClick={()=>goToNext()} className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined'>
            {`Next >`}</button>
        </div>
    </div>
  )
}

export default CourseBuilder