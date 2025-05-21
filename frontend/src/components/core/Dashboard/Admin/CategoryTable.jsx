import React, { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import ConfirmationModal from '../../../common/ConfirmationModal'
import { useSelector } from 'react-redux'
import { deleteCategory } from '../../../../services/operations/courseDetailsAPI'
import { fetchCourseCategories } from '../../../../services/operations/courseDetailsAPI'

const CategoryTable = ({ category, setCategories }) => {
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(null)
    const [confirmationModal, setConfirmationModal] = useState(false)

    const handleCategoryDelete = async (categoryId) => {
        setLoading(true)
        await deleteCategory({ categoryId: categoryId }, token)
        const result = await fetchCourseCategories()
        if (result) {
            setCategories(result)
        }
        localStorage.setItem("sublinks", JSON.stringify(result))
        setConfirmationModal(null)
        setLoading(false)

    }    

    if (loading) {
        return (
            <div className='flex h-[calc(100vh-3.5rem)] w-full justify-center items-center'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 dark:text-dark-richblack-500 text-light-richblack-500'></div>
            </div>
        )
    }

    return (
        <>
            <Table className="w-full rounded-lg overflow-hidden shadow-md">
                <Thead>
                    <Tr className="bg-gradient-to-r from-light-richblack-700 to-light-richblack-800 dark:from-dark-richblack-700 dark:to-dark-richblack-800">
                        <Th className="w-4/5 text-left text-sm font-bold uppercase p-4 text-light-richblack-5 dark:text-dark-richblack-5">
                            Category
                        </Th>
                        <Th className="w-1/5 text-left text-sm font-bold uppercase p-4 text-light-richblack-5 dark:text-dark-richblack-5">
                            Enrolled Courses
                        </Th>
                        <Th className="w-1/5 text-left text-sm font-bold uppercase p-4 text-light-richblack-5 dark:text-dark-richblack-5">
                            Actions
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {category?.length === 0 ? (
                        <Tr>
                            <Td colSpan="3" className="py-12 text-center text-2xl font-medium text-light-richblack-5 dark:text-dark-richblack-5 italic">
                                No Courses Found
                            </Td>
                        </Tr>
                    ) : (
                        category.map((category) => (
                            <Tr
                                key={category?._id}
                                className="border-b border-light-richblack-700 dark:border-dark-richblack-700 hover:bg-light-richblack-700/10 dark:hover:bg-dark-richblack-700/10 transition-all duration-200"
                            >
                                <Td className="w-4/5 p-4">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-lg font-semibold text-light-richblack-5 dark:text-dark-richblack-5">
                                            {category?.name}
                                        </p>
                                        <p className="text-sm text-light-richblack-300 dark:text-dark-richblack-300 line-clamp-2 max-w-[600px]">
                                            {category?.description}
                                        </p>
                                    </div>
                                </Td>
                                <Td className="w-1/5 p-4 text-sm font-medium text-light-richblack-100 dark:text-dark-richblack-100">
                                    <span className="px-3 py-1 rounded-full bg-light-richblack-700/20 dark:bg-dark-richblack-700/20">
                                        {category?.courses?.length || 0} Courses
                                    </span>
                                </Td>
                                <Td className="w-1/5 p-4">
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1: "Do You Want to Delete This Course?",
                                                text2: "All the Data Related to this course will be deleted.",
                                                btn1Text: !loading ? "Delete" : "Loading...",
                                                btn2Text: "Cancel",
                                                btn1Handler: !loading
                                                    ? () => handleCategoryDelete(category._id)
                                                    : () => { },
                                                btn2Handler: !loading
                                                    ? () => setConfirmationModal(null)
                                                    : () => { }
                                            })
                                        }}
                                        title="Delete"
                                        className="p-2 rounded-full hover:bg-light-richblack-700/20 dark:hover:bg-dark-richblack-700/20 transition-all duration-200 cursor-pointer hover:text-[#FF0000]"
                                    >
                                        <RiDeleteBin6Line size={20} />
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    )
}

export default CategoryTable