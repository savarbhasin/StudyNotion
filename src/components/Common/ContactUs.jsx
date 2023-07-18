import React from 'react'
import ContactUsForm from './ContactUsForm'
const ContactUs = () => {
  return (
    <div className='mx-auto flex flex-col items-center'>
        <h1 className='text-[36px] leading-[44px] font-semibold text-richblack-5 mb-2'>Get in Touch</h1>
        <p className='text-[16px] font-[500] text-richblack-300'>We'd love to here from you, Please fill out this form.</p>
        <div className='mt-[52px] mb-10'>
            <ContactUsForm/>
        </div>
        
    </div>
  )
}

export default ContactUs