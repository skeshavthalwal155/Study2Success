import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import RequirementField from './RequirementField';
import { setCourse, setEditCourse, setStep } from '../../../../../slice/courseSlice';
import IconBtn from '../../../../common/IconBtn'
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';
import ChipInput from './ChipInput';
import Upload from '../Upload';
const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { course, editCourse } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true)
            console.log("Before Getting Category")
            const categories = await fetchCourseCategories();
            console.log("After Getting Category")
            if (categories.length > 0) {
                setCourseCategories(categories)
            }
            setLoading(false)
        }
        if (editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price || "");
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instruction);
            setValue("courseThumbnail", course.courseThumbnail);
        }
        getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [editCourse, course, setValue])

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseThumbnail !== course.courseThumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString()
        ) {
            return true
        } else {
            return false
        }

    }

    const submitHandler = async (data) => {

        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues()
                const formData = new FormData()

                formData.append("courseId", course._id)

                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle)
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc)
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice)
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags))
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }
                if (currentValues.courseThumbnail !== course.courseThumbnail) {
                    formData.append("courseThumbnail", data.courseThumbnail)
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory)
                }
                if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements))
                }

                setLoading(true)
                const result = await editCourseDetails(formData, token)
                if (result) {
                    // dispatch(setEditCourse(false))
                    dispatch(setStep(2))
                    dispatch(setCourse(result))
                }
                setLoading(false)

            } else {
                toast.error("No Changes made")
            }
            // console.log("PRINTING FORMDATA : ", formData)
            // console.log("PRINTING RESULT : ", result)
            return
        }

        // create a new course
        const formData = new FormData()
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("tag", JSON.stringify(data.courseTags));
        formData.append("courseThumbnail", data.courseThumbnail);

        setLoading(true)
        const result = await addCourseDetails(formData, token)
        if (result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false)
        console.log("PRINTING FORMDATA : ", formData)
        console.log("PRINTING RESULT : ", result)
    }

    return (

        <>
            {
                loading ? (
                    <div className='h-[calc(100vh-25rem)] w-full flex items-center justify-center'>
                        <div className='loader '></div>
                    </div>
                ) :
                    (
                        <form onSubmit={handleSubmit(submitHandler)} className='space-y-8 rounded-md border-[1px] dark:border-dark-richblack-700 border-light-richblack-700 dark:bg-dark-richblack-700 bg-light-richblack-900 p-6'>

                            {/* Course Title */}
                            <div className='flex flex-col space-y-2'>
                                <label className='text-sm dark:text-dark-richblack-5 text-light-richblack-5' htmlFor='courseTitle'>Course Title <sup className='dark:text-dark-pink-200 text-red-500'>*</sup></label>
                                <input
                                    id='courseTitle'
                                    placeholder='Enter Course Title'
                                    {...register('courseTitle', { required: true })}
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] text-richblack-5'
                                />
                                {
                                    errors.courseTitle && (
                                        <span className='ml-2 text-xs tracking-wide dark:text-dark-pink-200 text-red-500'>Course Title is Required**</span>
                                    )
                                }
                            </div>

                            {/* Course Description */}
                            <div className='flex flex-col space-y-2'>
                                <label className='text-sm dark:text-dark-richblack-5 text-light-richblack-5' htmlFor="courseShortDesc">Course Short Description<sup className='dark:text-dark-pink-200 text-red-500'>*</sup></label>
                                <textarea
                                    id="courseShortDesc"
                                    placeholder="Enter Description"
                                    {...register("courseShortDesc", { required: true })}
                                    className='form-style w-full resize-x-none min-h-[130px] rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] dark:text-dark-richblack-5 text-light-richblack-5'
                                />
                                {
                                    errors.courseShortDesc && (
                                        <span className='ml-2 text-xs tracking-wide dark:text-dark-pink-200 text-red-500'>Course Description is Required** </span>
                                    )
                                }
                            </div>

                            {/* Course price */}
                            <div className='relative flex flex-col'>
                                <label className='text-sm dark:text-dark-richblack-5 text-light-richblack-5' htmlFor='coursePrice'>Course Price <sup className='dark:text-dark-pink-200 text-red-500'>*</sup></label>
                                <input
                                    id='coursePrice'
                                    placeholder='Enter Course Price'
                                    {...register('coursePrice', {
                                        required: true,
                                        // valueAsNumber: true,
                                        pattern: {
                                            value: /^(0|[1-9]\d*)(\.\d+)?$/, // Ensures valid number format
                                            message: "Invalid price format (e.g., 99 or 99.99)",
                                        }
                                    })}
                                    className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] dark:text-dark-richblack-5 text-light-richblack-5 !pl-12'
                                />
                                <HiOutlineCurrencyRupee size={30} className='absolute pl-2 top-7 dark:text-dark-richblack-400 text-light-richblack-400' />
                                {
                                    errors.coursePrice && (
                                        <span className='ml-2 text-xs tracking-wide dark:text-dark-pink-200 text-red-500'>Course Price is Required**</span>
                                    )
                                }
                            </div>

                            {/* Category Drop down */}
                            <div className='flex flex-col space-y-2'>
                                <label className='text-sm dark:text-dark-richblack-5 text-light-richblack-5' htmlFor='courseCategory'>Course Category <sup className='dark:text-dark-pink-200 text-red-500'>*</sup></label>
                                <select
                                    {...register("courseCategory", { required: true })}
                                    defaultValue={""}
                                    id='courseCategory'
                                    className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] dark:text-dark-richblack-5 text-light-richblack-5'
                                >
                                    <option value={""} disabled>Choose a Category</option>
                                    {
                                        !loading && courseCategories?.map((category, index) => (
                                            <option key={index} value={category?._id}>{category?.name}</option>
                                        ))
                                    }
                                </select>
                                {
                                    errors.courseCategory && (
                                        <span className='ml-2 text-xs tracking-wide dark:text-dark-pink-200 text-red-500'>Course Category is Required**</span>
                                    )
                                }
                            </div>

                            {/* Tags */}
                            <ChipInput label="Tags" name="courseTags" placeholder="Enter Tags and Press Enter" register={register} errors={errors} setValue={setValue} getValues={getValues} />

                            {/* Upload Thumbnail */}
                            <Upload name={"courseThumbnail"} label={"Course Thumbnail"} register={register} errors={errors} setValue={setValue} editData={editCourse ? course?.courseThumbnail : null} />

                            {/* Benefits of the course */}
                            <div className='flex flex-col space-y-2'>
                                <label className='text-sm dark:text-dark-richblack-5 text-light-richblack-5' htmlFor="courseBenefits">Benefits of the Course<sup className='dark:text-dark-pink-200 text-red-500'>*</sup></label>
                                <textarea
                                    id="courseBenefits"
                                    placeholder="Enter Course Benefits"
                                    {...register("courseBenefits", { required: true })}
                                    className='form-style w-full resize-x-none min-h-[130px] rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] dark:text-dark-richblack-5 text-light-richblack-5'

                                    {...register("courseBenefits", { required: true })}
                                />
                                {
                                    errors.courseBenefits && (
                                        <span className='ml-2 text-xs tracking-wide dark:text-dark-pink-200 text-red-500'>Course Benefits is Required** </span>
                                    )
                                }
                            </div>

                            {/* Requirements */}
                            <RequirementField name="courseRequirements" label="Requirements/Instructions" register={register} errors={errors} setValue={setValue} getValues={getValues} />

                            {/* Buttons */}
                            <div className='flex justify-end gap-x-2'>
                                {
                                    editCourse && (
                                        <button onClick={() => dispatch(setStep(2))} className='text-[10px] md:text-sm p-2 px-1 font-semibold rounded-md flex items-center gap-x-2 dark:bg-dark-richblack-800 cursor-pointer bg-light-richblack-300'>
                                            Continue Without Saving
                                        </button>
                                    )
                                }
                                <IconBtn type={"submit"} text={!editCourse ? "Next" : "Save Changes"} />
                            </div>
                        </form>
                    )
            }
        </>
    )
}

export default CourseInformationForm