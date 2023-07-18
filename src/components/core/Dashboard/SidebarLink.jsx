import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import { setEditCourse } from '../../../slices/courseSlice'
const SidebarLink = ({link,iconName}) => {
    const Icon = Icons[iconName]
    const location = useLocation()
    const dispatch = useDispatch()

    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname)
    }
    const clickHandler = ()=>{
        if(location.pathname.includes('/dashboard/edit-course') && link.name === 'Add Course'){
            dispatch(setEditCourse(false))
        }
    }

  return (
    
        <NavLink to={link.path} onClick={clickHandler} className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? 'text-yellow-50 bg-yellow-800':'bg-opacity-0 text-richblack-5'}`}>
            <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${ matchRoute(link.path)? 'opacity-100':'opacity-0'}`}></span>
            <div className='flex item-center gap-x-2'>
                <Icon className='text-lg'/>
                <span>{link.name}</span>
            </div>
        </NavLink>

  )
}

export default SidebarLink