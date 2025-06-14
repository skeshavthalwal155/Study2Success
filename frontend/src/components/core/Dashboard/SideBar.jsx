import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import SidebarLink from './SidebarLink'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'

const SideBar = () => {

  const { loading: authLoading } = useSelector((state) => state.auth)
  const { user, loading: profileLoading } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)

  if (profileLoading || authLoading) {
    return (
      <div className='flex flex-col gap-4 text-2xl text-center dark:text-dark-richblack-5 text-light-richblack-5 items-center justify-center h-[calc(100vh-3.5rem)]'>
        <div className='loader '></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div>

      <div className='hidden lg:flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] dark:bg-dark-richblack-800 dark:border-dark-richblack-700 border-light-richblack-700 bg-light-richblack-800 py-10 '>

        <div className='flex flex-col'>
          {
            sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) {
                console.log(user?.accountType)
                return null
              };
              return (
                <SidebarLink key={link.id} link={link} iconName={link.icon} />
              )
            })}

        </div>

        <div className='mx-auto my-6 h-[1px] w-10/12 dark:bg-dark-richblack-600 bg-light-richblack-600'></div>

        <div className='flex flex-col'>
          <SidebarLink
            link={{ name: "Settings", path: "dashboard/settings" }}
            iconName="VscSettingsGear"
          />

          <button
            onClick={() => setConfirmationModal({
              text1: "Are Your Sure ?",
              text2: "You will be logged out of your account.",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null)
            })}
            className='px-8 py-2 text-sm font cursor-pointer text-light-richblack-300 dark:text-dark-richblack-300 '
          >
            <div className='flex items-center gap-x-2 text-light-richblack-100 dark:text-dark-richblack-300'>
              <VscSignOut className='text-lg' />
              <span>Logout</span>
            </div>

          </button>


        </div>



      </div>
      {/* Mobile Siderbar */}
      <div className='flex lg:hidden fixed bottom-0 justify-between items-center px-2 py-1 bg-light-richblack-900 dark:bg-dark-richblack-900 z-50 w-full'>
        <div className='flex flex-row gap-1 w-full justify-between'>
          {
            sidebarLinks.map((link) => {
              if (link.type && user.accountType !== link.type) return null;
              return (
                <SidebarLink key={link.id} link={link} iconName={link.icon} />
              )
            })}
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
        </div>
      </div>
      
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default SideBar