import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'

import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal'
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI'
import {
    setCompletedLectures,
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures
} from '../slice/viewCourseSlice'
const ViewCourse = () => {
    const { courseId } = useParams()
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const [reviewModal, setReviewModal] = useState(false)

    useEffect(() => {
        const setCourseSpecificDetails = async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token)
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
            dispatch(setEntireCourseData(courseData.courseDetails))
            dispatch(setCompletedLectures(courseData.completeVideos))
            let lecture = 0
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lecture += sec.SubSection.length
            })
            // console.log("Total Lectures : ", courseData)
            dispatch(setTotalNoOfLectures(lecture))
        }
        setCourseSpecificDetails()
    }, [])

    return (
        <>
            <div className='relative flex min-h-[calc(100vh-3.5rem)] '>
                <VideoDetailsSidebar setReviewModal={setReviewModal} />
                <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
                    <div className='mx-6'>
                        <Outlet />
                    </div>
                </div>
            </div>

            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
        </>
    )
}

export default ViewCourse