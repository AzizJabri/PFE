import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'


const AuthLayout = () => {
  return (
    <div>
        <Outlet />
        
    </div>
  )
}

export default AuthLayout