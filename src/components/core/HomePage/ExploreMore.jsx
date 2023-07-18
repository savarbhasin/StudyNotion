import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import {MdPeople} from 'react-icons/md'

import HighlightText from './HighlightText'
const tabsName =["Free","New to coding","Most popular","Skill paths","Career paths"]
const ExploreMore = () => {
    const [currentTab,setCurrentTab] = useState('Free')

    const [selectedCourse,setSelectedCourse] = useState(HomePageExplore[0].courses[0])
    function clickHandler(e){
        setCurrentTab(e.target.innerText)
        setSelectedCourse(HomePageExplore[tabsName.indexOf(e.target.innerText)].courses[0])
    }
    function clickCourseHandler(course){
        setSelectedCourse(course)
    }
  return (
    <div className='flex flex-col gap-2'>
        <div className='mb-5'>
            <div className='flex flex-col gap-2 text-center'>
                <p className='text-4xl font-semibold'>Unlock the <HighlightText text={'Power of Code'}/></p>
                <p className='text-richblack-300 font-semibold text-[16px]'>Learn to Build Anything You Can Imagine</p>
            </div>
            <div className='gap-5 my-5 hidden lg:flex mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 
            rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
                {
                    tabsName.map((tab,index)=>{
                        return(<div className={`text-[16px] hidden lg:flex flex-row items-center gap-2 text-richblack-200 
                        px-7 py-[7px] rounded-full transition-all ${currentTab === tab ? 'bg-richblack-900':''}
                        duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`} onClick={clickHandler} key={index}>
                            {tab}
                        </div>)
                    })
                }
            </div>
        </div>
        <div className='flex md:flex-row sm:flex-col gap-20 mb-[-150px]'>
            {
                HomePageExplore.map((item,index)=>{
                    if (item.tag===currentTab){
                        return item.courses.map((course,i)=>{
                                return(
                                <div className={`flex flex-col justify-between p-5 cursor-pointer
                                ${selectedCourse===course ? 'bg-white shadow-[12px_12px_10px_0] shadow-yellow-50':'bg-[#161D29]'}
                                w-[360px] h-[300px]`} key={i} onClick={()=>clickCourseHandler(course)}>
                                    <div className='flex gap-4 flex-col'>
                                        <p className={`text-[20px] ${selectedCourse===course ? 'text-richblack-800':'text-white'} font-semibold`}>{course.heading}</p>
                                        <p className='text-richblack-500 text-[16px] font-[400]'>{course.description}</p>
                                    </div>
                                    
                                    
                                    <div className={`${selectedCourse===course ? 'text-[#0A5A72] '
                                    :'text-richblack-300'} box-border`}>
                                        <hr className='border-dashed border-2 mb-2'/>
                                        <div className='flex justify-between'>
                                            <p>{course.level}</p>
                                            <p>{course.lessionNumber}</p>
                                        </div>
                                        
                                    </div>
                                </div>)
                        })
                            
                        
                    }
                    return null;
                })
            }
        </div>
        
    </div>
  )
}

export default ExploreMore