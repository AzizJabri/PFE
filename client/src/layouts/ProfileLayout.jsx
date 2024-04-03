import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import ProfileSidebar from '@/components/ProfileSidebar';

const ProfileLayout = () => {
  return (
    <div >
        {/* Navbar */}
        <NavBar />

        {/* Main content area */}
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="hidden md:block">
                <ProfileSidebar />
            </div>
            <div className="drawer-content flex-1 p-10">
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ProfileSidebar />
            </div>
        </div>

        <Footer />
    </div>
  );
};

export default ProfileLayout;
