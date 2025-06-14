import React, { useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { formatDate } from "../../../../services/formatDate"
import { ACCOUNT_TYPE } from '../../../../utils/constants'
import ViewSingleUser from './ViewSingleUser'
const UserDataTable = ({ userData, loading }) => {

  const [viewUser, setViewUser] = useState(false)

  if (loading) {
    return (
      <div className='flex h-[calc(100vh-3.5rem)] w-full justify-center items-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 dark:text-dark-richblack-500 text-light-richblack-500'></div>
      </div>
    )
  }
  return (
    <>
      <Table className="rounded-xl border dark:border-dark-richblack-800 border-light-richblack-800 shadow-lg">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b dark:border-b-dark-richblack-800 border-b-light-richblack-800 px-6 py-2 dark:text-dark-richblack-100 text-light-richblack-100">
            <Th className="flex-1 text-left text-sm font-medium uppercase dark:text-dark-richblack-100 text-light-richblack-100">
              User
            </Th>
            <Th className="text-left text-sm font-semibold uppercase dark:text-dark-richblack-100 text-light-richblack-100">
              Role
            </Th>
            <Th className="text-left text-sm font-semibold uppercase dark:text-dark-richblack-100 text-light-richblack-100 ">
              Status
            </Th>
            <Th className="text-left text-sm font-semibold uppercase dark:text-dark-richblack-100 text-light-richblack-100">
              Actions
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {
            userData?.length === 0 ? (
              <Tr>
                <Td className="py-10 text-center text-2xl font-medium dark:text-dark-richblack-5 text-light-richblack-5">
                  No User Found
                </Td>
              </Tr>
            ) : (
              userData.map((user) => (
                <Tr
                  key={user?._id}
                  className="flex gap-x-10 border-b dark:border-dark-richblack-800 border-light-richblack-800 px-6 py-8 gap-4"
                >
                  <Td colSpan={1} className="flex flex-1 gap-x-4 p-3">
                    <img
                      src={user?.image}
                      alt={user.firstName}
                      className="md:h-[148px] md:w-[148px] rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-1 justify-between ">
                      <p className="text-lg font-semibold dark:text-dark-richblack-5 text-light-richblack-5 mt-3">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs dark:text-dark-richblack-300 text-light-richblack-300">
                        {user.email}
                      </p>
                      <p className="text-[12px] dark:text-dark-richblack-5 text-light-richblack-5">
                        Created: {formatDate(user?.createdAt || user?.updatedAt)}
                      </p>

                      {user.accountType === ACCOUNT_TYPE.INSTRUCTOR ? (
                        <p className="flex w-fit flex-row items-center gap-2 rounded-full dark:bg-dark-richblack-700 bg-light-richblack-700 px-2 py-[2px] text-[12px] font-medium dark:text-dark-pink-100 text-red-600">
                          Upload Courses : {user?.courses.length}
                        </p>
                      ) : user?.accountType === ACCOUNT_TYPE.ADMIN ? (
                        <p className="flex w-fit flex-row items-center gap-2 rounded-full dark:bg-dark-richblack-700 bg-light-richblack-700 px-2 py-[2px] text-[12px] font-medium dark:text-dark-pink-100 text-red-600">
                          Admin
                        </p>
                      ) : (
                        <p className="flex w-fit flex-row items-center gap-2 rounded-full dark:bg-dark-richblack-700 bg-light-richblack-700 px-2 py-[2px] text-[12px] font-medium dark:text-dark-pink-100 text-red-600">
                          Enrolled Courses : {user?.courses.length}
                        </p>
                      )}
                    </div>
                  </Td>
                  <Td className="text-sm font-medium dark:text-dark-richblack-100 text-light-richblack-100">
                    {user?.accountType}
                  </Td>
                  <Td className="text-sm font-medium dark:text-dark-richblack-100 text-light-richblack-100 mb-5 pr-4">
                    <p className="flex w-fit flex-row items-center gap-2 rounded-full dark:bg-dark-richblack-700 bg-light-richblack-700 px-2 py-[2px] text-[12px] font-medium dark:text-dark-pink-100 text-red-600">
                      {user.active ? "Active" : "Disabled"}
                    </p>
                  </Td>
                  <Td className="text-sm font-medium dark:text-dark-richblack-100 text-light-richblack-100 pr-4">
                    <button
                      disabled={loading}
                      title="View"
                      onClick={() => {
                        setViewUser({
                          user,
                          closeHandler: !loading
                            ? () => setViewUser(null)
                            : () => { }
                        })
                      }}
                      className="px-2 cursor-pointer transition-all duration-200 hover:scale-110 hover:dark:text-dark-caribbeangreen-300 text-light-caribbeangreen-300"
                    >
                      <AiOutlineEye size={20} />
                    </button>
                  </Td>
                </Tr>
              ))
            )}
        </Tbody>
      </Table>
      {viewUser && <ViewSingleUser viewUser={viewUser} />}
    </>
  )
}

export default UserDataTable