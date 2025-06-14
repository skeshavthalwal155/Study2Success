import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { FiEdit } from 'react-icons/fi'

const MyProfile = () => {

    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token)

    const checkIsNotUserOrTokenPresent = () => {
        if (!user || !token) {
            navigate("/")
        } else {
            console.log("User Present")
        }
    }

    useEffect(() => {
        checkIsNotUserOrTokenPresent()
    }, [user, token])


    return (
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
            <h1 className='mb-14 text-3xl font-medium dark:text-dark-richblack-5 text-light-richblack-5'>My Profile</h1>

            {/* Section 1 */}
            <div className='flex item-center justify-between rounded-md border-[1px] dark:border-dark-richblack-700 border-light-richblack-700 dark:bg-dark-richblack-800 bg-light-richblack-800 p-3 md:p-8 md:px-12'>
                <div className='flex items-center gap-x-4'>
                    <img
                        src={user?.image}
                        alt={`Profile-${user?.firstName}`}
                        className='aspect-square w-[78px] rounded-full object-cover' />
                    <div className='space-y-1'>
                        <p className='text-lg font-semibold dark:text-dark-richblack-5 text-light-richblack-5'>{user?.firstName + " " + user?.lastName}</p>
                        <p className='text-[11px] md:text-sm dark:text-dark-richblack-300 text-light-richblack-300 md:max-w-full max-w-[220px] break-words'>
                            {user?.email}
                        </p>
                    </div>
                </div>
                <div className='hidden md:block'>
                    <IconBtn icon={<FiEdit />} text={"Edit"} onClick={() => { navigate('/dashboard/settings') }} />
                </div>
            </div>

            {/* Section 2 */}
            <div className='my-10 flex flex-col gap-y-3 md:gap-y-10 rounded-md border-[1px] dark:border-dark-richblack-700 border-light-richblack-700 dark:bg-dark-richblack-800 bg-light-richblack-800 p-3 md:p-8 md:px-12'>
                <div className='flex w-full items-center justify-between'>
                    <p className='text-lg font-semibold dark:text-dark-richblack-5 text-light-richblack-5'>About</p>

                    <IconBtn
                        icon={<FiEdit />}
                        text={'Edit'}
                        onClick={() => navigate("/dashboard/settings")} />
                </div>
                <p className='dark:text-dark-richblack-5 text-light-richblack-5 text-sm font-medium'>
                    {user?.additionalDetails?.about ?? "Write Something About Yourself"}
                </p>

            </div>

            {/* Section 3 */}
            <div className='my-10 flex flex-col gap-y-3 md:gap-y-10 rounded-md border-[1px] dark:border-dark-richblack-700 border-light-richblack-700 dark:bg-dark-richblack-800 bg-light-richblack-800 p-3 md:p-8 md:px-12'>
                <div className='flex w-full items-center justify-between'>
                    <p className='text-lg font-semibold dark:text-dark-richblack-5 text-light-richblack-5'>Personal Details</p>
                    <IconBtn
                        icon={<FiEdit />}
                        text={'Edit'}
                        onClick={() => navigate("/dashboard/settings")} />
                </div>
                <div className='flex gap-y-5 md:flex-row flex-col max-w-[500px] justify-between '>
                    <div className='flex flex-col gap-y-5'>
                        <div>
                            <p className='mb-2 text-sm dark:text-dark-richblack-400 text-light-richblack-400'>First Name</p>
                            <p className='text-sm font-medium dark:text-dark-richblack-5 text-light-richblack-5'>{user?.firstName}</p>
                        </div>
                        <div>
                            <p className='mb-2 text-sm dark:text-dark-richblack-400 text-light-richblack-400'>Email</p>
                            <p className='text-sm font-medium dark:text-dark-richblack-5 text-light-richblack-5'>{user?.email}</p>
                        </div>
                        <div>

                            <p className='mb-2 text-sm dark:text-dark-richblack-400 text-light-richblack-400'>Gender</p>
                            <p className='text-sm font-medium dark:text-dark-richblack-5 text-light-richblack-5'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-y-5'>
                        <div>
                            <p className='mb-2 text-sm dark:text-dark-richblack-400 text-light-richblack-400'>Last Name</p>
                            <p className='text-sm font-medium dark:text-dark-richblack-5 text-light-richblack-5'>{user?.lastName}</p>
                        </div>

                        <div>
                            <p className='mb-2 text-sm dark:text-dark-richblack-400 text-light-richblack-400'>Phone Number</p>
                            <p className='text-sm font-medium dark:text-dark-richblack-5 text-light-richblack-5'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                        </div>

                        <div>
                            <p className='mb-2 text-sm dark:text-dark-richblack-400 text-light-richblack-400'>Date of Birth</p>
                            <p className='text-sm font-medium dark:text-dark-richblack-5 text-light-richblack-5'>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MyProfile