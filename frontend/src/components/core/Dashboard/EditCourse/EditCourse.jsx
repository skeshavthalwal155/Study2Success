import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI'
import { setCourse, setEditCourse } from '../../../../slice/courseSlice'
import RenderSteps from '../AddCourse/RenderSteps'

const EditCourse = () => {
    const dispatch = useDispatch()
    const { id:courseId } = useParams()

    const { course } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)

    useEffect(() => {
        ; (async () => {
            setLoading(true)
            const result = await getFullDetailsOfCourse(courseId, token)
            if (result?.courseDetails) {
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails))
            }
            setLoading(false)
        })()
    }, [])

    if (loading) {
        return (
            <div className='flex h-[calc(100vh-3.5rem)] w-full justify-center items-center'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 dark:text-dark-richblack-500 text-light-richblack-500'></div>
            </div>
        )
    }

    return (
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
            <h1 className='mb-14 text-3xl font-medium dark:text-dark-richblack-5 text-light-richblack-5'>
                Edit Course
            </h1>
            <div className='mx-auto max-w-[600px]'>
                {
                    course ? (
                        <RenderSteps />
                    ) : (
                        <p className='mt-14 text-center text-3xl font-semibold dark:text-dark-richblack-100 text-light-richblack-100'>
                            Course Not Found
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default EditCourse