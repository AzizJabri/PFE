import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/auth'
import { Toaster } from 'react-hot-toast'
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import NotFound from './pages/NotFound'
import {CartProvider} from './providers/cart'
import Logout from './pages/auth/Logout'
import RequireAuth from './middlewares/RequireAuth'
import Private from './pages/Private'


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
            <Toaster position='top-center' reverseOrder={false} />
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route path='/auth' element={<AuthLayout/>}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<div>Register</div>} />
                <Route path="logout" element={<Logout/>} />
              </Route>
              <Route path="/private" element={<RequireAuth><Private/></RequireAuth>} />
              
              <Route path="*" element={<NotFound/>} />
              {/* Add more routes */}
            </Routes>
            </CartProvider>
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App
