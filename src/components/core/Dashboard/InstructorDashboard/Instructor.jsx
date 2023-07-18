import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getInstructorCourseData } from '../../../service/operations/profileAPI'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../service/operations/courseAPI'
import { Link, useNavigate } from 'react-router-dom'
import InstructorChart from './InstructorChart'

const Instructor = () => {
    const {user} = useSelector(s=>s.profile)
    const {token} = useSelector(s=>s.auth)
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [instructorData,setInstructorData] = useState([])
    const [courses,setCourses] = useState([])
    const [totalAmount,setTotalAmount] = useState(0)
    const [students,setStudents] = useState(0)
    useEffect(()=>{
        const getCourseData=async()=>{
            setLoading(true)
            const instructorApiData = await getInstructorCourseData(token)
            const result = await fetchInstructorCourses(token)
            setLoading(false)
            if(instructorApiData.length){
                setInstructorData(instructorApiData)
            }
            if(result){
                setCourses(result)
            }
        }
        getCourseData()
    },[])
    useEffect(() => {
        if (instructorData) {
            setTotalAmount(instructorData.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0))
            setStudents(instructorData.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0))
        }
    }, [instructorData])
    
    
  return (
    <div className='text-richblack-25'>
        <div className='flex flex-col space-y-2'>
            <h1 className='text-2xl font-bold text-richblack-5'>Hi {user.firstName} 👋</h1>
            <p className='font-medium text-richblack-200'>Lets start something new</p>
        </div>
        {
            loading ? <div>Loading...</div> : 
            courses.length>0 ? 
            <div>
                <div className='my-4 flex h-[450px] space-x-4'>
                    <InstructorChart courses={instructorData}/>
                    <div className='flex min-w-[250px] flex-col rounded-md gap-5 bg-richblack-800 p-6'>
                        <div className='text-lg font-bold text-richblack-5'>Statistics</div>
                        <div>
                            <p className='text-lg text-richblack-200'>Total Courses</p>
                            <p className=''>{courses.length}</p>
                        </div>
                        <div>
                            <p className='text-lg text-richblack-200'>Total Students</p>
                            <p className='text-3xl font-semibold text-richblack-50'>{students}</p>
                        </div>
                        <div>
                            <p className='text-lg text-richblack-200'>Total Income</p>
                            <p className='text-3xl font-semibold text-richblack-50'>{totalAmount}</p>
                        </div>
                    </div>
                    
                </div>
                <div className='my-10 flex flex-col space-y-4 bg-richblack-800 p-6 rounded-md'>
                    <div className='w-full flex justify-between'>
                        <p className='text-lg font-bold text-richblack-5'>Your Courses</p>
                        <Link to='/dashboard/my-courses'><p className='text-xs font-semibold text-yellow-50'>View all</p></Link>
                    </div>
                    <div className='flex gap-x-5'>
                        {
                            courses.slice(0,3).map((course)=>(
                                <div className='flex flex-col gap-2 cursor-pointer' onClick={()=>navigate(`/courses/${course._id}`)}>
                                    <img src={course.thumbnail} alt="" className='h-[201px] w-full rounded-md object-cover'/>
                                    <div>
                                        <p className='text-sm font-medium text-richblack-50'>{course.courseName}</p>
                                        <div className='mt-1 flex items-center space-x-2'>
                                            <p className='text-xs font-medium text-richblack-300'>{course.studentsEnrolled.length} students</p>
                                            <p className='text-xs font-medium text-richblack-300'>|</p>
                                            <p className='text-xs font-medium text-richblack-300'>Rs {course.price}</p>
                                        </div>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                </div>
            </div>
            : <div className='bg-richblack-700 text-richblack-25 font-medium flex justify-between items-between text-xl'>
                You have not created any courses
                <Link to='/dashboard/add-course' className='text-yellow-50 text-xl font-medium'>
                    Create a course
                </Link>
            </div>

        }
    </div>
  )
}

export default Instructor