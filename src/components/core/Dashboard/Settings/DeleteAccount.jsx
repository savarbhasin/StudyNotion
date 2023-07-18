import React from 'react'
import {AiFillDelete} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteProfile } from '../../../service/operations/settingAPI'
const DeleteAccount = () => {
  const dispatch = useDispatch()
  const {token} = useSelector(s=>s.auth)
  const navigate = useNavigate();
  function deleteAccountHandler(){
    console.log('deleting account')
    try{
      dispatch(deleteProfile(token,navigate))
    } catch(e){
      console.log('ERROR while deleting account:',e.message)
    }
  }
  return (
    <div className='my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12'>
        <div className='flex justify-center items-center bg-pink-700 p-[14px] w-[52px] h-[52px] rounded-full'>
          <AiFillDelete className='text-pink-300 text-xl'/>
        </div>
        <div className='space-y-2'>
            <p className='text-pink-5 text-[18px] font-[700] leading-[26px]'>Delete Account</p>
            <p className='text-pink-25 font-[500] text-[14px] leading-[22px]'>
              Would you like to delete your account? <br/>
              This account may contain Paid Courses. Deleting your account is permanent and will remove all the <br/> 
              courses associated with it.</p>
            <p className='text-[16px] text-pink-300 font-[500] leading-[24px] italic cursor-pointer' 
            onClick={deleteAccountHandler}>I want to delete my account</p>
        </div>
    </div>
  )
}

export default DeleteAccount