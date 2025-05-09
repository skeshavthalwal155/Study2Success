import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
    return (
        <div className='text-xl md:text-4xl relative font-semibold mx-auto py-5 pb-20 text-center dark:text-dark-richblack-5 text-[#00143f]'>
            <span className='dark:text-dark-richblack-600 text-[#00143f] absolute left-[-.3%] top-[5%]'>“ </span>
            We’re on a mission to transform the way we learn! Our platform brings together
            <HighlightText text={"cutting-edge tech"} />,
            <span className='text-transparent bg-clip-text bg-[linear-gradient(117.83deg,#FF512F_-4.8%,#F09819_107.46%)]'>
                {" "}
                expert knowledge
            </span>
            , and a vibrant community to deliver a truly
            <span className='text-transparent bg-clip-text bg-[linear-gradient(117.83deg,#FF512F_-4.8%,#F09819_107.46%)]'>
                {" "}
                amazing educational experience.
            </span>
            <span className='dark:text-dark-richblack-600 text-[#00143f] absolute rotate-180 top-[36%]'> “</span>


        </div>
    )
}

export default Quote