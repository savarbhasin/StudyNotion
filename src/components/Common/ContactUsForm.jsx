import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { apiConnector } from '../service/apiconnector'
import { contactusEndpoint } from '../service/apis'
import { toast } from 'react-hot-toast'
import countryCode from '../../data/countrycode.json'
const ContactUsForm = () => {
    const [loading,setLoading] = useState(false)
    const {register,handleSubmit,reset,formState:{errors,isSubmitSuccessful}} = useForm()

    const submitContactForm = async(data)=>{ 
        setLoading(true)   
        const toastId = toast.loading("Sending data...")
        try{
            
            const res = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data)
            
            toast.success("Submitted contact information")

        } catch(e){
            console.log(e.message)
            
        }
        toast.dismiss(toastId)
        setLoading(false)
    }
    useEffect(()=>{
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phonenumber:""
            })
        }
    },[reset,isSubmitSuccessful])
  return (
    <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col gap-10'>
        <div className='flex gap-5'>
            <div className='flex flex-col gap-2'>
                <label className='text-[14px] font-[400] text-richblack-5'>First Name</label>
                <input type="text" name='firstname' required id='firstname' placeholder='Enter first name'
                {...register("firstname",{required:true})} className='text-richblack-5 bg-richblack-800 p-[12px] rounded-[8px]'/>
                {
                    errors.firstname &&
                    <span>Please enter first name</span>
                }
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-[14px] font-[400] text-richblack-5'>Last Name</label>
                <input type="text" name='lastname' id='lastname' placeholder='Enter last name'
                {...register("lastname")} 
                    className='text-richblack-5 bg-richblack-800 p-[12px] rounded-[8px]'
                />
            </div>
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='text-[14px] font-[400] text-richblack-5'>Email Address</label>
            <input type="email" name='email' id='email' required {...register("email",{required:true})} 
            className='text-richblack-5 bg-richblack-800 p-[12px] rounded-[8px]' placeholder='Enter your email address' />
            {
                errors.email && 
                <span>Enter your email</span>
            }
        </div>
        {/* contact number */}
        <div className='flex flex-col gap-2'>
            <label htmlFor="phonenumber" className='text-[14px] font-[400] text-richblack-5'>Phone Number</label>
            <div className='flex gap-5'>
                <select name='dropdown' id='dropdown' className='text-richblack-5 bg-richblack-800 p-[12px] rounded-[8px] max-w-[80px]' {...register("countrycode",{required:true})}>
                    {
                        countryCode.map(country=>(
                            <option>{country.code}-{country.country}</option>
                        ))
                    }
                </select>
                <div>
                    <input type="number" name='phonenumber' id='phonenumber' placeholder='12345 67890' 
                     className='text-richblack-5 bg-richblack-800 p-[12px] rounded-[8px] w-[405px]'
                    {...register("phoneNo",
                    {   required:{value:true,message:"Please enter a valid phone number"},
                        maxLength:{value:10, message:'Invalid phone number'},
                        minLength:{value:8, message:'Invalid phone number'}
                    })} />
                    {
                        errors.phoneNo && 
                        <span className='text-richblack-5'>{errors.phoneNo.message}</span>
                    }
                </div>
            </div>
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="message" className='text-[14px] font-[400] text-richblack-5'>Message</label>
            <textarea name='message' id='message' cols={30} rows={7} placeholder='Enter your message' className='text-richblack-5 bg-richblack-800 p-[12px] rounded-[8px]'
            {...register("message",{required:true})}></textarea>
            {
                errors.message && 
                <span>Enter your message</span>
            }
        </div>
        <button type='submit' className='bg-yellow-200 select-none min-w-[300px] text-black rounded-lg p-2 text-[16px] font-semibold'>Send Message</button>
    </form>

  )
}

export default ContactUsForm