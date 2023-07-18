import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from './pages/Home'
import Navbar from "./components/Common/Navbar";
import Login from './pages/Login'
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import OTP from "./pages/OTP";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/PrivateRoute";
import Settings from "./components/core/Dashboard/Settings/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./components/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";

import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import Contact from "./pages/Contact";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.profile)
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [])
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/> 
        <Route path='/update-password/:token' element={<UpdatePassword/>}/>
        <Route path='/verify-email' element={<OTP/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/courses/:courseId' element={<CourseDetails/>}/>
        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
          <Route path='/dashboard/my-profile' element={<MyProfile/>}/>
          <Route path='/dashboard/settings' element={<Settings/>}/>
          
          { user?.accountType &&
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
              <Route path='/dashboard/cart' element={<Cart/>}/>
              </>
            )
          }
          { user?.accountType &&
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
              <Route path='/dashboard/add-course' element={<AddCourse/>}/>
              <Route path='/dashboard/my-courses' element={<MyCourses/>}/>
              <Route path='/dashboard/instructor' element={<Instructor/>}/>
              <Route path='/dashboard/edit-course/:courseId' element={<EditCourse/>}/>
              
              </>
            )
          }
        </Route>
        <Route path='/catalog/:catalogName' element={<Catalog/>}/>
        <Route path='*' element={<Error/>}/>
        <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT &&
              <>
                <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
              </>
            }
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
