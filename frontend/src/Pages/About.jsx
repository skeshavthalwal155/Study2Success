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
import { motion } from 'framer-motion'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const About = () => {
  return (
    <div className='mx-auto text-light-richblack-5 dark:text-dark-richblack-5'>
      {/* Section 1 */}
      <section className='bg-light-richblack-700 dark:bg-dark-richblack-700 relative overflow-hidden pt-20 pb-32 md:pb-40'>
        <div className='relative mx-auto w-11/12 max-w-maxContent flex flex-col items-center text-center'>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="w-full lg:w-[70%]"
          >
            <p className='text-[16px] leading-6 text-medium dark:text-dark-richblack-200 text-light-richblack-200 underline mb-9'>
              About Us
            </p>
            <h1 className='text-[#00143f] dark:text-dark-richblack-25 text-3xl md:text-4xl font-semibold mb-4'>
              Driving Innovation in Online Education for a{' '}
              <HighlightText text={"Brighter Future"} />
            </h1>
            <p className='mx-auto text-base font-medium dark:text-dark-richblack-300 text-light-richblack-300'>
              Study2Success is a EdTech project of Keshav Thalwal, Ayush Kukreti, Lakshya Kumar MIT, Rishikesh BCA Batch 2022-25 Final Year's Students
            </p>
          </motion.div>

          {/* Image Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mt-16 w-full max-w-4xl px-4'>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
            >
              <img src={aboutus1} alt="about-us" loading='lazy' className="w-full h-auto rounded-lg shadow-xl" />
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <img src={aboutus2} alt="about-us" loading='lazy' className="w-full h-auto rounded-lg shadow-xl" />
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
            >
              <img src={aboutus3} alt="about-us" loading='lazy' className="w-full h-auto rounded-lg shadow-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className='border-b border-light-richblack-700 dark:border-dark-richblack-700 py-16'>
        <div className='mx-auto w-11/12 max-w-maxContent'>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <Quote />
          </motion.div>
        </div>
      </section>

      {/* Section 3 */}
      <section className='py-16'>
        <div className='mx-auto w-11/12 max-w-maxContent'>
          {/* Founding Story */}
          <div className='flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-24'>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInLeft}
              className='lg:w-[50%]'
            >
              <div className='flex flex-col gap-6'>
                <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-3xl md:text-4xl font-semibold text-transparent'>
                  Our Founding Story
                </h1>
                <p className='text-base font-medium dark:text-dark-richblack-300 text-light-richblack-300'>
                  Our e-learning platform was founded with a bold mission: to reshape the way the world learns. It all started with a group of passionate educators, technologists, and lifelong learners who saw the growing need for accessible, flexible, and high-quality education in today's fast-changing digital landscape.
                </p>
                <p className='text-base font-medium dark:text-dark-richblack-300 text-light-richblack-300'>
                  Drawing from our own experiences in traditional education, we knew the system had its limits—rigid structures, geographic barriers, and one-size-fits-all approaches. We believed learning should be available to anyone, anywhere, at any time.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInRight}
              className='lg:w-[50%] relative'
            >
              <img 
                src={FoundingStory} 
                alt="Founding-Story" 
                className='relative z-10 w-full h-auto rounded-lg shadow-xl'
              />
              <div className='absolute inset-0 bg-gradient-to-r from-[#EC008C] to-[#FC6767] opacity-20 blur-xl rounded-lg' />
            </motion.div>
          </div>

          {/* Purpose and Offer */}
          <div className='flex flex-col lg:flex-row gap-10 lg:gap-16'>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInLeft}
              className='lg:w-[40%]'
            >
              <div className='flex flex-col gap-6'>
                <h1 className='bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-3xl md:text-4xl font-semibold text-transparent'>
                  Our Purpose
                </h1>
                <p className='text-base text-light-richblack-500 dark:text-dark-richblack-300'>
                  We started with a simple belief: everyone deserves access to quality education, regardless of their background, location, or income. Our purpose is to remove barriers and level the playing field for learners worldwide.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInRight}
              className='lg:w-[40%]'
            >
              <div className='flex flex-col gap-6'>
                <h1 className='dark:bg-gradient-to-b from-[#1FA2FF] text-[#227BF3] via-[#12D8FA] to-[#A6FFCB] bg-clip-text dark:text-transparent text-3xl md:text-4xl font-semibold'>
                  What We Offer
                </h1>
                <p className='text-base text-light-richblack-500 dark:text-dark-richblack-300'>
                  From industry-certified courses and real-time mentoring to hands-on projects and community support, our platform is designed to meet the diverse needs of today's learners.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <StatsComponent />

      {/* Section 5 */}
      <section className='py-16'>
        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center gap-16'>
          <LearningGrid />
          <ContactFormSection />
        </div>
      </section>

      {/* Reviews */}
      <section className='py-16 bg-richblack-900'>
        <div className='mx-auto w-11/12 max-w-maxContent'>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h1 className='text-3xl md:text-4xl font-semibold dark:text-dark-richblack-5 text-light-richblack-5'>
              Reviews from Other Learners
            </h1>
          </motion.div>
          <ReviewSlider />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default About