import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../service/operations/courseAPI'
import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import RequirementField from './RequirementField'
import { resetCourseState, setCourse, setStep } from '../../../../../slices/courseSlice'
import { toast } from 'react-hot-toast'
import ChipInput from './components/ChipInput'
import Upload from './components/Upload'
import { COURSE_STATUS } from '../../../../utils/constants'
import { useLocation } from 'react-router-dom'
const CourseInformationForm = () => {
    const{
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}
    } = useForm()
    const {token} = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const {course,editCourse} = useSelector(state=>state.course)
    const [loading,setLoading] = useState(false)
    const [courseCategories,setCourseCategories] = useState([])
    const location = useLocation()
    const getCategories = async()=>{
        setLoading(true)
        const categories = await fetchCourseCategories();
        
        if(categories.length > 0){
            setCourseCategories(categories);
        }
        setLoading(false)
    }
    useEffect(()=>{
        getCategories()

        if(editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        } else{
            dispatch(resetCourseState())
        }

    },[])
    const isFormUpdated =()=>{
        const currentValues = getValues()
        if(currentValues.courseTitle !== course.courseName || 
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseCategory._id !== course.category._id,
            currentValues.coursePrice !== course.price ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
            ){
            return true;    
        } else{
            return false;
        }
    }
    const onSubmit = async(data) => {
        if(editCourse){
            if(isFormUpdated()){
                const currentValues = getValues()
                const formData = new FormData()
                formData.append("courseId",course._id)
                if (currentValues.courseTitle !== course.courseName){
                    formData.append("courseName",data.courseTitle)
                }
                if (currentValues.courseShortDesc !== course.courseDescription){
                    formData.append("courseDescription",data.courseShortDesc)
                }
                if (currentValues.coursePrice !== course.price){
                    formData.append("price",data.coursePrice)
                }
                if (currentValues.courseImage !== course.thumbnail){
                    formData.append("thumbnailImage",data.courseImage)
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags))
                  }
                if (currentValues.courseBenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn",data.courseBenefits)
                }
                if (currentValues.courseCategory._id !== course.category._id){
                    formData.append("category",data.courseCategory)
                }
                if (currentValues.courseRequirements.toString() !== course.instructions.toString()){
                    formData.append("instructions",JSON.stringify(data.courseRequirements))
                }
                setLoading(true)
                const result = await editCourseDetails(formData,token)
                setLoading(false)
                if(result){
                    setStep(2)
                    dispatch(setCourse(result))
                }
            } else{
                toast.error("No changes made to the course")
            }
            return;
        }
        const formData = new FormData()
        console.log(data)
        formData.append("courseName",data.courseTitle)
        formData.append("courseDescription",data.courseShortDesc)
        formData.append("price",data.coursePrice)
        formData.append("tag",JSON.stringify(data.courseTags))
        formData.append("thumbnailImage",data.courseImage)
        formData.append("whatYouWillLearn",data.courseBenefits)
        formData.append("category",data.courseCategory)
        console.log(data)
        formData.append("instructions",JSON.stringify(data.courseRequirements))
        formData.append("status",COURSE_STATUS.DRAFT)
        

        setLoading(true)
        const result = await addCourseDetails(formData,token)
        if(result){
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }
        setLoading(false)
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}
    className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8 text-richblack-5'>
        <div>
            <label htmlFor="" className='text-richblack-5 mb-1'>Course Title <sup className='text-xs text-pink-200'>*</sup></label>
            <input type="text" id='courseTitle' placeholder='Enter Course Title' {...register("courseTitle",{required:true})}
                className='w-full form-style'
            />
            {
                errors.courseTitle &&
                <p className='text-xs text-pink-200'>Please enter course title</p>
            }
        </div> 
        <div>
            <label htmlFor="">Course Short Description <sup className='text-xs text-pink-200'>*</sup></label>
            <textarea type="text" id='courseShortDesc' placeholder='Enter short course description' {...register("courseShortDesc",{required:true})}
                className='w-full min-h-[140px] form-style'
            />
            {
                errors.courseShortDesc &&
                <p className='text-xs text-pink-200'>Please enter course description</p>
            }
        </div> 
        <div className='relative'>
            <label htmlFor="">Course Price <sup className='text-xs text-pink-200'>*</sup></label>
            <input type="number" id='coursePrice' placeholder='Enter course price' {...register("coursePrice",{required:true,valueAsNumber:true})}
                className='w-full form-style pl-10'
            />
            <HiOutlineCurrencyRupee className='absolute text-2xl top-[50%] left-2'/>
            {
                errors.coursePrice &&
                <p className='text-xs text-pink-200'>Please enter course price</p>
            }
        </div> 
        <div className='flex flex-col'>
            <label htmlFor="">Course Category <sup className='text-xs text-pink-200'>*</sup></label>
            <select name="courseCategory" className='form-style' id="courseCategory" {...register("courseCategory",{required:true})}>
                <option disabled value={'chintu'}>Choose a category</option>
                {
                    !loading && courseCategories.map((category,index)=>{
                        return(<option key={index} value={category?._id}>{category?.name}</option>)
                })
                }
            </select>
            {
                errors.courseCategory &&
                <span className='text-xs text-pink-200'>Please choose course category</span>
            }
        </div>
        
        <ChipInput label="Tags" name="courseTags" placeholder="Enter tags and press enter" register={register}
        errors={errors} setValue={setValue} getValues={getValues} />

        {/* uploading image */}
        <Upload editData={editCourse ? course?.thumbnail : null} name="courseImage" register={register} errors={errors} setValue={setValue} label={'Upload Course Thumbnail'}/>
        <div>
            <label htmlFor="">Course Benefits <sup className='text-xs text-pink-200'>*</sup></label>
            <textarea type="text" id='courseBenefits' placeholder='Enter benefits of the course' {...register("courseBenefits",{required:true})}
                className='w-full min-h-[140px] form-style'
            />
            {
                errors.courseShortDesc &&
                <p className='text-xs text-pink-200'>Please enter course benefits</p>
            }
        </div> 
        <RequirementField name="courseRequirements" register={register} label="Requirements/Instructions" errors={errors}
            setValue={setValue} getValues={getValues}
        />
        <div className='flex justify-end gap-5'>
            {
                editCourse && (
                    <button className='cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900' onClick={()=>dispatch(setStep(2))}>Continue without saving</button>
                )
            }
            <button className='bg-yellow-50 cursor-pointer rounded-md py-2 px-5 font-semibold text-richblack-900'>{!editCourse ? "Next":"Save Changes"}</button>
        </div>
    </form>
  )
}

export default CourseInformationForm