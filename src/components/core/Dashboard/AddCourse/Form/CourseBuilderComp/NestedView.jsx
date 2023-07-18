import React from 'react'
import {useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Modal } from 'react-responsive-modal'
import {RxDropdownMenu} from 'react-icons/rx'
import {MdEdit} from 'react-icons/md'
import {AiFillDelete} from 'react-icons/ai'
import {BiDownArrow} from 'react-icons/bi'
import SubSectionModal from './SubSectionModal';
import {setCourse} from '../../../../../../slices/courseSlice'

import { deleteSection, deleteSubSection } from '../../../../../service/operations/courseAPI';
import { setOpen } from '../../../../../../slices/modalSlice';
const NestedView = ({handleChangeEditSectionName}) => {
    const [openDelete, setOpenDelete] = useState(false);
    const [openSubsectionDelete, setOpenSubsectionDelete] = useState(false);
    
    const {token} = useSelector(s=>s.auth)
    const {course} = useSelector(s=>s.course) 
    const dispatch = useDispatch()
    const [addSubSection,setAddSubSection] = useState(null)
    const [viewSubSection,setViewSubSection] = useState(null)
    const [editSubSection,setEditSubSection] = useState(null)

    const handleDeleteSection = async(sectionId)=>{
      const result = await deleteSection({sectionId,courseId:course._id},token)
      if(result){
        dispatch(setCourse(result))
      }
      setOpenDelete(false)  
    }

  const handleDeleteSubSection = async(subSectionId,sectionId)=>{
    const result = await deleteSubSection({subSectionId,sectionId,courseId:course._id},token)
    if(result){
      const updatedCourseContent = course.courseContent.map((section)=>section._id === sectionId ? result:section)
      const updatedCourse = {...course,courseContent:updatedCourseContent}
        dispatch(setCourse(updatedCourse))
    }
    setOpenDelete(false)  
}

  return (
    <div className='mt-5'>
        <div className='bg-richblack-700 rounded-lg p-6 px-8 flex flex-col gap-5'>
          {course?.courseContent.map((section)=>(
            <details key={section._id} open className=''>
                <summary className='flex items-center justify-between gap-x-3 pb-2 border-b-2'>
                    <div className='flex items-center gap-x-3'>
                      <RxDropdownMenu className='text-xl text-richblack-50'/>
                      <p className='font-semibold text-richblack-50'>{section.sectionName}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <div className='flex gap-2 mr-4 text-xl text-richblack-300'>
                          <button onClick={()=>handleChangeEditSectionName(section._id,section.sectionName)}><MdEdit/></button>
                          <button onClick={()=>{
                            setOpenDelete(true);}}><AiFillDelete/></button>
                        </div>
                        <Modal open={openDelete} onClose={()=>setOpenDelete(false)} center classNames={{
                          overlay: 'customOverlay',
                          modal: 'customModal',
                          }} showCloseIcon={false}>
                              <h2 className='text-2xl font-semibold text-richblack-5'>Delete this section?</h2>
                              <h2 className='mt-3 mb-5 leading-6 text-richblack-200'>All the lectures in this section will be deleted.</h2>
                              <div className='flex gap-2'>
                                <button onClick={()=>handleDeleteSection(section._id)} className='text-center text-lg sm:text-[16px] px-5 py-2 bg-yellow-50 text-black rounded-md font-bold'>Delete</button>
                                <button onClick={()=>setOpenDelete(false)} className='cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900'>Cancel</button>
                              </div>
                            
                        </Modal>
                        <span className='text-xl text-richblack-300'>|</span>
                      <BiDownArrow className='text-xl text-richblack-300'/>
                    </div>
                    
                </summary> 
                <div className='pl-10 mt-3 space-y-3'>
                  {
                    section.subSection.map((data)=>(
                      <>
                      <div key={data._id} onClick={()=>setViewSubSection(data)} className='flex items-center justify-between gap-x-3'>
                         <div className='flex items-center gap-x-3'>
                          <RxDropdownMenu/>
                          <p className='font-semibold text-richblack-50'>{data.title}</p>
                         </div>
                         <div className='flex gap-2 mr-4 text-xl text-richblack-300' onClick={(e)=>e.stopPropagation()}>
                            <button onClick={()=>{setEditSubSection({...data,sectionId:section._id})
                            dispatch(setOpen(true))}}><MdEdit/></button>
                            <button onClick={()=>setOpenSubsectionDelete(true)}><AiFillDelete/></button>
                            <Modal open={openSubsectionDelete} onClose={()=>setOpenSubsectionDelete(false)} center classNames={{
                              overlay: 'customOverlay',
                              modal: 'customModal',
                              }} showCloseIcon={false}>
                                  <h2 className='text-2xl font-semibold text-richblack-5'>Delete this subsection?</h2>
                                  <h2 className='mt-3 mb-5 leading-6 text-richblack-200'>This lecture will be deleted</h2>
                                  <div className='flex gap-2'>
                                    <button onClick={()=>{handleDeleteSubSection(data._id,section._id)
                                    setOpenSubsectionDelete(false)}} className='text-center text-lg sm:text-[16px] px-5 py-2 bg-yellow-50 text-black rounded-md font-bold'>Delete</button>
                                    <button onClick={()=>setOpenSubsectionDelete(false)} className='cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900'>Cancel</button>
                                  </div>
                                
                            </Modal>
                         </div>
                      </div>
                     
                      </>
                      
                    ))
                  }
                  <button onClick={()=>{
                    setAddSubSection(section._id)
                    dispatch(setOpen(true))
                    }} className='mt-1 text-yellow-50'>+ Add Lecture</button>
                </div>
            </details>
          ))}
        </div> 
        {addSubSection ? <SubSectionModal modalData={addSubSection} 
                                          setModalData={setAddSubSection} add={true}
        /> : viewSubSection ? <SubSectionModal modalData={viewSubSection} 
                                          setModalData={setViewSubSection} view={true}/> : 
        editSubSection ? <SubSectionModal modalData={editSubSection} 
                                          setModalData={setEditSubSection} edit={true}/>:<div></div>}
        </div>
  )
}

export default NestedView