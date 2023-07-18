import React from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link, matchPath, useLocation } from 'react-router-dom'
import {NavbarLinks} from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart,AiOutlineDown} from 'react-icons/ai'
import ProfileDropdown from '../core/Auth/ProfileDropdown'
import { useEffect } from 'react'
import { useState } from 'react'
import {categories} from '../service/apis'
import { apiConnector } from '../service/apiconnector'

const {CATEGORIES_API} = categories
const Navbar = () => {


    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile)
    const {totalItems} = useSelector((state)=>state.cart)
    const [subLinks,setSubLinks] = useState([])
    const fetchSubLinks = async()=>{
        try{
            const result = await apiConnector("GET",CATEGORIES_API)
            setSubLinks(result.data.allCategories)
        } catch(e){
            console.error(e)
            console.log('error while loading categories')
        }
    }
    useEffect(()=>{
        fetchSubLinks()
    },[])

    const location = useLocation()
    const matchRoute = (route)=>{
        return (matchPath({path:route},location.pathname))
    }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent mx-auto items-center justify-between'>
            <Link to={'/'}>
                <img src={logo} width={160} height={42}/>
            </Link>
            <nav className="hidden md:block">
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link,i)=>{
                            return <li key={i}>
                                {
                                    link.title === 'Catalog' ? (
                                        <div className='flex items-center gap-2 group relative'>
                                            <p>{link.title}</p>
                                            <AiOutlineDown className=''/>

                                            <div className={`invisible group-hover:visible absolute translate-x-[-90px] bottom-[-100px]
                                            translate-y-[20px] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                            opacity-0 transition-all duration-200 group-hover:opacity-100 w-[300px] z-[100]`}>
                                                {/* diamond */}
                                                <div className='absolute top-0 h-6 w-6 translate-y-[-10px] rotate-45 bg-richblack-5 translate-x-[137px]'></div>
                                                {/* sublink */}
                                                {
                                                    subLinks.length > 0 ? (
                                                        <div>
                                                            {
                                                                subLinks.map((subLink,i)=>(
                                                                    <Link to={`/catalog/${subLink?.name.split(" ").join("-").toLowerCase()}`}
                                                                     key={i} >
                                                                        <p className='p-1 mt-2 px-2 hover:bg-richblack-100 rounded-md'>{subLink.name}</p>
                                                                    </Link>
                                                                ))
                                                            }
                                                        </div>
                                                    ):(<div></div>)
                                                }
                                            </div>
                                        </div>
                                    ):(
                                    <Link to={link.path}>
                                        <p className={`${matchRoute(link.path)?'text-yellow-25':'text-richblack-25'}`}>{link.title}</p>
                                    </Link>)
                                }
                            </li>
                        })
                    }
                </ul>
            </nav>

            <div className='flex gap-x-4 items-center'>
                {
                   user && user?.accountType!=="Instructor" &&
                   (<Link to={'/dashboard/cart'} className='relative'>
                        <AiOutlineShoppingCart className='text-richblack-5 text-2xl'
                        />
                        {
                            totalItems>0 &&
                            <span className='absolute top-3 -left-2 flex items-center font-semibold justify-center bg-yellow-100 h-5 w-5 rounded-full'>{totalItems}</span>
                        }
                   </Link>)

                }
                {
                    token === null &&
                    <div className='flex gap-5'>
                        <Link to={'/login'}>
                            <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100'>Login</button>
                        </Link>
                        <Link to={'/signup'}>
                            <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100'>Sign Up</button>
                        </Link>
                    </div>
                }
                {
                    token !== null && <ProfileDropdown/>
                }
            </div>
            

        </div>
    </div>
  )
}

export default Navbar