import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const RequirementField = ({name,register,label,setValue,getValues,errors}) => {
    const {course,editCourse} = useSelector(s=>s.course)
    const location = useLocation()
    const [requirement,setRequirement] = useState("")
    const [requirementList,setRequirementList] = useState([])
    useEffect(()=>{
        register(name,{required:true})
        if(editCourse){
            setRequirementList(JSON.parse(course?.instructions))
        }
    },[])

    useEffect(()=>{
        setValue(name,requirementList)
    },[requirementList,setValue])

    const handleRemove=(index)=>{
        const updateRequirementList = requirementList
        updateRequirementList.splice(index,1)
        setRequirementList(updateRequirementList)
    }
    const handleAdd = ()=>{
        if(requirement){
            setRequirementList([...requirementList,requirement])
            setRequirement("")
            
        }
    }


  return (
    <div>
        <label htmlFor={name}>{label} <sup className='text-xs text-pink-200'>*</sup></label>
        <div>
            <input type="text" id={name} value={requirement} onChange={(e)=>setRequirement(e.target.value)}
                className='form-style w-full' placeholder='Enter requirement'
            />
            <button onClick={handleAdd} type='button' className='font-semibold text-yellow-50 mt-1'>Add</button>
        </div>
        {
            requirementList.length>0 &&
            requirementList.map((req,index)=>(
                
                <div className='text-richblack-5 flex gap-2 items-center' key={index}>
                    {req}
                    <button type='button' onClick={()=>handleRemove(index)} className='text-xs text-pure-greys-300'>clear</button>
                </div>

            ))
        }
        {
            errors[name]&&
            <span className='text-xs text-pink-200'>{label} is required</span>
        }
    </div>
  )
}

export default RequirementField