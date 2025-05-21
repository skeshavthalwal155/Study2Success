import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../../common/IconBtn'
import { resetCourseState, setStep } from '../../../../../slice/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { useNavigate } from 'react-router-dom'
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI'
const PublishCourse = () => {

  const { register, handleSubmit, setValue, getValues } = useForm()
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit = () => {
    handleCoursePublish();
  }

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])

  const goToCourse = () => {
    dispatch(resetCourseState());
    navigate('/dashboard/my-courses')
  }

  const handleCoursePublish = async () => {
    if (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
      (course?.status === COURSE_STATUS.DRAFT && getValues('public') === false)) {
      // no updation in form
      // no need to make api call
      goToCourse();
      return;
    }
    // if form is updated
    const formData = new FormData()
    formData.append('courseId', course._id)
    const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
    formData.append('status', courseStatus)

    setLoading(true);
    const result = await editCourseDetails(formData, token)

    if (result) {
      goToCourse()
    }
    setLoading(false)
  }

  const goBack = () => {
    dispatch(setStep(2));
  }

  return (
    <div className='rounded-md border-[1px] dark:bg-dark-richblack-800 bg-light-richblack-800 p-6 dark:border-dark-richblack-700 border-light-richblack-700'>
      <p className='text-2xl font-semibold dark:text-dark-richblack-5 text-light-richblack-5'>Publish Course</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='my-6 mb-8'>
          <label htmlFor="public" className='inline-flex items-center text-lg'>
            <input type="checkbox"
              id='public'
              {...register("public")}
              className='dark:border-dark-gray-300 border-light-gray-300 h-4 w-4 rounded dark:bg-dark-richblack-500 bg-light-richblack-500 dark:text-dark-richblack-400 text-light-richblack-400 focus:ring-2 focus:dark:ring-dark-richblack-5 ring-light-richblack-5'
            />
            <span className='ml-3 dark:text-dark-richblack-400 text-light-richblack-200'>Make this Course as Public</span>
          </label>
        </div>
        <div className='ml-auto flex max-w-max items-center gap-x-4'>
          <button
            disabled={loading}
            type='button'
            onClick={goBack}
            className='flex cursor-pointer items-center gap-x-2 rounded-md py-[8px] dark:bg-dark-richblack-300 bg-light-richblack-300 px-[20px] font-semibold dark:text-dark-richblack-900 text-light-richblack-900'
          >
            Back
          </button>
          <IconBtn disabled={loading} text={"Save Changes"} />
        </div>
      </form>
    </div>
  )
}

export default PublishCourse