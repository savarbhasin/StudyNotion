import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BiDownArrow,BiLogOut} from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import {VscDashboard} from 'react-icons/vsc'
import { logout } from '../../service/operations/authapi'
const ProfileDropdown = () => {
  const {user} = useSelector(state=>state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <div className='relative group'>
      <div className='flex items-center gap-1 cursor-pointer '>
        <img src={user.img} alt="" className='w-8 h-8 rounded-full'/>
        <BiDownArrow className='text-richblack-5'/>
      </div>
      <div className='absolute top-[105%] hidden group-hover:flex text-richblack-5 flex-col right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800'>
      <Link to={'/dashboard/my-profile'}>
        <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
            <VscDashboard/>Dashboard
        </div>
        </Link>
        <div className='flex w-full items-center gap-x-1 cursor-pointer py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'
        onClick={()=>dispatch(logout(navigate))}>
           <BiLogOut/> Logout
        </div>
      </div>
    </div>
    
  )
}

export default ProfileDropdown