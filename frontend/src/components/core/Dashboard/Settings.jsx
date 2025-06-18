import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { updateAdditionalDetails, updatePassword, updatePfp, deleteAccount } from '../../../services/operations/ProfileApi'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'


const Settings = () => {



    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.profile.user)

    // Update Profile Picture
    const pfp = useSelector((state) => state.profile.user.image)
    const token = useSelector((state) => state.auth.token)

    const [profilePicture, setProfilePicture] = useState(pfp)
    const [uploadError, setUploadError] = useState(null)
    const [isUploading, setIsUploading] = useState(null)

    const handleUpload = async (e) => {
        e.preventDefault();
        setUploadError(null)


        const file = e.target[0].files[0];

        // validate file
        if (!file) {
            setUploadError("Please Select a file first")
            return
        }

        // validate file type
        const validType = ['image/png', 'image/jpeg', 'image/gif'];
        if (!validType.includes(file.type)) {
            setUploadError("Only PNG, JPEG or GIF image are allowed")
            return
        }

        if (file.size > 2 * 1024 * 1024) {
            setUploadError("File size must be less than 2MB")
        }

        try {
            setIsUploading(true)
            await updatePfp(token, file)

        } catch (error) {

            console.error("Upload Error : ", error)
            setUploadError(error.message || "Failed to Upload Image")
        } finally {
            setIsUploading(false)
        }

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(URL.createObjectURL(file));
            setUploadError(null); // Clear previous errors on new file selection
        }
    }


    // Update additional info
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        contactNumber: "",
        about: ""
    })

    const handleOnChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: value
        }))
    }

    const handleAdditonalDetails = (e) => {
        e.preventDefault()
        updateAdditionalDetails(token, formData)
    }

    // Update Password
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    const handleOnChangePassword = (e) => {
        setPassword((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handlePassword = (e) => {
        e.preventDefault()
        const { newPassword, confirmNewPassword } = password;
        if (newPassword === confirmNewPassword) {
            updatePassword(token, password);
        } else {
            alert("Password does not match")
        }
    }

    // Delete Account
    const onDeleteAccount = () => {
        if (window.confirm(
            "Are You sure you want to delete your account?")) {
            deleteAccount(token, dispatch, navigate)
        }
    }

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
        <div>
            <div className='flex-1 overflow-auto py-10'>
                <div className='mx-auto w-11/12 max-w-maxContent'>
                    <h1 className='text-3xl mb-14 font-medium dark:text-dark-richblack-5 text-light-richblack-5'>Edit Profile</h1>

                    {/* Update profile picture */}
                    <div className='flex items-center justify-between rounded-md border-[1px] dark:border-dark-richblack-700 border-light-richblack-700 dark:bg-dark-richblack-800 bg-light-richblack-800 md:p-8 md:px-12 px-3 py-3 dark:text-dark-richblack-5 text-light-richblack-5'>
                        <div className='flex items-center gap-x-4'>
                            <img loading="lazy" className='aspect-square w-[78px] rounded-full object-cover' src={profilePicture} alt={`profile-${user?.firstName}`} />
                            <div className='space-y-2'>
                                <p>Change Profile Picture</p>
                                <form onSubmit={handleUpload}>

                                    <div className='flex flex-row gap-3'>
                                        <label className='cursor-pointer rounded-md dark:bg-dark-richblack-700 bg-light-richblack-700 py-2 px-5 font-semibold dark:text-dark-richblack-50 text-light-richblack-50' htmlFor='upload'>
                                            Select
                                            <input id="upload" type='file' className='hidden' onChange={handleFileChange} accept='image/png, image/gif, image/jpeg' />
                                        </label>
                                        <button type='submit' disabled={isUploading} className='bg-dark-yellow-50 cursor-pointer rounded-md py-2 px-5 font-semibold text-dark-richblack-900 '>
                                            {isUploading ? "Uploading..." : "Upload"}
                                        </button>
                                    </div>
                                    {uploadError && (
                                        <span className='dark:text-dark-pink-200 text-red-500 text-sm'>{uploadError}</span>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Update Additional info */}
                    <form onSubmit={handleAdditonalDetails}>
                        <div className='my-10 flex flex-col gap-y-6 rounded-md border-[1px] dark:border-dark-richblack-700 border-light-richblack-700 dark:bg-dark-richblack-800 bg-light-richblack-900 p-8 px-12'>
                            <h2 className='text-lg font-semibold dark:text-dark-richblack-5 text-light-richblack-5'>Profile Information</h2>
                            <div className='flex flex-col gap-5 lg:flex-row'>
                                <div className='flex flex-col gap-2 lg:w-[48%]'>
                                    <label htmlFor="firstName" className='dark:text-dark-richblack-50 text-light-richblack-50'>First Name</label>
                                    <input
                                        className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-700 p-[12px] text-richblack-5'
                                        defaultValue={user?.firstName || null}
                                        type='text' name='firstName' id='firstName'
                                        placeholder='Enter First Name'
                                        onChange={handleOnChange} />
                                </div>
                                <div className='flex flex-col gap-2 lg:w-[48%]'>
                                    <label className='dark:text-dark-richblack-50 text-light-richblack-50' htmlFor="lastName">Last Name</label>
                                    <input  className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-700 p-[12px] text-richblack-5' defaultValue={user?.lastName || null} type='text' name='lastName' id='lastName' placeholder='Enter Last Name' onChange={handleOnChange} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-5 lg:flex-row'>
                                <div className='flex flex-col gap-2 lg:w-[48%]'>
                                    <label className='dark:text-dark-richblack-50 text-light-richblack-50' htmlFor="dateOfBirth">Date of Birth</label>
                                    <input  className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-700 p-[12px] text-richblack-5' defaultValue={user?.additionalDetails?.dateOfBirth || null} type='date' name='dateOfBirth' id='dateOfBirth' onChange={handleOnChange} />
                                </div>
                                <div className='flex flex-col gap-2 lg:w-[48%]'>
                                    <label className='dark:text-dark-richblack-50 text-light-richblack-50' htmlFor="gender">Gender</label>
                                    <select  className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-700 p-[12px] text-richblack-5' type='text' name='gender' value={formData.gender || ''} onChange={handleOnChange} id='gender'>

                                        <option value="" disabled hidden>
                                            {user?.additionalDetails?.gender ?? "Please Select Your Gender"}
                                        </option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Non-Binary">Non-Binary</option>
                                        <option value="Prefer not to say">Prefer not to say</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col gap-5 lg:flex-row'>
                                <div className='flex flex-col gap-2 lg:w-[48%]'>
                                    <label className='dark:text-dark-richblack-50 text-light-richblack-50' htmlFor="contactNumber">Contact Number</label>
                                    <input  className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-700 p-[12px] text-richblack-5' defaultValue={user?.additionalDetails?.contactNumber || null} type='text' name='contactNumber' id='contactNumber' placeholder='Enter Contact Number' onChange={handleOnChange} />
                                </div>
                                <div className='flex flex-col gap-2 lg:w-[48%]'>
                                    <label className='dark:text-dark-richblack-50 text-light-richblack-50' htmlFor="about">About</label>
                                    <input  className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-700 p-[12px] text-richblack-5' defaultValue={user?.additionalDetails?.about || null} type='text' name='about' id='about' placeholder='Enter Bio Details' onChange={handleOnChange} />
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end gap-2'>
                            <Link to={'/dashboard/my-profile'}>
                                <button className='cursor-pointer rounded-md dark:bg-dark-richblack-700 bg-light-richblack-700 py-2 px-5 font-semibold dark:text-dark-richblack-50 text-light-richblack-50'>Cancel</button>
                            </Link>
                            <button className='flex items-center bg-dark-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-dark-richblack-900 ' type='submit'>Save</button>
                        </div>
                    </form>

                    {/* Update Password */}
                    <form onSubmit={handlePassword}>
                        <div className='my-10 flex flex-col gap-y-6 rounded-md border-[1px] dark:border-dark-richblack-700 border-light-richblack-700 dark:bg-dark-richblack-800 bg-light-richblack-900 p-8 px-12'>
                            <h2 className='text-lg font-semibold dark:text-dark-richblack-5 text-light-richblack-5'>Password</h2>
                            {/* Old Password */}
                            <div className='flex flex-col gap-5 lg:flex-row'>
                                <div className='relative mt-4 flex flex-col gap-2 lg:w-[48%]'>
                                    <label className='w-full'>
                                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] dark:text-dark-richblack-5 text-light-richblack-5'>Current Password <sup className='dark:text-dark-pink-200 text-light-pink-200'>*</sup></p>
                                        <input
                                            required
                                            type={showOldPassword ? "text" : "password"}
                                            name='oldPassword'
                                            autoComplete='old-password'
                                            value={password.oldPasword}
                                            onChange={handleOnChangePassword}
                                            placeholder='Enter Old Password'
                                            style={{
                                                boxShadow: "inset 0px -1px 0px rgba(255, 255,255,0.18) "
                                            }}
                                            className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-700 p-[12px] text-richblack-5'
                                        />
                                    </label>
                                    <span
                                        onClick={() => setShowOldPassword((prev) => !prev)}
                                        className='absolute right-3 top-10 z-10 cursor-pointer'
                                    >
                                        {
                                            showOldPassword ? (<AiOutlineEyeInvisible fontSize={24} className="text-black dark:text-dark-richblack-100" />)
                                                : (<AiOutlineEye fontSize={24} className="text-black dark:text-dark-richblack-100" />)
                                        }
                                    </span>
                                </div>

                                {/* New Password */}
                                <div className='relative mt-4 flex flex-col gap-2 lg:w-[48%]'>
                                    <label className='w-full'>
                                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] dark:text-dark-richblack-5 text-light-richblack-5'>New Password <sup className='dark:text-dark-pink-200 text-light-pink-200'>*</sup></p>
                                        <input
                                            required
                                            type={showNewPassword ? "text" : "password"}
                                            name='newPassword'
                                            autoComplete='new-password'
                                            value={password.newPassword}
                                            onChange={handleOnChangePassword}
                                            placeholder='Enter New Password'
                                            style={{
                                                boxShadow: "inset 0px -1px 0px rgba(255, 255,255,0.18) "
                                            }}
                                           className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-700 p-[12px] text-richblack-5'
                                        />
                                    </label>
                                    <span
                                        onClick={() => setShowNewPassword((prev) => !prev)}
                                        className='absolute right-3 top-10 z-10 cursor-pointer'

                                    >
                                        {
                                            showNewPassword ? (<AiOutlineEyeInvisible fontSize={24} className="text-black dark:text-dark-richblack-100" />)
                                                : (<AiOutlineEye fontSize={24} className="text-black dark:text-dark-richblack-100" />)
                                        }
                                    </span>
                                </div>

                                {/* Confirm New Password */}
                                <div className='relative mt-4 flex flex-col gap-2 lg:w-[48%]'>
                                    <label className='w-full'>
                                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] dark:text-dark-richblack-5 text-light-richblack-5'>Confirm New Password <sup className='dark:text-dark-pink-200 text-light-pink-200'>*</sup></p>

                                        <input
                                            required
                                            type={showConfirmPassword ? "text" : "password"}
                                            name='confirmNewPassword'
                                            autoComplete='confirm-password'
                                            value={password.confirmNewPassword}
                                            onChange={handleOnChangePassword}
                                            placeholder='Enter Confirm New Password'
                                            style={{
                                                boxShadow: "inset 0px -1px 0px rgba(255, 255,255,0.18) "
                                            }}
                                            className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-700 p-[12px] text-richblack-5'
                                        />
                                    </label>
                                    <span
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className='absolute right-3 top-10 z-10 cursor-pointer'
                                    >
                                        {
                                            showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} className="text-black dark:text-dark-richblack-100" />)
                                                : (<AiOutlineEye fontSize={24} className="text-black dark:text-dark-richblack-100"/>)
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end gap-2'>
                            <Link to={'/dashboard/my-profile'}>
                                <button className='cursor-pointer rounded-md dark:bg-dark-richblack-700 bg-light-richblack-700 py-2 px-5 font-semibold dark:text-dark-richblack-50 text-light-richblack-50'>Cancel</button>
                            </Link>
                            <button className='flex items-center bg-dark-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-dark-richblack-900 ' type='submit'>Save</button>
                        </div>
                    </form>

                    {/* Delete Account */}
                    <div className='my-10 flex flex-row gap-x-5 rounded-md border-[1px]dark:border-dark-pink-700 border-light-pink-700 dark:bg-dark-pink-900 bg-red-200 p-2 md:p-8 md:px-12'>
                        <div className='flex aspect-square h-14 w-14 items-center justify-center rounded-full dark:bg-dark-pink-700 bg-light-pink-700'>
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-3xl dark:text-dark-pink-200 text-light-pink-200" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </div>
                        <div className='flex flex-col space-y-2 w-full'>
                            <h2 className='text-lg font-semibold text-light-richblack-5 dark:text-dark-richblack-5'>Delete Acccount</h2>
                            <div className='md:w-3/5 dark:text-dark-pink-25 text-light-pink-25 '>
                                <p>Would you like to delete account ?</p>
                                <p> If this account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.</p>
                            </div>
                            <button type='button' onClick={onDeleteAccount} className='w-fit cursor-pointer italic dark:text-dark-pink-300 text-red-600'>I want to delete my account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings