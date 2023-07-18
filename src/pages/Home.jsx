import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/CTAButton'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import video from '../assets/Images/banner.mp4'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import RatingAndReview from '../components/core/HomePage/RatingAndReview'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import Footer from '../components/Common/Footer'
import { useSelector } from 'react-redux'
import { logout } from '../components/service/operations/authapi'

const Home = () => {
  useEffect(()=>{
    
  })
  return (
    <div>
      {/* section 1 */}
      <div className='flex flex-col gap-8 mx-auto w-11/12 text-white justify-between items-center max-w-maxContent '>

        <Link to={'/signup'}>
            <div className='group mt-16 p-1 mb-7 bg-richblack-800 mx-auto 
            rounded-full transition-all duration-200 hover:scale-95  drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none'>

              <div className='flex rounded-full px-10 py-[5px] transition-all duration-200  gap-2 group-hover:bg-richblack-900 items-center'>

                <p className='font-bold leading-6 text-center font-inter text-[#999DAA]'>Become an instructor</p>

                <FaArrowRight className='text-sm text-[#999DAA]'/>

              </div>
            </div>
        </Link>

        <div className='text-center text-4xl font-bold'>
          Empower Your Future with
          <HighlightText text={'Coding Skills'}/>
        </div>

        <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        <div className='flex gap-7 mt-8'>
          <CTAButton active={true} linkto={'/signup'}>Learn More</CTAButton>
          <CTAButton active={false} linkto={'/login'}>Book a Demo</CTAButton>
        </div>

        <div className='shadow-[10px_-5px_50px_-5px] my-[3.5rem] shadow-blue-200'>
          <video src={video} autoPlay muted loop className='shadow-[20px_20px_rgba(255,255,255)]'></video>
        </div>

        <div>
          <CodeBlocks position={'lg:flex-row'} 
          heading={
            <div>
              Unlock your <HighlightText text={'coding potential '}/>
              with our online courses.
            </div>
          } blob={true}
            subheading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
            ctabtn1={
              {btnText:'Try it Yourself',
              active:true,
              linkto:'/signup'}
            }
            ctabtn2={
              {btnText:'Learn More',
              active:false,
              linkto:'/login'}
            }
            codeblock={
              `<!DOCTYPE html>
              <html>
              <head>Example 
                <title><link rel="stylesheet" href="styles.css">
              </head>
              <body>
                <h1> <a href="/">Header</a> </h1>
                <nav> <a href="one/"> One </a> <a href="two/">Two</a>
                <a href="three/">Three</a>
              </nav></body></html>`
            }
            codeColor={'text-yellow-25'}
          />
        </div>

        <div>
          <CodeBlocks position={'lg:flex-row-reverse'} 
          heading={
            <div>
              Start <HighlightText text={`coding in`}/> <br/> <HighlightText text={'seconds'}/>
            </div>
          } blob={false}
            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
            ctabtn1={
              {btnText:'Continue Lesson',
              active:true,
              linkto:'/signup'}
            }
            ctabtn2={
              {btnText:'Learn More',
              active:false,
              linkto:'/login'}
            }
            codeblock={
              ` import React from "react";
                import CTAButton from "./Button";
                import TypeAnimation from "react-type";
                import { FaArrowRight } from "react-icons/fa";
                const Home = () => {
                return (
                <div>Home</div>
                >
                }
                export default Home;`
            }
            codeColor={'text-blue-25'}
          />
        </div>
          
        <ExploreMore/>

      </div>

      
      {/* section 2 */}
      <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='h-[310px] homepage_bg'>
                <div className='w-11/12 flex-col max-w-maxContent justify-center flex items-center gap-5 mx-auto'>
                  <div className='h-[150px]'></div>
                  <div className='flex gap-10 mt-7'>
                    <CTAButton linkto={'/login'} active={true}><div className='flex items-center gap-2'>Explore Full Catalog <FaArrowRight/></div></CTAButton>
                    <CTAButton linkto={'/signup'} active={false}>Learn More</CTAButton>
                  </div>

                </div>
            </div>

            <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 mx-auto'>
                <div className='flex gap-5 mt-20 justify-between mb-10'>
                  {/* left */}
                  <div className='flex w-[45%]'>
                    <p className='text-4xl font-semibold '>Get the skills you need for a 
                    <HighlightText text={'job that is in demand.'}/>
                    </p>
                  </div>
                  {/* right */}
                  <div className='flex flex-col gap-10 w-[40%] items-start'>
                    <p className='text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                    <CTAButton linkto={'/signup'} active={true}>Learn More</CTAButton>
                  </div>
                </div>
            </div>

            <TimelineSection/>

            <LearningLanguageSection/>
           




      </div>

      {/* section 3 */}
      <div className='w-11/12 max-w-maxContent mx-auto flex-col items-center justify-between gap-8
      bg-richblack-900 text-white'>
          <InstructorSection/>
          <h2 className='text-center text-4xl font-semibold my-10'>Review from <HighlightText text={' other learners'}/></h2>
          <RatingAndReview/>
      </div>
          <Footer/>
    </div>
  )
}

export default Home