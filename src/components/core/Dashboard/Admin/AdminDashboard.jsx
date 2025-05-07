import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../../../../services/apiconnector';
import { profileEndpoints } from '../../../../services/apis';
import { fetchCourseCategories } from '../../../../services/operations/courseDetailsAPI';

const AdminDashboard = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(null)
  const [category, setCategories] = useState(null)
  const [totalCourse, setTotalCourse] = useState(0)
  const navigate = useNavigate();

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
  }, [])

  // console.log("user", userData)
  // console.log("category", category)

  if (loading) {
    return (
      <div className='flex h-[calc(100vh-3.5rem)] w-full justify-center items-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 dark:text-dark-richblack-500 text-light-richblack-500'></div>
      </div>
    )
  }

  const totalCourses = () => {
    if (!category) return 0;
  
    return category.reduce((acc, currCategory) => {
      return acc + (currCategory.courses?.length || 0);
    }, 0);
  };
  
  return (
    <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
      <div>
        <div className='mb-14 flex items-center justify-between'>
          <h1 className='text-3xl font-medium dark:text-dark-richblack-5 text-light-richblack-5'>Welcome Admin,</h1>
        </div>
      </div>
      <div >
        <div>
          Total Users
          {userData?.length}
        </div>
        <div>
          Total Categories
          {category?.length}
        </div>       
        <div>
          Total Courses
          {totalCourses()}
        </div>       
        <div>
          Total Instructor
          {totalCourses()}
        </div>       
      </div>
    </div>
  )
}

export default AdminDashboard