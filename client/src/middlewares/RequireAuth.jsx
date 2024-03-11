import React from 'react'
import { useAuth } from '../auth/auth'
import { Navigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loading from '../components/Loading'

export const RequireAuth = ({children}) => {
    const { user, isLoading } = useAuth()
    const location = useLocation()
    if(isLoading) {
        return <Loading/>
    }
    if (!user) {
        toast.error('You need to login to view this page!', {duration: 2000})
        return <Navigate to="/auth/login" state={{ path: location.pathname }} />
    }
  return children
}

export default RequireAuth