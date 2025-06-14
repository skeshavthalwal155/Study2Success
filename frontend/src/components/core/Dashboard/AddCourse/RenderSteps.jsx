import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourse from './PublishCourse/PublishCourse';

const RenderSteps = () => {
    const { step } = useSelector((state) => state.course);
    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder"
        },
        {
            id: 3,
            title: "Publishing Course"
        },
    ]
    return (
        <>
            <div className='relative mb-2 flex w-full justify-center'>
                {steps.map((item) => (
                    < React.Fragment >
                        <div
                            key={item.id}
                            className='flex flex-col items-center'

                        >
                            <button
                                className={`grid select-none aspect-square w-[34px] place-items-center rounded-full border-[1px] ${step === item.id
                                    ? "dark:border-dark-yellow-50 border-black dark:bg-dark-yellow-900 bg-light-yellow-900 dark:text-dark-yellow-50 text-black"
                                    : "dark:border-dark-richblack-700 border-light-richblack-700 dark:bg-dark-richblack-800 bg-light-richblack-800 dark:text-dark-richblack-300 text-light-richblack-300"
                                    } ${step > item.id && "dark:bg-dark-yellow-5 bg-light-yellow-800 dark:text-dark-yellow-50 text-black"}`}
                            >
                                {step > item.id ? (
                                    <FaCheck className='font-bold dark:text-dark-richblack-900 text-light-richblack-50' />
                                ) : (
                                    item.id
                                )}
                            </button>
                        </div>
                        {item.id !== steps.length && (
                            <>
                                <div className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2 ${step > item.id ? "dark:border-dark-yellow-50 border-light-yellow-500" : 'dark:border-dark-richblack-500 border-light-richblack-500'
                                    }`}>

                                </div>
                            </>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className='relative mb-16 flex w-full select-none justify-between'>
                {
                    steps.map((item) => (
                        <div className='flex min-w-[130px] flex-col items-center gap-y-2' key={item.id} >
                            <p
                                className={`text-sm ${step >= item.id ? "dark:text-dark-richblack-5 text-light-richblack-5" : "dark:text-dark-richblack-500 text-light-richblack-500"
                                    }`}
                            >
                                {item.title}
                            </p>
                        </div>

                    ))}
            </div>
            {/* Rendering Specified component based on current step */}
            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm />}
            {step === 3 && <PublishCourse />}
        </>
    )
}

export default RenderSteps