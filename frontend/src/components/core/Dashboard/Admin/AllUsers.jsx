import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../../../services/apiconnector'
import { profileEndpoints } from '../../../../services/apis'
import UserDataTable from './UserDataTable'
import { useSelector } from 'react-redux'

const AllUsers = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(null)

  const {token} = useSelector((state)=>state.auth)

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await apiConnector("GET", profileEndpoints.GET_USER_API, null, {
        authorization: `Bearer ${token}`
      })
      if (response)
        setUserData(response?.data?.data);
      setLoading(false);
    } catch (err) {
      console.log("Error While Fetching User Data : ", err);
    }
  }

  useEffect(() => {
    getAllUsers()

  }, [])

  if (loading) {
    return (
      <div className='flex h-[calc(100vh-3.5rem)] w-full justify-center items-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 dark:text-dark-richblack-500 text-light-richblack-500'></div>
      </div>
    )
  }
  // console.log("Users", userData)

  return (
    <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
      <div>
        <div className='mb-14 flex items-center justify-between'>
          <h1 className='text-3xl font-medium dark:text-dark-richblack-5 text-light-richblack-5'>All Users</h1>
        </div>
      </div>
      {userData && <UserDataTable userData={userData} loading={loading} />}
    </div>
  )
}

export default AllUsers