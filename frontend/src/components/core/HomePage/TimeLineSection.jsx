import React from 'react'

import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimeLinePhoto from '../../../assets/Images/TimelineImage.jpg'
import { motion } from 'motion/react'
const timeLine = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        Logo: Logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        Logo: Logo3,
        Heading: "Flexibility",
        Description: "The ability to switch is an important skills",
    },
    {
        Logo: Logo4,
        Heading: "Solve the problem",
        Description: "Code your way to a solution",
    },
]

const TimeLineSection = () => {
    return (
        <div>
            <div className='flex flex-col lg:flex-row gap-20 mb-20 items-center'>
                <div className='lg:w-[45%] flex flex-col gap-14 lg:gap-3'>
                    {
                        timeLine.map((ele, i) => {
                            return (
                                <motion.div
                                    initial={{ x: -100, opacity: 0 }}  // Starts off-screen to the left
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
                                    key={i}
                                  
                                >

                                    <div className='flex flex-col lg:gap-3' key={i}>
                                        <div className='flex gap-6'>
                                            <div className='w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]'>
                                                <img loading="lazy" src={ele.Logo} alt="Logo" />
                                            </div>
                                            <div>
                                                <h2 className='font-semibold text-[18px]'>{ele.Heading}</h2>
                                                <p className='text-base'>{ele.Description}</p>
                                            </div>
                                        </div>
                                        {
                                            i !== timeLine.length - 1 && (
                                                <div className="hidden lg:block h-14 border-dotted border-r border-light-richblack-100 dark:border-light-richblack-100 bg-light-richblack-400/0 w-[26px]" />
                                            )
                                        }
                                    </div>
                                </motion.div>
                            )
                        })
                    }
                </div>
                <motion.div
                    initial={{ x: 100, opacity: 0 }}  // Starts off-screen to the left
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

                    <div className='relative shadow-light-blue-200 dark:shadow-dark-blue-200'>
                        <img loading="lazy" src={TimeLinePhoto} alt="timeLineImage" className=' shadow-white object-cover h-fit shadow-[20px_20px_0px_0px_#FFFFFF]' />
                        <div className='bg-[linear-gradient(117.82deg,#9CECFB_-9.12%,#65C7F7_48.59%,#0052D4_106.3%)]'></div>
                        <div className='absolute bg-light-caribbeangreen-700 dark:bg-dark-caribbeangreen-700 flex flex-row dark:text-white text-black uppercase py-7
                            left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                            <div className='flex flex-row gap-5 items-center border-r border-light-caribbeangreen-300 dark:border-dark-caribbeangreen-300 px-7'>
                                <p className='text-3xl font-bold'>10</p>
                                <p className='dark:text-dark-caribbeangreen-300 text-sm'>Years of Experience</p>
                            </div>
                            <div className='flex gap-5 items-center px-7'>
                                <p className='text-3xl font-bold'>250</p>
                                <p className='dark:text-dark-caribbeangreen-300 text-sm'>Types of Course</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default TimeLineSection