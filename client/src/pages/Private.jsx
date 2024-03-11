import React from 'react'
import { useAuth } from '../auth/auth'


const Private = () => {
    const { user, isLoading } = useAuth()

  return (
    <div>Private Page
        <p>Welcome {user.email}</p>
    </div>
  )
}

export default Private