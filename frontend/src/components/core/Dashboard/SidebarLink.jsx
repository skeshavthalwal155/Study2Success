import React from 'react'
import * as Icons from "react-icons/vsc"


import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom'

const SidebarLink = ({ link, iconName }) => {

    const Icon = Icons[iconName];  
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    return (       
            <NavLink
                to={link.path}
                className={`relative py-2 px-4 md:px-8 md:py-2 text-sm font-medium transition-all duration-300
                    ${matchRoute(link.path) ? "dark:bg-dark-yellow-800 bg-light-yellow-800 dark:text-dark-yellow-5" : "bg-opacity-0 dark:text-dark-richblack-300 text-light-richblack-100"}`}
            >
                <span className={`absolute left-0 top-0 h-full w-[0.15rem] dark:bg-dark-yellow-50 bg-black ${matchRoute(link.path) ? "opacity-100" : "opacity-0"} `}></span>
                <div className='flex items-center gap-x-2'>
                   {
                       <Icon className="md:text-lg text-3xl" />
                   }
                    <span className='hidden md:block'>{link.name}</span>
                </div>
            </NavLink>        
    )
}

export default SidebarLink