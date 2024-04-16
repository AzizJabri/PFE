import './App.css'
import { Routes, Route, HashRouter } from 'react-router-dom'
import { AuthProvider } from './auth/auth'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './providers/cart'
import React, { lazy, Suspense } from 'react';
import Loading from './components/Loading'
import UpdateUser from './pages/Admin/UpdateUser'

const LandingPage = lazy(() => import('./pages/LandingPage'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Logout = lazy(() => import('./pages/auth/Logout'));
const RequireAuth = lazy(() => import('./middlewares/RequireAuth'));
const ProductsLayout = lazy(() => import('./layouts/ProductsLayout'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const Products = lazy(() => import('./pages/products/Products'));
const ProductById = lazy(() => import('./pages/products/ProductById'));
const CartPage = lazy(() => import('./pages/CartPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Failure = lazy(() => import('./pages/payment/Failure'));
const Success = lazy(() => import('./pages/payment/Success'));
const Profile = lazy(() => import('./pages/auth/profile/Profile'));
const HomeAdmin = lazy(() => import('./pages/Admin/HomeForAdmin'));
const AddOrder = lazy(() => import('./pages/Admin/AddOrder'));
const ListOrders = lazy(() => import('./pages/Admin/ListOrders'));
const ListCategory = lazy(() => import('./pages/Admin/ListCategory'));
const Addcategory = lazy(() => import('./pages/Admin/AddCategory'));
const ListProducts = lazy(() => import('./pages/Admin/products/ListProducts'));
const ListUsers = lazy(() => import('./pages/Admin/ListUsers'));
const AddProduct = lazy(() => import('./pages/Admin/products/AddProduct'));
const UpdateProduct = lazy(() => import('./pages/Admin/products/UpdateProduct'));
const AddUser = lazy(() => import('./pages/Admin/AddUser'));
const UpdateCategories = lazy(() => import('./pages/Admin/UpdateCategories'));
const UpdateOrder = lazy(() => import('./pages/Admin/UpdateOrder'));
const RequireAdmin = lazy(() => import('./middlewares/RequireAdmin'));
const ProfileLayout = lazy(() => import('./layouts/ProfileLayout'));
const Addresses = lazy(() => import('./pages/auth/profile/Addresses'));
const UpdateImage = lazy(() => import('./pages/auth/profile/UpdateImage'));
const updateUser = lazy(() => import('./pages/Admin/UpdateUser'));


const LazyLoadingFallback = () => <Loading/>;

function App() {
  return (
    <HashRouter>
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

              <Route path="/profile" element={<RequireAuth><ProfileLayout/></RequireAuth>} >
                <Route index element={<Profile />} />
                <Route path="addresses" element={<Addresses />} />
                <Route path="update-image" element={<UpdateImage />} />
              </Route>

              <Route path="/products" element={<ProductsLayout />}>
                <Route index element={<Products />} />
                <Route path=":id" element={<ProductById />} />
              </Route>


              <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
                <Route index element={<HomeAdmin />} />
                <Route path="products" element={<ListProducts />}>
                  <Route path="add" element={<AddProduct />} />
                  <Route path="update/:productId" element={<UpdateProduct />} />
                
                </Route>



                <Route path="add-order" element={<AddOrder />} />
                <Route path="list-orders" element={<ListOrders />} />
                <Route path="list-category" element={<ListCategory />} />
                <Route path="add-category" element={<Addcategory />} />
                <Route path="list-users" element={<ListUsers />} />
                <Route path="add-user" element={<AddUser />} />
                <Route path="update-categories/:categoryId" element={<UpdateCategories />} />
                <Route path="update-order/:orderId" element={<UpdateOrder />} />
                <Route path="/admin/updateUser/:userId" element={<UpdateUser />} />
              </Route>

              <Route path="/cart" element={<ProductsLayout />}>
                <Route index element={<CartPage />} />
              </Route>

              <Route path="/payment/success" element={<Success />} />
              <Route path="/payment/failure" element={<Failure />} />



              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </CartProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
