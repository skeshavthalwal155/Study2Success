import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from "../components/core/HomePage/Button"
import BannerDark from '../assets/Images/banner.mp4'
import BannerLight from '../assets/Images/Bg-Header.png'
import BannerBg from '../assets/Images/Bg-Header-bg.png'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import Footer from '../components/common/Footer'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import TimeLineSection from '../components/core/HomePage/TimeLineSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ReviewSlider from '../components/core/HomePage/ReviewSlider'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import { TypeAnimation } from 'react-type-animation'
import { useSelector } from 'react-redux'
import { motion } from 'motion/react'
const Home = () => {
  const theme = useSelector((state) => state.theme);
  const textColor = theme === 'dark' ? "#ffd60a" : "#2B74F6";


  // console.log(textColor)
  return (
    <div>
      {/* Section 1 */}
      <div className='mx-auto relative flex w-11/12 flex-col items-center justify-between text-light-richblack-5 dark:text-dark-richblack-5  '>
        <div className='text-4xl text-light-richblack-5 dark:text-dark-richblack-5 text-center mt-12 font-mono transition-all duration-150 min-w-[285px] min-h-[84px]'>
          {/* Typing Line 1 */}
          <span>
            Welcome To {" "}
            <TypeAnimation
              sequence={[
                "Study2Success", // Types full line                 
              ]}
              // repeat={Infinity} // Loops forever
              cursor={false} // Optional: Remove if no blinking cursor needed
              style={{
                display: "inline-block",
                fontSize: "36px",
                color: textColor,
              }}
              omitDeletionAnimation={false} // Set `true` if you don't want delete effect
              key={textColor}
            />
          </span>
          {/* Typing Line -2  */}
          <div className='text-2xl mt-2'>
            Learn {" "}
            <TypeAnimation
              sequence={[
                "C", // Types full line        
                2000,
                "",
                500,
                "C++", // Types full line   
                2000,
                "",
                500,
                "PYTHON", // Types full line 
                2000,
                "",
                500,
                "JAVA", // Types full line  
                2000,
                "",
                500,
                "JAVASCRIPT", // Types full line 
                2000,
                "",
                500,
                "FULL STACK WEB DEVELOPMENT", // Types full line      
                2000,
              ]}
              repeat={Infinity} // Loops forever
              cursor={false} // Optional: Remove if no blinking cursor needed
              style={{
                display: "inline-block",
                fontSize: "26px",
                color: textColor,
              }}
              omitDeletionAnimation={false} // Set `true` if you don't want delete effect
              key={textColor}
            />
          </div>
        </div>
        {/* Signup Button */}
        <Link to={'/signup'} className='group mt-8 p-1 mx-auto rounded-full dark:text-dark-richblack-200 text-light-richblack-200 bg-light-richblack-800 dark:bg-dark-richblack-800 font-bold transition-all duration-200 hover:scale-95 w-fit max-w-maxContent shadow-[0_-1px_0_#FFFFFF2E_inset]'>
          <div >
            <div className='flex flex-row items-center gap-2  rounded-full px-10 py-[5px] transition-all 
            duration-200 group-hover:bg-light-richblack-900 hover:dark:bg-dark-richblack-900'>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

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
          className='md:w-[80%] w-full'

        >

          <div className='text-center text-3xl md:text-4xl text-[#00143f] dark:text-dark-richblack-5 font-semibold mt-7 mx-auto'>
            Empower Your Future with <br />
            <HighlightText text={"Coding Skills"} />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}  // Starts off-screen to the left
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
          className='w-[90%] '
        >

          <div className='mt-4 text-center text-sm md:text-lg  text-[#000207] dark:text-dark-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
          </div>
        </motion.div>

        <div className='flex flex-row gap-7 mt-8'>
          <CTAButton active={true} linkto={'/signup'}>
            Get Started
          </CTAButton>
          <CTAButton active={false} linkto={'/login'}>
            Learn More
          </CTAButton>
        </div>


        <div className='mx-3 my-12 shadow-blue-200 w-[70%] relative'>

          {
            theme === 'dark' ? (
              <>
                <div className=' -top-10 w-[800px] videograd'></div>
                <video className='video'
                  muted
                  loop
                  autoPlay
                >
                  <source src={BannerDark} type="video/mp4" />
                </video>
              </>
            ) : (
              <div className='relative'>
                <img src={BannerLight} className='relative md:left-[40%] md:scale-100 scale-150 z-10 ' />
                <img src={BannerBg} className='absolute z-9 scale-200 md:scale-100 md:max-w-max md:top-[-30px] md:left-[-250px] shadow ' />
              </div>
            )
          }
        </div>

        {/* Code Section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className='text-2xl lg:text-4xl sm:w-full font-semibold'>
                Unlock your <HighlightText text={"coding potential"} /> with our online courses
              </div>
            }
            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            ctabtn1={
              {
                btnText: "Try it Yourself",
                linkto: "/signup",
                active: true
              }
            }
            ctabtn2={
              {
                btnText: "Learn Now",
                linkto: "/login",
                active: false
              }
            }
            codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
            codecolor={"white"}
            backgroundGradient={"grad"}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className='text-2xl lg:text-4xl sm:w-full font-semibold '>
                Start <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
            ctabtn1={
              {
                btnText: "Continue Lesson",
                linkto: "/signup",
                active: true
              }
            }
            ctabtn2={
              {
                btnText: "Learn Now",
                linkto: "/login",
                active: false
              }
            }
            codeblock={`import React from 'react';\nexport default () => {\nconst [count, setCount] = React.useState(0);\nreturn <div>\n<h1>{count}</h1>\n<button onClick={() => setCount(c => c + 1)}>+</button>\n</div>;\n}`} codeColor={"text-yellow-25"}
            backgroundGradient={"grad2"}
          />
        </div>
        <ExploreMore />
      </div>
      {/* <div className=' hidden lg:block lg:h-[200px]'></div> */}

      {/* Section 2 */}
      <div className='bg-dark-pure-greys-5 text-dark-richblack-700'>
        <div className='homepage_bg h-[310px]'>
          <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
            <div className='h-[180px]'></div>
            <div className='flex flex-row gap-7 text-white  '>
              <CTAButton active={true} linkto={'/signup'}>
                <div className='flex items-center gap-3'>
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={'/signup'}>
                <div>
                  Learn More
                </div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className='mx-auto w-11/12 md:max-w-maxContent max-w-maxContentTab flex flex-col items-center justify-between gap-7'>
          <div className='flex flex-col md:flex-row gap-5 mb-10 md:mt-[95px] '>
            {/* LEft to RIght */}
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
              // className='w-[50%]'
            >
              <div className='text-4xl font-semibold'>
                <span>
                  Get the skills you need for a
                  <HighlightText text={"job that is in demand"} />
                </span>
              </div>
            </motion.div>
            <div className='flex flex-col gap-10 w-[40%] items-start'>

              {/* Right to Left */}
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
                <div className='text-[16px]'>
                  The Study2Success is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                </div>
              </motion.div>

              <CTAButton active={true} linkto={'/signup'} >
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>

          <TimeLineSection />

          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 dark:bg-dark-richblack-900 bg-white text-[#00143f] dark:text-white  '>
        <InstructorSection />

        <h2 className='text-center text-2xl md:text-4xl font-semibold mt-8 dark:text-dark-richblack-5 text-light-richblack-5 mb-5'>Reviews from Other Learners</h2>
        <ReviewSlider />
      </div>

      {/* Footer */}
      <Footer />

    </div >
  )
}

export default Home