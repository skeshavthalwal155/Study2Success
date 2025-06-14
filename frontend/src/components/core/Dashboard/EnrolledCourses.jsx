import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/ProfileApi'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { formatDuration } from '../../../services/formattedTime'
import { useNavigate } from 'react-router-dom'

const EnrolledCourses = () => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const [enrolledCourses, setEnrolledCourses] = useState(null)
    const [progressData, setProgressData] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const getEnrolledCourses = async () => {
        try {
            setLoading(true)
            const response = await getUserEnrolledCourses(token, dispatch)
            setEnrolledCourses(response?.courses)
            setProgressData(response?.courseProgress)
        } catch (err) {
            console.error("Error fetching enrolled courses:", err)
        } finally {
            setLoading(false)
        }
    }

    const calculateProgress = (course) => {
        if (!course.courseContent || !progressData) return 0

        // Find progress for this specific course
        const courseProgress = progressData.find(
            progress => progress.courseId.toString() === course._id.toString()
        )

        if (!courseProgress) return 0

        // Calculate total subsections in course
        const totalSubsections = course.courseContent.reduce(
            (total, section) => total + (section.SubSection?.length || 0),
            0
        )

        if (totalSubsections === 0) return 0

        // Calculate completed subsections
        const completedSubsections = courseProgress.completeVideos?.length || 0

        return Math.round((completedSubsections / totalSubsections) * 100)
    }

    useEffect(() => {
        getEnrolledCourses()
    }, [])

    if (loading) {
        return (
            <div className='flex h-[calc(100vh-3.5rem)] w-full justify-center items-center'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 dark:text-dark-richblack-500 text-light-richblack-500'></div>
            </div>
        )
    }

    return (
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
            <div className='text-3xl dark:text-dark-richblack-50 text-light-richblack-50'>Enrolled Courses</div>
            
            {!enrolledCourses ? (
                <div className='flex flex-col gap-4 text-2xl text-center dark:text-dark-richblack-5 text-light-richblack-5 items-center justify-center h-[calc(100vh-3.5rem)]'>
                    <div className='loader'></div>
                    <p>Loading...</p>
                </div>
            ) : !enrolledCourses.length ? (
                <p className='grid h-[10vh] w-full place-content-center dark:text-dark-red-600 text-light-red-600'>
                    You Have Not Enrolled in any courses yet
                </p>
            ) : (
                <div className='my-8 dark:text-dark-richblack-5 text-light-richblack-5'>
                    <div className='flex rounded-t-lg dark:bg-dark-richblack-500 bg-light-richblack-500'>
                        <p className='w-[45%] px-5 py-3'>Course Name</p>
                        <p className='w-1/4 px-2 py-3'>Duration</p>
                        <p className='flex-1 px-2 py-3'>Progress</p>
                    </div>
                    
                    {enrolledCourses.map((course, i, arr) => {
                        const progress = calculateProgress(course)
                        return (
                            <div
                                className={`flex items-center border dark:border-dark-richblack-700 border-light-richblack-700 ${
                                    i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                                }`}
                                key={course._id}
                            >
                                <div
                                    className='flex w-[45%] md:flex-row flex-col cursor-pointer md:items-center gap-4 px-5 py-3'
                                    onClick={() => {
                                        navigate(
                                            `/view-course/${course._id}/section/${
                                                course.courseContent?.[0]?._id
                                            }/sub-section/${
                                                course.courseContent?.[0]?.SubSection?.[0]?._id
                                            }`
                                        )
                                    }}
                                >
                                    <img
                                        src={course.courseThumbnail}
                                        alt='course_img'
                                        className='h-14 w-20 rounded-lg object-cover'
                                    />
                                    <div className='flex max-w-xs flex-col gap-2'>
                                        <p className='font-semibold'>{course.courseName}</p>
                                        <p className='text-xs dark:text-dark-richblack-300 text-light-richblack-300'>
                                            {course.courseDescription.length > 50
                                                ? `${course.courseDescription.slice(0, 50)}...`
                                                : course.courseDescription
                                            }
                                        </p>
                                    </div>
                                </div>
                                
                                <div className='w-1/4 px-2 py-3'>
                                    {formatDuration(course?.courseContent?.[0]?.SubSection?.[0]?.timeDuration)}
                                </div>
                                
                                <div className='flex w-1/5 flex-col gap-2 px-2 py-3'>
                                    <div className="relative w-20 h-20">
                                        <CircularProgressbar
                                            value={progress}
                                            text={`${progress}%`}
                                            strokeWidth={8}
                                            styles={buildStyles({
                                                rotation: 0.25,
                                                strokeLinecap: 'butt',
                                                textSize: '16px',
                                                pathTransitionDuration: 0.5,
                                                pathColor: `rgba(62, 152, 199, ${progress / 100})`,
                                                textColor: '#f88',
                                                trailColor: '#d6d6d6',
                                                backgroundColor: '#3e98c7',
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default EnrolledCourses