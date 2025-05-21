import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import CTAButton from '../HomePage/Button'
import KnowYourProgress from '../../../assets/Images/Know_your_progress.png'
import CompareWithOthers from '../../../assets/Images/Compare_with_others.png'
import PlanYourLesson from '../../../assets/Images/Plan_your_lessons.svg'
import { motion } from 'motion/react'
const LearningLanguageSection = () => {
  return (
    <div className='mt-[150px] mb-32'>
      <div className='flex flex-col gap-5 items-center'>
        {/* Up To Down */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}  // Starts 50px above (hidden)
          whileInView={{
            y: 0,  // Slides down to natural position
            opacity: 1,
            transition: {
              type: "tween",  // Smooth sliding (no bounce)
              ease: "easeOut",
              duration: 0.6,
            }
          }}
          viewport={{
            margin: "-50px",  // Triggers 50px before element enters viewport
            amount: 0.3,      // Requires 30% visibility to trigger
            reset: true       // Resets when scrolled out of view
          }}
        >
          <div className='text-4xl font-semibold text-center'>
            Your swiss Knife for
            <HighlightText text={"learning any language"} />
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}  // Starts 50px below (hidden)
          whileInView={{
            y: 0,  // Slides up to natural position
            opacity: 1,
            transition: {
              type: "tween",
              ease: "easeOut",
              duration: 0.6
            }
          }}
          viewport={{
            margin: "-50px",  // Triggers 50px before element enters viewport
            amount: 0.3,      // Requires 30% visibility to trigger
            reset: true       // Resets when scrolled out of view
          }}
        >

          <div className='text-center text-dark-richblack-600 mx-auto text-base font-medium w-[70%]'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
          </div>
        </motion.div>
        
        {/* Bottom to top */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}  // Starts 50px below (hidden)
          whileInView={{
            y: 0,  // Slides up to natural position
            opacity: 1,
            transition: {
              type: "tween",
              ease: "easeOut",
              duration: 0.6
            }
          }}
          viewport={{
            margin: "-50px",  // Triggers 50px before element enters viewport
            amount: 0.3,      // Requires 30% visibility to trigger
            reset: true       // Resets when scrolled out of view
          }}
        >

        <div className='flex flex-col lg:flex-row items-center justify-center mt-5'>
          <img src={KnowYourProgress} alt="Know Your Progress" className='object-contain md:-mr-32' />
          <img src={CompareWithOthers} alt="Compare With Others" className='object-contain' />
          <img src={PlanYourLesson} alt="Plan Your Lesson" className='md:w-[500px] md:-ml-36' />
        </div>
        </motion.div>

        <div className='w-fit'>
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection