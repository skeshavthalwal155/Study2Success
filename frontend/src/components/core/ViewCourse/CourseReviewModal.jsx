import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn'
import Rating from 'react-rating'
import { createRating } from '../../../services/operations/courseDetailsAPI'
import { RxCross2 } from 'react-icons/rx'
import { FaStar } from 'react-icons/fa'
import { FaRegStar } from 'react-icons/fa'
import RatingStars from '../../common/RatingStars'

const CourseReviewModal = ({ setReviewModal }) => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { courseEntireData } = useSelector((state) => state.viewCourse)

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm()

    const [rating, setRating] = useState(0)
    const [alreadyReview, setAlreadyReview] = useState(false)
    const [userReview, setUserReview] = useState(null)

    useEffect(() => {
        // Check if user already review
        if (courseEntireData?.ratingAndReviews) {
            const review = courseEntireData?.ratingAndReviews.find((review) => review?.user === user?._id)
            if (review) {
                setAlreadyReview(true)
                setUserReview(review)
            }
        }
        // Reset Fields
        setValue("courseExperience", "")
        setValue("courseRating", 0)
    }, [courseEntireData, user, setValue])

    const onSubmit = async (data) => {
        await createRating(
            {
                courseId: courseEntireData._id,
                rating: data.courseRating,
                review: data.courseExperience
            },
            token
        )
        setReviewModal(false)
    }

    const handleRatingChange = (newRating) => {
        setRating(newRating)
        setValue('courseRating', newRating)
    }

    return (
        <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen place-items-center overflow-auto bg-white/20 backdrop-blur-sm'>
            <div className='my-10 w-11/12 max-w-[700px] rounded-lg border dark:border-dark-richblack-400 border-light-richblack-400 dark:bg-dark-richblack-800 bg-light-richblack-800'>
                {/* Modal Header */}
                <div className='flex items-center justify-between rounded-t-lg bg-light-richblack-700 dark:bg-dark-richblack-700 p-5'>
                    <p className='text-xl font-semibold text-light-richblack-5 dark:text-dark-richblack-5'>
                        {alreadyReview ? "User Review" : "Add Review"}
                    </p>
                    <button onClick={() => setReviewModal(false)}>
                        <RxCross2 className='text-2xl text-light-richblack-5 dark:text-dark-richblack-5 cursor-pointer' />
                    </button>
                </div>

                {/* Modal Body */}
                <div className='p-6'>
                    <div className='flex items-center justify-center gap-x-4'>
                        <img
                            src={user?.image}
                            alt={user?.firstName}
                            className='aspect-square w-[50px] rounded-full object-cover'
                        />
                        <div>
                            <p className='font-semibold text-light-richblack-5 dark:text-dark-richblack-5'>
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className='text-sm text-light-richblack-5 dark:text-dark-richblack-5'>
                                {alreadyReview ? "Your Posted Review" : "Posting Publicly"}
                            </p>
                        </div>
                    </div>
                    {/* If Already Reviewed */}
                    {
                        alreadyReview ? (
                            <div className='mt-6 flex flex-col items-center'>
                                <div className='mb-4'>
                                    <RatingStars Review_Count={userReview?.rating} />                                 
                                </div>
                                <div className='flex w-11/12 flex-col space-y-2'>
                                    <p className='text-sm text-light-richblack-5 dark:text-dark-richblack-5'>Your Experience</p>
                                    <p className='rounded-md bg-light-richblack-700 dark:bg-dark-richblack-700 p-3 dark:text-dark-richblack-100 text-light-richblack-100'>
                                        {userReview?.review}
                                    </p>
                                </div>
                            </div>
                        ) : (<form onSubmit={handleSubmit(onSubmit)} className='mt-6 flex flex-col items-center'>
                            <div className='mb-4'>
                                <Rating
                                    initialRating={rating}
                                    emptySymbol={<FaRegStar size={24} className="text-red-500 dark:text-dark-yellow-100" />}
                                    fullSymbol={<FaStar size={24} className="text-red-500 dark:text-dark-yellow-100" />}
                                    onChange={handleRatingChange}
                                />
                            </div>

                            <div className='flex w-11/12 flex-col space-y-2'>
                                <label className='text-sm dark:text-dark-richblack-5 text-light-richblack-5' htmlFor="courseExperience">
                                    Add Your Experience <sup className="dark:text-dark-pink-200 text-red-600">*</sup>
                                </label>
                                <textarea
                                    id="courseExperience"
                                    placeholder='Add Your Experience'
                                    {...register('courseExperience', { required: true })}
                                    className='form-style w-full rounded-[0.5rem] bg-light-richblack-700 dark:bg-dark-richblack-800 p-[12px] text-richblack-5 min-h-[140px]'
                                    />
                                {errors.courseExperience && (
                                    <span className="ml-2 text-xs tracking-wide text-red-600 dark:text-dark-pink-200">
                                        Please Add Your Experience
                                    </span>
                                )}
                            </div>

                            <div className='mt-6 flex w-11/12 justify-end gap-x-2'>
                                <button
                                    type="button"
                                    onClick={() => setReviewModal(false)}
                                    className='flex cursor-pointer items-center gap-x-2 rounded-md bg-light-richblack-300 dark:bg-dark-richblack-300 py-[8px] px-[20px] font-semibold text-light-richblack-900 dark:text-dark-richblack-900'
                                >
                                    Cancel
                                </button>
                                <IconBtn text="Save" type="submit" />
                            </div>
                        </form>)
                    }

                </div>
            </div>
        </div>
    )
}

export default CourseReviewModal
