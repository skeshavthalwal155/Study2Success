import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegStar } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { removeFromCart } from '../../../../slice/cartSlice'
import { Link } from 'react-router-dom'
import Rating from 'react-rating'
import { FaStar } from 'react-icons/fa'
import RatingStars from '../../../common/RatingStars'

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  return (
    <div className='flex flex-1 flex-col'>
      {cart.map((course, index) => (
        <div key={index} className={`flex w-full flex-wrap items-start justify-between gap-6 mt-4 ${index !== cart.length - 1 && "border-b dark:border-b-dark-richblack-400 border-b-light-richblack-400 pb-6"} ${index !== 0 && "mt-6"}`}>
          <div className='flex flex-1 flex-col gap-4 xl:flex-row'>
            <Link to={`/courses/${course._id}`}>
              <img loading="lazy" src={course?.courseThumbnail} alt={course?.courseName} className='h-[148px] w-[220px] rounded-lg object-fit' />
            </Link>
            <div className='flex flex-col space-y-1'>
              <Link to={`/courses/${course._id}`}>
                <p className='text-lg font-semibold dark:text-dark-richblack-5 text-light-richblack-5 poppins'>{course?.courseName}</p>
              </Link>
              <Link to={`/catalog/${course?.category?.name}`}>
                <p className='text-sm dark:text-dark-richblack-300 text-light-richblack-300'>{course?.category?.name}</p>
              </Link>
              {/* {console.log("first:", course)} */}

              <div className='flex items-center gap-2'>
                <span className='dark:text-dark-yellow-5 text-red-500'>{course?.ratingAndReviews[0]?.rating}</span>
                <RatingStars Review_Count={course?.ratingAndReviews[0]?.rating} />             

                <span className='dark:text-dark-richblack-400 text-light-richblack-400'>{course?.ratingAndReviews?.length} Rating</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-end space-y-2'>
            <p className='mb-6 text-2xl md:text-3xl font-medium dark:text-dark-yellow-100 text-red-500'>₹ {course.price}</p>
            <button className='flex group cursor-pointer items-center gap-x-1 rounded-md border dark:border-r-dark-richblack-600 border-r-light-richblack-600 dark:bg-dark-richblack-700 bg-light-richblack-700
             py-2 px-[8px] dark:text-dark-pink-200 text-light-pink-200 text-lg font-medium'
              onClick={() => dispatch(removeFromCart(course._id))}>
              <RiDeleteBin6Line className='group-hover:animate-bounce'/>
              <span>Remove</span>
            </button>
          </div>
        </div>
      ))
      }
    </div>
  )
}

export default RenderCartCourses