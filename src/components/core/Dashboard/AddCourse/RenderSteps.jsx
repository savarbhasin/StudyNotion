import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import CourseInformationForm from './Form/CourseInformationForm'
import CourseBuilder from './Form/CourseBuilder'
import PublishCourse from './Form/PublishCourse'


const RenderSteps = () => {
    const {step} = useSelector(state=>state.course)
    const steps = [
        {
            id:1,
            title:'Course Information'
        },
        {
            id:2,
            title:'Course Builder'
        },
        {
            id:3,
            title:'Publish'
        }
    ]
  return (
    <div className=''>
        <div className='flex justify-between my-10 text-richblack-5'>
            {
                steps.map((item,index)=>(
                    <div className='flex flex-col items-center' key={index}>
                        <div className={`${step === item.id ? 'bg-yellow-900 border-yellow-50 text-yellow-50':
                        'border-richblack-700 bg-richblack-800 text-richblack-300'}  aspect-square w-[34px] grid cursor-default border-[1px] place-items-center rounded-full
                        ${step>item.id ? 'text-yellow-50 bg-yellow-500':''}`}>
                            {
                                step>item.id ? <FaCheck/> : <div>{item.id}</div>
                            }
                        </div>
                        <div>
                            <p className='text-xs mt-2'>{item.title}</p>
                        </div>
                    </div>
                ))
            }
        </div>
        
        {step==1 && <CourseInformationForm/>}
        {step==2 && <CourseBuilder/>}
        {step==3 && <PublishCourse/>}
    </div>
    
  )
}

export default RenderSteps