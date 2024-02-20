import React from 'react'
import { useAuth } from '../auth/auth'
import { Navigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'

const RequireNoAuth = ({children}) => {
    const auth = useAuth()
    const location = useLocation()
    if(auth.isLoading) {
        return <Loading/>
    }
    if (auth.user) {
        return <Navigate to="/home" state={{ path: location.pathname }} />
    }
  return children
}

export default RequireNoAuth