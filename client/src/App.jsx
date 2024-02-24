import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/auth'
import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import NotFound from './pages/NotFound'
import {CartProvider} from './providers/cart'


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
            <Toaster position='top-center' reverseOrder={false} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/auth' element={<AuthLayout/>}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<div>Register</div>} />
                <Route path="logout" element={<div>Logout</div>} />
              </Route>
              
              <Route path="*" element={<NotFound/>} />
              {/* Add more routes */}
            </Routes>
            </CartProvider>
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App
