import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

const OpenRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth)

  if (token === null) {
    return children
  } 
  try{
    const decodedToken = jwtDecode(token)
    const currentTime = Date.now()/1000

    if(decodedToken.exp<currentTime){
      return children
    }
    return <Navigate to={'/dashboard/my-profile'} />
  }catch(error){
    return children
  }
  
 
}

export default OpenRoute