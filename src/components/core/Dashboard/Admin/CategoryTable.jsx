import React, { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import ConfirmationModal from '../../../common/ConfirmationModal'

const CategoryTable = ({ category, setCategories }) => {
    const [loading, setLoading] = useState(null)
    const [confirmationModal, setConfirmationModal] = useState(false)
    
    const handleCategoryDelete = async (categoryId) => {
        alert("Delete Category is not created for now updated soon!!!");
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
            <Table className="w-full">
                <Thead>
                    <Tr className="rounded-t-md border-b dark:border-b-dark-richblack-800 border-b-light-richblack-800 px-6 py-2 dark:text-dark-richblack-100 text-light-richblack-100">
                        <Th className="w-4/5 text-left text-sm font-medium uppercase dark:text-dark-richblack-100 text-light-richblack-100">
                            Category
                        </Th>                       
                        <Th className="w-1/5 text-left text-sm font-semibold uppercase dark:text-dark-richblack-100 text-light-richblack-100">
                            Enrolled Courses
                        </Th>
                        <Th className="w-1/5 text-left text-sm font-semibold uppercase dark:text-dark-richblack-100 text-light-richblack-100">
                            Actions
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {category?.length === 0 ? (
                        <Tr>
                            <Td colSpan="3" className="py-10 text-center text-2xl font-medium dark:text-dark-richblack-5 text-light-richblack-5">
                                No Courses Found
                            </Td>
                        </Tr>
                    ) : (
                        category.map((category) => (
                            <Tr
                                key={category?._id}
                                className="border-b dark:border-dark-richblack-800 border-light-richblack-800 hover:bg-dark-richblack-900/10"
                            >
                                <Td className="w-4/5 py-4">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg font-semibold dark:text-dark-richblack-5 text-light-richblack-5">
                                            {category?.name}
                                        </p>
                                        <p className="text-xs dark:text-dark-richblack-300 text-light-richblack-300 line-clamp-2 max-w-[600px]">
                                            {category?.description}
                                        </p>
                                    </div>
                                </Td>
                                <Td className="w-1/5 py-4 text-sm font-medium dark:text-dark-richblack-100 text-light-richblack-100">
                                    {category?.courses?.length || 0} Courses
                                </Td>
                                <Td className="w-1/5 py-4">
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
                                        className="px-1 cursor-pointer transition-all duration-200 hover:scale-110 hover:text-[#FF0000]"
                                    >
                                        <RiDeleteBin6Line size={20} />
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </>
    )
}

export default CategoryTable