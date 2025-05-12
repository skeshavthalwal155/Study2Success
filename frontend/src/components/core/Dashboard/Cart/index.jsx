import React from 'react'
import { useSelector } from 'react-redux'
import RenderTotalAmount from './RenderTotalAmount'
import RenderCartCourses from './RenderCartCourses'

const Cart = () => {

    const { total, totalItems } = useSelector((state) => state.cart)
    // console.log("total : ",total)
    return (
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
            <h1 className='mb-14 text-3xl font-medium dark:text-dark-richblack-5 text-light-richblack-5'>Your Cart</h1>
            <p className='border-b dark:border-b-dark-richblack-400 border-b-light-richblack-400 pb-2 font-semibold dark:text-dark-richblack-400 text-light-richblack-400 crimson'>{totalItems} Courses in Cart </p>
            {
                total > 0 ? (
                    <div className='mt-1 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row '>
                        <RenderCartCourses/>
                        <RenderTotalAmount/>
                    </div>
                ) :
                    (
                        <p className='mt-14 text-center text-3xl dark:text-dark-red-600 text-light-red-600'>Your Cart is Empty</p>
                    )
            }
        </div>
    )
}

export default Cart