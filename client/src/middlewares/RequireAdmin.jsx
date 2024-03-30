import React from 'react'
import { useAuth } from '../auth/auth'
import { Navigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loading from '../components/Loading'

const RequireAdmin = ({children}) => {
    const auth = useAuth()
    const location = useLocation()
    if(auth.isLoading) {
        return <Loading/>
    }
    if (!auth.user) {
        return <Navigate to="/auth/login" state={{ path: location.pathname }} />
    }

    const roles = auth.user?.roles.map(role => role.name)

    if (!roles.includes('ROLE_ADMIN')) {
        toast.error('You are not authorized to view this page', { duration: 2000 })
        return <Navigate to="/" state={{ path: location.pathname }} />
    }
  return children
}

export default RequireAdmin