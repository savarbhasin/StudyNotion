import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Modal from 'react-responsive-modal'
import {BiDownArrow} from 'react-icons/bi'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import { createRating } from '../../service/operations/courseAPI'

const VideoDetailsSidebar = () => {
    const [activeStatus,setActiveStatus] = useState("")
    const [videoBarActive,setVideoBarActive] = useState("")
    const [open,setOpen] = useState(false)
    const {token} = useSelector(s=>s.auth)
    const {user} = useSelector(s=>s.profile)
    const navigate = useNavigate()
    const location = useLocation()
    const {register,handleSubmit,formState:{errors},setValue} = useForm()
    const {courseId,sectionId,subSectionId} = useParams()
    const {courseSectionData,courseEntireData,totalNoOfLectures,completedLectures} = useSelector(s=>s.viewCourse)
    
    useEffect(()=>{
        if(courseSectionData){
            if(!courseSectionData.length) return;
            const currentSectionIndex = courseSectionData.findIndex((data)=>data._id===sectionId);
            const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data)=>data._id===subSectionId)
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]?.id
            setActiveStatus(courseSectionData?.[currentSectionIndex]?.id)
            setVideoBarActive(activeSubSectionId)
        }    
    },[courseSectionData,courseEntireData,location.pathname])

    useEffect(()=>{
        setValue("courseExperience","")
        setValue("courseRating",0)
    },[])

    const ratingChanged = (newRating)=>{
        setValue("courseRating",newRating)
    }

    const onSubmit = async(data)=>{
        await createRating({
            courseId,
            rating:data.courseRating,
            review:data.courseExperience
        },token)
        setOpen(false)
    }
    return (
    <div className='flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800'>
        <div className='mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25'>
            <div className='flex w-full justify-between'>
                <div onClick={()=>navigate('/dashboard/enrolled-courses')} className='cursor-pointer yellow_button'>Back</div>
                <div onClick={()=>setOpen(true)} className='cursor-pointer yellow_button'>Add review</div>
            </div>
            <div className='flex flex-col'>
                <p className='text-richblack-25 font-bold text-lg'>{courseEntireData?.courseName}</p>
                <p className='text-sm font-semibold text-richblack-500'>{completedLectures?.length} / {totalNoOfLectures}</p>
            </div>
        </div>
        <div>
            {
                courseSectionData.map((section,index)=>(
                    <div onClick={()=>setActiveStatus(section._id)} key={index} className='mt-2 cursor-pointer text-sm text-richblack-5'>
                            <div className='flex flex-row justify-between items-center bg-richblack-600 px-5 py-4'>
                                <div className='w-[70%] font-semibold'>
                                    {section?.sectionName} 
                                </div>
                                <div>
                                    <BiDownArrow size={16} className={`${activeStatus === section._id ? 'rotate-180':''}`}/>
                                </div>
                            </div>
                            <div onClick={(e)=>e.stopPropagation()}>
                                <div className='flex flex-col'>
                                    {   activeStatus===section._id &&
                                        section.subSection.map((ss)=>(
                                            <div className={`flex gap-3 p-4 ${ss._id === videoBarActive ? 'bg-yellow-200 text-richblack-900':'bg-richblack-900 text-richblack-5'}`}
                                            key={ss._id} onClick={()=>{ 
                                                navigate(`/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${ss._id}`)
                                                setVideoBarActive(ss._id)
                                            }}>
                                                <input type="checkbox" checked={completedLectures.includes(ss._id)}/>
                                                <span>{ss?.title}</span>
                                            </div>
                                        ))
                                    
                                    }
                                </div>
                            </div>
                        

                    </div>
                ))
            }
        </div>
        <Modal open={open} onClose={()=>setOpen(false)} center classNames={{
            overlay: 'customOverlay',
            modal: 'customModal customModal2',
            }} showCloseIcon={false}>
            <div className='text-richblack-5'>
                <div className='bg-richblack-700 text-xl font-semibold p-5 rounded-b'>Add Review</div>
                <div className='flex gap-5 items-center justify-center my-5'>
                    <div>
                        <img src={user?.img} alt="" className='h-20 w-20 object-cover rounded-full' />
                    </div>
                    <div>
                        <p className='capitalize'>{user?.firstName} {user?.lastName}</p>
                        <p>Posting Publicly</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                    <div className='flex w-full justify-center my-4'>
                        <ReactStars count={5} onChange={ratingChanged} size={24} activeColor={'#ffd700'}/>
                    </div>
                    
                    <div>
                        <label htmlFor="courseExperience" className='text-[16px] font-[400] mb-2 text-richblack-5'>Add Your Experience<span className='text-pink-200'>*</span></label>
                        <textarea  id='courseExperience' placeholder='Enter your experience here'
                        {...register("courseExperience",{required:true})} className='form-style min-h-[150px] w-full'/>
                        {
                            errors.courseExperience &&
                            <span className='text-[14px] text-pink-200'>Please add course experience</span>
                        }
                    </div>
                    <div className='flex justify-end w-full gap-5 mt-5'>
                        <button type='button' className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900' onClick={()=>setOpen(false)}>Cancel</button>
                        <button type='submit' className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined'>Add review</button>
                    </div>
                </form>

            </div>
                    
        </Modal>
    </div>
  )
}

export default VideoDetailsSidebar