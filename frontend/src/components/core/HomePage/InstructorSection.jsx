import React, { useEffect, useRef } from 'react';
import Instructor from '../../../assets/Images/Instructor.png';
import HighlightText from './HighlightText';
import CTAButton from './Button';
import { FaArrowRight } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const InstructorSection = () => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        // Animation for the instructor image (play once)
        gsap.from(imageRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
                once: true
            },
            x: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

        // Animation for the content section (play once)
        gsap.from(contentRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
                once: true
            },
            x: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2 // slight delay after image animation
        });

        return () => {
            ScrollTrigger.getAll().forEach(instance => instance.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className='mt-16'>
            <div className='flex flex-col lg:flex-row gap-20 items-center'>
                <div ref={imageRef} className="md:w-[50%]">
                    <img 
                        loading="lazy" 
                        src={Instructor} 
                        alt="Instructor" 
                        className='shadow-[-20px_-20px_0px_0px_#FFFFFF] transition-transform duration-300 hover:scale-105' 
                    />
                </div>

                <div ref={contentRef}>
                    <div className='flex flex-col gap-10'>
                        <div className='text-4xl md:text-left text-center font-semibold md:w-full'>
                            Become an
                            <HighlightText text={"Instructor"} />
                        </div>
                        <p className='font-medium text-[16px] md:text-left text-center mx-auto md:mx-0 w-[80%] text-richblack-300'>
                            Instructors from around the world teach millions of students on study2success. We provide the tools and skills to teach what you love.
                        </p>
                        <div className='w-fit mx-auto md:mx-0'>
                            <CTAButton active={true} linkto={'/signup'}>
                                <div className='flex items-center gap-2 hover:gap-3 transition-all'>
                                    Start Teaching Today
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorSection;