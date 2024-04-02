import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '@/auth/auth';

const ProfileSidebar = () => {
    const { user } = useAuth();

  return (
    <div className="p-4 text-center h-screen bg-base-200 w-80">
      {/* User Image */}
        <div className="avatar">
            <div className="w-24 rounded-full">
                <img src={user.profile.image} alt="User Avatar" />
            </div>
        </div>

      {/* User Information */}
      <div className="mb-4">
        <div className="text-center">
          <span className="text-lg font-bold">{user.profile.firstName} {user.profile.lastName}</span>
        </div>
        <div className="text-center space-x-1">
          {user.roles.map((role) => (
            role.name === 'ROLE_ADMIN' ? <span key={role.id} className="badge badge-error">Admin</span> : <span key={role.id} className="badge badge-primary">User</span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="divider"></div> 

      {/* Navigation Links */}
      <div className="space-y-2">
        <Link to={`/profile`} className="btn btn-ghost w-full text-left bg-base-100">Informations</Link>
        <Link to={`/profile/addresses`} className="btn btn-ghost w-full text-left bg-base-100">Addresses</Link>
        <Link to={`/profile/update-image`} className="btn btn-ghost w-full text-left bg-base-100">Update Image</Link>
        {/* Add more navigation links here */}
      </div>
      <div className="divider"></div>
        <div className="space-y-2">
            <Link to={`/auth/logout`} className="btn btn-ghost w-full text-left bg-error">Logout</Link>
        </div>
    </div>
  );
};

export default ProfileSidebar;
