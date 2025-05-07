import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import aboutus1 from '../assets/Images/aboutus1.webp'
import aboutus2 from '../assets/Images/aboutus2.webp'
import aboutus3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from '../assets/Images/FoundingStory.png'
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/core/HomePage/ReviewSlider'
import { motion } from 'motion/react'

const About = () => {
    return (
        <div className='mx-auto text-light-richblack-5 dark:text-dark-richblack-5' >
            {/* Section 1 */}
            <section className='bg-light-richblack-700 dark:bg-dark-richblack-700'>
                <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-light-richblack-5 dark:text-dark-richblack-5 '>
                    <header className='mx-auto py-20 text-4xl font-semibold lg:w-[70%]'>
                        <motion.div
                            initial={{ y: -100, opacity: 0 }}  // Starts off-screen to the left
                            whileInView={{
                                y: 0,  // Slides to natural position
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
                            <p className='text-[16px] leading-6 text-medium text-center dark:text-dark-richblack-200  text-light-richblack-200 mb-9'>About Us</p>
                        </motion.div>

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


                        >
                            <p className='text-[#00143f] dark:text-dark-richblack-25'>Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"} /> </p>
                        </motion.div>
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

                            <p className='mx-auto mt-3 text-center text-base font-medium dark:text-dark-richblack-300 text-light-richblack-300 lg:w-[95%]'>Study2Success is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                        </motion.div>
                    </header>
                    <div className='sm:h-[70px] lg:h-[150px]'></div>


                    <div className='absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5'>
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{
                                x: 0,
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
                            <img src={aboutus1} alt="about-us" loading='lazy' />
                        </motion.div>

                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            whileInView={{
                                y: 0,
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
                            <img src={aboutus2} alt="about-us" loading='lazy' />
                        </motion.div>

                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{
                                x: 0,
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
                            <img src={aboutus3} alt="about-us" loading='lazy' />
                        </motion.div>

                    </div>

                </div>
            </section>

            {/* Section 2 */}
            <section className='border-b border-light-richblack-700 dark:border-dark-richblack-700'>
                <motion.div
                    initial={{ y: -100, opacity: 0 }}  // Starts off-screen to the left
                    whileInView={{
                        y: 0,  // Slides to natural position
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

                    <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 dark:text-dark-richblack-500 text-light-richblack-500 '>
                        <div className='h-[100px]'></div>
                        <Quote />
                    </div>
                </motion.div>
            </section>

            {/* Section 3 */}
            <section>
                <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 dark:text-dark-richblack-500 text-light-richblack-300 '>
                    {/* Left side founding story div */}
                    <div className='flex flex-col items-center gap-10 lg:flex-row justify-between'>
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
                            className='lg:w-[50%]'
                        >
                            {/* founding story left side our founding story */}
                            <div className='my-24 flex  flex-col gap-10'>
                                <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]'>Our Founding Story</h1>
                                <p className='text-base font-medium dark:text-dark-richblack-300 text-light-richblack-300 lg:w-[95%] text-justify'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                                <p className='text-base font-medium dark:text-dark-richblack-300 text-light-richblack-300 lg:w-[95%] text-justify'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                            </div>
                        </motion.div>
                        {/* founding story right box image */}
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

                            <div className='relative'>
                                <img className='relative z-10' src={FoundingStory} alt="Founding-Story" />
                                <span className='bg-[linear-gradient(118.47deg,#EC008C_-0.91%,#FC6767_104.91%)] border absolute top-0 w-[100%] h-[100%] blur-[68px]  opacity-50' />
                            </div>
                        </motion.div>
                    </div>
                    {/* Right Side */}
                    <div className='flex flex-col items-center lg:gap-10 lg:flex-row justify-between'>
                        {/* Left Side */}
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
                            className='lg:w-[40%]'
                        >


                            <div className='my-24 flex flex-col gap-10'>
                                <h1 className='bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-transparent text-4xl font-semibold lg:w-[70%]'>Our Vision</h1>
                                <p className='text-base text-light-richblack-500 dark:text-dark-richblack-300 lg:w-[95%] text-justify'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                            </div>
                        </motion.div>


                        {/* Right Side */}
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
                            className='lg:w-[40%]'
                        >


                            <div className='my-24 flex  flex-col gap-10'>
                                <h1 className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent text-4xl font-semibold lg:w-[70%]'>Our Mission</h1>
                                <p className='text-justify text-base text-light-richblack-500 dark:text-dark-richblack-300  lg:w-[95%]'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section >

            {/* Section 4 */}
            < StatsComponent />

            {/* Section 5 */}
            < section className='mx-auto p-2 flex flex-col items-center justify-between gap-5 mb-[140px]' >
                <LearningGrid />
                <ContactFormSection />
            </section >

            {/* Section 6 */}
            < section className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8' >
                <div className='mb-16 mt-3 w-screen'>
                    <h2 className='text-center text-4xl font-semibold mt-8 text-light-richblack-5 dark:text-dark-richblack-5 mb-5'>Reviews from Other Learners</h2>
                    <ReviewSlider />
                </div>
            </section >

            {/* footer */}
            < Footer />
        </div >
    )
}

export default About