import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import CTAButton from '../HomePage/Button';


const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
            "Study2Success partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:
            "Study2Success partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading: "Certification",
        description:
            "Study2Success partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
            "Study2Success partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
            "Study2Success partners with more than 275+ leading universities and companies to bring",
    },
];


const LearningGrid = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 mb-10 p-5 lg:w-fit'>
            {
                LearningGridArray.map((card, index) => (
                    <div
                        key={index}
                        className={` xl:h-[294px] p-5
                            ${index === 0 && "lg:col-span-2 dark:bg-dark-richblack-900 bg-light-richblack-900"}
                            ${card.order % 2 === 1 ? "dark:bg-dark-richblack-700 bg-light-richblack-700" : "dark:bg-dark-richblack-800 bg-light-richblack-800"}
                            ${card.order === 3 && "lg:col-start-2"}
                            
                        `}
                    >
                        {
                            card.order < 0 ? (
                                <div className='lg:w-[90%] flex flex-col pb-10 xl:pb-0 gap-3'>
                                    <div className='text-4xl font-semibold dark:text-dark-richblack-5 text-light-richblack-5'>
                                        {card.heading}
                                        <HighlightText text={card.highlightText} />
                                    </div>
                                    <p className='font-medium  text-justify'>{card.description}</p>
                                    <div className='w-fit mt-4'>
                                        <CTAButton active={true} linkto={card.BtnLink}>
                                            {card.BtnText}
                                        </CTAButton>
                                    </div>
                                </div>
                            )
                                : (
                                    <div className='flex flex-col gap-8 p-7'>
                                        <h1 className='dark:text-dark-richblack-5 text-light-richblack-5 text-lg'>{card.heading}</h1>
                                        <p className='text-justify dark:text-dark-richblack-300 text-light-richblack-300 font-medium'>{card.description}</p>
                                    </div>
                                )
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default LearningGrid