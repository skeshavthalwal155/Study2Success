import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { IoIosArrowBack } from 'react-icons/io'
import { BsChevronDown } from 'react-icons/bs'
const VideoDetailsSidebar = ({ setReviewModal }) => {
    const [activeStatus, setActiveStatus] = useState("")
    const [videoBarActive, setVideoBarActive] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const { sectionId, subSectionId } = useParams()
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLecture,
    } = useSelector((state) => state.viewCourse)

    useEffect(() => {
        ; (() => {
            if (!courseSectionData.length)
                return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.SubSection.findIndex(
                (data) => data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.SubSection?.[currentSubSectionIndex]?._id;
            // Set Current Section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
            // Set Current Sub-Section here
            setVideoBarActive(activeSubSectionId)
        })()
    }, [courseSectionData, courseEntireData, location.pathname])
    return (
        <>
            <div className='flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-light-richblack-800 dark:border-r-dark-richblack-800 dark:bg-dark-richblack-800 bg-light-richblack-800'>
                <div className='mx-5 flex flex-col items-start justify-around gap-2 gap-y-4 border-b border-r-light-richblack-600 dark:border-r-dark-richblack-600 py-5 text-lg font-bold dark:text-dark-richblack-25 text-light-richblack-25 '>
                    <div className='flex w-full items-center justify-between'>
                        <div
                            onClick={() => navigate('/dashboard/enrolled-courses')}
                            className='cursor-pointer flex h-[35px] w-[35px] items-center rounded-full dark:bg-dark-richblack-100 bg-light-richblack-100 p-1 dark:text-dark-richblack-700 text-light-richblack-700 hover:scale-90'
                            title='back'
                        >
                            <IoIosArrowBack size={30} />
                        </div>

                        <IconBtn
                            text={"Add Review"}
                            customClasses={'ml-auto'}
                            onClick={() => setReviewModal(true)}
                        />
                    </div>
                    {/* For Heading or title */}
                    <div className='flex flex-col'>
                        <p>{courseEntireData?.courseName}</p>
                        <p className='text-sm font-semibold text-light-richblack-500 dark:text-dark-richblack-500'>
                            {completedLecture?.length} / {totalNoOfLectures}
                            {console.log(completedLecture?.length, totalNoOfLectures)}
                        </p>
                    </div>
                </div>


                {/* for section and subsections */}
                <div className='h-[calc(100vh-5rem)] overflow-y-auto'>
                    {
                        courseSectionData.map((course, index) => (
                            <div
                                className='mt-2 cursor-pointer text-sm dark:text-dark-richblack-5 text-light-richblack-5'
                                onClick={() => setActiveStatus(course?._id)}
                                key={index}
                            >

                                {/* section */}
                                <div className='flex flex-row justify-between bg-light-richblack-600 dark:bg-dark-richblack-600 px-5 py-4'>
                                    <div className='w-[70%] font-semibold'>
                                        {course?.sectionName}
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <span className={`${activeStatus === course?.sectionName ? "rotate-0" : "rotate-180"
                                            } transition-all duration-500`}>
                                            <BsChevronDown />
                                        </span>
                                    </div>
                                </div>

                                {/* Sub Section */}
                                {activeStatus === course?._id && (
                                    <div className='transition-[height] duration-500 ease-in-out'>
                                        {course?.SubSection.map((topic, i) => (
                                            <div
                                                className={`flex gap-3 px-5 py-2 ${videoBarActive === topic._id ? "dark:bg-dark-yellow-200 bg-light-yellow-700 font-semibold text-dark-richblack-800" : "hover:dark:bg-dark-richblack-900 hover:bg-light-richblack-900"}`}
                                                key={i}
                                                onClick={() => {
                                                    navigate(
                                                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                                                    )
                                                    setVideoBarActive(topic?._id);
                                                }}
                                            >
                                                <input
                                                    type='checkbox'
                                                    checked={completedLecture.includes(topic?._id)}
                                                    onChange={() => { }}
                                                />
                                                <span>{topic.title}</span>
                                            </div>
                                        ))
                                        }
                                    </div>
                                )
                                }

                            </div>
                        ))
                    }
                </div>
            </div >
        </>
    )
}

export default VideoDetailsSidebar