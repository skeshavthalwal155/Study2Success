import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { searchCourses } from '../services/operations/courseDetailsAPI'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import { HiOutlineEmojiSad } from 'react-icons/hi'
import Course_Card from '../components/core/Catalog/Course_Card'
const SearchCourse = () => {
    const [searchResult, setSearchResults] = useState([])
    const theme = useSelector((state) => state.theme)

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { searchQuery } = useParams()
    const fetchSearchResults = async () => {
        setLoading(true)
        const res = await searchCourses(searchQuery, dispatch)
        setSearchResults(res)
        setLoading(false)
        // console.log(res)
    }

    useEffect(() => {
        fetchSearchResults()
    }, [searchQuery])
    return (
        <>

            <div className='box-content bg-light-richblack-800 dark:bg-dark-richblack-800 px-4'>
                <div className='mx-auto flex  min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent'>
                    <p className='text-sm dark:text-dark-richblack-300 text-light-richblack-300'>{`Home / Search / `} <span className='dark:text-dark-yellow-25 text-red-500'>{searchQuery}</span></p>
                    <p className='text-3xl dark:text-dark-richblack-5 text-light-richblack-5'>Search Result for {searchQuery}</p>
                    <p className='max-w-[870px] text-light-richblack-200 dark:text-dark-richblack-5'>{searchResult?.length} results found for {searchQuery}</p>
                </div>
            </div>
            {
                loading ?
                    <div className='flex gap-4 overflow-hidden'>
                        {[...Array(3)].map((_, idx) => (
                            <SkeletonTheme key={idx} baseColor={`${theme=== 'dark' ? "#2C333F" : ""}`} highlightColor={`${theme==='dark'?"#161D29" :""}`}>
                                <div className="w-full">
                                    <Skeleton className="md:h-[200px] lg:w-[400px] h-[100px] w-[200px] rounded-xl" />
                                    <Skeleton className=" md:h-[20px] w-[70px] rounded-md" />
                                    <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
                                    <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
                                </div>
                            </SkeletonTheme>
                        ))}
                    </div>
                    : (
                        searchResult?.length === 0 ? (<div className='mx-auto flex min-h-[500px] items-center  flex-col justify-center gap-4 p-5'>
                            <p className='text-3xl text-light-richblack-5 dark:text-dark-richblack-5'>No Results Found</p>
                            <HiOutlineEmojiSad className='dark:text-dark-richblack-100 text-light-richblack-100 text-[100px]' />
                        </div>) : (
                            <div className='mx-auto grid grid-cols-1 md:grid-cols-3 p-5 gap-6 justify-evenly m-5'>
                                {searchResult?.map((item) => (
                                    <div className='flex flex-col gap-4'>
                                        <Course_Card course={item} Height={"lg:h-[250px] h-[100px]"} />
                                    </div>
                                ))}
                            </div>
                        )
                    )
            }
        </>
    )
}

export default SearchCourse