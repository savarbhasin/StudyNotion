import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import { useEffect } from "react";
import { getFullCourseDetails } from "../../../service/operations/courseAPI";
import RenderSteps from "../AddCourse/RenderSteps";


export default function EditCourse(){
    const dispatch = useDispatch()
    const {courseId} = useParams();
    const {course} = useSelector(s=>s.course)
    const {token} = useSelector(s=>s.auth)
    const [loading,setLoading] = useState(false)


    const populateCourseDetails = async()=>{
        setLoading(true)
        
        const result = await getFullCourseDetails(courseId,token)
        
        if(result){
            dispatch(setEditCourse(true))
            dispatch(setCourse(result))
        }
        setLoading(false)
    }
    useEffect(()=>{
        populateCourseDetails()
    },[])

    if(loading){
        return(
            <div>
                Loading..
            </div>
        )
    }


    return(
        <div>
            <h1>Edit Course</h1>
            <div>
                {
                    course ? <RenderSteps/> : (<p>Course Not Found</p>)
                }
            </div>
        </div>
    )
}