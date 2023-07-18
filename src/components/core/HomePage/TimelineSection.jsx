import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import timelineImage from '../../../assets/Images/TimelineImage.png'
const timeline = [
    {
        Logo:Logo1,
        heading:'Leadership',
        description:'Fully committed to the success of our company'
    },
    {
        Logo:Logo2,
        heading:'Responsibility',
        description:'Students will always be our top priority'
    },
    {
        Logo:Logo3,
        heading:'Flexibility',
        description:'The ability to switch is an important skill'
    },
    {
        Logo:Logo4,
        heading:'Solve the problem',
        description:'Code your way to a solution'
    },
]

const TimelineSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-15 items-center justify-between w-11/12 max-w-maxContent mx-auto mt-10 pb-10'>
            <div className='flex flex-col w-[45%] gap-11'>
                {
                    timeline.map((item,index)=>
                    <div className='flex gap-6 items-center' key={index}> 
                        <div className='bg-white rounded-full w-[52px] h-[52px] flex items-center justify-center'>
                            <img src={item.Logo} className='w-[20px] h-[30px]'/>
                        </div>
                        <div>
                            <p className='text-[18px] font-semibold text-richblack-800'>{item.heading}</p>
                            <p className='text-[14px] font-[400] text-richblack-700'>{item.description}</p>
                        </div>
                        <div className=''>

                        </div>
                    </div>)
                }
            </div>
            <div className='relative shadow-blue-200 shadow-[10px_-5px_50px_-5px] flex justify-center   '>
                <img src={timelineImage} className='shadow-[20px_20px_rgba(255,255,255)] object-cover w-[714px] h-[545px]' />
                <div className='absolute bottom-[-50px] bg-caribbeangreen-700 flex flex-row text-white w-[511px] h-[128px] justify-between px-10 items-center'>
                    <div className='flex items-center pr-10 gap-10 border-r border-caribbeangreen-300'>
                        <p className='text-[36px] font-bold'>10</p>
                        <h2 className='text-[14px] font-medium text-[#05A77B]'>YEARS <br/> EXPERIENCES</h2>
                    </div>
                    
                    <div className='flex items-center gap-10'>
                        <p className='text-[36px] font-bold'>250</p>
                        <h2 className='text-[14px] font-medium text-[#05A77B]'>TYPES OF <br/> COURSES</h2>
                    </div>
                </div>
            </div>  
        </div>
    </div>
  )
}

export default TimelineSection