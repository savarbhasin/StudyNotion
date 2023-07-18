import React from 'react'
import Footer from '../components/Common/Footer'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { getCatalogPageData } from '../components/service/operations/pageAPI'
import { apiConnector } from '../components/service/apiconnector'
import { categories } from '../components/service/apis'
import CourseCard from '../components/core/Catalog/CourseCard'
import CourseSlider from '../components/core/Catalog/CourseSlider'

const Catalog = () => {

    const {catalogName} = useParams()
    const [catalogPageData,setCatalogPageData] = useState(null)
    const [categoryId,setCategoryId] = useState("")
    const [active,setActive] = useState(1)
    // fetch categories
    useEffect(()=>{
        const getCategory = async()=>{
            const res = await apiConnector("GET",categories.CATEGORIES_API)
            const category_id = res?.data?.allCategories?.filter(c=>c.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id
            setCategoryId(category_id)
        }
        getCategory()
    },[catalogName])
    useEffect(()=>{
        const getCategoryDetails = async()=>{
            try{
                const res = await getCatalogPageData(categoryId)
                setCatalogPageData(res)
            } catch(e){
                console.log(e)
            }
        }
        categoryId && getCategoryDetails()
    },[categoryId])
  return (
    <div>

        <div className="box-content bg-richblack-800 px-4">
            <div className='mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent '>
                <p className="text-sm text-richblack-300">Home / Catalog / <span className='text-yellow-25'>{catalogPageData?.data?.selectedCategory?.name}</span></p>
                <p className="text-3xl text-richblack-5">{catalogPageData?.data?.selectedCategory?.name}</p>
                <p className='max-w-[870px] text-richblack-200'>{catalogPageData?.data?.selectedCategory?.description}</p>
            </div>
            
        </div>

        <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            {/* section1 */}
           
            <div className="section_heading">Courses to get you started</div>

            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                <p onClick={()=>setActive(1)} className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}>Most Popular</p>
                <p onClick={()=>setActive(2)} className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}>New</p>
            </div>

            <div>
                <CourseSlider courses={catalogPageData?.data?.selectedCategory?.course}/>
            </div>
            

            {/* section2 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <p className="section_heading">Top Courses in {catalogPageData?.data?.differentCategories?.name}</p>
                <div className="py-8">
                    <CourseSlider courses={catalogPageData?.data?.differentCategories?.course}/>
                </div>
            </div>

            {/* section3 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <p className="section_heading">Frequently Bought</p>
                <div className='py-8'>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,4).map((course)=>(
                                <CourseCard key={course._id} course={course} Height={'h-[400px]'}/>
                            ))
                        }
                    </div>
                </div>
            </div>

        {/* <Footer/> */}
        </div>

    </div>
  )
}

export default Catalog