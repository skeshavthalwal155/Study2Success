import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getInstructorDashboard } from '../../../../services/operations/ProfileApi'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import InstructorChart from './InstructorChart'

const Instructor = () => {
    const [details, setDetails] = useState([])
    const [courses, setCourses] = useState([])
    const [currentChart, setCurrentChart] = useState('revenue')
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        ; (async () => {
            // get instructor details
            setLoading(true)
            const instructorDetails = await getInstructorDashboard(token)
            const instructorCourses = await fetchInstructorCourses(token)
            console.log("details", instructorDetails);
            console.log("courses", instructorCourses);
            setCourses(instructorCourses)
            setDetails(instructorDetails)
            setLoading(false)
        })();
    }, [])

    const totalEarnings = details?.reduce((acc, course) => {
        return acc + course?.totalRevenue;
    }, 0)
    const totalStudents = details?.reduce((acc, course) => {
        return acc + course?.totalStudent;
    }, 0);

    if (loading) {
        return (
          <div className='flex h-[calc(100vh-3.5rem)] w-full justify-center items-center'>
                <div className=' loader'></div>
            </div>
        )
    }
    return (
        <div>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <div>
                    <div className='space-y-2'>
                        <h1 className='text-2xl font-bold dark:text-dark-richblack-5 text-light-richblack-5'>Hi {user.firstName} 👋</h1>
                        <p className='font-medium text-light-richblack-200 dark:text-dark-richblack-200'>Let's Start Something New</p>
                    </div>
                    <div className='my-4 flex flex-col-reverse gap-3 md:flex-row md:flex md:h-[450px] md:space-x-4'>
                        <div className='flex flex-col flex-1 rounded-md dark:bg-dark-richblack-800 p-6 bg-light-richblack-800 '>
                            <div className='flex items-center justify-between'>
                                <p className='text-lg font-bold text-light-richblack-5 dark:text-dark-richblack-5'>
                                    Visualize
                                </p>
                                <div className='flex items-center space-x-4'>
                                    <button onClick={() => setCurrentChart('revenue')} className={`px-2 py-2 rounded-md ${currentChart === 'revenue' ? 'bg-light-richblack-900 dark:bg-dark-richblack-900 dark:text-dark-yellow-100 text-light-richblack-5' : "dark:bg-dark-richblack-800 bg-light-richblack-800 dark:text-dark-richblack-100 text-light-richblack-100"}`}>Revenue</button>
                                    <button onClick={() => setCurrentChart('students')} className={`px-2 py-2 rounded-md ${currentChart === 'students' ? 'bg-light-richblack-900 dark:bg-dark-richblack-900 dark:text-dark-yellow-100 text-light-richblack-5' : "dark:bg-dark-richblack-800 bg-light-richblack-800 dark:text-dark-richblack-100 text-light-richblack-100"}`}>Students</button>
                                </div>
                            </div>
                            <InstructorChart details={details} currentChart={currentChart} />
                        </div>
                        <div className='flex min-w-[250px] flex-col rounded-md bg-light-richblack-800 dark:bg-dark-richblack-800 p-6'>
                            <p className='text-lg font-bold text-light-richblack-5 dark:text-dark-richblack-5'>Statistics</p>
                            <div className='mt-4 space-y-4'>
                                <div>
                                    <p className='text-lg text-light-richblack-200 dark:text-dark-richblack-200'>Total Courses</p>
                                    <p className='text-3xl font-semibold text-light-richblack-5 dark:text-dark-richblue-5'>{courses?.length}</p>
                                </div>
                                <div>
                                    <p className='text-lg text-light-richblack-200 dark:text-dark-richblack-200'>Total Students</p>
                                    <p className='text-3xl font-semibold text-light-richblack-5 dark:text-dark-richblue-5'>{totalStudents}</p>
                                </div>
                                <div>
                                    <p className='text-lg text-light-richblack-200 dark:text-dark-richblack-200'>Total Earnings</p>
                                    <p className='text-3xl font-semibold text-light-richblack-5 dark:text-dark-richblue-5'>₹ {totalEarnings}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='rounded-md bg-light-richblack-800 dark:bg-dark-richblack-800 p-6'>
                    <div className='flex items-center justify-between'>
                        <p className='text-lg font-bold text-light-richblack-5 dark:text-dark-richblack-5'>Your Courses</p>
                        <button onClick={() => { navigate('/dashboard/my-courses') }} className='text-xs font-semibold cursor-pointer dark:text-dark-yellow-50 hover:underline transition-all duration-300'>
                            View All
                        </button>
                    </div>
                    <div className='my-4 flex space-x-6'>
                        {courses.length === 0 ? <p className='text-sm font-medium dark:text-dark-richblack-300 text-light-richblack-300'>You have not created any courses yet</p>
                            :
                            courses?.slice(0, 3)?.map((course, i) => {
                                return (
                                    <div key={i} className='w-1/3'>
                                        <img className='aspect-video md:h-[201px] w-full rounded-md object-cover' src={course.courseThumbnail} alt={course.courseName} />
                                        <div className='mt-3 w-full'>
                                            <p className='text-sm font-medium dark:text-dark-richblack-300 text-light-richblack-300 '>{course.courseName}</p>
                                            <div className='mt-1 md:space-x-2 md:flex'>
                                                <p className='text-xs font-medium text-light-richblack-300 dark:text-dark-richblack-300'>{course?.studentsEnrolled?.length} Students</p>
                                                <p className='hidden md:block text-xs font-medium text-light-richblack-300 dark:text-dark-richblack-300'>|</p>
                                                <p className='text-xs font-medium text-light-richblack-300 dark:text-dark-richblack-300'>₹ {course?.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Instructor