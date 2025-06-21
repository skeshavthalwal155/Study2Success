import React, { useEffect, useRef } from 'react';
import HighlightText from '../HomePage/HighlightText';
import CTAButton from '../HomePage/Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowRight } from 'react-icons/fa';
import { FiTrendingUp, FiUsers, FiBook } from 'react-icons/fi';

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
      {/* Light mode blobs */}
      <div className="absolute -top-20 left-0 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob dark:bg-blue-900 dark:opacity-20"></div>
      <div className="absolute top-1/3 right-20 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 dark:bg-purple-900 dark:opacity-20"></div>
      <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 dark:bg-pink-900 dark:opacity-20"></div>
      
      <div className='flex flex-col gap-5 items-center relative z-10'>
        <div ref={headingRef} className='text-4xl md:text-5xl font-bold text-center'>
          Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Swiss Army Knife</span> for
          <br />
          <HighlightText text={"learning any language"} />
        </div>

        <div ref={subheadingRef} className='text-center text-dark-richblack-600 dark:text-richblack-300 mx-auto text-lg md:text-xl font-medium w-[90%] md:w-[70%] leading-relaxed'>
          Discover the power of our gradient-powered language learning toolkit.
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full px-4 max-w-6xl">
          <div 
            ref={addToCardsRef}
            className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/50 shadow-sm hover:shadow-md transition-all"
          >
            <FiTrendingUp className="text-blue-600 dark:text-blue-400 text-4xl mb-4" />
            <h3 className="font-bold text-xl mb-3 dark:text-white">Real Progress</h3>
            <p className="text-gray-600 dark:text-richblack-300">Track your improvement with detailed analytics and visual reports</p>
          </div>
          
          <div 
            ref={addToCardsRef}
            className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-8 rounded-3xl border border-purple-100 dark:border-purple-900/50 shadow-sm hover:shadow-md transition-all"
          >
            <FiUsers className="text-purple-600 dark:text-purple-400 text-4xl mb-4" />
            <h3 className="font-bold text-xl mb-3 dark:text-white">Community Benchmarks</h3>
            <p className="text-gray-600 dark:text-richblack-300">Compare your progress with learners at similar levels</p>
          </div>
          
          <div 
            ref={addToCardsRef}
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-8 rounded-3xl border border-green-100 dark:border-green-900/50 shadow-sm hover:shadow-md transition-all"
          >
            <FiBook className="text-green-600 dark:text-green-400 text-4xl mb-4" />
            <h3 className="font-bold text-xl mb-3 dark:text-white">Smart Planning</h3>
            <p className="text-gray-600 dark:text-richblack-300">AI-powered lesson scheduling optimized for your learning style</p>
          </div>
        </div>

        <div ref={buttonRef} className='w-fit mt-12'>
          <CTAButton active={true} linkto={"/signup"}>
            <div className='flex items-center gap-2 group'>
              <span className='group-hover:underline dark:tex-black'>Start Learning Now</span>
              <FaArrowRight className='transition-all duration-300 group-hover:translate-x-1 dark:text-black' />
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;