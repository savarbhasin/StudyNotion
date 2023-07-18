import React from 'react'
import { useSelector } from 'react-redux'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import DeleteAccount from './DeleteAccount'
import UpdatePassword from './UpdatePassword'


const Settings = () => {
    const {user} = useSelector(state=>state.profile)
  return (
    <div className=''>
        <div className='max-w-[1000px] mx-auto flex flex-col'>
            <p className='text-richblack-5 text-3xl'>Edit Profile</p>
            <ChangeProfilePicture />
            <EditProfile />
            <UpdatePassword />
            <DeleteAccount />
        </div>
    </div>
  )
}

export default Settings