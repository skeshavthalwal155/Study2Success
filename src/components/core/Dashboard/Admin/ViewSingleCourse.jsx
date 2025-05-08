import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import RatingStars from '../../../common/RatingStars'
import GetAvgRating from '../../../../utils/avgRating'
import { IoIosInformationCircleOutline } from "react-icons/io";
import { formatDate } from '../../../../services/formatDate';

const ViewSingleCourse = ({ viewCourse }) => {
    console.log("coursesss", viewCourse)

    const [avgReviewCount, setAvgReviewCount] = useState(0)

    useEffect(() => {
        const count = GetAvgRating(viewCourse?.course.ratingAndReviews);
        setAvgReviewCount(count)
    }, [viewCourse.course])

    return (
        <div>
            <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white/10 backdrop-blur-sm'>
                <div className='w-11/12 max-w-[400px] m-4 rounded-lg border relative dark:border-dark-richblack-400 border-light-richblack-400 dark:bg-dark-richblack-800 bg-light-richblack-800 p-6 '>
                    <h1 className='text-xl font-medium font-edu-sa border-b pb-4 dark:border-dark-richblack-400 border-light-richblack-400'>View Course</h1>
                    <button
                        onClick={viewCourse.closeHandler}
                    >
                        <AiOutlineClose className='cursor-pointer absolute top-6 right-6 hover:scale-125 duration-200' />
                    </button>
                    <div className='flex flex-col gap-y-2'>
                        <p className='text-2xl font-semibold dark:text-dark-richblack-5 text-light-richblack-5'>
                            <img src={viewCourse.course.courseThumbnail} alt={viewCourse.courseName} className='rounded-xl shadow w-[500px]' />
                        </p>
                        <p className='font-bold text-2xl pt-4'>{viewCourse.course.courseName}</p>
                        <p className='text-[14px]'>{viewCourse.course.courseDescription}</p>

                        <div className='flex gap-x-2'>
                            <span className='dark:text-dark-yellow-5 text-light-yellow-5'>{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount} />
                            <span className='dark:text-dark-richblack-400 text-light-richblack-400'>{viewCourse.course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                        <p>{viewCourse.course.studentsEnrolled.length} Students Enrolled</p>
                        <p>
                            Created By {viewCourse.course.instructor.firstName} {viewCourse.course.instructor.lastName}
                        </p>
                        <p className='flex items-center gap-2'>
                            <IoIosInformationCircleOutline />
                            Created {formatDate(viewCourse.course?.createdAt || course?.updatedAt)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewSingleCourse