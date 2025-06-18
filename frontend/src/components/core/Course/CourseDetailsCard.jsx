import React, { use } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaCaretRight } from "react-icons/fa";
import { toast } from 'react-hot-toast'
import copy from 'copy-to-clipboard'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { addToCart } from '../../../slice/cartSlice';
import { FaShareSquare } from 'react-icons/fa'

export default function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    courseThumbnail: Thumbnail,
    price: currentPrice
  } = course

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor, You can't Buy a Course")
      return
    }
    if (user && user?.accountType === ACCOUNT_TYPE.ADMIN) {
      toast.error("You are an Admin, You can't Buy a Course")
      return
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You are not Logged in",
      text2: "Please Login for Add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => { navigate('/login') },
      btn2Handler: () => setConfirmationModal(null)
    })
  }
  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link Copied to Clipboard")
  }

  return (
    <>
      <div className={`flex flex-col gap-4 rounded-md dark:bg-dark-richblack-700 bg-light-richblack-700 p-4 dark:text-dark-richblack-5 text-light-richblack-5`}>
        <img loading="lazy" src={Thumbnail}
          alt={course.courseName}
          className='max-h-[300px] min-h-[180px] w-[400px] rounded-2xl object-cover md:max-w-full'
        />
        <div className='px-4'>
          <div className='space-x-3 pb-4 text-3xl font-semibold dark:text-dark-richblack-5 text-light-richblack-5'>
            Rs. {currentPrice}
          </div>
          <div className='flex flex-col gap-4'>
            <button className='yellowButton' onClick={user && course?.studentsEnrolled.includes(user?._id)
              ? () => navigate("/dashboard/enrolled-courses")
              : (handleBuyCourse)
            }
            >
              {
                user && course?.studentsEnrolled.includes(user?._id) ? "Go To Course" : "Buy Now"
              }
            </button>
            {
              (!course.studentsEnrolled.includes(user?._id) && (
                <button className='blackButton' onClick={handleAddToCart}>
                  Add to Cart
                </button>
              ))
            }
          </div>
          <div>
            <p className='pb-3 pt-6 text-center text-sm dark:text-dark-richblack-25 text-light-richblack-25'>30-Day Money-Back Guarantee</p>
          </div>
          <div>
            <p className='my-2 text-xl font-semibold'>This Code Includes:</p>
            <div className='flex flex-col gap-3 text-sm dark:text-dark-caribbeangreen-100 text-light-caribbeangreen-100'>
              {JSON.parse(course?.instructions?.[0] || "[]").map((item, index) => (
                <p key={index} className='flex gap-2 items-center'>
                  <FaCaretRight />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>
          <div className='text-center'>
            <button
              className='mx-auto flex cursor-pointer transition-all duration-200 hover:underline items-center gap-2 py-6 dark:text-dark-yellow-100 text-red-500'
              onClick={handleShare}>
              <FaShareSquare /> Share
            </button>
          </div>

        </div>
      </div >

    </>
  )
}