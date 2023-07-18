import React from 'react'
import { logout } from '../../service/operations/authapi'
import { useDispatch, useSelector } from 'react-redux'
import { sidebarLinks } from '../../../data/dashboard-links'
import SidebarLink from './SidebarLink'
import './SideBar.css';
import { Modal } from 'react-responsive-modal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {BiLogOut} from 'react-icons/bi'
const SideBar = () => {
    const {user,loading:profileLoading} = useSelector(state=>state.profile)
    const {loading:authLoading} = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    if (profileLoading || authLoading) {
      return (
        <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
          <div className="spinner"></div>
        </div>
      )
    }
  return (
    <>
        <div className='flex min-w-[220px] flex-col h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 border-r-richblack-700 border-r-[1px]'>
            <div className='flex flex-col'>
                {
                  sidebarLinks.map((link)=>{
                    if(link.type && user.accountType !== link.type) return null;
                    return(
                      <SidebarLink link={link} iconName={link.icon} key={link.id}/>
                    )
                  })
                }
            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] w-11/12 bg-richblack-100'></div>
            <div className='flex flex-col'>
                <SidebarLink link={{name:'Settings',path:'/dashboard/settings'}} iconName={'VscSettingsGear'}/>
                {/* logout */}
                <button onClick={onOpenModal} className='relative px-8 py-2 text-sm font-medium text-richblack-5'>
                  <div className='flex items-center gap-x-2'>
                    <BiLogOut className='text-lg'/>
                    <p>Logout</p>
                  </div>
                </button>
                    <Modal open={open} onClose={onCloseModal} center classNames={{
                      overlay: 'customOverlay',
                      modal: 'customModal',
                    }} showCloseIcon={false}>
                        <h2 className='text-2xl font-semibold text-richblack-5'>Are you sure?</h2>
                        <h2 className='mt-3 mb-5 leading-6 text-richblack-200'>You will be logged out of your account</h2>
                        <div className='flex gap-2'>
                          <button onClick={()=>dispatch(logout(navigate))} className='text-center text-lg sm:text-[16px] px-5 py-2 bg-yellow-50 text-black rounded-md font-bold'>Logout</button>
                          <button className='cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900' onClick={onCloseModal}>Cancel</button>
                        </div>
                        
                    </Modal>
            </div>
        </div>


    </>
  )
}

export default SideBar