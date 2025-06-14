import { useEffect, useRef, useState } from "react"
import {AiOutlineDown} from 'react-icons/ai'
import CourseSubSectionAccordion from "./CourseSubSectionAccordion"

export default function CourseAccordionBar({course, isActive, handleActive}) {
  const contentEl = useRef(null)

  // Accordian state
  const [active, setActive] = useState(false)
  useEffect(()=>{
    setActive(isActive?.includes(course._id))
  },[isActive])
  const [sectionHeight, setSectionHegiht] = useState(0)

  useEffect(()=>{
    // console.log(contentEl.current)
    if(contentEl.current){
      setSectionHegiht(active ? contentEl.current.scrollHeight : 0)
    }
  },[active])

  return (
    <div className="overflow-hidden border border-solid dark:border-dark-richblack-600 border-light-richblack-600 dark:bg-dark-richblack-700 bg-light-richblack-700 dark:text-dark-richblack-5 text-light-richblack-5 last:mb-0">
      <div>
        <div
          className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7 py-6 transition-[0.3s]`}
          onClick={()=>{
            handleActive(course._id)
          }}
        > 
          <div className="flex items-center gap-2">
            <i className={
              isActive.includes(course._id) ? "rotate-180" : "rotate-0"
            }>
              <AiOutlineDown/>
            </i>
            <p>{course?.sectionName}</p>
          </div>
          <div className="space-x-4">
            <span className="dark:text-dark-yellow-25 text-red-600">
              {`${course.SubSection.length || 0 } lecture(s)`}
            </span>
          </div>
        </div>
      </div>
      <div
        ref={contentEl}
        className={`relative h-0 overflow-hidden dark:bg-dark-richblack-900 bg-light-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
        style={{
          height:sectionHeight
        }}
      >
        <div className="flex flex-col gap-2 px-7 py-6 font-semibold">
          {
            course?.SubSection?.map((subSec, i)=>(
              <CourseSubSectionAccordion subSec={subSec} key={i}/>
            ))
          }
        </div>
      </div>      
    </div>
  )
}

