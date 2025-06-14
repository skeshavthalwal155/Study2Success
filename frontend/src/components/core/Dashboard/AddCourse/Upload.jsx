import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactPlayer from 'react-player'
import { useDropzone } from 'react-dropzone'
import { FaFileUpload } from 'react-icons/fa'

const Upload = ({ name, label, register, setValue, errors, video = false, viewData = null, editData = null }) => {
    const { course } = useSelector((state) => state.course)
    const [selectedFile, setSelectFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(
        viewData ? viewData : editData ? editData : ""
    )
    const [isVideoReady, setIsVideoReady] = useState(false)
    const inputRef = useRef(null)
    const playerRef = useRef(null)

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
            previewFile(file)
            setSelectFile(file)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: !video
            ? { 'image/*': ['.jpeg', '.jpg', '.png'] }
            : { 'video/*': ['.mp4'] },
        onDrop,
    })

    const previewFile = (file) => {
        // for videos, we'll use URL.creatobjectUrl for better performance
        if (video) {
            const videoUrl = URL.createObjectURL(file)
            setPreviewSource(videoUrl)
        } else {
            // For Image use file reader 
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setPreviewSource(reader.result)
            }
        }
    }

    useEffect(() => {
        register(name, { required: true })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [register])

    useEffect(() => {
        setValue(name, selectedFile)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFile, setValue])

    // Clean up object urls when components unmount
    useEffect(() => {
        return () => {
            if (video && previewSource) {
                URL.revokeObjectURL(previewSource)
            }
        }
    }, [previewSource, video])

    const handleVideoReady = () => {
        setIsVideoReady(true)
    }

    const handleVideoError = (error) => {
        console.error("Video Playback error : ", error)
        setIsVideoReady(false)
    }


    const { onClick, ...rootProps } = getRootProps()

    return (
        <div className='flex flex-col space-y-2'>
            <label className='text-sm dark:text-dark-richblack-5 text-light-richblack-5' htmlFor={name}>{label}<sup className='dark:text-dark-pink-200 text-light-pink-200'>*</sup></label>
            <div className={`${isDragActive ? "dark:bg-dark-richblack-600 bg-light-richblack-800" : "dark:bg-dark-richblack-700 bg-light-richblack-700"
                } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted dark:border-dark-richblack-500 border-light-richblack-500`}>
                {previewSource ? (
                    <div className='flex w-full flex-col p-6'>
                        {!video ? (
                            <img
                                src={previewSource}
                                alt='Preview'
                                className='h-full w-full rounded-md object-cover'
                            />
                        ) : (
                            <div className='relative aspect-video w-full overflow-hidden rounded-md'>
                               <ReactPlayer
                                    ref={playerRef}
                                    url={previewSource}
                                    width="100%"
                                    height="100%"
                                    controls={true}
                                    playsinline={true}
                                    onReady={handleVideoReady}
                                    onError={handleVideoError}
                                    config={{
                                        file: {
                                            attributes: {
                                                controlsList: 'nodownload',
                                                disablePictureInPicture: true
                                            }
                                        }
                                    }}
                                />
                                {!isVideoReady && (
                                    <div className='absolute inset-0 flex flex-col items-center justify-center dark:bg-dark-richblack-800 bg-light-richblack-800'>
                                        <span className='loader'></span>
                                        <p className='dark:text-dark-richblack-100 text-light-richblack-100'>Loading video...</p>
                                    </div>
                                )}
                            </div>

                        )}
                        {
                            !viewData && (
                                <button
                                    type='button'
                                    onClick={() => {
                                        setPreviewSource('')
                                        setSelectFile(null)
                                        setValue(name, null)
                                    }}
                                    className='mt-3 dark:text-dark-richblack-400 text-light-richblack-400 underline'
                                >
                                    Cancel
                                </button>
                            )}
                    </div>
                ) : (
                    <div
                        className='flex w-full flex-col items-center p-6'
                        {...rootProps}
                        onClick={() => {
                            inputRef.current.click()
                        }}
                    >
                        <input
                            {...getInputProps()}
                            ref={inputRef}
                            onClick={(e) => e.stopPropagation()}
                            
                        />
                        <div className='grid aspect-square w-14 place-items-center rounded-full dark:bg-pure-dark-greys-800 bg-pure-light-greys-800'>
                            <FaFileUpload className='text-2xl text-light-richblack-5 dark:text-dark-yellow-50 ' />
                        </div>
                        <p className='mt-2 max-w-[200px] text-center text-sm dark:text-dark-richblack-200 text-light-richblack-200'>
                            Drag and drop an {!video ? "image" : "video"}, or click to{" "}
                            <span className='font-semibold dark:text-dark-yellow-50 text-light-richblack-5'>Browse</span> a
                            file
                        </p>
                        <ul className='mt-10 flex list-disc justify-between space-x-12 text-center text-xs dark:text-dark-richblack-200 text-light-richblack-200 '>
                            <li>Aspect Ratio</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                    </div>
                )}
            </div>
            {errors[name] && (
                <span className='ml-2 text-xs tracking-wide dark:text-dark-pink-200 text-red-500'>{label} is required**</span>
            )}
        </div>
    )
}

export default Upload