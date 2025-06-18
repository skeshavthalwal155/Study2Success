import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IoIosInformationCircleOutline, IoMdMail } from "react-icons/io";
import { FaBirthdayCake, FaPhoneAlt, FaGenderless } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { formatDate } from '../../../../services/formatDate';

const ViewSingleUser = (viewUser) => {
  const user = viewUser.viewUser.user;

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-black/50 backdrop-blur-sm'>
      <div className='w-11/12 max-w-[500px] m-4 rounded-2xl border relative dark:border-dark-richblack-400 border-light-richblack-400 dark:bg-dark-richblack-800 bg-light-richblack-800 p-8 shadow-xl transform transition-all hover:scale-[1.01]'>
        <div className='flex justify-between items-center border-b pb-4 dark:border-dark-richblack-400 border-light-richblack-400'>
          <h1 className='text-2xl font-bold font-edu-sa'>User Profile</h1>
          <button
            onClick={viewUser.viewUser.closeHandler}
            className='hover:dark:bg-dark-richblack-50 hover:bg-light-richblack-50 p-2 cursor-pointer rounded-full transition-all text-light-richblack-5 hover:text-light-richblack-900 dark:text-dark-richblack-5 hover:dark:text-dark-richblack-900'
          >
            <AiOutlineClose className='text-xl hover:rotate-90 duration-300' />
          </button>
        </div>

        <div className='flex flex-col gap-y-6 mt-6'>
          <div className='relative'>
            <img loading="lazy" 
              src={user.image} 
              alt={user.firstName} 
              className='rounded-xl shadow-lg w-full h-[300px] object-cover' 
            />
            <span className='absolute top-4 right-4 bg-white/90 dark:bg-black/50 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2'>
              {user.accountType}
              {user.approved && <MdVerified className='text-blue-500' />}
            </span>
          </div>

          <div className='space-y-4'>
            <h2 className='font-bold text-3xl text-center'>{user.firstName} {user.lastName}</h2>
            
            <div className='grid grid-cols-1 gap-4 text-sm'>
              <div className='flex items-center gap-3 bg-light-richblack-900 dark:bg-dark-richblack-900 p-3 rounded-lg'>
                <IoMdMail className='text-xl dark:text-dark-yellow-50' />
                <span>{user.email}</span>
              </div>

              <div className='flex items-center gap-3 bg-light-richblack-900 dark:bg-dark-richblack-900 p-3 rounded-lg'>
                <FaBirthdayCake className='text-xl dark:text-dark-yellow-50' />
                <span>{user.additionalDetails.dateOfBirth}</span>
              </div>

              <div className='flex items-center gap-3 bg-light-richblack-900 dark:bg-dark-richblack-900 p-3 rounded-lg'>
                <FaPhoneAlt className='text-xl dark:text-dark-yellow-50' />
                <span>{user.additionalDetails.contactNumber}</span>
              </div>

              <div className='flex items-center gap-3 bg-light-richblack-900 dark:bg-dark-richblack-900 p-3 rounded-lg'>
                <FaGenderless className='text-xl dark:text-dark-yellow-50' />
                <span>{user.additionalDetails.gender}</span>
              </div>

              {user.additionalDetails.about && (
                <div className='bg-light-richblack-900 dark:bg-dark-richblack-900 p-3 rounded-lg'>
                  <p className='font-medium mb-1'>About</p>
                  <p className='text-richblack-300'>{user.additionalDetails.about}</p>
                </div>
              )}

              <div className='flex items-center gap-2 text-xs text-light-richblack-300 dark:text-dark-richblack-300'>
                <IoIosInformationCircleOutline className='text-lg' />
                Member since {formatDate(user?.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ViewSingleUser

