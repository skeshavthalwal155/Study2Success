import React from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import HighlightText from './HighlightText'
import { useState } from 'react'
import CourseCard from './CourseCard'


const tabsName = [
    "Free",
    "New To Coding",
    "Most Popular",
    "Skill Paths",
    "Career Paths"
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
        // console.log(result[0].courses);
    }
    return (
        <div>

            <div className='text-3xl font-semibold text-center lg:text-4xl'>
                Unlock the
                <HighlightText text={"Power of Code"} />
            </div>

            <p className='text-center text-light-richblack-300 dark:text-dark-richblack-300 text-sm text-[16px] mt-3'>
                Learn to Build Anything You Can Imagine
            </p>

            <div className='hidden lg:flex gap-5 mt-5 mx-auto w-max bg-light-richblack-800 dark:bg-dark-richblack-800 text-light-richblack-200 dark:text-dark-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
                {
                    tabsName.map((element, index) => {
                        return (
                            <div
                                className={`text-[13px] lg:text-[16px] flex flex-row items-center gap-2 
                                ${currentTab === element
                                        ? "bg-light-richblack-900 dark:bg-dark-richblack-900 dark:text-dark-richblack-5 text-light-richblack-5 font-medium"
                                        : "text-light-richblack-200 dark:text-dark-richblack-200"} rounded-full transition-all duration-200 cursor-pointer
                                     hover:bg-light-richblack-900 hover:dark:bg-dark-richblack-900 hover:dark:text-dark-richblack-5 hover:text-light-richblack-5 text-center px-3 py-1 lg:px-7 lg:py-2 `}
                                key={index}
                                onClick={() => setMyCards(element)}
                            >
                                {element}
                            </div>
                        )
                    })
                }

            </div>

            <div className='hidden lg:block lg:h-[200px]'></div>

            {/* Course Card Group */}

            <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black dark:text-white lg:mb-0 mb-7 lg:px-0 px-3'>
                {
                    courses.map((element, index) => {
                        return (
                            <CourseCard
                                key={index}
                                cardData={element}
                                currentCard={currentCard}
                                setCurrentCard={setCurrentCard}
                            />
                        )
                    })
                }
            </div>


        </div>
    )
}

export default ExploreMore
