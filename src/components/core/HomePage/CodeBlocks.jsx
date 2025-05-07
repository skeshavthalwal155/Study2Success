import React from 'react'
import CTAButton from '../HomePage/Button'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
import { motion } from "motion/react"
const CodeBlocks = (
  { position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codecolor }
) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 flex-wrap`}>

      {/* Section 1 */}
      <div className='w-[100%] flex flex-col gap-8 lg:w-[50%] p-4'>
        <motion.div
          initial={{ x: 100, opacity: 0 }}  // Starts off-screen to the right
          whileInView={{
            x: 0,  // Slides to natural position
            opacity: 1,
            transition: {
              type: "tween", // Smooth sliding (no bounce)
              ease: "easeOut",
              duration: 0.6
            }
          }}
          viewport={{
            margin: "-50px",  // Triggers 50px before element enters viewport
            amount: 0.3,       // Requires 30% of element to be visible
            reset: true
          }}
        >
          <div className='w-[100%] text-4xl font-bold dark:text-dark-richblack-5 text-light-richblack-5 '>
            {heading}
          </div>


          <div className='text-light-richblack-300 dark:text-dark-richblack-300 text-base w-[85%] -mt-3 p-4 md:text-lg '>
            {subheading}
          </div>

          <div className='flex gap-7 mt-7 p-3'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
              <div className='flex gap-2 items-center'>
                {ctabtn1.btnText}
                <FaArrowRight />
              </div>
            </CTAButton>

            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
              {ctabtn2.btnText}
            </CTAButton>
          </div>
        </motion.div>

      </div>

      {/* Section 2 */}
      <div className='h-fit flex flex-row py-3 text-10[px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] dark:bg-[rgba(13,18,30,0.75)] rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-[1px_solid_rgba(13,18,30,0.3)]'>
        <div className='text-center flex flex-col w-[10%] dark:text-dark-richblack-400 text-light-richblack-400 font-inter font-bold'>
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

        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono text-black dark:text-white pr-2 relative`}>
          <div className={`${backgroundGradient}`}></div>
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}

            style={
              {
                whiteSpace: "pre-line",
                display: "block",
                overflowX: "hidden",
                fontSize: "16px"
              }
            }
            omitDeletionAnimation={false}
          />



        </div>
      </div>
    </div>
  )
}

export default CodeBlocks