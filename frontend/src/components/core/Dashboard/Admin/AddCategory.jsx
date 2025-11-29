import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../common/IconBtn'
import { createCategory, fetchCourseCategories } from '../../../../services/operations/courseDetailsAPI'
import { useSelector } from 'react-redux'

const AddCategory = () => {
  const [loading, setLoading] = useState(null)
  const { token } = useSelector((state) => state.auth)
  const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm()

  const submitHandler = async (data) => {
    const formData = new FormData()
    formData.append("name", data.name);
    formData.append("description", data.description);
    setLoading(true)
    const result = await createCategory(formData, token)
    const response = await fetchCourseCategories()
    reset()
    setLoading(false)
    localStorage.setItem("sublinks", JSON.stringify(response))
    // console.log("PRINTING FORMDATA : ", formData)
    // console.log("PRINTING RESULT : ", response)

  }
  return (
    <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
      <h1 className="mb-14 text-3xl font-medium dark:text-dark-richblack-5 text-light-richblack-5">Add Category</h1>


      <form onSubmit={handleSubmit(submitHandler)} className='space-y-8 rounded-lg border-[1px] dark:border-dark-richblack-700 border-light-richblack-700 dark:bg-dark-richblack-700 bg-light-richblack-900 p-8 shadow-xl transition-all duration-200 hover:shadow-2xl'>

        {/* Category Name */}
        <div className='flex flex-col space-y-2'>
          <label className='text-sm font-semibold dark:text-dark-richblack-5 text-light-richblack-5' htmlFor='name'>
            Course Title <sup className='dark:text-dark-pink-200 text-red-500'>*</sup>
          </label>
          <input
            id='name'
            placeholder='Enter Course Title'
            {...register('name', { required: true })}
            className='form-style w-full rounded-lg bg-light-richblack-800 dark:bg-dark-richblack-800 p-3 
                         text-richblack-5 border-2 border-transparent focus:border-blue-500 transition-all duration-200'
          />
          {errors.name && (
            <span className='ml-2 text-xs tracking-wide dark:text-dark-pink-200 text-red-500 animate-pulse'>
              Category name is Required**
            </span>
          )}
        </div>

        {/* Category Description */}
        <div className='flex flex-col space-y-2'>
          <label className='text-sm font-semibold dark:text-dark-richblack-5 text-light-richblack-5' htmlFor="description">
            Course Short Description<sup className='dark:text-dark-pink-200 text-red-500'>*</sup>
          </label>
          <textarea
            id="description"
            placeholder="Enter Description"
            {...register("description", { required: true })}
            className='form-style w-full resize-x-none min-h-[130px] rounded-lg bg-light-richblack-800 
                         dark:bg-dark-richblack-800 p-3 dark:text-dark-richblack-5 text-light-richblack-5 
                         border-2 border-transparent focus:border-blue-500 transition-all duration-200'
          />
          {errors.description && (
            <span className='ml-2 text-xs tracking-wide dark:text-dark-pink-200 text-red-500 animate-pulse'>
              Category Description is Required**
            </span>
          )}
        </div>

        <div className='flex justify-end gap-x-2'>
          <IconBtn
            type="submit"
            text="Create Category"
            customClasses="hover:scale-105 transition-transform duration-200"
          />
        </div>
      </form>
    </div>

  )
}
export default AddCategory