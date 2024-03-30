import { Link } from 'react-router-dom';
import { useAuth } from '../auth/auth';

function Navbar() {
  const { user, logout } = useAuth();

  // Check if the user exists and has the admin role
  const isAdmin = user && user.roles && user.roles.some(role => role.name === 'ROLE_ADMIN');

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
      <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/products">Products</Link></li>
            <li>
              <a>Categories</a>
              <ul className="p-2">
                <li><a>clothes</a></li>
                <li><a>phones</a></li>
              </ul>
            </li>
            <li><a>About Us</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        <li><Link to="/products">Products</Link></li>
          <li>
            <details>
              <summary>Categories</summary>
              <ul className="p-2">
                <li><a>clothes</a></li>
                <li><a>Phones</a></li>
              </ul>
            </details>
          </li>
          <li><a>About Us</a></li>
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
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  {user.profile.firstName}
                  {isAdmin && <span className="badge">Admin</span>}
                </a>
              </li>
            
              <li><Link to="/auth/logout">Logout</Link></li>
            </ul>
          </div>
        ) : (
          <Link to="/auth/login" className='btn btn-neutral'>Log in</Link>
        )}
        {isAdmin && (
          <Link to="/admin/home" className="btn btn-ghost">Manage </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
