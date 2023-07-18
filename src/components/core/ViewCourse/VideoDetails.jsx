import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {ControlBar, Player} from 'video-react'
import 'video-react/dist/video-react.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markAsCompleted } from '../../service/operations/courseAPI'
import { updateCompletedLectures } from '../../../slices/viewCourseSlice'

const VideoDetails = () => {
  const {courseId,sectionId,subSectionId} = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const playerRef = useRef()
  const {token} = useSelector((state)=>state.auth)
  const {courseSectionData,courseEntireData,completedLectures} = useSelector(s=>s.viewCourse)

  const [videoData,setVideoData] = useState([])
  const [videoEnded,setVideoEnded] = useState(false)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const setVideoSpecificDetails = async()=>{
      if(!courseSectionData.length) return;
      if(!courseId&&!sectionId&&!subSectionId){
        navigate('/dashboard/enrolled-courses')
      } else{
        const filteredData = courseSectionData.filter((section)=>section._id === sectionId)
        const filteredVideoData = filteredData?.[0]?.subSection.filter((s)=>s._id===subSectionId)
        setVideoData(filteredVideoData[0])
        setVideoEnded(false)

      }

    }
    setVideoSpecificDetails()
  },[courseSectionData,courseEntireData,location.pathname])
  const isFirstVideo = ()=>{
    const currentSectionIndex = courseSectionData.findIndex((data)=>data._id===sectionId)
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex].subSection.findIndex((data)=>data._id===subSectionId)
    if(currentSectionIndex ==-0 && currentSubSectionIndex===0){
      return true;
    }
    return false;
  }
  const isLastVideo = ()=>{
    const currentSectionIndex = courseSectionData.findIndex((data)=>data._id===sectionId)
    const noOfSubSetions = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex].subSection.findIndex((data)=>data._id===subSectionId)
    if(currentSectionIndex === courseSectionData.length-1 && currentSubSectionIndex === noOfSubSetions-1){
      return true;
    }
    return false;
  }
  const goToNextVideo = ()=>{
    const currentSectionIndex = courseSectionData.findIndex((data)=>data._id===sectionId)
    const noOfSubSetions = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex].subSection.findIndex((data)=>data._id===subSectionId)
    
    if(currentSubSectionIndex === noOfSubSetions-1){
      if(currentSectionIndex !== courseSectionData.length-1){
        const nextSectionId = courseEntireData.courseContent[currentSectionIndex+1]._id
        const nextSubSectionId = courseSectionData[currentSectionIndex+1].subSection[0]._id
        
        navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    } }else{
      const nextSubSection = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex+1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSection}`)
    }
  }
  const goToPrevVideo = ()=>{
    const currentSectionIndex = courseSectionData.findIndex((data)=>data._id===sectionId)
    
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex].subSection.findIndex((data)=>data._id===subSectionId)
    if(currentSubSectionIndex!==0){
      const prevSubSectionId = courseSectionData?.[currentSectionIndex].subSection[currentSubSectionIndex-1]._id
      navigate(`/view-course/${courseId}/section/${currentSectionIndex}/sub-section/${prevSubSectionId}`)
    } else{
      const prevSectionId = courseEntireData.courseContent[currentSectionIndex-1]._id
      const newSubSectionId = courseEntireData.courseContent[currentSectionIndex-1].subSection[(courseEntireData.courseContent[currentSectionIndex-1].subSection.length)-1]._id
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${newSubSectionId}`)
    }
  }
  const handleLectureCompletion = async()=>{
    setLoading(true)
    const res = await markAsCompleted({courseId,subSectionId},token)
    dispatch(updateCompletedLectures(subSectionId))
    setLoading(false)
  }
  return (
    <div className=''>
      {
        !videoData ? <div>No data found</div>:
        <Player ref={playerRef} aspectRatio='16:9' onEnded={()=>{setVideoEnded(true)
        }}
          src={videoData?.videoUrl}
        >
          {
            videoEnded && (
              <div className='absolute flex flex-col gap-5 z-50 font-inter items-center top-[50%] left-[30%]'>
                <div className='flex flex-row gap-5'>
                  {!completedLectures.includes(subSectionId) && 
                  <button className='yellow_button' disabled={loading} onClick={handleLectureCompletion}>
                    {loading ? 'Loading':'Mark as complete'}
                  </button>}
                  <button className='yellow_button' onClick={()=>{
                    if(playerRef.current){
                      playerRef.current.seek(0)
                      setVideoEnded(false)
                    }
                  }}>
                      Rewatch
                  </button>
                </div>
                
                <div>
                  {
                    !isFirstVideo() && (
                      <button className='yellow_button' onClick={goToPrevVideo}>Prev</button>
                    )
                  }
                  {
                    !isLastVideo() && (
                      <button className='yellow_button' onClick={goToNextVideo}>Next</button>
                    )
                  }
                </div>
              </div>

            )
          }

        </Player>
      }
      <div className='text-richblack-5 mt-10 flex flex-col gap-3'>
        <h1 className='font-bold text-3xl'>{videoData?.title}</h1>
        <p className='italic text-[16px] text-semibold text-lg'>{videoData?.description}</p>
      </div>
      
      
    </div>
  )
}

export default VideoDetails