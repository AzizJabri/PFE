import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import React from 'react'
import { Outlet } from 'react-router-dom'


const ProductsLayout = () => {
  return (
    <div>
        <NavBar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default ProductsLayout