import React, { useEffect, useRef } from 'react';
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import TimeLinePhoto from '../../../assets/Images/TimelineImage.jpg';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        Description: "The ability to switch is an important skill",
    },
    {
        Logo: Logo4,
        Heading: "Problem Solving",
        Description: "Code your way to innovative solutions",
    },
];

const TimeLineSection = () => {
    const timelineItemsRef = useRef([]);
    const timelinePhotoRef = useRef(null);
    const containerRef = useRef(null);
    const statsRef = useRef(null);

    useEffect(() => {
        // Animation for timeline items with staggered delay
        timelineItemsRef.current.forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                    once: true
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.2)",
                delay: index * 0.15,
            });
        });

        // Animation for timeline photo
        gsap.from(timelinePhotoRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
                once: true
            },
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.4
        });

        // Animation for stats box
        gsap.from(statsRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
                once: true
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.8
        });

        return () => ScrollTrigger.getAll().forEach(instance => instance.kill());
    }, []);

    return (
        <div ref={containerRef} className="relative py-20">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 dark:bg-blue-900/20 dark:opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 dark:bg-purple-900/20 dark:opacity-50"></div>
            
            <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-center max-w-7xl mx-auto px-4">
                {/* Left Side - Timeline Items */}
                <div className="lg:w-[45%] flex flex-col gap-10 lg:gap-6 z-10">
                    {timeLine.map((ele, i) => (
                        <div 
                            ref={el => timelineItemsRef.current[i] = el}
                            className="flex flex-col lg:gap-4 group"
                            key={i}
                        >
                            <div className="flex gap-6 items-start">
                                <div className="w-14 h-14 bg-white dark:bg-richblack-800 rounded-full flex justify-center items-center shadow-lg shadow-black/10 dark:shadow-black/20 transition-all duration-300 group-hover:scale-110">
                                    <img 
                                        loading="lazy" 
                                        src={ele.Logo} 
                                        alt="Logo" 
                                        className="w-7 h-7 object-contain" 
                                    />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-lg md:text-xl dark:text-white">{ele.Heading}</h2>
                                    <p className="text-base text-richblack-600 dark:text-richblack-300 mt-1">
                                        {ele.Description}
                                    </p>
                                </div>
                            </div>
                            {i !== timeLine.length - 1 && (
                                <div className="hidden lg:block h-14 border-l-2 border-dashed border-richblack-100 dark:border-richblack-700 ml-[26px]"></div>
                            )}
                        </div>
                    ))}
                </div>
                
                {/* Right Side - Photo with Stats */}
                <div 
                    ref={timelinePhotoRef}
                    className="relative w-full lg:w-[55%] h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
                >
                    <img 
                        loading="lazy" 
                        src={TimeLinePhoto} 
                        alt="Timeline" 
                        className="w-full h-full object-cover rounded-xl transform transition-transform duration-500 hover:scale-105" 
                    />
                    
                    {/* Stats Box */}
                    <div 
                        ref={statsRef}
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-richblack-800 flex flex-row text-richblack-800 dark:text-black uppercase py-5 px-6 rounded-xl shadow-xl"
                    >
                        <div className="flex items-center border-r border-richblack-200 dark:border-richblack-600 pr-6 mr-6">
                            <p className="text-3xl font-bold">10</p>
                            <p className="text-sm ml-3 text-richblack-600 dark:text-richblack-300">Years Experience</p>
                        </div>
                        <div className="flex items-center">
                            <p className="text-3xl font-bold">250+</p>
                            <p className="text-sm ml-3 text-richblack-600 dark:text-richblack-300">Courses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeLineSection;