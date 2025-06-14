import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import { useNavigate } from 'react-router-dom';
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const course = cart.map((course) => course._id)
    buyCourse(token, course, user, navigate, dispatch)
  }
  return (

    <div className='min-w-[280px] rounded-md border-[1px] dark:border-dark-richblack-700 border-light-richblack-700 dark:bg-dark-richblack-800 bg-light-richblack-800 p-3 md:p-6 '>

      <p className='mb-1 text-sm font-medium dark:text-dark-richblack-300 text-light-richblack-300'>Total:</p>
      <p className='mb-6 text-3xl font-medium dark:text-dark-yellow-100 text-red-500'>₹ {total}</p>

      <IconBtn
        text="Buy Now"
        onClick={handleBuyCourse}
        customClasses={"w-full justify-center"}
      />
    </div>

  )
}

export default RenderTotalAmount