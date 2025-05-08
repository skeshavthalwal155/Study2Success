import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../../../services/apiconnector'
import { courseEndpoints } from '../../../../services/apis'
import ViewAllCoursesTable from './ViewAllCoursesTable'

const ViewAllCourses = () => {
  const [courses, setCourses] = useState(null)
  const [loading, setLoading] = useState(null)
  const viewAllCourses = async () => {
    try {
      setLoading(true)
      const response = await apiConnector("GET", courseEndpoints.GET_ALL_COURSES)
      if (response)
        setCourses(response.data.data)
      setLoading(false)
    } catch (err) {
      console.log("Error While Fetching Courses Details : ", err)
    }
  }

  useEffect(() => {
    viewAllCourses()
  }, [])
  console.log(courses)

  return (
    <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
      <div>
        <div className='mb-14 flex items-center justify-between'>
          <h1 className='text-3xl font-medium dark:text-dark-richblack-5 text-light-richblack-5'>All Courses</h1>
        </div>
      </div>
      {courses && <ViewAllCoursesTable courses={courses} setCourses={setCourses} loading={loading} />}
    </div >
  )
}

export default ViewAllCourses