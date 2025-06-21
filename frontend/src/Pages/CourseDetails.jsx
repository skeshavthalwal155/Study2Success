import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import GetAvgRating from "../utils/avgRating"
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard'
import ConfirmationModal from '../components/common/ConfirmationModal'
import RatingStars from '../components/common/RatingStars'
import { BiInfoCircle } from 'react-icons/bi'
import { HiOutlineGlobeAlt } from 'react-icons/hi'
import { formatDate } from '../services/formatDate'
import { formatDuration } from '../services/formattedTime'
import Footer from '../components/common/Footer'
import toast from 'react-hot-toast'
import { ACCOUNT_TYPE } from '../utils/constants'
import { addToCart } from '../slice/cartSlice'
import ReactMarkdown from 'react-markdown'
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar'

const CourseDetails = () => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(null)
    const { paymentLoading } = useSelector((state) => state.course)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id: courseId } = useParams()
    const [confirmationModal, setConfirmationModal] = useState(null)
    const [avgRatingCount, setAvgRatingCount] = useState(0)
    const [courseData, setCourseData] = useState(null)
    const [isActive, setIsActive] = useState(Array(0))

    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)
                ? isActive.concat(id)
                : isActive.filter((e) => e.id)
        )
    }

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
            dispatch(addToCart(courseData));
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

    useEffect(() => {
        // Calling fetchCourseDetails fucntion to fetch the details
        const getAllCourses = async () => {
            try {
                // setLoading(true)
                const res = await fetchCourseDetails(courseId, dispatch)
                // console.log("course details res: ", res)
                setCourseData(res)
                setLoading(false)
            } catch (error) {
                console.log("Could not fetch Course Details")
            }
        }
        getAllCourses()
    }, [courseId])
    useEffect(() => {
        const count = GetAvgRating(courseData?.ratingAndReviews)
        setAvgRatingCount(count)
    }, [courseData])
    const [totalNoOfLecture, setTotalNoOfLecture] = useState(0)
    useEffect(() => {
        let lecture = 0
        courseData?.courseContent?.forEach((sec) => {
            lecture += sec.SubSection.length || 0
        })
        setTotalNoOfLecture(lecture)
    }, [courseData])

    if (loading || !courseData) {
        return (
            <div className='flex h-[calc(100vh-3.5rem)] w-full justify-center items-center'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 dark:text-dark-richblack-500 text-light-richblack-500'></div>
            </div>
        )
    }

    const handleBuyCourse = () => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch)
            return
        }
        setConfirmationModal({
            text1: "You are not Logged in",
            text2: "Please Login to purchase this course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => { navigate('/login') },
            btn2Handler: () => {setConfirmationModal(null) }
        })

    }

    const {
        _id: course_Id,
        courseName,
        courseDescription,
        courseThumbnail,
        price,
        createdAt,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled

    } = courseData

    return (
        <>
            <div className='relative w-full bg-light-richblack-800 dark:bg-dark-richblack-800'>
                {/* Hero Section */}
                <div className='mx-auto box-content px-4 lg:w-[1260px] 2xl:relative'>
                    <div className='mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]'>
                        <div className='relative block max-h-[30rem] lg:hidden '>
                            <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                            <img loading="lazy" src={courseThumbnail} alt={courseName} className='aspect-auto w-full' />
                        </div>
                        <div className='z-30 my-5 flex flex-col justify-between gap-4 py-5 text-lg text-light-richblack-5 dark:text-dark-richblack-5'>
                            <p className='text-4xl font-bold text-light-richblack-5 dark:text-dark-richblack-5 sm:text-[42px]'>{courseName}</p>
                            <p className='text-light-richblack-200 dark:text-dark-richblack-200'>{courseDescription}</p>
                            <div className='text-md flex flex-wrap items-center gap-2'>
                                <span className='dark:text-dark-yellow-25 text-red-500'>{avgRatingCount || 0}</span>
                                <RatingStars Review_Count={avgRatingCount} />
                                <span>{`(${ratingAndReviews.length} Reviews)`}</span>
                                <span> {`(${studentsEnrolled.length} Students Enrolled)`} </span>
                            </div>
                            <div>
                                <p>{`Created by ${instructor?.firstName} ${instructor?.lastName}`}</p>
                            </div>
                            <div className='flex flex-wrap gap-5 text-lg'>
                                <p className='flex items-center gap-2'>
                                    {" "}
                                    <BiInfoCircle />
                                    {`Created at ${formatDate(createdAt)}`}
                                </p>
                                <p className='flex items-center gap-2'>
                                    {" "}
                                    <HiOutlineGlobeAlt />
                                    {`English`}
                                </p>
                            </div>
                        </div>
                        <div className='flex w-full flex-col border-y border-y-light-richblack-500 dark:border-y-dark-richblack-500 py-4 lg:hidden'>
                            <p className='space-x-3 pb-4 text-3xl font-semibold text-light-richblack-5 dark:text-dark-richblack-5'>
                                Rs. {price}
                            </p>
                            <button className='yellowButton mb-4' onClick={handleBuyCourse}>
                                Buy Now
                            </button>
                            <button className='blackButton' onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                    </div>
                    <div className='lg:absolute z-50 right-[1rem] top-[60px] mx-auto hidden lg:block min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0
                    '>
                        <CourseDetailsCard
                            course={courseData}
                            setConfirmationModal={setConfirmationModal}
                            handleBuyCourse={handleBuyCourse}
                        />
                    </div>
                </div>
            </div>

            <div className='mx-auto box-content px-4 text-start dark:text-dark-richblack-5 text-light-richblack-5 lg:w-[1260px]'>
                <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]'>
                    <div className='my-8 border border-light-richblack-600 dark:border-dark-richblack-600 p-8'>
                        <p className='text-3xl font-semibold'>What You Will Learn</p>
                        <div className='mt-5'>
                            <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
                        </div>
                    </div>

                    {/* Course Content Section */}
                    <div className='max-w-[830px]'>
                        <div className='flex flex-col gap-3'>
                            <p className='text-[28px] font-semibold'>Course Content</p>
                            <div className='flex flex-wrap justify-between gap-2'>
                                <div className='flex gap-2'>
                                    <span>{courseContent.length} section(s)</span>
                                    <span>{totalNoOfLecture} Lectures</span>
                                    <span>{formatDuration(courseContent[0]?.SubSection[0]?.timeDuration)}</span>
                                </div>
                                <div>
                                    <button
                                        className='dark:text-dark-yellow-25 duration-200 hover:underline text-red-500 cursor-pointer'
                                        onClick={() => setIsActive([])}
                                    >
                                        Collapse All Sections
                                    </button>
                                </div>
                            </div>

                            {/* Course Details Accordion */}
                            <div className='py-4'>
                                {courseContent?.map((course, index)=>(
                                    <CourseAccordionBar
                                        course={course}
                                        key={index}
                                        isActive={isActive}
                                        handleActive={handleActive}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <Footer />

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    )
}

export default CourseDetails
