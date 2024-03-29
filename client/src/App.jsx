import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/auth'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './providers/cart'
import React, { lazy, Suspense } from 'react';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Logout = lazy(() => import('./pages/auth/Logout'));
const RequireAuth = lazy(() => import('./middlewares/RequireAuth'));
const Private = lazy(() => import('./pages/Private'));
const ProductsLayout = lazy(() => import('./layouts/ProductsLayout'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const Products = lazy(() => import('./pages/products/Products'));
const ProductById = lazy(() => import('./pages/products/ProductById'));
const CartPage = lazy(() => import('./pages/CartPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const MainAdmin = lazy(() => import('./pages/Admin/MainAdmin'));
const HomeAdmin = lazy(() => import('./pages/Admin/HomeForAdmin'));
const AddOrder = lazy(() => import('./pages/Admin/AddOrder'));
const ListOrders = lazy(() => import('./pages/Admin/ListOrders'));
const ListCategory = lazy(() => import('./pages/Admin/ListCategory'));
const Addcategory = lazy(() => import('./pages/Admin/AddCategory'));
const ListProducts = lazy(() => import('./pages/Admin/ListProducts'));
const ListUsers = lazy(() => import('./pages/Admin/ListUsers'));
const AddProduct = lazy(() => import('./pages/Admin/AddProduct'));
const AddUser = lazy(() => import('./pages/Admin/AddUser'));
const UpdateCategories = lazy(() => import('./pages/Admin/UpdateCategories'));
const UpdateOrder = lazy(() => import('./pages/Admin/UpdateOrder'));

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
              <Route path='/auth' element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="logout" element={<Logout />} />
              </Route>
              <Route path="/private" element={<RequireAuth><Private /></RequireAuth>} />
              <Route path="/products" element={<ProductsLayout />}>
                <Route index element={<Products />} />
                <Route path=":id" element={<ProductById />} />
              </Route>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="home" element={<HomeAdmin />} />
                <Route path="add-order" element={<AddOrder />} />
                <Route path="list-orders" element={<ListOrders />} />
                <Route path="list-category" element={<ListCategory />} />
                <Route path="add-category" element={<Addcategory />} />
                <Route path="list-products" element={<ListProducts />} />
                <Route path="list-users" element={<ListUsers />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="add-user" element={<AddUser />} />
                <Route path="update-categories/:categoryId" element={<UpdateCategories />} />
                <Route path="update-order/:orderId" element={<UpdateOrder />} />
              </Route>
              <Route path="/cart" element={<ProductsLayout />}>
                <Route index element={<CartPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
