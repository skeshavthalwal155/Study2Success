import React, { useEffect, useRef } from 'react';
import HighlightText from '../HomePage/HighlightText';
import CTAButton from '../HomePage/Button';
import KnowYourProgress from '../../../assets/Images/Know_your_progress.png';
import CompareWithOthers from '../../../assets/Images/Compare_with_others.png';
import PlanYourLesson from '../../../assets/Images/Plan_your_lessons.svg';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowRight } from 'react-icons/fa';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const LearningLanguageSection = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const imagesRef = useRef(null);

  useEffect(() => {
    // Animation for the heading (play once)
    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
        once: true
      },
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    // Animation for the subheading (play once)
    gsap.from(subheadingRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
        once: true
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2
    });

    // Animation for the images (play once)
    gsap.from(imagesRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
        once: true
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.2)",
      delay: 0.4
    });

    return () => {
      ScrollTrigger.getAll().forEach(instance => instance.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className='mt-[150px] mb-32'>
      <div className='flex flex-col gap-5 items-center'>
        {/* Heading */}
        <div ref={headingRef} className='text-4xl font-semibold text-center'>
          Your swiss Knife for
          <HighlightText text={"learning any language"} />
        </div>

        {/* Subheading */}
        <div ref={subheadingRef} className='text-center text-dark-richblack-600 mx-auto text-base font-medium w-[70%]'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>
        
        {/* Images */}
        <div ref={imagesRef} className='flex flex-col lg:flex-row items-center justify-center mt-5'>
          <img 
            loading="lazy" 
            src={KnowYourProgress} 
            alt="Know Your Progress" 
            className='object-contain md:-mr-32 transition-transform duration-300 hover:scale-105' 
          />
          <img 
            loading="lazy" 
            src={CompareWithOthers} 
            alt="Compare With Others" 
            className='object-contain transition-transform duration-300 hover:scale-105' 
          />
          <img 
            loading="lazy" 
            src={PlanYourLesson} 
            alt="Plan Your Lesson" 
            className='md:w-[500px] md:-ml-36 transition-transform duration-300 hover:scale-105' 
          />
        </div>

        <div className='w-fit'>
          <CTAButton active={true} linkto={"/signup"}>
            <div className='flex items-center gap-2 hover:gap-3 transition-all'>
              Learn More
              <FaArrowRight />
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;