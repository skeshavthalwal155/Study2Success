import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { IoIosArrowBack } from 'react-icons/io'
import { BsChevronDown } from 'react-icons/bs'
import {FaChevronLeft} from 'react-icons/fa'
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
import {FaAngleDoubleRight} from 'react-icons/fa'

const VideoDetailsSidebar = ({ setReviewModal }) => {
    const [activeStatus, setActiveStatus] = useState("")
    const [videoBarActive, setVideoBarActive] = useState("")
    const [showSidebar, setShowSidebar] = useState(false);
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
        // <>
        //     <div className='flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-light-richblack-800 dark:border-r-dark-richblack-800 dark:bg-dark-richblack-800 bg-light-richblack-800'>
        //         <div className='mx-5 flex flex-col items-start justify-around gap-2 gap-y-4 border-b border-r-light-richblack-600 dark:border-r-dark-richblack-600 py-5 text-lg font-bold dark:text-dark-richblack-25 text-light-richblack-25 '>
        //             <div className='flex w-full items-center justify-between'>
        //                 <div
        //                     onClick={() => navigate('/dashboard/enrolled-courses')}
        //                     className='cursor-pointer flex h-[35px] w-[35px] items-center rounded-full dark:bg-dark-richblack-100 bg-light-richblack-100 p-1 dark:text-dark-richblack-700 text-light-richblack-700 hover:scale-90'
        //                     title='back'
        //                 >
        //                     <IoIosArrowBack size={30} />
        //                 </div>

        //                 <IconBtn
        //                     text={"Add Review"}
        //                     customClasses={'ml-auto'}
        //                     onClick={() => setReviewModal(true)}
        //                 />
        //             </div>
        //             {/* For Heading or title */}
        //             <div className='flex flex-col'>
        //                 <p>{courseEntireData?.courseName}</p>
        //                 <p className='text-sm font-semibold text-light-richblack-500 dark:text-dark-richblack-500'>
        //                     {completedLecture?.length} / {totalNoOfLectures}
        //                     {/* {console.log(completedLecture?.length, totalNoOfLectures)} */}
        //                 </p>
        //             </div>
        //         </div>


        //         {/* for section and subsections */}
        //         <div className='h-[calc(100vh-5rem)] overflow-y-auto'>
        //             {
        //                 courseSectionData.map((course, index) => (
        //                     <div
        //                         className='mt-2 cursor-pointer text-sm dark:text-dark-richblack-5 text-light-richblack-5'
        //                         onClick={() => setActiveStatus(course?._id)}
        //                         key={index}
        //                     >

        //                         {/* section */}
        //                         <div className='flex flex-row justify-between bg-light-richblack-600 dark:bg-dark-richblack-600 px-5 py-4'>
        //                             <div className='w-[70%] font-semibold'>
        //                                 {course?.sectionName}
        //                             </div>
        //                             <div className='flex items-center gap-3'>
        //                                 <span className={`${activeStatus === course?.sectionName ? "rotate-0" : "rotate-180"
        //                                     } transition-all duration-500`}>
        //                                     <BsChevronDown />
        //                                 </span>
        //                             </div>
        //                         </div>

        //                         {/* Sub Section */}
        //                         {activeStatus === course?._id && (
        //                             <div className='transition-[height] duration-500 ease-in-out'>
        //                                 {course?.SubSection.map((topic, i) => (
        //                                     <div
        //                                         className={`flex gap-3 px-5 py-2 ${videoBarActive === topic._id ? "dark:bg-dark-yellow-200 bg-light-yellow-700 font-semibold text-dark-richblack-800" : "hover:dark:bg-dark-richblack-900 hover:bg-light-richblack-900"}`}
        //                                         key={i}
        //                                         onClick={() => {
        //                                             navigate(
        //                                                 `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
        //                                             )
        //                                             setVideoBarActive(topic?._id);
        //                                         }}
        //                                     >
        //                                         <input
        //                                             type='checkbox'
        //                                             checked={completedLecture.includes(topic?._id)}
        //                                             onChange={() => { }}
        //                                         />
        //                                         <span>{topic.title}</span>
        //                                     </div>
        //                                 ))
        //                                 }
        //                             </div>
        //                         )
        //                         }

        //                     </div>
        //                 ))
        //             }
        //         </div>
        //     </div >
        //     <div onClick={() => { setShowSidebar(true) }} className={`${showSidebar ? "hidden" : ""} fixed top-0 left-0 w-full h-full bg-richblack-900 bg-opacity-50 z-10 offSidebar3`}></div>

        // </>
        <>
            <div className={`${showSidebar ? "" : "hidden"} w-6 h-72 md:hidden relative`}>
                <FaAngleDoubleRight onClick={() => setShowSidebar(!showSidebar)} className={` md:hidden z-10 cursor-pointer text-2xl text-richblack-900 m-2 bg-richblack-100 rounded-full p-1 top-3 absolute -left-1 `}/>
            </div>
            <div className={`${showSidebar ? 'h-0 w-0' : 'h-[calc(100vh-3.5rem)] w-[320px]'} transition-all duration-700 z-20 relative offSidebar1`}>
                <div className={`${showSidebar ? 'hidden' : ""} mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-light-richblack-600 dark:border-dark-richblack-600 py-5 text-lg font-bold text-light-richblack-25 dark:text-dark-richblack-25 dark:bg-dark-richblack-25 offSidebar2`}>
                    <div className={`flex w-full items-center justify-between`}>
                        <div className='flex h-[35px] w-[35px] items-center justify-center rounded-full bg-light-richblack-100 p-1 text-light-richblack-700 hover:scale-90'>
                            <FaChevronLeft className='cursor-pointer md:hidden' onClick={() => { setShowSidebar(true) }} />
                            <FaChevronLeft className='cursor-pointer hidden md:block' onClick={() => { navigate(`/dashboard/enrolled-courses`) }} />
                        </div>
                        <IconBtn text={"Review"} onclick={() => { setReviewModal(true) }} />
                    </div>
                    <div className='flex flex-col'>
                        <p>My Courses</p>
                        <p className='text-sm font-semibold text-light-richblack-500 dark:text-dark-richblack-500'>
                            {completedLecture?.length} of {totalNoOfLectures} Lectures Completed
                        </p>
                    </div>

                </div>

            </div>
        </>
    )
}

export default VideoDetailsSidebar