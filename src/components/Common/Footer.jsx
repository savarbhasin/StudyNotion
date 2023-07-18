import React from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link } from 'react-router-dom'
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa'
import { FooterLink2 } from '../../data/footer-links'

const Footer = () => {
  return (
    <div className='bg-[#161D29] border-t-[1px] border-[#424854] flex flex-col text-richblack-300 text-[14px]
        font-inter font-500 leading-[22px] py-[52px] px-[120px] gap-24'>
        <div className='flex flex-row gap-20 justify-center'>
            <div className='flex flex-row gap-20 border-r-2 pr-10'>
                {/* company */}
                <div className='flex flex-col gap-[12px]'>
                    <img src={logo} />
                    <div className='flex flex-col gap-2'>
                        <p className='font-bold text-[16px] leading-[24px] text-richblack-100'>Company</p>  
                        <Link to={'/about'}>About</Link>
                        <Link to={'/about'}>Careers</Link>
                        <Link to={'/about'}>Affiliates</Link>
                    </div>
                    <div className='flex gap-2'>
                        <FaFacebook/>
                        <FaGoogle/>
                        <FaTwitter/>
                        <FaYoutube/>
                    </div>
                </div>
                {/* resources and support */}
                <div className='flex flex-col gap-[12px]'>
                    <div className='flex flex-col gap-2'>
                        <p className='font-bold text-[16px] leading-[24px] text-richblack-100'>Resources</p>
                        <Link to={'/articles'}>Articles</Link>
                        <Link to={'/blog'}>Blog</Link>
                        <Link to={'/chartsheet'}>Chart Sheet</Link>
                        <Link to={'/codechallenges'}>Code Challenges</Link>
                        <Link to={'/docs'}>Docs</Link>
                        <Link to={'/projects'}>Projects</Link>
                        <Link to={'/videos'}>Videos</Link>
                        <Link to={'/workspaces'}>Workspaces</Link>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-bold text-[16px] leading-[24px] text-richblack-100'>Support</p>
                        <Link to='help-center'>Help Center</Link>
                    </div>
                </div>
                <div className='flex flex-col gap-[12px]'>
                    <div className='flex flex-col gap-2'>
                        <p className='font-bold text-[16px] leading-[24px] text-richblack-100'>Plans</p>
                        <Link to={'/paid-memberships'}>Paid Memberships</Link>
                        <Link to={'/for-students'}>For Students</Link>
                        <Link to={'/business-solutions'}>Business Solutions</Link>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-bold text-[16px] leading-[24px] text-richblack-100'>Community</p>
                        <Link to={'/forums'}>Forums</Link>
                        <Link to={'/chapters'}>Chapters</Link>
                        <Link to={'/events'}>Events</Link>
                    </div>
                </div>
            </div>
            <div className='flex flex-row gap-20'>
                {
                    FooterLink2.map((col,i)=>(
                        <div className='flex flex-col gap-[12px]' key={i}>
                            <p className='font-bold text-[16px] leading-[24px] text-richblack-100'>{col.title}</p>
                            {
                                col.links.map((link,i)=>(
                                    <Link to={`${link.link}`} key={i}>{link.title}</Link>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-5'>
                <p>Privacy Policy</p>
                <p>Cookie Policy</p>
                <p>Terms</p>
            </div>
            <div>
                Made with ❤️ Savar Bhasin © 2023 Studynotion
            </div>
        </div>

    </div>
  )
}

export default Footer