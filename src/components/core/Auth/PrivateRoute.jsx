// import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsAuthenticated } from '../../../slices/authSlice'


const PrivateRoute = ({ children }) => {
    // const  token  = useSelector((state) => state.auth)
    const isAuthenticated = useSelector(selectIsAuthenticated)

   if(!isAuthenticated){
    return <Navigate to={'/login'}/>
   }  
    return children  
}

export default PrivateRoute