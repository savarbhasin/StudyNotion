import React, { useEffect, useRef, useState } from 'react'
import { FaFileUpload } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { updateDisplayPicture } from '../../../service/operations/settingAPI'

const ChangeProfilePicture = () => {
    const {token}=useSelector(state=>state.auth)
    const {user} = useSelector(state=>state.profile)
    const [loading,setLoading] = useState(false)
    const [imageFile,setImageFile] = useState();
    const [previewSource,setPreviewSource] = useState();
    const fileInputRef = useRef(null)
    const dispatch = useDispatch()
    const handleFileChange = (e)=>{
        const file = e.target.files[0]
        if (file){
            setImageFile(file)
            previewFile(file)
        }
    }
    const handleFileUpload = ()=>{
        try{
            setLoading(true)
            const formData = new FormData()
            formData.append("displayPicture",imageFile)
            dispatch(updateDisplayPicture(token,formData)).then(()=>{
                setLoading(false)
            })
        }
        catch(e){
            console.log(e.message)
        }
    }
    function handleClick(){
        fileInputRef.current.click()
    }
    function previewFile(file){
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setPreviewSource(reader.result)
        } 
    }
    useEffect(() => {
        if (imageFile) {
          previewFile(imageFile)
        }
      }, [imageFile])
  return (
    <div className="flex items-center justify-between rounded-md border-[1px] my-5 border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div className="flex items-center gap-x-4">
            <img src={previewSource||user.img} className="aspect-square w-[78px] rounded-full object-cover"/>
            <div className='space-y-2'>
                <p>Change Profile Picure</p>
                <div className='flex gap-3'>
                    <input type="file" 
                    ref={fileInputRef}
                    accept='image/png, image/gif, image/jpeg'
                    className='hidden' onChange={handleFileChange}
                    />
                    <button className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                        disabled={loading} onClick={handleClick}>
                        Select
                    </button>
                    <button className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined'
                    onClick={handleFileUpload}>
                        {
                            !loading ?<>Upload <FaFileUpload/></> : 'Uploading...'
                        }
                    </button>
                </div>  
            </div>
        </div>  
    </div>
  )
}

export default ChangeProfilePicture