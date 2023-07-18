import { Chart, registerables } from 'chart.js'
import React from 'react'
import { useState } from 'react'
import { Pie } from 'react-chartjs-2'

Chart.register(...registerables)

const InstructorChart = ({courses}) => {
    const [currentChart,setCurrentChart] = useState("Students")
    const getRandomColors = (numColors)=>{
        const colors=[]
        for (let i =0;i<numColors;i++){
            const color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
            colors.push(color)
        }
        return colors
    }
    // create data for chart display student
    const chartDataForStudents = {
      labels:courses.map((course)=>course.courseName),
      datasets:[
        {
          data:courses.map((course)=>course.totalStudentsEnrolled),
          backgroundColor:getRandomColors(courses.length)
        }
      ]
    }
    // income
    const chartDataForIncome = {
      labels:courses.map((course)=>course.courseName),
      datasets:[
        {
          data:courses.map((c)=>c.totalAmountGenerated),
          backgroundColor:getRandomColors(courses.length)
        }
      ]
    }
    // options
    const options = {

    }
  return (
    <div className='flex-1 rounded-md bg-richblack-800 p-6'>
        <p className='text-lg font-bold text-richblack-5'>Visualize</p>
        <div className='flex gap-x-5'>
          <button className={`${currentChart==="Students" ? 'bg-richblack-600 text-yellow-50':'text-richblack-25'} px-3 py-1 rounded-lg`} onClick={()=>setCurrentChart("Students")}>Students</button>
          <button className={`${currentChart === "Income" ? 'bg-richblack-600 text-yellow-50':'text-richblack-25'} px-3 py-1 rounded-lg`} onClick={()=>setCurrentChart("Income")}>Income</button>
        </div>
        <div className='h-[300px] flex justify-center w-full items-center'>
            <Pie data={currentChart==="Students" ? chartDataForStudents:chartDataForIncome} options={options}/>
        </div>
    </div>
  )
}

export default InstructorChart