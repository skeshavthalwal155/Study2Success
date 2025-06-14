import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold 
            ${active ?
          "bg-dark-yellow-50 text-black shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset]"
          :
          "bg-light-richblack-800 text-black dark:text-white  dark:bg-dark-richblack-800 shadow-[-2px_-2px_0px_0px_#FFFFFF2E_inset]"
        }         
        hover:scale-95 transition-all duration-200
          `}>
        {children}
      </div>
    </Link>
  )
}

export default Button