import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../common/IconBtn'
import { createCategory } from '../../../../services/operations/courseDetailsAPI'
import { useSelector } from 'react-redux'

const AddCategory = () => {
  const [loading, setLoading] = useState(null)
  const {token} = useSelector((state)=>state.auth) 
  console.log(token)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const submitHandler = async (data) => {
    const formData = new FormData()
    formData.append("name", data.name);
    formData.append("description", data.description);
    setLoading(true)
    const result = await createCategory(formData, token)    
    setLoading(false)
     localStorage.setItem("sublinks", JSON.stringify(result))
    // console.log("PRINTING FORMDATA : ", formData)
    // console.log("PRINTING RESULT : ", result)
  }

  return (
    <div>
      <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
        <div>
          <div className='mb-14 flex items-center justify-between '>
            <h1 className='text-3xl font-medim dark:text-dark-richblack-5 text-light-richblack-5'>Add Categories</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className='space-y-8 rounded-md border-[1px] dark:border-dark-richblack-700 border-light-richblack-700 dark:bg-dark-richblack-700 bg-light-richblack-900 p-6'>

          {/* Category Name */}
          <div className='flex flex-col space-y-2'>
            <label className='text-sm dark:text-dark-richblack-5 text-light-richblack-5' htmlFor='name'>Course Title <sup className='dark:text-dark-pink-200 text-red-500'>*</sup></label>
            <input
              id='name'
              placeholder='Enter Course Title'
              {...register('name', { required: true })}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] text-richblack-5'
            />
            {
              errors.name && (
                <span className='ml-2 text-xs tracking-wide dark:text-dark-pink-200 text-red-500'>Category name is Required**</span>
              )
            }
          </div>

          {/* Category Description */}
          <div className='flex flex-col space-y-2'>
            <label className='text-sm dark:text-dark-richblack-5 text-light-richblack-5' htmlFor="description">Course Short Description<sup className='dark:text-dark-pink-200 text-red-500'>*</sup></label>
            <textarea
              id="description"
              placeholder="Enter Description"
              {...register("description", { required: true })}
              className='form-style w-full resize-x-none min-h-[130px] rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] dark:text-dark-richblack-5 text-light-richblack-5'
            />
            {
              errors.description && (
                <span className='ml-2 text-xs tracking-wide dark:text-dark-pink-200 text-red-500'>Category Description is Required** </span>
              )
            }
          </div>
          <div className='flex justify-end gap-x-2'>
            <IconBtn type={"submit"} text={"Create Category"} />
          </div>

        </form>



      </div>
    </div>
  )
}

export default AddCategory