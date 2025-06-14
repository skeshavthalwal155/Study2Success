import React from 'react'
import Template from "../components/core/Auth/Template"
import loginLight from '../assets/Images/loginLight.png'
import loginDark from '../assets/Images/loginDark.png'
import { useSelector } from 'react-redux'

const Login = () => {
  const theme = useSelector(state=>state.theme)
  return (
    <div>    
      <Template 
        title="Welcome Back"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Eduction to future-proof your career."
        image={theme === "dark" ? loginDark : loginLight}    
        formType="login"        
      />
    </div>
  )
}
export default Login