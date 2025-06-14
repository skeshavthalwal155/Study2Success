import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { apiConnector } from '../../services/apiconnector'
import { contactusEndpoint } from '../../services/apis'
import countryCode from '../../data/countrycode.json'
import toast from 'react-hot-toast'

const { CONTACT_US_API } = contactusEndpoint

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm()

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: ""
            })
        }
    }, [isSubmitSuccessful, reset])

    const submitContactForm = async (data) => {
        // console.log(data)
        try {
            setLoading(true)
            const phoneNo = data.countryCode + " " + data.phoneNo
            const { firstName, lastName, email, message } = data;
            const response = await apiConnector("POST", CONTACT_US_API, { firstName, lastName, email, message, phoneNo });
            if (response.data.success === true) {
                toast.success("Message Sent Successfully");
            } else {
                toast.error("Something Went Wrong");
            }
            // console.log("Logging Response", response)
            setLoading(false)

        } catch (error) {
            console.log("Error : ", error.message)
            setLoading(false)
        }
    }

    return (
        loading ? (<div className=".loader w-[100%] pt-[30%] pb-[30%] pl-[40%]"><div className="flex items-center justify-center loader"></div></div>) : (
            <div>

                <form className='flex flex-col gap-7' onSubmit={handleSubmit(submitContactForm)}>
                    <div className='flex flex-col gap-5 lg:flex-row'>
                        {/* First Name */}
                        <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label className='text-[14px] leading-6 dark:text-dark-richblack-5 text-light-richblack-5' htmlFor='firstName'>First Name</label>
                            <input
                                className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] text-richblack-5'
                                type="text"
                                name='firstName'
                                id='firstName'
                                placeholder='Enter First Name'
                                {...register("firstName", { required: true })}
                            />
                            {
                                errors.firstName && (
                                    <span className='text-red-500 dark:text-dark-yellow-25'>Please Enter Your Name</span>
                                )
                            }
                        </div>

                        {/* Last Name */}
                        <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label className='text-[14px] leading-6 dark:text-dark-richblack-5 text-light-richblack-5' htmlFor='lastName'>Last Name</label>
                            <input
                                className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] text-richblack-5'
                                type="text"
                                name='lastName'
                                id='lastName'
                                placeholder='Enter Last Name'
                                {...register("lastName")}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-[14px] leading-6 dark:text-dark-richblack-5 text-light-richblack-5' htmlFor="email">Email Address</label>
                        <input
                            className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] text-richblack-5'
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Enter Email Address'
                            {...register("email", { require: true })}
                        />
                        {
                            errors.email && (
                                <span className='dark:text-dark-yellow-25 text-red-500'>Please Enter Your Email Address</span>
                            )
                        }
                    </div>

                    {/* Phone Number */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-[14px] leading-6 dark:text-dark-richblack-5 text-light-richblack-5' htmlFor="phoneNo">Phone Number</label>
                        <div className='flex gap-5 '>
                            <div className='flex w-[85px] flex-col gap-2'>
                                <select
                                    className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] text-richblack-5'
                                    name="dropdown"
                                    id="dropdown"
                                    {...register('countryCode', { required: true })}
                                >
                                    {
                                        countryCode.map((item, index) => (
                                            <option key={index} value={item.code}>
                                                {item.code} - {item.country}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='flex w-[calc(100%-90px)] flex-col gap-2'>
                                <input
                                    className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] text-richblack-5'
                                    type="number"
                                    name='phoneNo'
                                    id='phoneNo'
                                    placeholder='12345 67890'
                                    {...register('phoneNo',
                                        {
                                            required: { value: true, message: "Please Enter Mobile Number" },
                                            maxLength: { value: 10, message: "Invalid Mobile Number" },
                                            minLength: { value: 10, message: "Invalid Mobile Number" },

                                        })}
                                />
                                {
                                    errors.phoneNo && (
                                        <span className='dark:text-dark-yellow-25 text-red-500'>Please Enter Your Phone Number</span>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-[14px] leading-6 dark:text-dark-richblack-5 text-light-richblack-5' htmlFor="message">Message</label>
                        <textarea
                            className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] text-richblack-5'
                            name="message"
                            id="message"
                            cols={30}
                            rows={7}
                            placeholder='Enter Your Message Here'
                            {...register("message", { required: true })}
                        />
                        {
                            errors.message && (
                                <span className='dark:text-dark-yellow-25 text-red-500'>Enter Your Message</span>
                            )
                        }
                    </div>
                    <button type="submit" className='cursor-pointer rounded-md bg-dark-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] transition-all duration-200 hover:scale-95 hover:shadow-none dark:disabled:bg-dark-richblack-500 disabled:bg-light-richblack-500 sm:text-[16px]'>
                        Send Message
                    </button>
                </form>
            </div>
        )
    )
}

export default ContactUsForm