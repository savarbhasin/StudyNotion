import React from 'react'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
const CodeBlocks = ({position,heading,subheading,ctabtn1,ctabtn2,codeblock,blob,codeColor}) => {
  return (
    <div className={`flex ${position} flex-col w-full my-20 justify-between items-center gap-10`}>

        {/* section 1 */}
        <div className='lg:w-[50%] flex flex-col gap-8 text-4xl font-bold'>
            {heading}
            <div className='text-richblack-300 text-base font-bold w-[85%] -mt-3'>{subheading}</div>
            <div className='flex gap-7 mt-7 sm:gap-4'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                </CTAButton>
            </div>
        </div>

        {/* section 2 */}   
        <div className='flex lg:w-[500px] w-[100%] py-2 text-[16px] font-bold lg:min-h-[278px] h-fit border border-[#B4B1B0] codeblock'>
            <div className={`${blob ? 'blob1':'blob2'}`}>
            </div>
            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation
                    sequence={[codeblock,5000,""]}
                    repeat={Infinity}
                    style={
                        {whiteSpace:'pre-line',display:"block"}
                    }
                    cursor={true}
                    omitDeletionAnimation={true}
                />

            </div>

        </div>
        
    </div>
  )
}

export default CodeBlocks;