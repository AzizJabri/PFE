import React from 'react'
import { useAuth } from '@/auth/auth'

const Profile = () => {
    const { user } = useAuth()
  
    // Display the user profile with user details and profile details and profile picture
    return (
      <div className="flex justify-center items-center h-screen">
          <div className="text-center p-10 rounded-lg bg-base-300">
              <h1 className="text-2xl font-bold text-blue-500">Profile</h1>
              <div className="mt-4">
                  <img src={user.profile.image} alt={user.profile.firstName} className="w-20 h-20 rounded-full mx-auto" />
                  <h2 className="text-xl font-bold mt-2">{user.name}</h2>
                  <p className="text-gray-500">{user.email}</p>
              </div>
          </div>
      </div>
    )
}

export default Profile