import React from 'react'
import { useAuth } from '../../auth/auth'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Logout = () => {
    const auth = useAuth()

    auth.logout()

    if (!auth.user) {
        toast.success('You have been logged out', { duration: 2000 })
    }


    return <Navigate to="/auth/login" />
}

export default Logout