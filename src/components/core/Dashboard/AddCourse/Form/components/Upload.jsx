import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Dropzone from 'react-dropzone'
import ReactPlayer from 'react-player';

import {AiOutlineCloudUpload} from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
const Upload = ({name,register,errors,setValue,video=false,viewData=null,editData=null,label}) => {
    const {course,editCourse} = useSelector(s=>s.course)
    
    const [uploaded,setUploaded] = useState(viewData ? true : editData? true: false)
    const [preview,setPreview] = useState(viewData?viewData:editData?editData:"")

    const [selectedFile,setSelectedFile] = useState(null)

    useEffect(()=>{
        register(name,{required:true})
        if(editCourse){
            setUploaded(true)
            setSelectedFile(editData)
        }
    },[])

    useEffect(()=>{
        setValue(name,selectedFile)    
    },[selectedFile,setValue])
    

    const uploadHandler = (e)=>{
        e.map((image)=>{
            setSelectedFile(image)
            previewImage(image)
        })
        
    }
    const previewImage = (image)=>{
        const reader = new FileReader()
        reader.onloadend = () => {
            setUploaded(true);
            setPreview(reader.result);
          };
        reader.readAsDataURL(image);
    }
    const changeHandler = (e)=>{
        const file = e.target.files[0]
        previewImage(file)
        setSelectedFile(file)
        
    }
    function clickHandler(){
        setPreview('')
        setUploaded(false)
    }


  return (
    <div>
    <label htmlFor={name}>{label}<sup className='text-xs text-pink-200'>*</sup></label>
        {
            !uploaded ?
            
            <Dropzone onDrop={uploadHandler}>
            {({getRootProps, getInputProps}) => (
                <section>
                
                <div {...getRootProps()} className='bg-richblack-700 flex flex-col min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500'>
                    
                    <input {...getInputProps()} type='file' accept={video ? 'video/mp4':'image/jpeg,image/jpg,image/png'} onChange={changeHandler}/>
                    <AiOutlineCloudUpload className='bg-pure-greys-800  text-yellow-50 w-14 h-14 rounded-full p-2'/>
                    <p className='mt-2 text-center text-sm text-richblack-200'>Drag 'n' drop {video?'video':'course thumbnail'} <br/> or <br/> <span className='text-yellow-50 underline'>Click</span> to select</p>
                </div>
                </section>
            )}
            </Dropzone>
             :
            <div className='bg-richblack-700 flex flex-col gap-3 pt-2 min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500'>
                {!video && <img src={preview} className='max-w-[500px] max-h-[260px]'/>}
                {video && <ReactPlayer url={preview} controls width="100%" height="auto" />}
                <div className={`text-center text-[20px] text-yellow-50 w-7 h-7 flex items-center justify-center mb-2 rounded-full bg-richblack-400 ${uploaded && viewData ? 'scale-0': editData ? 'scale-1' : ''}`}
                onClick={clickHandler} >X</div>
            </div>
                
           
            
        }
       
        {
            errors[name] &&
            <span className='text-xs text-pink-200'>Please upload {video? 'lecture video' : 'course thumbnail'}</span>
        }
        
    </div>
  )
}

export default Upload