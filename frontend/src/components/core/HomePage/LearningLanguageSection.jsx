import React, { useEffect, useRef } from 'react';
import HighlightText from '../HomePage/HighlightText';
import CTAButton from '../HomePage/Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowRight } from 'react-icons/fa';
import { FiBarChart2, FiAward, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const LearningLanguageSection = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const cardsRef = useRef([]);
  const buttonRef = useRef(null);

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
        once: true
      },
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    gsap.from(subheadingRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
        once: true
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2
    });

    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
          once: true
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.3 + index * 0.15,
      });
    });

    gsap.from(buttonRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
        once: true
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
      delay: 0.8
    });

    return () => ScrollTrigger.getAll().forEach(instance => instance.kill());
  }, []);

  return (
    <div ref={containerRef} className='mt-[180px] mb-40 relative'>
      <div className="absolute -top-20 left-0 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/3 right-20 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className='flex flex-col gap-5 items-center relative z-10'>
        <div ref={headingRef} className='text-4xl md:text-5xl font-bold text-center'>
          Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Swiss Army Knife</span> for
          <br />
          <HighlightText text={"learning any language"} />
        </div>

        <div ref={subheadingRef} className='text-center text-dark-richblack-600 mx-auto text-lg md:text-xl font-medium w-[90%] md:w-[70%] leading-relaxed'>
          Revolutionize language learning with our all-in-one platform featuring comprehensive tools and analytics.
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12 mt-12 w-full px-4">
          <motion.div 
            ref={addToCardsRef}
            whileHover={{ y: -10 }}
            className="flex flex-col items-center text-center max-w-xs p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="p-6 bg-blue-50 rounded-2xl mb-4">
              <FiBarChart2 className="text-blue-600 text-4xl" />
            </div>
            <h3 className="font-bold text-lg mb-2">Track Progress</h3>
            <p className="text-gray-600">Visualize your language learning journey with detailed analytics</p>
          </motion.div>

          <motion.div 
            ref={addToCardsRef}
            whileHover={{ y: -10 }}
            className="flex flex-col items-center text-center max-w-xs p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="p-6 bg-purple-50 rounded-2xl mb-4">
              <FiAward className="text-purple-600 text-4xl" />
            </div>
            <h3 className="font-bold text-lg mb-2">Compare Skills</h3>
            <p className="text-gray-600">See how you stack up against other learners</p>
          </motion.div>

          <motion.div 
            ref={addToCardsRef}
            whileHover={{ y: -10 }}
            className="flex flex-col items-center text-center max-w-xs p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="p-6 bg-pink-50 rounded-2xl mb-4">
              <FiCalendar className="text-pink-600 text-4xl" />
            </div>
            <h3 className="font-bold text-lg mb-2">Plan Lessons</h3>
            <p className="text-gray-600">Schedule your personalized study plan</p>
          </motion.div>
        </div>

        <div ref={buttonRef} className='w-fit mt-12'>
          <CTAButton active={true} linkto={"/signup"}>
            <div className='flex items-center gap-2 group'>
              <span className='group-hover:underline'>Start Learning Now</span>
              <FaArrowRight className='transition-all duration-300 group-hover:translate-x-1' />
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;