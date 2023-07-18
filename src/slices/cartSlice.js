import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { addCart } from "../components/service/operations/cartAPI";

const initialState ={
    cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
    total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
    totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart(state,action){
            
            const course = action.payload
            const inCart = false
            // if item already in cart
            state.cart.forEach((item)=>{
                if(item._id === course._id){
                    toast.error("Item already in cart")
                    inCart=true
                    return;
                }
            })
            if(!inCart){
                state.cart.push(course)
                state.totalItems++
                state.total+=course.price
                localStorage.setItem('cart', JSON.stringify(state.cart))
                localStorage.setItem('total',JSON.stringify(state.total))
                localStorage.setItem('totalItems',JSON.stringify(state.totalItems))

                toast.success("Course added to cart")
            }
            

        },
        removeFromCart(state,action){
            const course = action.payload

            state.cart = state.cart.filter((item) => item._id !== course._id)
            

            state.totalItems--
            state.total-=course.price
            localStorage.setItem('cart', JSON.stringify(state.cart))
            localStorage.setItem('total',JSON.stringify(state.total))
            localStorage.setItem('totalItems',JSON.stringify(state.totalItems))

            toast.success("Course removed to cart")
        },
        resetCart(state,action){
            state.cart = []
            state.total = 0
            state.totalItems = 0
            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        },
        setCart(state,action){
            state.cart = action.payload
            state.totalItems = action.payload.length
            let total = 0
            state.cart.forEach((course)=>{
                total+=course.price
            })
            state.total = total
            localStorage.setItem('cart',JSON.stringify(state.cart))
            localStorage.setItem('total',JSON.stringify(state.total))
            localStorage.setItem('totalItems',JSON.stringify(state.totalItems))

        }
    }
})

export const {addToCart,removeFromCart,resetCart,setCart} = cartSlice.actions;
export default cartSlice.reducer