import {combineReducers} from '@reduxjs/toolkit'
import authReducer from '../slices/authslice'
import profileReducer from '../slices/ProfileSlice'
import cartReducer from '../slices/cartSlice'
import courseReducer from '../slices/courseSlice'
import modalReducer from '../slices/modalSlice'
import viewCourseReducer from '../slices/viewCourseSlice'
const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    modal:modalReducer,
    viewCourse:viewCourseReducer
})

export default rootReducer