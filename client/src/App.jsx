import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/auth'
import { Toaster } from 'react-hot-toast'
import {CartProvider} from './providers/cart'
import React, { lazy, Suspense } from 'react';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Logout = lazy(() => import('./pages/auth/Logout'));
const RequireAuth = lazy(() => import('./middlewares/RequireAuth'));
const Private = lazy(() => import('./pages/Private'));
const ProductsLayout = lazy(() => import('./layouts/ProductsLayout'));
const Products = lazy(() => import('./pages/products/Products'));
const ProductById = lazy(() => import('./pages/products/ProductById'));
const CartPage = lazy(() => import('./pages/CartPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const LazyLoadingFallback = () => <div>Loading...</div>;

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
              <Route path="/Admin" element={<MainAdmin />} />
              <Route path="/AddOrder" element={<AddOrder />} />
              <Route path="/ListOrders" element={<ListOrders />} />
              <Route path="/ListCategory" element={<ListCategory />} />
              <Route path="/AddCategory" element={<Addcategory />} />
              <Route path='/auth' element={<AuthLayout/>}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="logout" element={<Logout />} />
              </Route>
              <Route path="/private" element={<RequireAuth><Private/></RequireAuth>} />
              <Route path="/products" element={<ProductsLayout />}>
                <Route index element={<Products />} />
                <Route path=":id" element={<ProductById />} />
              </Route>
              <Route path="/cart" element={<ProductsLayout />}>
                <Route index element={<CartPage />} />
              </Route>
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

