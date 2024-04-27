import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../auth/auth';

function Navbar() {
  const { user, logout } = useAuth();

  // Check if the user exists and has the admin role
  const isAdmin = user && user.roles && user.roles.some(role => role.name === 'ROLE_ADMIN');

  return (
    <div className="navbar bg-base-200 px-6 py-2">
      <div className="navbar-start">
      <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><NavLink to="/admin/products">Products</NavLink></li>
            <li>
              <NavLink to="/admin/categories">Categories</NavLink>
            </li>
            <li>
              <NavLink to="/admin/users">Users</NavLink>
            </li>
            <li>
              <NavLink to="/admin/orders">Orders</NavLink>
            </li>
            <li>
              <NavLink to="/admin/reports">Reports</NavLink>
            </li>
          </ul>
        </div>
        <Link to={"/admin"} className="btn btn-ghost text-xl">Admin Dashboard</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><NavLink to="/admin/products">Products</NavLink></li>
          <li>
            <NavLink to="/admin/list-orders">Orders</NavLink>
          </li>
          <li>
            <NavLink to="/admin/list-category">Categories</NavLink>
          </li>
          <li>
            <NavLink to="/admin/list-users">Users</NavLink>
          </li>
          <li>
            <NavLink to="/admin/reports">Reports</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user.profile.image} />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
              <li>
                <Link to="/products">Go Home</Link>
              </li>
              <li>
                <a className="justify-between">
                  {user.profile.firstName}
                  {isAdmin && <span className="badge badge-primary">Admin</span>}
                </a>
              </li>
            
              <li><Link to="/auth/logout">Logout</Link></li>
            </ul>
          </div>
        ) : (
          <Link to="/auth/login" className='btn btn-neutral'>Log in</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
