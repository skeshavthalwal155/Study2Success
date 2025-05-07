import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import CourseTable from './CourseTable'

const MyCourses = () => {

  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [courses, setCourses] = useState(null)

  const fetchedCourses = async () => {
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result)
    }
  }

  useEffect(() => {
    fetchedCourses()
  }, [])
  
  return (
    <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
      <div>
        <div className='mb-14 flex items-center justify-between'>
          <h1 className='text-3xl font-medium dark:text-dark-richblack-5 text-light-richblack-5'>My Courses</h1>
          <button onClick={() => { navigate('/dashboard/add-course') }} className='flex items-center bg-dark-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 md:px-5 font-semibold text-dark-richblack-900 '>
            <p>Add Course</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-dark-richblack-900 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
      {courses && <CourseTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}

export default MyCourses