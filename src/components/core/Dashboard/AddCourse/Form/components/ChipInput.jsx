import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import {ImCross} from 'react-icons/im'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const ChipInput = ({label,name,setValue,getValues,placeholder,register,errors}) => {
    const {course,editCourse} = useSelector(s=>s.course)
    const [tags,setTags] = useState([])
    const [tag,setTag] = useState("")
    const location = useLocation()

    useEffect(()=>{
        register(name,
            {required:{value:true,message:'Please enter a tag!'},
            minLength:{value:3,message:'Minimum length must be at least 3 characters'}})
        if(editCourse){
            setTags(JSON.parse(course?.tag))
        }
    },[])
    
    const handleKeyDown = (e)=>{
        if (e.key === "Enter" || e.key === ","){
            e.preventDefault()
            handleAdd(tag)
        }
    }


    useEffect(()=>{
        setValue(name,tags)
    },[tags,setValue])


    const handleRemove = (index) =>{
        const updatedTags = tags.filter((_, i) => i !== index);
        setTags(updatedTags)
    }
    const handleAdd = (tag)=>{
        if(tag.length>=3 && !tags.includes(tag)){
            
            setTags([...tags,tag]);
            setTag("");
            
        }
        else{
            toast.error('Tag must be at least 3 characters and should be different')
        }
        
        
        
    }
   
    const changeHandler = (e)=>{
        setTag(e.target.value)
    }

  return (
    <div>
        <label htmlFor={name}>{label}  <sup className='text-xs text-pink-200'>*</sup></label>

        <div className='flex flex-row flex-wrap gap-2 max-w-[350px]'>
        {
            tags.length > 0 &&
            tags.map((tag,index)=>(
                <div key={index} className='m-1 flex gap-2 items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5'>
                {tag}
                <ImCross onClick={()=>handleRemove(index)} className='cursor-pointer'/>
                </div>
            ))
        }
        </div>

        <input type="text" id={name} name={name} placeholder={placeholder} onChange={changeHandler}  value={tag}
            className='w-full form-style' onKeyDown={handleKeyDown}
        />
        {
            errors[name] &&
            <span className='text-xs text-pink-200'>{errors[name].message}</span>
        }
    </div>
  )
}

export default ChipInput