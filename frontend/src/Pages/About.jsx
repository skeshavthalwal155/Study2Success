import React, { useEffect, useRef } from 'react'
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
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
    // Create refs for animation elements
    const aboutTitleRef = useRef(null);
    const mainHeadingRef = useRef(null);
    const subHeadingRef = useRef(null);
    const aboutImagesRef = useRef([]);
    const quoteRef = useRef(null);
    const foundingStoryLeftRef = useRef(null);
    const foundingStoryRightRef = useRef(null);
    const purposeLeftRef = useRef(null);
    const offerRightRef = useRef(null);
    const statsRef = useRef(null);
    const learningGridRef = useRef(null);
    const contactFormRef = useRef(null);
    const reviewsRef = useRef(null);

    // Initialize animations
    useEffect(() => {
        // Only run animations on desktop view
        if (window.innerWidth >= 768) {
            // About section animations
            gsap.from(aboutTitleRef.current, {
                y: -50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            gsap.from(mainHeadingRef.current, {
                x: -100,
                opacity: 0,
                duration: 0.8,
                delay: 0.3,
                ease: "power3.out"
            });

            gsap.from(subHeadingRef.current, {
                x: 100,
                opacity: 0,
                duration: 0.8,
                delay: 0.6,
                ease: "power3.out"
            });

            // About images animation
            aboutImagesRef.current.forEach((img, index) => {
                gsap.from(img, {
                    scrollTrigger: {
                        trigger: img,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    x: index === 0 ? -100 : index === 2 ? 100 : 0,
                    y: index === 1 ? -100 : 0,
                    opacity: 0,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "back.out(1.2)"
                });
            });

            // Quote animation
            gsap.from(quoteRef.current, {
                scrollTrigger: {
                    trigger: quoteRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: -50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            // Founding story animations
            gsap.from(foundingStoryLeftRef.current, {
                scrollTrigger: {
                    trigger: foundingStoryLeftRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                x: -100,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            gsap.from(foundingStoryRightRef.current, {
                scrollTrigger: {
                    trigger: foundingStoryRightRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                x: 100,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            // Purpose and Offer animations
            gsap.from(purposeLeftRef.current, {
                scrollTrigger: {
                    trigger: purposeLeftRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                x: -100,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            gsap.from(offerRightRef.current, {
                scrollTrigger: {
                    trigger: offerRightRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                x: 100,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            // Stats animation
            gsap.from(statsRef.current, {
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            // Learning grid animation
            gsap.from(learningGridRef.current, {
                scrollTrigger: {
                    trigger: learningGridRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            // Contact form animation
            gsap.from(contactFormRef.current, {
                scrollTrigger: {
                    trigger: contactFormRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            // Reviews animation
            gsap.from(reviewsRef.current, {
                scrollTrigger: {
                    trigger: reviewsRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        }

        // Clean up ScrollTrigger instances
        return () => {
            ScrollTrigger.getAll().forEach(instance => instance.kill());
        };
    }, []);

    return (
        <div className='mx-auto text-light-richblack-5 dark:text-dark-richblack-5'>
            <div className='hidden md:block'>
                {/* Section 1 */}
                <section className='bg-light-richblack-700 dark:bg-dark-richblack-700'>
                    <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-light-richblack-5 dark:text-dark-richblack-5'>
                        <header className='mx-auto py-20 text-4xl font-semibold lg:w-[70%]'>
                            <div ref={aboutTitleRef} className='text-[16px] leading-6 text-medium md:text-center dark:text-dark-richblack-200 text-light-richblack-200 underline mb-9'>
                                <p>About Us</p>
                            </div>

                            <div ref={mainHeadingRef}>
                                <p className='text-[#00143f] dark:text-dark-richblack-25'>
                                    Driving Innovation in Online Education for a
                                    <HighlightText text={"Brighter Future"} />
                                </p>
                            </div>
                            <div ref={subHeadingRef}>
                                <p className='mx-auto mt-3 text-center text-base font-medium dark:text-dark-richblack-300 text-light-richblack-300 lg:w-[95%]'>Study2Success is a EdTech project of Keshav Thalwal, Ayush Kukreti, Lakshya Kumar MIT, Rishikesh BCA Batch 2022-25 Final Year's Students</p>
                            </div>
                        </header>
                        <div className='sm:h-[70px] lg:h-[150px]'></div>

                        <div className='absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5'>
                            <div ref={el => aboutImagesRef.current[0] = el}>
                                <img loading="lazy" src={aboutus1} alt="about-us" />
                            </div>

                            <div ref={el => aboutImagesRef.current[1] = el}>
                                <img loading="lazy" src={aboutus2} alt="about-us" />
                            </div>

                            <div ref={el => aboutImagesRef.current[2] = el}>
                                <img loading="lazy" src={aboutus3} alt="about-us" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2 */}
                <section className='border-b border-light-richblack-700 dark:border-dark-richblack-700'>
                    <div ref={quoteRef} className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 dark:text-dark-richblack-500 text-light-richblack-500'>
                        <div className='h-[100px]'></div>
                        <Quote />
                    </div>
                </section>

                {/* Section 3 */}
                <section>
                    <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 dark:text-dark-richblack-500 text-light-richblack-300'>
                        {/* Left side founding story div */}
                        <div className='flex flex-col items-center gap-10 lg:flex-row justify-between'>
                            <div ref={foundingStoryLeftRef} className='lg:w-[50%]'>
                                {/* founding story left side our founding story */}
                                <div className='my-24 flex flex-col gap-10'>
                                    <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]'>Our Founding Story</h1>
                                    <p className='text-base font-medium dark:text-dark-richblack-300 text-light-richblack-300 lg:w-[95%] text-justify'>Our e-learning platform was founded with a bold mission: to reshape the way the world learns. It all started with a group of passionate educators, technologists, and lifelong learners who saw the growing need for accessible, flexible, and high-quality education in today's fast-changing digital landscape.</p>
                                    <p className='text-base font-medium dark:text-dark-richblack-300 text-light-richblack-300 lg:w-[95%] text-justify'>Drawing from our own experiences in traditional education, we knew the system had its limits—rigid structures, geographic barriers, and one-size-fits-all approaches. We believed learning should be available to anyone, anywhere, at any time. That belief sparked the idea for a platform designed to break down those barriers and open doors for learners everywhere, helping them reach their full potential on their own terms.</p>
                                </div>
                            </div>
                            {/* founding story right box image */}
                            <div ref={foundingStoryRightRef} className='relative'>
                                <img loading="lazy" className='relative z-10' src={FoundingStory} alt="Founding-Story" />
                                <span className='bg-[linear-gradient(118.47deg,#EC008C_-0.91%,#FC6767_104.91%)] border absolute top-0 w-[100%] h-[100%] blur-[68px] opacity-50' />
                            </div>
                        </div>
                        {/* Right Side */}
                        <div className='flex flex-col items-center lg:gap-10 lg:flex-row justify-between'>
                            {/* Left Side */}
                            <div ref={purposeLeftRef} className='lg:w-[40%]'>
                                <div className='my-24 flex flex-col gap-10'>
                                    <h1 className='bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-transparent text-4xl font-semibold lg:w-[70%]'>Our Purpose</h1>
                                    <p className='text-base text-light-richblack-500 dark:text-dark-richblack-300 lg:w-[95%] text-justify'>We started with a simple belief: everyone deserves access to quality education, regardless of their background, location, or income. Our purpose is to remove barriers and level the playing field for learners worldwide.</p>
                                </div>
                            </div>

                            {/* Right Side */}
                            <div ref={offerRightRef} className='lg:w-[40%]'>
                                <div className='my-24 flex flex-col gap-10'>
                                    <h1 className='dark:bg-gradient-to-b from-[#1FA2FF] text-[#227BF3] via-[#12D8FA] to-[#A6FFCB] bg-clip-text dark:text-transparent text-4xl font-semibold lg:w-[70%]'>What We Offer</h1>
                                    <p className='text-justify text-base text-light-richblack-500 dark:text-dark-richblack-300 lg:w-[95%]'>From industry-certified courses and real-time mentoring to hands-on projects and community support, our platform is designed to meet the diverse needs of today's learners.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4 */}
                <div ref={statsRef}>
                    <StatsComponent />
                </div>

                {/* Section 5 */}
                <section className='mx-auto p-2 flex flex-col items-center justify-between gap-5 mb-[140px]'>
                    <div ref={learningGridRef}>
                        <LearningGrid />
                    </div>
                    <div ref={contactFormRef}>
                        <ContactFormSection />
                    </div>
                </section>

                {/* Review */}
                <section>
                    <div ref={reviewsRef} className='relative mx-auto felx m-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-richblack-5'>
                        <h1 className='text-center text-4xl font-semibold mt-8 dark:text-dark-richblack-5 text-light-richblack-5 mb-5'>Reviews from Other Learners</h1>
                        <ReviewSlider />
                    </div>
                </section>

                {/* footer */}
                <Footer />
            </div>

            {/* Mobile View - No animations */}
            <div className='mx-auto text-light-richblack-5 dark:text-dark-richblack-5 md:hidden'>
                {/* section 1 */}
                <section className='bg-light-richblack-700 dark:bg-dark-richblack-700'>
                    <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-light-richblack-5 dark:text-dark-richblack-5 '>
                        <header className='mx-auto py-20 text-4xl font-semibold lg:w-[70%]'>
                            <p className='text-[16px] leading-6 text-medium md:text-center dark:text-dark-richblack-200  text-light-richblack-200 underline mb-9'>About Us</p>
                            <p className='text-[#00143f] dark:text-dark-richblack-25'>
                                Driving Innovation in Online Education for a
                                <HighlightText text={"Brighter Future"} />
                            </p>
                            <p className='mx-auto mt-3 text-center text-base font-medium dark:text-dark-richblack-300 text-light-richblack-300 lg:w-[95%]'>Study2Success is a EdTech project of Keshav Thalwal, Ayush Kukreti, Lakshya Kumar  MIT, Rishikesh BCA Batch 2022-25 Final Year's Students</p>
                        </header>
                        <div className='sm:h-[70px] lg:h-[150px]'></div>
                        <div className='absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5'>
                            <img loading="lazy" src={aboutus1} />
                            <img loading="lazy" src={aboutus2} />
                            <img loading="lazy" src={aboutus3} />
                        </div>
                    </div>
                </section>

                {/* section 2 */}
                <section className='border-b border-light-richblack-700 dark:border-dark-richblack-700'>
                    <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-light-richblack-500 dark:text-dark-richblack-500'>
                        <div className='h-[100px] '></div>
                        <Quote />
                    </div>
                </section>

                {/* section 3 */}
                <section>
                    <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-light-richblack-300 dark:text-dark-richblack-500'>
                        {/* foudning story wala div */}
                        <div className='flex flex-col items-center gap-10 lg:flex-row justify-between '>
                            {/* founding story left box */}
                            <div className='my-24 flex lg:w-[50%] flex-col gap-10'>
                                <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] '>Our Founding Story</h1>

                                <p className='text-base font-medium lg:w-[95%]'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                                <p className='text-base font-medium  lg:w-[95%]'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                            </div>
                            {/* foudning story right box */}
                            <div>
                                <img loading="lazy" className='shadow-[0_0_20px_0] shadow-[#FC6767]' src={FoundingStory} />
                            </div>
                        </div>

                        {/* vision and mission wala parent div */}
                        <div className='flex flex-col items-center lg:gap-10 lg:flex-row justify-between'>
                            {/* left box */}
                            <div className='my-24 flex lg:w-[40%] flex-col gap-10'>
                                <h1 className='bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] '>Our Vision</h1>
                                <p className='text-base font-medium lg:w-[95%]'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                            </div>

                            {/* right box */}
                            <div className='my-24 flex lg:w-[40%] flex-col gap-10'>
                                <h1 className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] '>
                                    Our Mission
                                </h1>
                                <p className='text-base font-medium  lg:w-[95%]'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* section 4 */}
                <StatsComponent />

                {/* section 5 */}
                <section className='mx-auto p-2 flex flex-col items-center justify-between gap-5 mb-[140px]'>
                    <LearningGrid />
                    <ContactFormSection />
                </section>

                <section>
                    <div className=' mb-16 mt-3 w-screen'>
                        <h2 className='text-center text-4xl font-semibold mt-8 mb-5'>Reviews from other learners</h2>
                        <ReviewSlider />
                    </div>
                </section>
                <Footer />
            </div>
        </div>
    )
}

export default About