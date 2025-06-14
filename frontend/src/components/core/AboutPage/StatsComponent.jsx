import React from 'react'

const statsData = [
    {
        count: '500+',
        title: "Active Students"
    },
    {
        count: '5+',
        title: "Mentors"
    },
    {
        count: '20+',
        title: "Courses"
    },
    {
        count: '5+',
        title: "Awards"
    },
]

const StatsComponent = () => {
    return (
        <section className='dark:bg-dark-richblack-700 bg-light-richblack-900'>
            <div className='flex flex-col gap-10 justify-between w-11/12 max-w-maxContent dark:text-dark-richblack-5 text-light-richblack-5 mx-auto'>
                <div className='grid grid-cols-2 md:grid-cols-4 text-center'>
                    {
                        statsData.map((data, index) => (
                            <div key={index} className='flex flex-col gap-2 py-10'>
                                <h1 className='text-[30px] font-bold dark:text-dark-richblack-5 text-light-richblack-5'>{data.count}</h1>
                                <h2 className='dark:text-dark-richblack-500 text-light-richblack-500 text-base'>{data.title}</h2>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default StatsComponent