import React from 'react'
import { Link, Outlet } from 'react-router-dom'


const AuthLayout = () => {
  return (
    <div className="relative">
      <Link to="/" className="absolute top-4 left-4 z-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </Link>
      <Outlet />
    </div>
  )
}

export default AuthLayout