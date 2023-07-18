import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import img1 from '../assets/Images/aboutus1.webp'
import img2 from '../assets/Images/aboutus2.webp'
import img3 from '../assets/Images/aboutus3.webp'
import story from '../assets/Images/FoundingStory.png'
import ContactUs from '../components/Common/ContactUs'
import CountUp from 'react-countup'
import { Link } from 'react-router-dom'
import Footer from '../components/Common/Footer'
const AboutUs = () => {
  return (
    <div className='flex flex-col'>
        {/* section1 */}
        <div className='bg-[#2C333F] h-[515px] relative'>
            <div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center '>
                <p className='text-[36px] font-[600] leading-[44px] text-richblack-5 text-center pt-[3rem] mb-[20px]'>Driving innovation in Online Education for a <br/> <HighlightText text={'Brighter Future'}/></p>
                <p className='text-richblack-300 font-[500] text-[16px] leading-[24px] text-center max-w-[809px]'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                <div className='flex absolute bottom-[-80px] gap-[24px]'>
                    <img src={img1} />
                    <img src={img2} alt="" />
                    <img src={img3} alt="" />
                    
                </div>
            </div>
        </div>
        {/* quotes */}
        <div className='bg-[#000814] h-[336px]'>
            <p className='text-[36px] leading-[52px] font-semibold text-richblack-100 translate-y-[110px] w-11/12 text-center max-w-maxContent mx-auto'>We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={'combines technology, expertise,'}/> and community to create an <HighlightText text={'unparalleled educational experience'}/>.</p>
        </div>
        {/* section3 */}
        <div  className='bg-[#000814] border-t-2 pt-20 border-white'>
            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col gap-[10rem]'>
                <div className='flex flex-col mb-20'>
                    <div className='flex gap-[98px] items-center justify-between'>
                        <div className='flex gap-[24px] flex-col max-w-[486px]'>
                            <p className='text-[36px] font-semibold'><HighlightText text={'Our Founding Story'}/></p>
                            <p className='text-[16px] font-[500] leading-[24px] text-richblack-300'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                                <br/><br/>
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                        </div>
                        <img src={story} alt=""  className='shadow-[0_0_20px_0] shadow-[#FC6767] w-[463px] h-[273px]'/>
                    </div>
                    
                </div>
                <div className='flex justify-between items-center mb-20'>
                    <div className='w-[486px] flex flex-col gap-[24px]'>
                        <p className='text-[36px] font-semibold'><HighlightText text={'Our Vision'} /></p>
                        <p className='text-richblack-300 text-[16px]'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>
                    <div className='w-[486px] flex flex-col gap-[24px]'>
                        <p className='text-[36px] font-semibold'><HighlightText text={'Our Mission'} /></p>
                        <p className='text-richblack-300 text-[16px]'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </div>
            

        </div>
        {/* section4 */}
        <section className='bg-[#2C333F] h-[149px] flex items-center'>
            <div className='w-11/12 max-w-maxContent mx-auto flex justify-around'>
                <div className='flex flex-col items-center'>
                    <CountUp end={5000} suffix='+' duration={2} enableScrollSpy={true} className='text-[30px] font-[700] text-richblack-5'></CountUp>
                    <p className='text-[16px] font-semibold text-richblack-500'>Active Students</p>
                </div>
                <div className='flex flex-col items-center'>
                    <CountUp end={10} suffix='+' duration={1.5} enableScrollSpy={true} className='text-[30px] font-[700] text-richblack-5'></CountUp>
                    <p className='text-[16px] font-semibold text-richblack-500'>Mentors</p>
                </div>
                <div className='flex flex-col items-center'>
                    <CountUp end={200} suffix='+' duration={2} enableScrollSpy={true} className='text-[30px] font-[700] text-richblack-5'></CountUp>
                    <p className='text-[16px] font-semibold text-richblack-500'>Courses</p>
                </div>
                <div className='flex flex-col items-center'>
                    <CountUp end={50} suffix='+' duration={1.5} enableScrollSpy={true} className='text-[30px] font-[700] text-richblack-5'></CountUp>
                    <p className='text-[16px] font-semibold text-richblack-500'>Awards</p>
                </div>
            </div>
        </section>
        {/* section 5 */}
        <section className='bg-[#000814]'>
            <div className='grid grid-cols-4 w-11/12 max-w-maxContent mx-auto mt-20 mb-20'>
                <div className='col-span-2 flex flex-col gap-[12px]'>
                    <h2 className='text-[36px] font-semibold text-richblack-5'>World-Class Learning for <br/><HighlightText text={'Anyone, Anywhere'}/></h2>
                    <p className='text-[16px] max-w-[559px] font-[500] text-richblack-300'>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
                    <Link to={'/signup'}><button className='bg-yellow-200 select-none min-w-[300px] text-black rounded-lg p-2 text-[16px] font-semibold'>Learn More</button></Link>
                </div>
                <div className='p-[32px] flex flex-col gap-[32px] bg-richblack-700 h-[294px]'>
                    <p className='text-[18px] font-semibold text-richblack-5'>Curriculum Based on Industry Needs</p>
                    <p className='text-[14px] font-[400] text-richblack-100'>Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.</p>
                </div>
                <div className='p-[32px] flex flex-col gap-[32px] bg-richblack-800 h-[294px]'>
                    <p className='text-[18px] font-semibold text-richblack-5'>Our Learning Methods</p>
                    <p className='text-[14px] font-[400] text-richblack-100'>The learning process uses the namely online and offline.</p>
                </div>
                <div>
                    
                </div>
                <div className='p-[32px] flex flex-col gap-[32px] bg-richblack-700 h-[294px]'>
                    <p className='text-[18px] font-semibold text-richblack-5'>Certification</p>
                    <p className='text-[14px] font-[400] text-richblack-100'>You will get a certificate that can be used as a certification during job hunting.</p>
                </div>
                <div className='p-[32px] flex flex-col gap-[32px] bg-richblack-800 h-[294px]'>
                    <p className='text-[18px] font-semibold text-richblack-5'>Rating <br/>"Auto-grading"</p>
                    <p className='text-[14px] font-[400] text-richblack-100'>You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.</p>
                </div>
                <div className='p-[32px] flex flex-col gap-[32px] bg-richblack-700 h-[294px]'>
                    <p className='text-[18px] font-semibold text-richblack-5'>Ready to Work</p>
                    <p className='text-[14px] font-[400] text-richblack-100'>Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.</p>
                </div>

            </div>
        </section>
        {/* conact us */}
        <ContactUs/>
        <Footer/>
    </div>
  )
}

export default AboutUs