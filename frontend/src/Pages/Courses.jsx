import React, { useEffect, useState } from 'react'
import { fetchCourseCategories } from '../services/operations/courseDetailsAPI'
import Footer from '../components/common/Footer'
import { Link } from 'react-router-dom'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import Course_Card from '../components/core/Catalog/Course_Card'

const Courses = () => {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState(null)
  const [active, setActive] = useState(1)

  const getAllCategories = async () => {
    try {
      setLoading(true)
      const response = await fetchCourseCategories()
      if (response) {
        setCategories(response)
      }
    } catch (err) {
      console.error("Error fetching categories:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  if (loading || !categories) {
    return (
      <div className='flex h-[calc(100vh-3.5rem)] w-full justify-center items-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 text-richblack-500'></div>
      </div>
    )
  }

  return (
    <>
      {/* Top Level Section */}
      <div className='box-content bg-light-richblack-800 dark:bg-dark-richblack-800 px-4 py-2'>
        <div className='md:mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent'>
          <p className='text-sm dark:text-dark-richblack-300 text-light-richblack-300'>
            <span className='cursor-pointer hover:underline hover:text-red-600 transition-all'>
              <Link to={'/'}>Home</Link>
            </span>
            {` / `}
            <span className='dark:text-dark-yellow-25 text-red-500'>
              All Courses
            </span>
          </p>
          <p className='text-3xl dark:text-dark-richblack-5 text-light-richblack-5'>
            All Courses
          </p>
          <p className='max-w-[870px] text-light-richblack-200 dark:text-dark-richblack-200'>
            Explore our wide range of courses to enhance your skills and knowledge.
          </p>
        </div>
      </div>

      {/* Section 1 - Popular Courses */}
      <div className='mx-auto box-content w-full max-w-maxContentTab md:px-4 px-4 py-12 lg:max-w-maxContent'>
        <div className='section_heading md:text-4xl text-2xl'>Featured Courses</div>
        <div className='my-4 flex border-b border-b-light-richblack-600 dark:border-b-dark-richblack-600 text-sm'>
          <p
            className={`px-4 py-2 ${active === 1 ? "dark:text-dark-yellow-25 text-red-500 border-b-red-500 border-b dark:border-b-dark-yellow-25" : "dark:text-dark-richblack-5 text-light-richblack-5"} cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-4 py-2 ${active === 2 ? "dark:text-dark-yellow-25 text-red-500 border-b-red-500 border-b dark:border-b-dark-yellow-25" : "dark:text-dark-richblack-5 text-light-richblack-5"} cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New Releases
          </p>
        </div>
        <div>
          {categories?.length > 0 && (
            <CourseSlider Courses={categories.flatMap(category => category.courses)} />
          )}
        </div>
      </div>

      {/* Section 2 - Categories */}
      <div className='mx-auto box-content w-full max-w-maxContentTab py-12 lg:max-w-maxContent'>
        <div className='section_heading md:text-4xl text-2xl w-[90%]'>Browse by Categories</div>
        <div className='py-8'>
          {categories?.map((category, index) => (
            <div key={index} className='mb-12'>
              <h3 className='text-2xl dark:text-dark-richblack-5 text-light-richblack-5 mb-4'>
                {category.name}
              </h3>
              <p className='text-light-richblack-200 dark:text-dark-richblack-200 mb-6'>
                {category.description}
              </p>
              <CourseSlider Courses={category.courses} />
            </div>
          ))}
        </div>
      </div>

      {/* Section 3 - Top Selling Courses */}
      <div className='mx-auto box-content w-full max-w-maxContentTab py-12 lg:max-w-maxContent'>
        <div className='section_heading md:text-4xl text-2xl'>Top Selling Courses</div>
        <div className="py-8">
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {categories?.flatMap(category => category.courses)
              .sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)
              .slice(0, 4)
              .map((course, index) => (
                <Course_Card 
                  course={course} 
                  key={index} 
                  Height={"h-[100px] lg:h-[400px]"} 
                />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Courses