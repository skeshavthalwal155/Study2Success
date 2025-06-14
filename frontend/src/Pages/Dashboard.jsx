import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/core/Dashboard/SideBar'

const Dashboard = () => {
    const { loading: authLoading } = useSelector((state) => state.auth)
    const { loading: profileLoading } = useSelector((state) => state.profile)

    if (profileLoading || authLoading) {
        return (
            <div className='flex flex-col gap-4 text-2xl text-center dark:text-dark-richblue-5 text-light-richblack-5 items-center justify-center h-[calc(100vh-3.5rem)]'>
                <div className='loader '></div>
                <p>Loading...</p>
            </div>
        )
    }


    return (

        <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
            <SideBar />
            <div className='h-[calc(100vh-3.5rem)] overflow-auto flex-1'>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard