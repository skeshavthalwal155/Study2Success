import React, { useEffect, useRef } from 'react';
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import TimeLinePhoto from '../../../assets/Images/TimelineImage.jpg';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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
];

const TimeLineSection = () => {
    const timelineItemsRef = useRef([]);
    const timelinePhotoRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // Animation for timeline items (play once with staggered delay)
        timelineItemsRef.current.forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                    once: true
                },
                x: -100,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
                delay: index * 0.1,
            });
        });

        // Animation for timeline photo (play once)
        gsap.from(timelinePhotoRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
                once: true
            },
            x: 100,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.2
        });

        return () => {
            ScrollTrigger.getAll().forEach(instance => instance.kill());
        };
    }, []);

    return (
        <div ref={containerRef}>
            <div className='flex flex-col lg:flex-row gap-20 mb-20 items-center'>
                {/* Left Side - Original Styling */}
                <div className='lg:w-[45%] flex flex-col gap-14 lg:gap-3'>
                    {timeLine.map((ele, i) => (
                        <div 
                            ref={el => timelineItemsRef.current[i] = el}
                            className='flex flex-col lg:gap-3' 
                            key={i}
                        >
                            <div className='flex gap-6'>
                                <div className='w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]'>
                                    <img loading="lazy" src={ele.Logo} alt="Logo" />
                                </div>
                                <div>
                                    <h2 className='font-semibold text-[18px]'>{ele.Heading}</h2>
                                    <p className='text-base'>{ele.Description}</p>
                                </div>
                            </div>
                            {i !== timeLine.length - 1 && (
                                <div className="hidden lg:block h-14 border-dotted border-r border-light-richblack-100 dark:border-light-richblack-100 bg-light-richblack-400/0 w-[26px]" />
                            )}
                        </div>
                    ))}
                </div>
                
                {/* Right Side - Enhanced Styling */}
                <div ref={timelinePhotoRef} className='relative shadow-light-blue-200 dark:shadow-dark-blue-200 transition-transform duration-300 hover:scale-[1.02]'>
                    <img 
                        loading="lazy" 
                        src={TimeLinePhoto} 
                        alt="timeLineImage" 
                        className='shadow-white object-cover h-fit shadow-[20px_20px_0px_0px_#FFFFFF] rounded-lg' 
                    />
                    <div className='absolute bg-light-caribbeangreen-700 dark:bg-dark-caribbeangreen-700 flex flex-row dark:text-white text-black uppercase py-7
                        left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg shadow-lg'>
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
            </div>
        </div>
    );
};

export default TimeLineSection;