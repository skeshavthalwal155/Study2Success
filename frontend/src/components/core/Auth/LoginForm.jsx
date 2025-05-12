import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import {login} from '../../../services/operations/authAPI'
import { setProgress } from '../../../slice/loadingBarSlice'


const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [fromData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = fromData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate))
  }

  return (
    <form onSubmit={handleOnSubmit} className='mt-6 flex w-full flex-col gap-y-4'>
      {/* for Email Address */}
      <label className='w-full'>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-light-richblack-5 dark:text-dark-richblack-5'>Email Address <sup className='text-red-500 dark:text-dark-pink-200'>*</sup></p>
        <input
          type="text"
          required
          name='email'
          value={email}
          onChange={handleOnChange}
          placeholder='Enter Email Address'
          style={{ boxShadow: 'inset 0px -1px 0px rgba(255,255,255,0.18)', }}
          autoComplete='email-address'
          className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] text-richblack-5 dark:shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] shadow-[0px_-1px_0px_0px_#00000014_inset]' 
          />
      </label>
      {/* for Password */}
      <label className='relative'>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-light-richblack-5 dark:text-dark-richblack-5'>Password <sup className='text-red-500 dark:text-dark-pink-200'>*</sup></p>
        <input
          required
          type={showPassword ? 'text' : 'password'}
          name='password'
          value={password}
          onChange={handleOnChange}
          placeholder='Enter Password'
          style={{ boxShadow: 'inset 0px -1px 0px rgba(255,255,255,0.18)', }}
          className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] text-richblack-5 dark:shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] shadow-[0px_-1px_0px_0px_#00000014_inset]' 
          autoComplete='current-password'
        />
        <span 
        onClick={()=> setShowPassword((prev)=>!prev)}
        className='absolute right-3 top-[38px] z-10 cursor-pointer'>
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} className="text-black dark:text-dark-richblack-100" />
          ):(
            <AiOutlineEye fontSize={24} className="text-black dark:text-dark-richblack-100" />
          )}
        </span>
        <Link to={'/forgot-password'}>
          <p className='mt-1 ml-auto max-w-max text-xs text-light-blue-100 dark:text-dark-blue-100 transition-all duration-200 hover:underline'>Forgot Password</p>
        </Link>
      </label>
      <button onClick={()=>{dispatch(setProgress(60))}}
        type='submit'
        className='mt-6 rounded-[8px] bg-dark-yellow-50 cursor-pointer py-[8px] px-[12px] font-medium text-dark-richblack-900'
        >
          Sign In
        </button>

    </form>
  )
}

export default LoginForm