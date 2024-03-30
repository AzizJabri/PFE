import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/auth'
import { Toaster } from 'react-hot-toast'
import {CartProvider} from './providers/cart'
import React, { lazy, Suspense } from 'react';
import Loading from './components/Loading'

const LandingPage = lazy(() => import('./pages/LandingPage'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Logout = lazy(() => import('./pages/auth/Logout'));
const RequireAuth = lazy(() => import('./middlewares/RequireAuth'));
const ProductsLayout = lazy(() => import('./layouts/ProductsLayout'));
const Products = lazy(() => import('./pages/products/Products'));
const ProductById = lazy(() => import('./pages/products/ProductById'));
const CartPage = lazy(() => import('./pages/CartPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Failure = lazy(() => import('./pages/payment/Failure'));
const Success = lazy(() => import('./pages/payment/Success'));
const Profile = lazy(() => import('./pages/auth/Profile'));



const LazyLoadingFallback = () => <Loading/>;

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Suspense fallback={<LazyLoadingFallback />}>
            <Routes>
              <Route exact path="/" element={<LandingPage />} />

              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="logout" element={<Logout />} />
              </Route>

              <Route path="/profile" element={<RequireAuth><Profile/></RequireAuth>} />

              <Route path="/products" element={<ProductsLayout />}>
                <Route index element={<Products />} />
                <Route path=":id" element={<ProductById />} />
              </Route>

              <Route path="/cart" element={<ProductsLayout />}>
                <Route index element={<CartPage />} />
              </Route>

              <Route path="/payment/success" element={<Success />} />
              <Route path="/payment/failure" element={<Failure />} />



              <Route path="*" element={<NotFound />} />
              {/* Add more routes */}
            </Routes>
          </Suspense>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

