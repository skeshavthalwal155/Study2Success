import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { resetPassword } from '../services/operations/authAPI'
import { Link, useParams } from 'react-router-dom'

const UpdatePassword = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const token = id;
    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (formData.password === formData.confirmPassword) {
            dispatch(resetPassword(formData.password, formData.confirmPassword, token, setResetComplete));
        } else {
            alert("Passwords Do Not Match")
        }
    }

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    })
    const { loading } = useSelector((state) => state.auth);
    const [resetComplete, setResetComplete] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center' >
            {
                loading ? (
                    <div className='loader'></div>
                ) : (
                    <div className='max-w-[500px] p-4 lg:p-8'>
                        <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                            {!resetComplete ? ("Choose new Password") : "Reset Complete!"}
                        </h1>
                        <p className='text-[1.125rem] leading-[1.625rem] text-richblack-100'>
                            {!resetComplete ? ("Almost done. Enter Your New Password and you're all set.") : (`All Done! We have sent an email to ${"nn"} to confirm`)}
                        </p>
                        <form onSubmit={handleOnSubmit}>
                            {
                                !resetComplete && (
                                    <div>
                                        <div className='relative mt-4'>
                                            <label className="w-full">
                                                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-light-richblack-5 dark:text-dark-richblack-5'>Create New Password <sup className='text-red-500 dark:text-dark-pink-200'>*</sup></p>

                                                <input
                                                    required
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleOnChange}
                                                    placeholder="Enter New Password"
                                                    autoComplete='new-password'
                                                    style={{ boxShadow: 'inset 0px -1px 0px rgba(255,255,255,0.18)', }}
                                                    className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] text-richblack-5'
                                                />
                                                <span
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                                >
                                                    {showPassword ? (
                                                        <AiOutlineEyeInvisible fontSize={24} className="text-black dark:text-dark-richblack-100" />
                                                    ) : (
                                                        <AiOutlineEye fontSize={24} className="text-black dark:text-dark-richblack-100" />
                                                    )}
                                                </span>
                                            </label>
                                        </div>
                                        <div className='relative mt-4'>
                                            <label className="w-full">
                                                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-light-richblack-5 dark:text-dark-richblack-5'>Confirm New Password <sup className='text-red-500 dark:text-dark-pink-200'>*</sup></p>

                                                <input
                                                    required
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleOnChange}
                                                    placeholder="Confirm Password"
                                                    autoComplete="Confirm-Password"
                                                    style={{ boxShadow: 'inset 0px -1px 0px rgba(255,255,255,0.18)', }}
                                                    className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] text-richblack-5'
                                                />
                                                <span
                                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                                >
                                                    {showConfirmPassword ? (
                                                        <AiOutlineEyeInvisible fontSize={24} className="text-black dark:text-dark-richblack-100" />
                                                    ) : (
                                                        <AiOutlineEye fontSize={24} className="text-black dark:text-dark-richblack-100" />
                                                    )}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                !resetComplete ? (
                                    <button
                                        type="submit"
                                        className="mt-6 w-full rounded-[8px] bg-dark-yellow-50 py-[12px] px-[12px] font-medium cursor-pointer text-dark-richblack-900"
                                    >
                                        Reset Password
                                    </button>) : (
                                    <Link to={'/login'}><button
                                        className="mt-6 w-full rounded-[8px] bg-dark-yellow-50 py-[12px] px-[12px] font-medium cursor-pointer text-dark-richblack-900">
                                        Return To Login
                                    </button>
                                    </Link>
                                )
                            }

                        </form>

                    </div>
                )
            }
        </div >
    )
}

export default UpdatePassword