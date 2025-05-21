import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useState } from "react"
import { FaCheck } from 'react-icons/fa'
import { FiEdit2 } from 'react-icons/fi'
import { HiClock } from 'react-icons/hi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useNavigate } from "react-router-dom"

import { formatDate } from '../../../../services/formatDate'
import {
    deleteCourse,
    fetchInstructorCourses
} from '../../../../services/operations/courseDetailsAPI'
import { COURSE_STATUS } from '../../../../utils/constants'
import ConfirmatinModal from '../../../common/ConfirmationModal'
import { formatDuration } from "../../../../services/formattedTime"

export default function CourseTable({ courses, setCourses }) {
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [confirmatinModal, setConfirmationModal] = useState(null)
    const TRUNCATE_LENGTH = 30

    const handleCourseDelete = async (courseId) => {
        setLoading(true)
        await deleteCourse({ courseId: courseId }, token)
        const result = await fetchInstructorCourses(token)
        if (result) {
            setCourses(result)
        }
        setConfirmationModal(null)
        setLoading(false)
    }

    //  console.log("ALL COURSE : ",course)

    if (loading) {
        return (
            <div className='flex h-[calc(100vh-3.5rem)] w-full justify-center items-center'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 dark:text-dark-richblack-500 text-light-richblack-500'></div>
            </div>
        )
    }

    return (
        <>
            <Table className="rounded-xl border dark:border-dark-richblack-800 border-light-richblack-800 mb-8">
                <Thead>
                    <Tr className="flex gap-x-10 rounded-t-md border-b dark:border-b-dark-richblack-800 border-b-light-richblack-800 px-6 py-2 dark:text-dark-richblack-100 text-light-richblack-100">
                        <Th className="flex-1 text-left text-sm font-medium uppercase dark:text-dark-richblack-100 text-light-richblack-100">
                            Courses
                        </Th>
                        <Th className="text-left text-sm font-semibold uppercase dark:text-dark-richblack-100 text-light-richblack-100">
                            Duration
                        </Th>
                        <Th className="text-left text-sm font-semibold uppercase dark:text-dark-richblack-100 text-light-richblack-100 ">
                            Price
                        </Th>
                        <Th className="text-left text-sm font-semibold uppercase dark:text-dark-richblack-100 text-light-richblack-100">
                            Actions
                        </Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {
                        courses?.length === 0 ? (
                            <Tr>
                                <Td className="py-10 text-center text-2xl font-medium dark:text-dark-richblack-5 text-light-richblack-5">
                                    No Courses Found
                                </Td>
                            </Tr>
                        ) : (
                            courses.map((course) => (
                                <Tr
                                    key={course?._id}
                                    className="flex gap-x-10 border-b dark:border-dark-richblack-800 border-light-richblack-800 px-6 py-8 gap-4"
                                >
                                    <Td colSpan={1} className="flex flex-1 gap-x-4 p-3">
                                        <img
                                            src={course?.courseThumbnail}
                                            alt={course.courseName}
                                            className="md:h-[148px] md:w-[220px] aspect-video rounded-lg object-cover"
                                        />
                                        <div className="flex flex-col gap-1 justify-between ">
                                            <p className="text-lg font-semibold dark:text-dark-richblack-5 text-light-richblack-5 mt-3">
                                                {course.courseName}
                                            </p>
                                            <p className="text-xs dark:text-dark-richblack-300 text-light-richblack-300">
                                                {course?.courseDescription.split(" ")?.length > TRUNCATE_LENGTH ? course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..." : course.courseDescription}
                                            </p>
                                            <p className="text-[12px] dark:text-dark-richblack-5 text-light-richblack-5">
                                                Created: {formatDate(course?.createdAt || course?.updatedAt)}
                                            </p>

                                            {course.status === COURSE_STATUS.DRAFT ? (
                                                <p className="flex w-fit flex-row items-center gap-2 rounded-full dark:bg-dark-richblack-700 bg-light-richblack-700 px-2 py-[2px] text-[12px] font-medium dark:text-dark-pink-100 text-red-600">
                                                    <HiClock size={14} />
                                                    Drafted
                                                </p>
                                            ) : (
                                                <div className="flex w-fit flex-row items-center gap-2 rounded-full dark:bg-dark-richblack-700 bg-light-richblack-200 px-2 py-[2px] text-[12px] font-medium dark:text-dark-yellow-100 text-yellow-500">
                                                    <span className="flex h-3 w-3 items-center justify-center rounded-full dark:bg-dark-yellow-100 dark:text-dark-richblack-700 text-yellow-500 ">
                                                        <FaCheck size={8} />
                                                    </span>
                                                    Published
                                                </div>
                                            )}
                                        </div>
                                    </Td>
                                    <Td className="text-sm font-medium dark:text-dark-richblack-100 text-light-richblack-100">
                                        {formatDuration(course?.courseContent[0]?.SubSection[0]?.timeDuration)}
                                    </Td>
                                    <Td className="text-sm font-medium dark:text-dark-richblack-100 text-light-richblack-100 mb-5">
                                        ₹{course.price}
                                    </Td>
                                    <Td className="text-sm font-medium dark:text-dark-richblack-100 text-light-richblack-100">
                                        <button
                                            disabled={loading}
                                            onClick={() => {
                                                navigate(`/dashboard/edit-course/${course._id}`)
                                            }}
                                            title="Edit"
                                            className="px-2 cursor-pointer transition-all duration-200 hover:scale-110 hover:dark:text-dark-caribbeangreen-300 text-light-caribbeangreen-300"
                                        >
                                            <FiEdit2 size={20} />
                                        </button>
                                        <button
                                            disabled={loading}
                                            onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Do You Want to Delete This Course?",
                                                    text2: "All the Data Related to this course will be deleted.",
                                                    btn1Text: !loading ? "Delete" : "Loading...",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: !loading
                                                        ? () => handleCourseDelete(course._id)
                                                        : () => { },
                                                    btn2Handler: !loading
                                                        ? () => setConfirmationModal(null)
                                                        : () => { }
                                                })
                                            }}
                                            title="Delete"
                                            className="px-1 cursor-pointer transition-all duration-200 hover:scale-110 hover:text-[#FF0000]"
                                        >
                                            <RiDeleteBin6Line size={20} />
                                        </button>
                                    </Td>
                                </Tr>
                            ))
                        )}
                </Tbody>
            </Table>
            {confirmatinModal && <ConfirmatinModal modalData={confirmatinModal} />}
        </>
    )
}