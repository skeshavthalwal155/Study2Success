import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import RatingStars from '../../../common/RatingStars'
import GetAvgRating from '../../../../utils/avgRating'


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
                <div className='w-11/12 max-w-[350px] rounded-lg border dark:border-dark-richblack-400 border-light-richblack-400 dark:bg-dark-richblack-800 bg-light-richblack-800 p-6 '>
                    <button
                        onClick={viewCourse.closeHandler}
                    >
                        <AiOutlineClose className='cursor-pointer' />
                    </button>
                    <p className='text-2xl font-semibold dark:text-dark-richblack-5 text-light-richblack-5'>
                        <img src={viewCourse.course.courseThumbnail} alt={viewCourse.courseName} />
                    </p>
                    <p>{viewCourse.course.courseName}</p>
                    <p>{viewCourse.course.courseDescription}</p>

                    <span className='dark:text-dark-yellow-5 text-light-yellow-5'>{avgReviewCount || 0}</span>
                    <RatingStars Review_Count={avgReviewCount} />
                    <span className='dark:text-dark-richblack-400 text-light-richblack-400'>{viewCourse.course?.ratingAndReviews?.length} Ratings</span>

                </div>
            </div>
        </div>
    )
}

export default ViewSingleCourse