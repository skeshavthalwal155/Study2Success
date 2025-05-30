import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({ modalData }) => {
    
    return (
        <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white/10 backdrop-blur-sm'>
            <div className='w-11/12 max-w-[350px] rounded-lg border dark:border-dark-richblack-400 border-light-richblack-400 dark:bg-dark-richblack-800 bg-light-richblack-800 p-6 '>
                <p className='text-2xl font-semibold dark:text-dark-richblack-5 text-light-richblack-5'>
                    {modalData.text1}
                </p>
                <p className='mt-3 mb-5 leading-6 dark:text-dark-richblack-200 text-light-richblack-200'>
                    {modalData.text2}
                </p>
                <div className='flex justify-between items-center gap-x-4'>
                    <IconBtn
                        onClick={modalData?.btn1Handler}
                        text={modalData?.btn1Text}
                    />
                    <button
                        className='flex items-center dark:bg-dark-richblack-200 bg-light-richblack-200 cursor-pointer gap-x-2 rounded-md py-2 text-sm md:text-lg px-3 md:px-5 font-semibold dark:text-dark-richblack-900 text-light-richblack-900'
                        onClick={modalData?.btn2Handler}>
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal