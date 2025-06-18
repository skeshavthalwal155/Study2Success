import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import RatingStars from '../../../common/RatingStars'
import GetAvgRating from '../../../../utils/avgRating'
import { IoIosInformationCircleOutline } from "react-icons/io";
import { formatDate } from '../../../../services/formatDate';

const ViewSingleCourse = ({ viewCourse }) => {
    // console.log("coursesss", viewCourse)

    const [avgReviewCount, setAvgReviewCount] = useState(0)

    useEffect(() => {
        const count = GetAvgRating(viewCourse?.course.ratingAndReviews);
        setAvgReviewCount(count)
    }, [viewCourse.course])

    return (
        <div>
            <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white/10 backdrop-blur-sm'>
                <div className='w-11/12 max-w-[800px] m-4 rounded-2xl border relative 
                    dark:border-dark-richblack-400 border-light-richblack-400 
                    dark:bg-dark-richblack-800 bg-light-richblack-800 
                    p-8 shadow-xl transition-all duration-200 hover:shadow-2xl'>
                    
                    <h1 className='text-2xl font-bold font-edu-sa border-b pb-4 
                        dark:border-dark-richblack-400 border-light-richblack-400
                        dark:text-dark-richblack-5 text-light-richblack-5'>
                        Course Details
                    </h1>

                    <button
                        onClick={viewCourse.closeHandler}
                        className='absolute top-6 right-6 p-2 rounded-full 
                            dark:hover:bg-dark-richblack-700 hover:bg-light-richblack-700
                            transition-all duration-200'
                    >
                        <AiOutlineClose className='text-xl hover:scale-125 duration-200' />
                    </button>

                    <div className='flex flex-col gap-y-4 mt-6'>
                        <div className='relative group'>
                            <img loading="lazy" 
                                src={viewCourse.course.courseThumbnail} 
                                alt={viewCourse.courseName} 
                                className='rounded-xl w-full h-[400px] object-cover shadow-lg 
                                    transition-transform duration-300 group-hover:scale-[1.02]' 
                            />
                        </div>

                        <h2 className='font-bold text-3xl pt-4 
                            dark:text-dark-richblack-5 text-light-richblack-5'>
                            {viewCourse.course.courseName}
                        </h2>

                        <p className='text-[16px] leading-relaxed opacity-90'>
                            {viewCourse.course.courseDescription}
                        </p>

                        <div className='flex items-center gap-x-4 bg-opacity-20 p-3 rounded-lg
                            dark:bg-dark-richblack-700 bg-light-richblack-700'>
                            <span className='text-xl dark:text-dark-yellow-5 text-red-500'>
                                {avgReviewCount || 0}
                            </span>
                            <RatingStars Review_Count={avgReviewCount} />
                            <span className='dark:text-dark-richblack-400 text-light-richblack-400'>
                                ({viewCourse.course?.ratingAndReviews?.length} Ratings)
                            </span>
                        </div>

                        <div className='grid grid-cols-2 gap-4 mt-2'>
                            <div className='flex items-center gap-2 p-3 rounded-lg
                                dark:bg-dark-richblack-700 bg-light-richblack-700'>
                                <span className='font-semibold'>
                                    {viewCourse.course.studentsEnrolled.length} Students Enrolled
                                </span>
                            </div>

                            <div className='flex items-center gap-2 p-3 rounded-lg
                                dark:bg-dark-richblack-700 bg-light-richblack-700'>
                                <span>
                                    By {viewCourse.course.instructor.firstName} {viewCourse.course.instructor.lastName}
                                </span>
                            </div>
                        </div>

                        <p className='flex items-center gap-2 text-sm mt-2 
                            dark:text-dark-richblack-400 text-light-richblack-400'>
                            <IoIosInformationCircleOutline className='text-lg' />
                            Created {formatDate(viewCourse.course?.createdAt || course?.updatedAt)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewSingleCourse