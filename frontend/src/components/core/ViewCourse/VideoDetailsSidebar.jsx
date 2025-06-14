import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { IoIosArrowBack } from 'react-icons/io'
import { BsChevronDown, BsChevronRight } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'

const VideoDetailsSidebar = ({ setReviewModal }) => {
    const [activeStatus, setActiveStatus] = useState("")
    const [videoBarActive, setVideoBarActive] = useState("")
    const [showSidebar, setShowSidebar] = useState(false)
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
            {/* Mobile Sidebar Toggle Button (only shown on small screens) */}
            <div className='md:hidden fixed top-20 left-0 z-10'>
                <button
                    onClick={() => setShowSidebar(true)}
                    className='dark:bg-dark-richblack-800 bg-light-richblack-800 dark:text-dark-richblack-5 text-light-richblack-5 p-2 rounded-r-md shadow-lg'
                >
                    <BsChevronRight size={20} />
                </button>
            </div>

            {/* Sidebar Content - Desktop */}
            <div className={`hidden md:flex h-[calc(100vh-3.5rem)] md:w-[320px] max-w-[350px] flex-col border-r-[1px] dark:border-r-dark-richblack-800 border-r-light-richblack-800 dark:bg-dark-richblack-800 bg-light-richblack-800`}>
                <SidebarContent 
                    navigate={navigate}
                    setReviewModal={setReviewModal}
                    courseEntireData={courseEntireData}
                    completedLecture={completedLecture}
                    totalNoOfLectures={totalNoOfLectures}
                    courseSectionData={courseSectionData}
                    activeStatus={activeStatus}
                    setActiveStatus={setActiveStatus}
                    videoBarActive={videoBarActive}
                    setVideoBarActive={setVideoBarActive}
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                />
            </div>

            {/* Sidebar Content - Mobile (shown when showSidebar is true) */}
            {showSidebar && (
                <div className='md:hidden fixed inset-0 z-50 dark:bg-dark-richblack-800 bg-light-richblack-800 bg-opacity-100 w-[75%] flex flex-col'>
                    <div className='flex justify-end p-4'>
                        <button
                            onClick={() => setShowSidebar(false)}
                            className='dark:text-dark-richblack-5 text-light-richblack-5 p-1 rounded-full'
                        >
                            <RxCross2 size={24} />
                        </button>
                    </div>
                    <div className='overflow-y-auto flex-1'>
                        <SidebarContent 
                            navigate={navigate}
                            setReviewModal={setReviewModal}
                            courseEntireData={courseEntireData}
                            completedLecture={completedLecture}
                            totalNoOfLectures={totalNoOfLectures}
                            courseSectionData={courseSectionData}
                            activeStatus={activeStatus}
                            setActiveStatus={setActiveStatus}
                            videoBarActive={videoBarActive}
                            setVideoBarActive={setVideoBarActive}
                            showSidebar={showSidebar}
                            setShowSidebar={setShowSidebar}
                        />
                    </div>
                </div>
            )}

            {/* Overlay for mobile sidebar (click to close) */}
            {showSidebar && (
                <div 
                    onClick={() => setShowSidebar(false)} 
                    className='md:hidden fixed inset-0  bg-[rgba(255,255,255,0.5)] dark:bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40'
                ></div>
            )}
        </>
    )
}

// Extracted sidebar content into a separate component for reusability
const SidebarContent = ({
    navigate,
    setReviewModal,
    courseEntireData,
    completedLecture,
    totalNoOfLectures,
    courseSectionData,
    activeStatus,
    setActiveStatus,
    videoBarActive,
    setVideoBarActive,
    setShowSidebar
}) => {
    return (
        <>
            <div className='mx-5 flex flex-col items-start justify-around gap-2 gap-y-4 border-b dark:border-r-dark-richblack-600 border-r-light-richblack-600 py-5 text-lg font-bold dark:text-dark-richblack-25 text-light-richblack-25'>
                <div className='flex w-full items-center justify-between'>
                    <div
                        onClick={() => {
                            navigate('/dashboard/enrolled-courses')
                            setShowSidebar && setShowSidebar(false)
                        }}
                        className='cursor-pointer flex h-[35px] w-[35px] items-center rounded-full dark:bg-dark-richblack-100 bg-light-richblack-100 p-1 dark:text-dark-richblack-700 text-light-richblack-700 hover:scale-90'
                        title='back'
                    >
                        <IoIosArrowBack size={30} />
                    </div>

                    <IconBtn
                        text={"Add Review"}
                        customClasses={'ml-auto'}
                        onClick={() => {
                            setReviewModal(true)
                            setShowSidebar && setShowSidebar(false)
                        }}
                    />
                </div>
                {/* For Heading or title */}
                <div className='flex flex-col'>
                    <p>{courseEntireData?.courseName}</p>
                    <p className='text-sm font-semibold dark:text-dark-richblack-500 text-light-richblack-500'>
                        {completedLecture?.length} / {totalNoOfLectures}
                    </p>
                </div>
            </div>

            {/* for section and subsections */}
            <div className='h-[calc(100vh-5rem)] overflow-y-auto'>
                {courseSectionData.map((course, index) => (
                    <div
                        className='mt-2 cursor-pointer text-sm dark:text-dark-richblack-5 text-light-richblack-5'
                        onClick={() => setActiveStatus(course?._id)}
                        key={index}
                    >
                        {/* section */}
                        <div className='flex flex-row justify-between dark:bg-dark-richblack-600 bg-light-richblack-600 px-5 py-4'>
                            <div className='w-[70%] font-semibold'>
                                {course?.sectionName}
                            </div>
                            <div className='flex items-center gap-3'>
                                <span className={`${activeStatus === course?._id ? "rotate-180" : "rotate-0"} transition-all duration-500`}>
                                    <BsChevronDown />
                                </span>
                            </div>
                        </div>

                        {/* Sub Section */}
                        {activeStatus === course?._id && (
                            <div className='transition-[height] duration-500 ease-in-out'>
                                {course?.SubSection.map((topic, i) => (
                                    <div
                                        className={`flex gap-3 px-5 py-2 ${videoBarActive === topic._id 
                                            ? "dark:bg-dark-yellow-200 bg-light-yellow-800 font-semibold dark:text-dark-richblack-800 text-light-richblack-5" 
                                            : "hover:dark:bg-dark-richblack-900 hover:bg-light-richblack-900"}`}
                                        key={i}
                                        onClick={() => {
                                            navigate(
                                                `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                                            )
                                            setVideoBarActive(topic?._id)
                                            setShowSidebar && setShowSidebar(false)
                                        }}
                                    >
                                        <input
                                            type='checkbox'
                                            checked={completedLecture.includes(topic?._id)}
                                            onChange={() => { }}
                                        />
                                        <span>{topic.title}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

export default VideoDetailsSidebar