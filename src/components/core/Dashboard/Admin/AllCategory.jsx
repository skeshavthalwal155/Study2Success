import React, { useEffect, useState } from 'react'
import { fetchCourseCategories } from '../../../../services/operations/courseDetailsAPI'
import { useNavigate } from 'react-router-dom'
import CategoryTable from './CategoryTable'

const AllCategory = () => {
    const [loading, setLoading] = useState(null)
    const [category, setCategories] = useState(null)
    const navigate = useNavigate()

    const getAllCateogries = async () => {
        try {
            setLoading(true)
            const response = await fetchCourseCategories()
            if (response)
                setCategories(response)
            setLoading(false)
        } catch (err) {
            console.error("Error fetching categories:", err)
        }
    }
    useEffect(() => {
        getAllCateogries()
    }, [])

    // console.log("category", category.name)
    if (loading) {
        return (
            <div className='flex h-[calc(100vh-3.5rem)] w-full justify-center items-center'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 dark:text-dark-richblack-500 text-light-richblack-500'></div>
            </div>
        )
    }



    return (
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
            <div>
                <div className='mb-14 flex items-center justify-between'>
                    <h1 className='text-3xl font-medium dark:text-dark-richblack-5 text-light-richblack-5'>All Categories</h1>
                    <button onClick={() => { navigate('/dashboard/add-category') }} className='flex items-center bg-dark-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 md:px-5 font-semibold text-dark-richblack-900 '>
                        <p>Add Category</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-dark-richblack-900 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                </div>
            </div>

            {category && <CategoryTable category={category} setCategories={setCategories} />}

        </div>
    )
}

export default AllCategory