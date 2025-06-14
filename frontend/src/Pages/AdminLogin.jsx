import React from 'react'
import Template from '../components/core/Auth/Template'
import loginImg from '../assets/Images/admin.png'

const AdminLogin = () => {
  return (
    <div>
      <Template
        title="Welcome Back Admin!!"
        description1="Administrative Dashboard for Study2Success"
        description2="Manage courses, users, and platform analytics"
        image={loginImg}
        formType="admin"
      />
    </div>
  )
}

export default AdminLogin