import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import knowYourProgress from '../../../assets/Images/Know_your_progress.png'
import compareOther from '../../../assets/Images/Compare_with_others.png'
import lessonPlan from '../../../assets/Images/Plan_your_lessons.png'
const LearningLanguageSection = () => {
  return (
    <div className='mt-[8rem] pb-[5rem]'>
      <div className='flex flex-col gap-5 items-center'>
        <div className='text-4xl leading-[44px] font-semibold text-center'>
          Your swiss knife for <HighlightText text={'learning any language'}/>
        </div>
        <div className='text-center text-[16px] font-[500] text-richblack-700 leading-[24px]'>
          Using spin making learning multiple languages easy, with 20+ languages realistic voice-over, progress tracking, <br/> custom schedule and more.
        </div>
        <div className='flex flex-row items-center justify-center mt-5'>
          <img src={knowYourProgress} className='object-contain mr-[-90px]'/>
          <img src={compareOther} className='object-contain mr-[-90px]'/>
          <img src={lessonPlan} className='object-contain ml-[-70px]'/>
        </div>
        <div>
          <CTAButton active={true} linkto={'/signup'}>Learn More</CTAButton>
        </div>  
        
      </div>  
    </div>
   
  )
}

export default LearningLanguageSection