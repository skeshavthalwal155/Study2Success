import React, { useEffect, useState } from 'react'
import { AiOutlineEye } from "react-icons/ai";
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { formatDuration } from '../../../../services/formattedTime'
import { FaCheck } from 'react-icons/fa'
import { HiClock } from 'react-icons/hi'
import { formatDate } from '../../../../services/formatDate'
import { COURSE_STATUS } from '../../../../utils/constants'
import ViewSingleCourse from './ViewSingleCourse';

const ViewAllCoursesTable = ({ courses, loading }) => {
  const [viewCourse, setViewCourse] = useState(null)


  const TRUNCATE_LENGTH = 30
 
  return (
    <>
      <Table className="rounded-xl border dark:border-dark-richblack-800 border-light-richblack-800">
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
                      <p className="text-[14px] dark:text-dark-richblack-5 text-light-richblack-5">
                        Created By: {course?.instructor?.firstName} {course?.instructor?.lastName}
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
                  <Td className="text-sm font-medium dark:text-dark-richblack-100 text-light-richblack-100 pr-4 mb-5">
                    ₹{course.price}
                  </Td>
                  <Td className="text-sm font-medium dark:text-dark-richblack-100 text-light-richblack-100 pr-4">
                    <button
                      disabled={loading}
                      title="View"
                      onClick={() => {
                        setViewCourse({
                          course: course,
                          closeHandler: !loading
                            ? () => setViewCourse(null)
                            : () => { }
                        })
                      }}
                      className="px-2 cursor-pointer transition-all duration-200 hover:scale-110 hover:dark:text-dark-caribbeangreen-300 text-light-caribbeangreen-300"
                    >
                      <AiOutlineEye size={20} />
                    </button>
                  </Td>
                </Tr>
              ))
            )}
        </Tbody>
      </Table>
      {viewCourse && <ViewSingleCourse viewCourse={viewCourse} />}
    </>
  )
}

export default ViewAllCoursesTable