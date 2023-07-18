import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../components/core/Dashboard/SideBar'

const Dashboard = () => {
    const navigate = useNavigate()
    const {loading:profileLoading} = useSelector(state=>state.profile)
    const {loading:userLoading} = useSelector(state=>state.auth)
    const {token} = useSelector(state=>state.auth)
    useEffect(()=>{
        if(!token){
            console.log("User not found")
            navigate('/login')
        }
    },[])
    
    if(profileLoading || userLoading) {
        return(
            <div>Loading...</div>
        )
    }
  return (
    <div className='flex min-h-[calc(100vh-3.5rem)]'>
        <SideBar/>
        <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard