import { useEffect, useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutSide from '../../../hooks/useOnClickOutSide'
import { logout } from "../../../services/operations/authAPI"


export default function ProfileDropDown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutSide(ref, () => setOpen(false))

  if (!user) {
    // console.log("no user")
    return localStorage.setItem("token", null)
  }

  
  const handleLogout = () => {
    console.log("Logging out..."); // Debug log
    dispatch(logout(navigate))
      // .then(() => console.log("Logout successful")) // Check if dispatched
      // .catch((err) => console.error("Logout error:", err));
    setOpen(false);
  };



  return (
    <button className="relative cursor-pointer" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-light-richblack-100 dark:text-dark-richblack-100" />
      </div>
      {
        open && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-[118%] -right-8 z-[1000] divide-y-[1px] dark:divide-dark-richblack-700 divide-light-richblack-700 overflow-hidden rounded-md border-[1px] dark:border-dark-richblack-700 border-light-richblack-700 dark:bg-dark-richblack-800 bg-light-richblack-800"
            ref={ref}
          >
            <Link to='/dashboard/my-profile' onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-light-richblack-25 dark:text-dark-richblack-100 hover:bg-light-richblack-700 hover:dark:bg-dark-richblack-700 hover:text-light-richblack-100 hover:dark:text-dark-richblack-25 duration-200">
                <VscDashboard className="text-lg" />
                Dashboard
              </div>
            </Link>
            <div
              onClick={
                (e)=>{
                  e.stopPropagation();
                  handleLogout()
                }}
                className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-light-richblack-25 dark:text-dark-richblack-100 hover:bg-light-richblack-700 hover:dark:bg-dark-richblack-700 hover:text-light-richblack-100 hover:dark:text-dark-richblack-25 duration-200">
            
              <VscSignOut className="text-lg" />
              Logout
            </div>
          </div>
        )
      }
    </button >
  )
}