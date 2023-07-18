import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changeNewPass } from '../../../service/operations/settingAPI'
const UpdatePassword = () => {
    const {token} = useSelector(s=>s.auth)
    const [showPassword,setShowPassword] = useState(false)
    const [showNewPassword,setNewShowPassword] = useState(false)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    const changePassword = async(data)=>{
        try{
            await changeNewPass(data,token)
        } catch(err){
            console.error(err)
        }
    }
  return (
        <form onSubmit={handleSubmit(changePassword)}>
            <div className='my-10 flex flex-col w-full gap-20 justify-between gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5'>
                <p className="text-lg font-semibold text-richblack-5">Password</p>
                <div className='flex gap-20'>
                    <div className='relative flex flex-col w-full'>
                        <label htmlFor="oldPassword">Current Password</label>
                        <input autoComplete='on' type={showPassword ? 'text':'password'} required name='oldPassword'
                        className='form-style' placeholder='Enter Password' {...register("oldPassword",{required:true})} />
                        <span className="absolute cursor-pointer right-3 top-[39px]" onClick={()=>setShowPassword( (prev) => (!prev))}>
                            {showPassword ? <AiOutlineEye fontSize={24} fill='#AFB2BF'/> : <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>}
                        </span>
                        {
                            errors.oldPassword &&
                            <span className='text-white'>Please enter current password.</span>
                        }
                    </div>
                    <div className='relative flex flex-col w-full'>
                        <label htmlFor="">New Password</label>
                        <input autoComplete='on' type={showNewPassword ? 'text':'password'} required name='newPassword'
                        className='form-style' placeholder='Enter New Password' {...register("newPassword",{required:true})} />
                        <span className="absolute cursor-pointer right-3 top-[39px]" onClick={()=>setNewShowPassword((prev) => (!prev))}>
                            {showNewPassword ? <AiOutlineEye fontSize={24} fill='#AFB2BF'/> : <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>}
                        </span>
                        {
                            errors.currentPassword &&
                            <span className='text-white'>Please enter new password.</span>
                        }
                    </div>
                </div>
                
            </div>
            <div className="flex justify-end gap-2">
                <button onClick={() => {navigate("/dashboard/my-profile")}}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">
                    Cancel
                </button>
                <button type="submit" 
                className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined">
                Save
                </button>
            </div>   
        </form>
    
    
    
  )
}

export default UpdatePassword