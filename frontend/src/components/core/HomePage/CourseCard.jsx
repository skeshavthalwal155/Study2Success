import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {

  return (
    <div className={`w-[360px] lg:w-[30%] ${currentCard === cardData.heading ? "dark:bg-white bg-light-richblack-50 text-light-richblack-700 dark:text-light-richblack-700  shadow-[12px_12px_0px] shadow-[#FFD60A]" : "bg-light-richblack-800 dark:bg-dark-richblack-800 text-light-richblue-100 dark:text-dark-richblue-100"} h-[300px] box-border cursor-pointer flex flex-col`} onClick={() => { setCurrentCard(cardData.heading) }}>

      <div className={`border-b-[2px] border-light-richblack-400 dark:border-dark-richblack-400 border-dashed h-[80%] p-6 flex flex-col`}>
        <div className={` ${currentCard === cardData?.heading && "dark:text-dark-richblack-800 text-light-richblack-800"} font-semibold text-[20px]`}>
          {cardData?.heading}
        </div>
        <div className="dark:text-dark-richblack-400 text-light-richblack-400">{cardData?.description}</div>
      </div>

      <div
        className={`flex justify-between ${currentCard === cardData?.heading ? "text-light-blue-300 dark:text-dark-blue-300" : " text-light-richblack-300 dark:text-dark-richblack-300" } px-6 py-3 font-medium`}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{cardData?.lessionNumber} Lession</p>
        </div>
      </div>
    </div>
  )
}

export default CourseCard