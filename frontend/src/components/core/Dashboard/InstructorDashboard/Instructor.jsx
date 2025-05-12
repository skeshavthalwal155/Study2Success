import React, { useEffect, useState } from 'react'
import { getInstructorDashboard } from '../../../../services/operations/ProfileApi'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import InstructorChart from './InstructorChart'
import { Link } from 'react-router-dom'
const Instructor = () => {

    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState(null)
    const { user } = useSelector((state) => state.profile)
    const [courses, setCourses] = useState(false)
    const { token } = useSelector((state) => state.auth)

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true)
            const instructorApiData = await getInstructorDashboard(token)
            const result = await fetchInstructorCourses(token)

            if (instructorApiData.length)
                setInstructorData(instructorApiData)

            if (result)
                setCourses(result)

            setLoading(false)

        }
        getCourseDataWithStats()
    }, [])

    const totalStudent = instructorData?.reduce((acc, curr) => acc + curr.totalStudent, 0)
    // console.log("totalStudent : ", totalStudent)
    const totalRevenue = instructorData?.reduce((acc, curr) => acc + curr.totalRevenue, 0)
    // console.log("totalRevenue : ", totalRevenue)


    return (
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
            <div className='space-y-2'>
                <h1 className='text-2xl font-bold dark:text-dark-richblack-5 text-light-richblack-5'>Hi {user?.firstName} 👋</h1>
                <p className='font-medium dark:text-dark-richblack-200 text-light-richblack-200'>Let's start something new </p>
            </div>
            {
                loading ? (
                    <div className='flex h-[calc(100vh-3.5rem)] w-full justify-center items-center'>
                        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 dark:text-dark-richblack-500 text-light-richblack-500'></div>
                    </div>)
                    : courses.length > 0 ? (
                        <div>
                            <div className='my-4 flex h-[450px] space-x-4'>
                                {/* Render Cart / graph */}
                                {totalRevenue > 0 || totalStudent > 0 ? (
                                    <InstructorChart courses={instructorData} />
                                ) : (
                                    <div className='flex min-w-[250px] flex-col rounded-md dark:bg-dark-richblack-800 bg-light-richblack-800 p-6'>
                                        <p className='text-lg font-bold dark:text-dark-richblack-5 text-light-richblack-5'>Visualize</p>
                                        <p className='mt-4 text-xl font-medium dark:text-dark-richblack-50 text-light-richblack-50'>Not Enough Data to Visualize</p>
                                    </div>
                                )}
                                <div className='flex min-w-[250px] flex-col rounded-md dark:bg-dark-richblack-800 bg-light-richblack-800 p-6'>
                                    <p className='text-lg font-bold dark:text-dark-richblack-5 text-light-richblack-5'>Statistics</p>
                                    <div className='mt-4 space-y-4'>
                                        <div>
                                            <p className='text-lg dark:text-dark-richblack-200 text-light-richblack-200'>Total Courses</p>
                                            <p className='text-3xl font-semibold dark:text-dark-richblack-50 text-light-richblack-50'>{courses.length}</p>
                                        </div>
                                        <div>
                                            <p className='text-lg dark:text-dark-richblack-200 text-light-richblack-200'>Total Students</p>
                                            <p className='text-3xl font-semibold dark:text-dark-richblack-50 text-light-richblack-50'>{totalStudent}</p>
                                        </div>
                                        <div>
                                            <p className='text-lg dark:text-dark-richblack-200 text-light-richblack-200'>Total Income</p>
                                            <p className='text-3xl font-semibold dark:text-dark-richblack-50 text-light-richblack-50'>{totalRevenue}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='dark:bg-dark-richblack-800 bg-light-richblack-800 p-6 rounded-md'>
                                <div className='flex items-center justify-between'>
                                    {/* Render 3 Courses */}
                                    <p className='text-lg font-bold dark:text-dark-richblack-5 text-light-richblack-5'>Your Courses</p>
                                    <Link to="/dashboard/my-courses">
                                        <p className='text-xs font-semibold hover:underline transition-all duration-300 dark:text-dark-yellow-50 text-light-yellow-50'>View All</p>
                                    </Link>
                                </div>
                                <div className='my-4 flex items-start space-x-6'>
                                    {
                                        courses?.slice(0, 3).map((course) => (
                                            <div key={course._id} className='w-1/3'>
                                                <img
                                                    src={course?.courseThumbnail}
                                                    alt={course?.courseName}
                                                    className='h-[201px] w-full rounded-md object-fit'
                                                />
                                                <div className='mt-3 w-full'>
                                                    <p className='text-sm font-medium dark:text-dark-richblack-50 text-light-richblack-50'>{course?.courseName}</p>
                                                    <div className='mt-1 flex items-center space-x-2'>
                                                        <p className='textt-xs font-medium dark:text-dark-richblack-300 text-light-richblack-300'>{course.studentsEnrolled.length} Students</p>
                                                        <p className='text-xs font-medium dark:text-dark-richblack-300 text-light-richblack-300'>|</p>
                                                        <p className='text-xs font-medium dark:text-dark-richblack-300 text-light-richblack-300'>Rs. {course.price}</p>
                                                    </div>

                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )
                        : (
                            <div className='mt-20 rounded-md dark:bg-dark-richblack-800 bg-light-richblack-800 p-6 py-20 flex flex-col items-center justify-center'>
                                <p className='text-center text-2xl font-semibold dark:text-dark-richblack-5 text-light-richblack-5'>
                                    You have Not Created Any Courses Yet
                                </p>
                                <Link to={'/dashboard/add-Course'}>
                                   <p className='mt-1 text-center text-lg font-semibold dark:text-dark-yellow-50 text-light-yellow-50 hover:border transition-all rounded-md duration-300 w-fit p-2'> Create a Course</p>
                                </Link>
                            </div>
                        )
            }

        </div >
    )
}

export default Instructor