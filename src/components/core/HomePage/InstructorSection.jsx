import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa'
import { motion } from 'motion/react'

const InstructorSection = () => {
    return (
        <div className='mt-16'>
            <div className='flex flex-col lg:flex-row gap-20 items-center'>

                <motion.div
                    initial={{ x: -100, opacity: 0 }}  // Starts off-screen to the left
                    whileInView={{
                        x: 0,  // Slides to natural position
                        opacity: 1,
                        transition: {
                            type: "tween",
                            ease: "easeOut",
                            duration: 0.6
                        }
                    }}
                    viewport={{
                        margin: "-50px",
                        amount: 0.3,
                        reset: true
                    }}
                    className="md:w-[50%]"
                >
                    <img src={Instructor} alt="Instructor" className='shadow-[-20px_-20px_0px_0px_#FFFFFF]' loading="lazy" />
                </motion.div>


                <motion.div
                    initial={{ x: 100, opacity: 0 }}  // Starts off-screen to the right
                    whileInView={{
                        x: 10,  // Slides to natural position
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

                    <div className='flex flex-col gap-10 '>
                        <div className='text-4xl md:text-left text-center font-semibold md:w-full'>
                            Become an
                            <HighlightText text={"Instructor"} />
                        </div>
                        <p className='font-medium text-[16px] md:text-left text-center mx-auto md:mx-0 w-[80%] text-richblack-300'>
                            Instructors from around the world teach millions of students on study2success. We provide the tools and skills to teach what you love.
                        </p>
                        <div className='w-fit mx-auto md:mx-0'>
                            <CTAButton active={true} linkto={'/signup'}>
                                <div className='flex items-center gap-2'>
                                    Start Teaching Today
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div >
    )
}

export default InstructorSection