import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children,active,linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center text-lg sm:text-[16px] px-6 py-3 flex items-center gap-2
        rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
        ${active?'bg-yellow-50':'bg-richblack-800'} ${active?'text-black':'text-white'} hover:shadow-none hover:scale-95 transition-all duration-200 `}>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton;