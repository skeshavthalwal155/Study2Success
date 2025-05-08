import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { apiConnector } from '../../../../services/apiconnector';
import { courseEndpoints, profileEndpoints } from '../../../../services/apis';
import { fetchCourseCategories } from '../../../../services/operations/courseDetailsAPI';
import { motion } from 'motion/react'
const AdminDashboard = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(null)
  const [category, setCategories] = useState(null)
  const [courses, setCourses] = useState(null)

  const navigate = useNavigate();

  const viewAllCourses = async () => {
    try {
      setLoading(true)
      const response = await apiConnector("GET", courseEndpoints.GET_ALL_COURSES)
      if (response)
        setCourses(response.data.data.length)
      setLoading(false)
    } catch (err) {
      console.log("Error While Fetching Courses Details : ", err)
    }
  }
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await apiConnector("GET", profileEndpoints.GET_USER_API)
      const category = await fetchCourseCategories()
      if (response || category) {
        setUserData(response?.data?.data);
        setCategories(category)
      }
      setLoading(false);
    } catch (err) {
      console.log("Error While Fetching User Data : ", err);
    }
  }

  useEffect(() => {
    getAllUsers()
    viewAllCourses()
  }, [])

  // console.log("user", userData)
  if (courses)
    console.log("courses", courses)

  if (loading) {
    return (
      <div className='flex h-[calc(100vh-3.5rem)] w-full justify-center items-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 dark:text-dark-richblack-500 text-light-richblack-500'></div>
      </div>
    )
  }


  const totalInstructor = () => {
    if (!userData) return 0;

    return userData.reduce((acc, user) => {
      return user?.accountType === "Instructor" ? acc + 1 : acc
    }, 0)
  }

  return (
    <div className='mx-auto w-11/12 max-w-[1000px] py-10 overflow-y-auto'>
      <div className='mb-14 flex items-center justify-between'>
        <h1 className='text-3xl font-medium dark:text-dark-richblack-5 text-light-richblack-5'>Welcome Admin,</h1>
      </div>
      <div className="text-light-richblack-5 dark:text-dark-richblack-5">
        <div className="flex gap-6 flex-wrap justify-evenly">

          <div className="border w-full rounded-xl max-h-[200px] max-w-[400px] p-6 py-15 shadow dark:bg-dark-richblack-700 group hover:scale-105 cursor-pointer duration-200">
            <p className="text-lg font-semibold text-center">Total Users</p>
            <p className='text-center'>{userData?.length}</p>
            <Link to={'/dashboard/all-users'}>
              <p className='text-lg text-center hover:underline dark:text-dark-richblack-5 text-[#227BF3] duration-200  group-hover:opacity-100 opacity-0  '>View All</p>
            </Link>
          </div>

          <div className="border w-full rounded-xl max-h-[200px] max-w-[400px] p-6 py-15 shadow dark:bg-dark-richblack-700 group hover:scale-105 cursor-pointer duration-200">
            <p className="text-lg font-semibold text-center">Total Categories</p>
            <p className='text-center'>{category?.length}</p>
            <Link to={'/dashboard/all-categories'}>
              <p className='text-lg text-center hover:underline dark:text-dark-richblack-5 text-[#227BF3] duration-200  group-hover:opacity-100 opacity-0  '>View All</p>
            </Link>
          </div>

          <div className="border w-full rounded-xl max-h-[200px] max-w-[400px] p-6 py-15 shadow dark:bg-dark-richblack-700 group hover:scale-105 cursor-pointer duration-200">
            <p className="text-lg font-semibold text-center">Total Courses</p>
            <p className='text-center'>
              {               
               courses
              }
            </p>
            <Link to={'/dashboard/all-courses'}>
              <p className='text-lg text-center hover:underline dark:text-dark-richblack-5 text-[#227BF3] duration-200  group-hover:opacity-100 opacity-0  '>View All</p>
            </Link>
          </div>

          <div className="border w-full rounded-xl max-h-[200px] max-w-[400px] p-6 py-15 shadow dark:bg-dark-richblack-700 group hover:scale-105 cursor-pointer duration-200">
            <p className="text-lg font-semibold text-center">Total Instructors</p>
            <p className='text-center'>{totalInstructor()}</p>
            <Link to={'/dashboard/all-users'}>
              <p className='text-lg text-center hover:underline dark:text-dark-richblack-5 text-[#227BF3] duration-200  group-hover:opacity-100 opacity-0  '>View All</p>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminDashboard