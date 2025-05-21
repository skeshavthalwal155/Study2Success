import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { apiConnector } from '../../../../services/apiconnector';
import { courseEndpoints, profileEndpoints } from '../../../../services/apis';
import { fetchCourseCategories } from '../../../../services/operations/courseDetailsAPI';

import { useSelector } from 'react-redux';
const AdminDashboard = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(null)
  const [category, setCategories] = useState(null)
  const [courses, setCourses] = useState(null)

  const {token} = useSelector((state)=>state.auth)

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
  const getAllUsers = async (token) => {
    try {
      setLoading(true);
      const response = await apiConnector("GET", profileEndpoints.GET_USER_API,null, {
         authorization: `Bearer ${token}`
      })
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
    getAllUsers(token)
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
    <div className='mx-auto w-11/12 max-w-[1200px] py-10'>
      <div className='mb-14 flex items-center justify-between'>
        <h1 className='text-4xl font-bold dark:text-dark-richblack-5 text-light-richblack-5 
        tracking-wider border-b-2 border-[#227BF3] pb-2'>Welcome Admin</h1>
      </div>
      <div className="text-light-richblack-5 dark:text-dark-richblack-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          <div className="relative overflow-hidden border-2 rounded-2xl p-6 shadow-lg 
          dark:bg-dark-richblack-700 bg-white backdrop-blur-sm
          hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#227BF3] opacity-20"></div>
            <p className="text-xl font-bold mb-4 dark:text-white text-gray-800">Total Users</p>
            <p className='text-3xl font-semibold mb-4 dark:text-[#227BF3] text-[#227BF3]'>{userData?.length}</p>
            <Link to={'/dashboard/all-users'}>
              <p className='text-sm font-medium hover:underline dark:text-dark-richblack-5 text-gray-600 
              hover:text-[#227BF3] transition-colors'>View All →</p>
            </Link>
          </div>

          <div className="relative overflow-hidden border-2 rounded-2xl p-6 shadow-lg 
          dark:bg-dark-richblack-700 bg-white backdrop-blur-sm
          hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#227BF3] opacity-20"></div>
            <p className="text-xl font-bold mb-4 dark:text-white text-gray-800">Total Categories</p>
            <p className='text-3xl font-semibold mb-4 dark:text-[#227BF3] text-[#227BF3]'>{category?.length}</p>
            <Link to={'/dashboard/all-categories'}>
              <p className='text-sm font-medium hover:underline dark:text-dark-richblack-5 text-gray-600 
              hover:text-[#227BF3] transition-colors'>View All →</p>
            </Link>
          </div>

          <div className="relative overflow-hidden border-2 rounded-2xl p-6 shadow-lg 
          dark:bg-dark-richblack-700 bg-white backdrop-blur-sm
          hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#227BF3] opacity-20"></div>
            <p className="text-xl font-bold mb-4 dark:text-white text-gray-800">Total Courses</p>
            <p className='text-3xl font-semibold mb-4 dark:text-[#227BF3] text-[#227BF3]'>{courses}</p>
            <Link to={'/dashboard/all-courses'}>
              <p className='text-sm font-medium hover:underline dark:text-dark-richblack-5 text-gray-600 
              hover:text-[#227BF3] transition-colors'>View All →</p>
            </Link>
          </div>

          <div className="relative overflow-hidden border-2 rounded-2xl p-6 shadow-lg 
          dark:bg-dark-richblack-700 bg-white backdrop-blur-sm
          hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#227BF3] opacity-20"></div>
            <p className="text-xl font-bold mb-4 dark:text-white text-gray-800">Total Instructors</p>
            <p className='text-3xl font-semibold mb-4 dark:text-[#227BF3] text-[#227BF3]'>{totalInstructor()}</p>
            <Link to={'/dashboard/all-users'}>
              <p className='text-sm font-medium hover:underline dark:text-dark-richblack-5 text-gray-600 
              hover:text-[#227BF3] transition-colors'>View All →</p>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminDashboard