import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { useDispatch } from 'react-redux';

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(getPasswordResetToken(email, setEmailSend))
    }
    const { loading } = useSelector((state) => state.auth)
    const [emailSend, setEmailSend] = useState(false)
    const [email, setEmail] = useState("");
    return (
        <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center '>
            {
                loading ? (
                    <div className='loader'></div>
                ) : (
                    <div className='max-w-[500px] p-4 lg:p-8'>
                        <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] dark:text-dark-richblack-5 text-light-richblack-5'>
                            {
                                !emailSend ? "Reset Your Password" : "Check Your Email"
                            }
                        </h1>
                        <p className='my-4 text-[1.125rem] leading-[1.625rem] dark:text-dark-richblack-100 text-light-richblack-100'>
                            {
                                !emailSend ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                                    : `We have sent the reset email to ${email}`
                            }
                        </p>
                        <form onSubmit={handleOnSubmit}>
                            {
                                !emailSend && (
                                    <label className='w-full'>
                                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] dark:text-dark-richblue-5 text-light-richblack-5'>Email Address <sup className='dark:text-dark-pink-200 text-red-500'>*</sup></p>
                                        <input
                                            required
                                            type="email"
                                            value={email}
                                            name='email'
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='Enter Your Email Address'
                                            autoComplete='email'
                                            className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] text-richblack-5' 
                                            />
                                    </label>
                                )
                            }
                            <button
                                type='submit'
                                className='mt-6 cursor-pointer w-full rounded-[8px] bg-dark-yellow-50 py-[12px] px-12 font-medium text-dark-richblack-900 '
                            >
                                {
                                    !emailSend ? "Reset Password"
                                        : "Resend Email"
                                }
                            </button>
                        </form>
                        <div className='mt-6 flex items-center justify-between'>
                            <Link to='/login'>
                                <p className="flex items-center gap-x-2 dark:text-dark-richblack-5 text-light-richblack-5"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg> Back To Login</p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword