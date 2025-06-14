import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slice/courseSlice'
import { RxCross2 } from 'react-icons/rx'
import Upload from '../Upload'
import IconBtn from '../../../../common/IconBtn'

const SubSectionModal = ({ modalData, setModalData, add = false, view = false, edit = false }) => {
  const {
    register,
    handleSubmit, setValue, getValues, formState: { errors }
  } = useForm()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    if (view || edit) {
      setValue('lectureTitle', modalData.title)
      setValue('lectureDesc', modalData.description)
      setValue('lectureVideo', modalData.videoUrl)
    }
  }, [view, edit, modalData, setValue])

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl) {
      return true
    } else {
      return false
    }
  }

  const editSubSectionHandler = async () => {
    const currentValues = getValues()
    const formData = new FormData()

    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append('title', currentValues.lectureTitle)
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append('description', currentValues.lectureDesc)
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append('videoUrl', currentValues.lectureVideo)
    }
    setLoading(true)

    console.log("CALL BEFORE UPDATE")
    console.log("formdata = ", formData)
    const result = await updateSubSection(formData, token);
    console.log("result = ", result)
    console.log("CALL AFter UPDATE")
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section)
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)

  }

  const submitHandler = async (data) => {
    if (view)
      return;
    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        // edit store kro
        editSubSectionHandler()
      }
      return;
    }
    const formData = new FormData();
    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("videoUrl", data.lectureVideo)
    setLoading(true)

    // API CALL
    const result = await createSubSection(formData, token)

    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section)
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null)
    setLoading(false)
  }
  return (
    <div>
      {
        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen  w-screen place-items-center overflow-auto bg-white/10 backdrop-blur-sm">
          <div className='my-10 w-11/12 max-w-[700px] rounded-lg border dark:border-dark-richblack-400 border-light-richblack-400 dark:bg-dark-richblack-800 bg-light-richblack-900'>
            {/* Modal Header */}
            <div className='flex items-center justify-between rounded-t-lg dark:bg-dark-richblack-700 bg-light-richblack-700 p-5'>
              <p className='text-xl font-semibold dark:text-dark-richblack-5 text-light-richblack-5'>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
              <button onClick={() => { !loading ? setModalData(null) : {} }}>
                <RxCross2 className='text-2xl dark:text-dark-richblack-5 text-light-richblack-5 cursor-pointer' />
              </button>
            </div>
            <form onSubmit={handleSubmit(submitHandler)} className='space-y-8 px-8 py-10'>
              <Upload
                name={"lectureVideo"}
                label={"Lecture Video"}
                register={register}
                setValue={setValue}
                errors={errors}
                video={true}
                viewData={view ? modalData.videoUrl : null}
                editData={edit ? modalData.videoUrl : null}
              />
              {/* Lecture title */}
              <div className='flex flex-col space-y-2'>
                <label className='text-sm dark:text-dark-richblack-5 text-light-richblack-5' htmlFor="lectureTitle">
                  Lecture Title {!view && <sup className='dark:text-dark-pink-200 text-light-pink-200'>*</sup>}</label>
                <input
                  disabled={view || loading}
                  id='lectureTitle'
                  placeholder='Enter Lecture Title'
                  {...register("lectureTitle", { required: true })}
                  className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-700 p-[12px] text-richblack-5'
                />
                {
                  errors.lectureTitle && (
                    <span className='ml-2 text-xs tracking-wide dark:text-dark-pink-200 text-red-500' >Lecture Title is Required**</span>
                  )
                }
              </div>
              {/* Lecture Description */}
              <div className='flex flex-col space-y-2'>
                <label className='text-sm dark:text-dark-richblack-5 text-light-richblack-5' htmlFor="lectureDesc">Lecture Description {" "} {!view && <sup className='text-pink-200'>*</sup>}</label>
                <textarea
                  id="lectureDesc"
                  placeholder="Enter Lecture Description"
                  {...register("lectureDesc", { required: true })}
                  className='form-style w-full resize-x-none min-h-[130px] rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-700 p-[12px] dark:text-dark-richblack-5 text-light-richblack-5'
       
                />
                {
                  errors.lectureDesc && (
                    <span className='ml-2 text-xs tracking-wide dark:text-pink-200 text-red-500'>Lecture Description is Required** </span>
                  )
                }
              </div>
              {
                !view && (
                  <div className='flex justify-end'>
                    <IconBtn
                      text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                    />
                  </div>
                )
              }
            </form>
          </div>
        </div>


      }
    </div>
  )
}

export default SubSectionModal