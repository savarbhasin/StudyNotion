import React from 'react'
import { buyCourse } from '../components/service/operations/studentFeaturesAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { fetchCourseDetails } from '../components/service/operations/courseAPI'
import { useEffect } from 'react'
import getAvgRating from '../components/utils/avgRating' 
import Modal from 'react-responsive-modal'
import RatingStars from '../components/Common/RatingStars'
import { formatDate } from '../components/service/formatData'
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard'
import {BiVideo,BiRightArrow} from 'react-icons/bi'
const CourseDetails = () => {
    const navigate = useNavigate()
    const {token} = useSelector(s=>s.auth)
    const dispatch = useDispatch()
    const {user} = useSelector(s=>s.profile)
    const {paymentLoading} = useSelector(s=>s.course)
    const {courseId} = useParams()
    const {loading} = useSelector(s=>s.profile)
    const [courseData,setCourseData] = useState(null)
    const [avgReviewCount,setAvgReviewCount] = useState(0)
    const [totalLectures,setTotalLectures] = useState(0)
    const [open,setOpen] = useState(false)


    useEffect(()=>{
      if(courseData){
        let lectures=0;
        courseData.courseContent.forEach((section)=>lectures+=section.subSection.length)
      }  
    },[courseData])

    useEffect(()=>{
      if(courseData){
        const count = getAvgRating(courseData.ratingAndReviews)
        setAvgReviewCount(count)
      }  
    },[courseData])

    useEffect(()=>{
      const fetchCourseData = async()=>{
        const result = await fetchCourseDetails(courseId)
        setCourseData(result)
      }
      fetchCourseData()
    },[courseId])


    const [isActive,setIsActive] = useState([])
    const handleActive=(id)=>{
      setIsActive(isActive.includes(id)? isActive.filter(i=>i!==id):isActive.concat(id))
    }
    
   


    const handleBuyCourse = ()=>{
        if(token){
            buyCourse([courseId],token,user,navigate,dispatch)
            return;
        } else{
          setOpen(true)
        }
    }
    if(loading|| !courseData){
      return <div>
        Loading...
      </div>
    }

    const {
      _id:course_id,
      courseDescription,
      courseName,
      courseContent,
      thumbnail,
      instructor,
      price,whatYouWillLearn,
      ratingAndReviews,
      studentsEnrolled,
      createdAt
    } = courseData;
    
  return (
    <div className='z-0'>
        <Modal open={open} onClose={()=>setOpen(false)} showCloseIcon={false} center classNames={{
                      overlay: 'customOverlay',
                      modal: 'customModal',
                    }}>
            <h2 className='text-2xl font-semibold text-richblack-5 mb-5'>You are not <br/> logged in!</h2>
            <div className='flex gap-2'>
              <button onClick={()=>navigate('/login')} className='text-center text-lg sm:text-[16px] px-5 py-2 bg-yellow-50 text-black rounded-md font-bold'>Login</button>
              <button onClick={()=>setOpen(false)} className='cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900'>Cancel</button>
            </div>
        </Modal>
        {/* section1 */}
        <div className='relative w-full bg-richblack-800 pb-10'>
          <div className='mx-auto box-content pt-[3.5rem] px-4 lg:w-[1260px] 2xl:relative '>
              <div className='z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5'>
                <p className='text-4xl font-bold text-richblack-5 sm:text-[42px]'>{courseName}</p>
                <p className='text-richblack-200'>{courseDescription}</p>

                <div className='text-md flex flex-wrap items-center gap-2'>
                  <span className='text-yellow-25'>{avgReviewCount}</span>
                  <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
                  <span>{ratingAndReviews.length} reviews</span>
                  <span>{studentsEnrolled.length} students</span>
                </div>

                <div>
                  <p>Created by {instructor.firstName} {instructor.lastName}</p>
                </div>

                <div className='flex flex-wrap gap-5 text0-lg'>
                  <p>{formatDate(createdAt)}</p>
                  <p>English</p>
                </div>
              </div>

              <div className=''>
                  <CourseDetailsCard course={courseData} setOpen={setOpen} handleBuyCourse={handleBuyCourse}/>
              </div>

          </div>
        </div>
        

        {/* section2 */}
        <div className='mx-auto box-content pt-[3.5rem]  px-4 lg:w-[1260px] 2xl:relative text-richblack-5'>
          <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]'>
            <div className='my-8 border border-richblack-600 p-8 mb-20'>
                <p className='text-3xl font-semibold'>What you will learn</p>
                <div className='text-[14px] font-inter leading-[22px] font-500 mt-2 text-richblack-50'>
                  {whatYouWillLearn}
                </div>
            </div>
            <div className='max-w-[830px] '>
              <div className='flex flex-col gap-3'>
                
                  <p className='text-[28px] font-semibold'>Course Content:</p>
                
                <div className='flex w-full justify-between'>
                    <div className='flex gap-2'>
                      <span>{courseContent.length} section(s)</span>
            
                      <span>{totalLectures} lecture(s)</span>  

                      <span>Duration</span>
                    </div>
                    <div>
                      <button className='text-yellow-25' onClick={()=>setIsActive([])}>
                        Collapse all Sections
                      </button>
                    </div>
                    
                  
                </div>
              
              </div>
              <div className='mt-10 mb-20'>
                {
                  courseContent.map((section)=>(
                    <div  key={section._id} className='overflow-hidden border border-solid border-richblack-600  text-richblack-5 last:mb-0'>
                      <div onClick={()=>handleActive(section._id)}  className='flex w-full cursor-pointer items-center'>
                        <div className='flex w-full cursor-pointer  justify-between bg-richblack-700 px-7 py-6'>
                          <p className='flex items-center gap-3'><span className={`font-bold ${isActive.includes(section._id)?'rotate-90':'rotate-0'} transition-[transform] duration-300`}><BiRightArrow/></span>{section.sectionName}</p>
                          <p className='text-yellow-25'>{section.subSection.length} lecture(s)</p>
                        </div>
                      </div>
                      <div className={`relative ${isActive.includes(section._id) ? 'h-[75px]':'h-0'} overflow-hidden  bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}>
                        <div className={`text-textHead flex flex-col gap-2 px-7 py-6 font-semibold `}>
                          {
                            section.subSection.map((lecture,i)=>(
                              <div key={i} className='flex items-center space-x-5'>
                                <BiVideo size={20}/>
                                <p>{lecture.title}</p>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                      
                    </div>
                  ))
                }
              </div>
              
            </div>
          </div>
          <div className='mt-5 mb-20 flex flex-col'>
            <p className='section_heading'>Author</p>
            <div className='flex items-center gap-4 py-4'>
              <img src={instructor?.img} alt="" className='h-14 w-14 rounded-full object-cover'/>
              <p className='text-lg capitalize'>{instructor?.firstName} {instructor?.lastName}</p>
            </div>
            <p className='text-richblack-50'>{instructor?.additionalDetails?.about}</p>
          </div>
          
        </div>
        
        
    </div>
  )
}

export default CourseDetails