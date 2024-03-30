import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import React from 'react'
import { Outlet } from 'react-router-dom'


const AdminLayout = () => {
  return (
    <div>
        <Nav />
        <Outlet />
        <Footer />
    </div>
  )
}

export default AdminLayout