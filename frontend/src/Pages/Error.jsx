import React from 'react'
import { MdError } from "react-icons/md";
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='flex justify-center flex-col h-[calc(100vh-3.5rem)] items-center text-red-500'>
      <MdError className='text-[10rem]' />
      <h1 className='text-4xl mb-4 font-bold'>Error 404 Page</h1>
      <p className='text-center text-lg w-[30%]'>This page you are looking for cannot be found. It might have been removed, renamed, or is temporarily unavailable.</p>
      <Link to={'/'}>
        <button className='border mt-4 bg-red-500 dark:text-dark-richblack-5 text-light-richblack-5 py-2 px-6 hover:dark:bg-red-700 hover:bg-red-400 rounded-md duration-200 transition-all cursor-pointer '>
          Go Back
        </button>
      </Link>

    </div>
  )
}

export default Error