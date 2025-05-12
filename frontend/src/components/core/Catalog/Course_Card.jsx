import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating'


const Course_Card = ({ course, Height }) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0)

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count)
    }, [course])


    // console.log("Course : ", course)
    return (
        <div className='mb-4 hover:scale-[1.03] transition-all duration-200 z-50'>
            <Link to={`/courses/${course._id}`}>
                <div className=''>
                    <div className='rounded-lg'>
                        <img
                            src={course?.courseThumbnail}
                            alt={course.courseName}
                            className={`${Height} w-full rounded-xl object-cover`}
                        />
                    </div>
                    <div className='flex flex-col gap-2 px-1 py-3'>
                        <p className='text-xl dark:text-dark-richblack-5 text-light-richblack-5'>{course?.courseName}</p>
                        <p className='text-sm dark:text-dark-richblack-50 text-light-richblack-50'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        <div className='flex items-center gap-2'>
                            <span className='dark:text-dark-yellow-5 text-light-yellow-5'>{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount} />
                            <span className='dark:text-dark-richblack-400 text-light-richblack-400'>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                        <p className="text-xl dark:text-dark-richblack-5 text-light-richblack-5">Rs. ₹{course?.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Course_Card