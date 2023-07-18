import { useDispatch, useSelector } from "react-redux"
import RenderTotalAmount from "./RenderTotalAmount"
import RenderCartCourses from "./RenderCartCourses"
import { resetCart } from "../../../../slices/cartSlice"
import { toast } from "react-hot-toast"
import { resetedCart } from "../../../service/operations/cartAPI"

export default function Cart(){
    const {token} = useSelector(s=>s.auth)
    const {total,totalItems} = useSelector(state=>state.cart)
    const dispatch = useDispatch()
    return(
        <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">Your Cart</h1>
            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">{totalItems} Courses in Cart</p>
            {
                total>0 &&
                <div className="flex justify-end mt-4 ">
                    <div onClick={async()=>{
                        dispatch(resetCart())
                        await resetedCart(token)
                        toast.success("Cart emptied!")}} className="bg-richblack-700 cursor-pointer px-3 py-1 items-end rounded-lg text-pink-200">Remove All</div>
                </div>
            }
            {
                total>0 ? <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                
                <RenderCartCourses/>

                <RenderTotalAmount/>
                </div> : 
                <p className="mt-14 text-center text-3xl text-richblack-100">Your Cart is Empty</p>
            }
        </div>
    )
}