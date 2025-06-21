import React, { useEffect, useRef } from 'react';
import { FaArrowRight, FaCode, FaChalkboardTeacher, FaLaptopCode, FaUserGraduate } from 'react-icons/fa';
import { IoIosRocket, IoMdTrendingUp } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { useSelector } from 'react-redux';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import Footer from '../components/common/Footer';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ReviewSlider from '../components/core/HomePage/ReviewSlider';
// import ExploreMore from '../components/core/HomePage/ExploreMore';

// Assets
import BannerDark from '../assets/Images/banner.mp4';
import BannerLight from '../assets/Images/Bg-Header.png';
import BannerBg from '../assets/Images/Bg-Header-bg.png'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const theme = useSelector((state) => state.theme);
  const textColor = theme === 'dark' ? "#ffd60a" : "#2B74F6";
  const secondaryColor = theme === 'dark' ? "#f59e0b" : "#f97316"; // Amber/Orange

  // Refs for GSAP animations
  const heroRef = useRef(null);
  const featureRefs = useRef([]);
  // const bannerRef = useRef(null)


  // Initialize animations
  useEffect(() => {
    // Hero section animations
    gsap.from(heroRef.current.children, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    // Feature cards animation
    gsap.from(featureRefs.current, {
      scrollTrigger: {
        trigger: featureRefs.current[0],
        start: "top 75%",
        toggleActions: "play none none none"
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.2)"
    });

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Features data
  const features = [
    {
      icon: <FaCode className="text-3xl" />,
      title: "Interactive Learning",
      description: "Learn by doing with our hands-on coding exercises and projects."
    },
    {
      icon: <FaChalkboardTeacher className="text-3xl" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals with real-world experience."
    },
    {
      icon: <FaLaptopCode className="text-3xl" />,
      title: "Real Projects",
      description: "Build portfolio-worthy projects that demonstrate your skills."
    },
    {
      icon: <IoMdTrendingUp className="text-3xl" />,
      title: "Career Growth",
      description: "Structured paths to take you from beginner to job-ready."
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-24 md:py-32 relative z-10" ref={heroRef}>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>🚀 Transform your career today</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span>
                Welcome to {" "}
                <TypeAnimation
                  sequence={[
                    "Study2Success", // Types full line                 
                  ]}
                  style={{
                    display: "inline-block",
                    // fontSize: "36px",
                    color: textColor,
                  }}
                  omitDeletionAnimation={false}
                  cursor={false}
                  key={textColor}
                />
              </span>
            </h1>

            <div className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 mb-8">
              Master in <TypeAnimation
                sequence={[
                  "Web Development",
                  2000,
                  "Data Science",
                  2000,
                  "Mobile Apps",
                  2000,
                  "Cloud Computing",
                  2000,
                  "Machine Learning",
                  2000
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ display: 'inline-block', color: secondaryColor }}
              />
            </div>

            <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              The most effective platform to learn coding and land your dream tech job.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <CTAButton
                active={true}
                linkto="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-indigo-500/20 transition-all"
              >
                Start Learning Free
              </CTAButton>
              <CTAButton
                active={false}
                linkto="/courses"
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg transition-all"
              >
                Browse Courses
              </CTAButton>
            </div>
          </div>

          <div className='mx-auto my-12 shadow-blue-200 w-[70%] relative'>
            {theme === 'dark' ? (
              <>
                <div className='-top-10 w-[800px] videograd'></div>
                <video className='video hover-animate'
                  muted
                  loop
                  autoPlay
                >
                  <source src={BannerDark} type="video/mp4" />
                </video>
              </>
            ) : (
              <div className='relative'>
                <img

                  loading="lazy"
                  src={BannerLight}
                  className='relative md:left-[40%] md:scale-100 scale-150 z-10 hover-animate'
                  alt="Banner"
                />
                <img
                  loading="lazy"
                  src={BannerBg}
                  className='absolute z-9 scale-200 md:scale-100 md:max-w-max md:top-[-30px] md:left-[-250px] shadow hover-animate'
                  alt="Background"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "10,000+", label: "Active Learners" },
              { number: "500+", label: "Hours of Content" },
              { number: "50+", label: "Expert Instructors" },
              { number: "95%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <div key={index} className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="text-indigo-600 dark:text-indigo-400">Study2Success</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform combines the best of theory and practice to help you master new skills faster.
            </p>
          </div>

          {/* <section className="py-20 bg-gray-50 dark:bg-gray-800/30"> */}
          <div className="container mx-auto px-6">
            {/* <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Why <span className="text-indigo-600 dark:text-indigo-400">Thousands of Learners</span> Choose Us
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  We don’t just teach code—we engineer career transformations.
                </p>
              </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <FaLaptopCode className="text-3xl text-indigo-600 dark:text-indigo-400" />,
                  title: "Industry-Driven Curriculum",
                  description: "Courses updated quarterly with insights from tech leaders at Google, Amazon, and startups."
                },
                {
                  icon: <FaUserGraduate className="text-3xl text-orange-500 dark:text-orange-400" />,
                  title: "Job-Focused Projects",
                  description: "Build 10+ portfolio-ready apps (not just tutorials) that hiring managers actually want to see."
                },
                {
                  icon: <IoIosRocket className="text-3xl text-purple-600 dark:text-purple-400" />,
                  title: "1:1 Career Coaching",
                  description: "Resume reviews, mock interviews, and LinkedIn optimization with tech recruiters."
                },
                {
                  icon: <FaChalkboardTeacher className="text-3xl text-amber-500 dark:text-amber-400" />,
                  title: "Live Mentor Sessions",
                  description: "Weekly Q&A with senior developers—get unstuck in real time."
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="w-14 h-14 flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/20 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-4 flex-wrap justify-center">
                <span className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow-sm text-sm font-medium">
                  🏆 92% Job Placement Rate
                </span>
                <span className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow-sm text-sm font-medium">
                  ⏱️ 30-Day Money-Back Guarantee
                </span>
                <span className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow-sm text-sm font-medium">
                  🤝 1,500+ Hiring Partners
                </span>
              </div>
            </div>
          </div>
          {/* </section> */}
        </div>
      </section>

      {/* Code Blocks Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/30">
        <div className="container mx-auto px-6">
          <CodeBlocks
            position="lg:flex-row"
            heading={
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Learn by <span className="text-indigo-600 dark:text-indigo-400">Building</span>
              </h3>
            }
            subheading="Our interactive coding environment lets you practice what you learn immediately with real-time feedback."
            ctabtn1={{
              btnText: "Try Interactive Lesson",
              linkto: "/signup",
              active: true,
              className: "bg-indigo-600 hover:bg-indigo-700 text-white"
            }}
            ctabtn2={{
              btnText: "View Curriculum",
              linkto: "/courses",
              active: false,
              className: "border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`} backgroundGradient="from-indigo-500 to-purple-600"
          />

          <CodeBlocks
            position="lg:flex-row-reverse"
            heading={
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Build <span className="text-orange-500 dark:text-orange-400">Real Projects</span>
              </h3>
            }
            subheading="Apply your skills to practical projects that simulate real-world scenarios."
            ctabtn1={{
              btnText: "Start Building",
              linkto: "/signup",
              active: true,
              className: "bg-orange-500 hover:bg-orange-600 text-white"
            }}
            ctabtn2={{
              btnText: "See Examples",
              linkto: "/projects",
              active: false,
              className: "border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            }}
            codeblock={`import React from 'react';\nexport default () => {\nconst [count, setCount] = React.useState(0);\nreturn <div>\n<h1>{count}</h1>\n<button onClick={() => setCount(c => c + 1)}>+</button>\n</div>;\n}`} codeColor={"text-yellow-25"}
            backgroundGradient="from-orange-500 to-amber-600"
          />
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Structured <span className="text-indigo-600 dark:text-indigo-400">Learning Paths</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Follow our curated paths to go from beginner to job-ready developer.
            </p>
          </div>

          <TimeLineSection />
          <LearningLanguageSection />
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/30">
        <div className="container mx-auto px-6">
          <InstructorSection />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Success <span className="text-indigo-600 dark:text-indigo-400">Stories</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of learners who transformed their careers with Study2Success.
            </p>
          </div>

          <ReviewSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 dark:bg-dark-richblack-900 bg-gray-50 dark:text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch Your Tech Career?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join our community of learners and start building in-demand tech skills today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <CTAButton
                active={true}
                linkto="/signup"
                className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get Started for Free
              </CTAButton>
              <CTAButton
                active={false}
                linkto="/courses"
                className="border-2 border-white text-white hover:bg-indigo-700/20 px-8 py-4 text-lg font-medium rounded-lg transition-all"
              >
                Browse All Courses
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;