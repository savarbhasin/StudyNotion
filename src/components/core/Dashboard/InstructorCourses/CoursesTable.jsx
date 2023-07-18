import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Td, Thead, Tr, Th } from 'react-super-responsive-table'
import {CiTimer} from 'react-icons/ci'
import {BsFillPatchCheckFill} from 'react-icons/bs'
import {MdOutlineEdit} from 'react-icons/md'
import {AiFillDelete} from 'react-icons/ai'
import { Modal } from 'react-responsive-modal'
import { deleteCourse, fetchInstructorCourses } from '../../../service/operations/courseAPI'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../../../service/formatData'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { resetCart } from '../../../../slices/cartSlice'
export default function CoursesTable({courses,setCourses}) {
    const dispatch = useDispatch()
    const {token} = useSelector(s=>s.auth)
    const [loading,setLoading] = useState(false)
    const [openDeleteModal,setOpenDeleteModal] = useState(false)
    const [openAllDelete,setOpenAllDelete] = useState(false)
    const navigate = useNavigate()
    const handleCourseDelete = async(courseId)=>{
        setLoading(true)
        await deleteCourse({courseId},token)
        const result = await fetchInstructorCourses(token)
        if(result){
            setCourses(result)
        }
        setOpenDeleteModal(false)
        setLoading(false)
    }   
    const totalTimeDuration = (course)=>{
        let totalDuration = 0
        course?.courseContent?.forEach((section)=>section.subSection?.forEach((ss)=>totalDuration+=parseFloat(ss.timeDuration)))
        let seconds = (totalDuration%60).toFixed(2)
        let minutes = Math.floor((totalDuration%3600)/60)
        let hours = Math.floor(seconds/3600)
        let timeStr=''
        if(hours!=0){ 
            timeStr+=`${hours}hours `
        }
        if(minutes!=0){
            timeStr+=`${minutes}minutes `
        }
        timeStr+=`${seconds}seconds`
        return timeStr
    }
    const handleAllCourseDelete = ()=>{
        courses.forEach((course)=>handleCourseDelete(course._id))
    }
  return (
    <div>{
        courses.length > 0 && 
        <div className="flex justify-end my-4 ">
            <div onClick={()=>{setOpenAllDelete(true)}} className="bg-richblack-700 cursor-pointer px-3 py-1 items-end rounded-lg text-pink-200">Delete All</div>
        </div>
    }
        <Table className="rounded-xl border border-richblack-800 ">
            <Thead>
                <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                    <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">COURSE</Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">DURATION</Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">PRICE</Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">ACTIONS</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    courses.length === 0  ? <Tr>
                        <Td className="py-10 text-center text-2xl font-medium text-richblack-100">No courses found</Td>
                    </Tr> :
                    (
                        courses.map(course=>(
                            <Tr key={course._id} className="flex gap-x-10 border-richblack-800 px-6 py-8 border-b">
                                <Td className="flex flex-1 gap-x-4">
                                    <img src={course?.thumbnail} alt="" className="h-[148px] w-[220px] rounded-lg object-cover" />
                                    <div  className="flex flex-col justify-between">
                                        <p className="text-lg font-semibold text-richblack-5">{course.courseName}</p>
                                        <p className="text-xs text-richblack-300">{course.courseDescription}</p>
                                        <p className="text-[12px] text-white">Created : {formatDate(course.createdAt)}</p>
                                        <div>{course.status === "Draft" ? <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100"><CiTimer/>Draft</p> : 
                                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                            <BsFillPatchCheckFill size={8}/>
                                            </div>
                                        Published</p>
                                        }</div>
                                    </div>
                                </Td>
                                <Td className="text-sm font-medium text-richblack-100">
                                    {
                                        totalTimeDuration(course)
                                    }
                                </Td>
                                <Td className="text-sm font-medium text-richblack-100">
                                    Rs {course.price}
                                </Td>
                                <Td className="text-sm font-medium text-richblack-100 ">
                                    <button onClick={()=>{
                                        navigate(`/dashboard/edit-course/${course._id}`)
                                    }} disabled={loading} lassName="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"><MdOutlineEdit size={20}/></button>
                                    <button disabled={loading} onClick={()=>setOpenDeleteModal(true)} className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]" ><AiFillDelete size={20}/></button>
                                    <Modal open={openDeleteModal} onClose={()=>setOpenDeleteModal(false)} center classNames={{
                                        overlay: 'customOverlay',
                                        modal: 'customModal',
                                        }} showCloseIcon={false}>
                                            <h2 className='text-2xl font-semibold text-richblack-5'>Delete this course?</h2>
                                            <h2 className='mt-3 mb-5 leading-6 text-richblack-200'>All lectures will be deleted.</h2>
                                            <div className='flex gap-2'>
                                            <button onClick={()=>handleCourseDelete(course._id)} className='text-center text-lg sm:text-[16px] px-5 py-2 bg-yellow-50 text-black rounded-md font-bold'>Delete</button>
                                            <button className='cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900' onClick={()=>setOpenDeleteModal(false)}>Cancel</button>
                                            </div>
                                            
                                    </Modal>
                                </Td>
                            </Tr>
                        ))
                    )
                }
            </Tbody>
        </Table>
        <Modal open={openAllDelete} onClose={()=>setOpenAllDelete(false)} center classNames={{
            overlay: 'customOverlay',
            modal: 'customModal',
            }} showCloseIcon={false}>
                <h2 className='text-2xl font-semibold text-richblack-5'>Delete all courses?</h2>
                <h2 className='mt-3 mb-5 leading-6 text-richblack-200'>All courses will be deleted.</h2>
                <div className='flex gap-2'>
                    <button onClick={handleAllCourseDelete} className='text-center text-lg sm:text-[16px] px-5 py-2 bg-yellow-50 text-black rounded-md font-bold'>Delete</button>
                    <button className='cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900' onClick={()=>setOpenAllDelete(false)}>Cancel</button>
                </div>
                
        </Modal>
    </div>
  )
}
