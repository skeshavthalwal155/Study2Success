import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { Link, useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/PageAndComponentData';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Course_Card from '../components/core/Catalog/Course_Card';
import { useSelector } from 'react-redux';
import Error from "./Error"

const Catalog = () => {

    // const { loading } = useSelector((state) => state.profile)
    const [loading, setLoading] = useState(false)
    const { catalogName } = useParams();
    const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState([])
    const [categoryId, setCategoryId] = useState('');

    // Fetch all Categories
    useEffect(() => {
        const getCategories = async () => {
            const res = await apiConnector("GET", categories.CATEGORIES_API)
            const category_id =
                res?.data?.data?.filter((ct) => ct.name === catalogName)[0]._id
            setCategoryId(category_id);
        }
        getCategories()
    }, [catalogName])

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                setLoading(true)
                const res = await getCatalogPageData(categoryId);
                // console.log("Printing Res", res)
                setCatalogPageData(res)
                setLoading(false)
            } catch (err) {
                console.log("Error : ", err)
            }
        }
        if (categoryId) {
            getCategoryDetails();
        }
    }, [categoryId])

    if (loading || !catalogPageData) {
        return (
            <div className='flex h-[calc(100vh-3.5rem)] w-full justify-center items-center'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 text-richblack-500'></div>
            </div>
        )
    }
    if (!loading && !catalogPageData.success) {
        return (
            <div className='flex h-[calc(100vh-3.5rem)] w-full justify-center items-center'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 text-richblack-500'></div>
            </div>
        )
    }
    return (
        <>
            {/* Top Level Section */}
            <div className='box-content bg-light-richblack-800 dark:bg-dark-richblack-800 px-4 py-2'>
                <div className='md:mx-auto flex  min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent'>
                    <p className='text-sm dark:text-dark-richblack-300 text-light-richblack-300'>
                        <span className='cursor-pointer hover:underline hover:text-red-600 transition-all'><Link to={'/'}>Home</Link></span>
                        {` / Catalog / `}
                        <span className='dark:text-dark-yellow-25 text-red-500'>
                            {catalogPageData?.data?.selectedCategory?.name}
                        </span>
                    </p>
                    <p className='text-3xl dark:text-dark-richblack-5 text-light-richblack-5'>{catalogPageData?.data?.selectedCategory?.name}</p>
                    <p className='max-w-[870px] text-light-richblack-200 dark:text-dark-richblack-200'>{catalogPageData?.data?.selectedCategory?.description}</p>
                </div>
            </div>

            {/* Section 1 */}
            <div className='mx-auto box-content w-full max-w-maxContentTab md:px-4 px-4 py-12 lg:max-w-maxContent'>
                <div className='section_heading md:text-4xl text-2xl'>Courses to get you started</div>
                <div className='my-4 flex border-b border-b-light-richblack-600 dark:border-b-dark-richblack-600 text-sm'>
                    <p
                        className={`px-4 py-2 ${active === 1 ? "dark:text-dark-yellow-25 text-red-500 border-b-red-500 border-b dark:border-b-dark-yellow-25" : "dark:text-dark-richblack-5 text-light-richblack-5"} cursor-pointer`}
                        onClick={() => setActive(1)}
                    >Most Popular</p>

                    <p
                        className={`px-4 py-2 ${active === 2  ? "dark:text-dark-yellow-25 text-red-500 border-b-red-500 border-b dark:border-b-dark-yellow-25" : "dark:text-dark-richblack-5 text-light-richblack-5"} cursor-pointer`}
                        onClick={() => setActive(2)}>New</p>
                </div>
                <div>
                    <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
                </div>

                {/* Section 2 */}
                <div className='mx-auto box-content w-full max-w-maxContentTab  py-12 lg:max-w-maxContent'>
                    <div className='section_heading md:text-4xl text-2xl w-[90%]'>Similar to {catalogPageData?.data?.selectedCategory?.name}</div>
                    <div className='py-8'>
                    <CourseSlider Courses={catalogPageData?.data?.differentCategory} />
                    </div>
                </div>

                {/* Section 3 */}
                <div className='mx-auto box-content w-full max-w-maxContentTab py-12 lg:max-w-maxContent'>
                    <div className='section_heading md:text-4xl text-2xl'>Frequenlty Bought</div>
                    <div className="py-8">
                        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                            {
                                catalogPageData?.data?.mostSellingCategory?.slice(0, 4).map((course, index) => (
                                    <Course_Card course={course} key={index} Height={"h-[100px] lg:h-[400px]"} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Catalog