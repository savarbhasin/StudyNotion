import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CTAButton from '../../HomePage/CTAButton'
import { buyCourse } from '../../../service/operations/studentFeaturesAPI'
import { useNavigate } from 'react-router-dom'

const RenderTotalAmount = () => {
    const {total} = useSelector(state=>state.cart)
    const {cart} = useSelector(s=>s.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(s=>s.profile)
    const {token}= useSelector(s=>s.auth)
    function handleBuyCourse(){
        const courses = cart.flatMap((course)=>course._id)
        buyCourse(courses,token,user,navigate,dispatch)
    }
  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
        <p className="mb-6 text-3xl font-medium text-yellow-100">Rs {total}</p>

        <button onClick={handleBuyCourse} className='bg-yellow-200 select-none min-w-[300px] text-black rounded-lg p-2 text-[16px] font-semibold'>Buy Now</button>

    </div>
  )
}

export default RenderTotalAmount