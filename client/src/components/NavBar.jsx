import React, {useEffect, useState} from 'react'
import { useAuth } from '@/auth/auth'
import { Link } from 'react-router-dom'
import { useCart } from '@/providers/cart'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const { user, isLoading, logout } = useAuth()
    const { cart, getSubTotal, clearCart, getLength, getCartItems } = useCart()
    const [search , setSearch] = useState('')
    const [isDark, setIsDark] = useState(
        JSON.parse(localStorage.getItem('isDark')) || false
    )

    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('isDark', JSON.stringify(isDark))
    }, [isDark])

    // useEffect(() => {
    //     //timeout to prevent the search from being triggered on every key stroke
    //     const timeout = setTimeout(() => {
    //         if(search){
    //             navigate(`/products/?search=${search}`)
    //         }else{
    //             navigate(`/products/`)
    //         }
    //     }
    //     , 500)
    //     return () => clearTimeout(timeout)

    // }, [search])


    const handleSubmit = (e) => {
        e.preventDefault()
        if(search){
            navigate(`/products/?search=${search}`)
        }else{
            navigate(`/products/`)
        }
    }


  return (
    <div className="navbar bg-base-300 px-6 py-2">
        <div className="navbar-start">
            <Link to={"/products/"} className="btn btn-ghost text-xl">E-Commerce</Link>
        </div>
        <div className="navbar-center hidden sm:flex w-2/6 ">
            <form className="input input-bordered flex items-center gap-2 w-full rounded-full" onSubmit={handleSubmit}>
                <input type="text" className="grow" placeholder="Search" onChange={(e)=>{setSearch(e.target.value)}} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </form>
        </div>
        <div className="navbar-end space-x-3">
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span className="badge badge-sm indicator-item bg-primary border-primary">{getLength()}</span>
                    </div>
                </div>
                <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-72 bg-base-300 shadow">
                    <div className="card-body">
                    <span className="font-bold text-lg">{getLength()} Items in cart</span>
                    <ul className="menu bg-base-100 rounded-box">
                        {cart?.cartItems?.map((item, index) => (
                            <li key={index}>
                                <div className="flex justify-between">
                                    <div className="avatar">
                                        <div className="w-12 rounded-xl">
                                        <img src={item.product?.images[0].url} />
                                        </div>
                                    </div>
                                    <span>{item.product.name}</span>
                                    <span>{item.product.price} TND</span>
                                    <span>x{item.quantity}</span>
                                </div>
                            </li>
                        ))}
                        {getLength() === 0 && <li>Your cart is empty</li>}
                    </ul>
                    <span className="text-info">Subtotal: ${getSubTotal()}</span>
                    <div className="card-actions">
                        <Link className="btn btn-primary btn-block" to={"/cart/"}>View cart</Link>
                        <button className="btn btn-secondary btn-block" onClick={clearCart}>Clear Cart</button>
                    </div>
                    </div>
                </div>
            </div>
            {/* Theme Switcher */}
            <div className="dropdown dropdown-end">
                <label className="swap swap-rotate">
  
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" className="theme-controller" checked={!isDark} onChange={() => setIsDark(!isDark)}  value={isDark ? "dark" : "light"}/>
                
                {/* sun icon */}
                <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                
                {/* moon icon */}
                <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                
                </label>
            </div>
            <div className="dropdown dropdown-end">
            {user ? (
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img src={user.profile.image} alt="User avatar" />
                    </div>
                </div>
            ) : (
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder bg-neutral">
                    <div className="">
                    <div className="text-neutral-content w-10 rounded-full">
                        <span className="text-xl">N/A</span>
                    </div>
                    </div>
                </div>
            )}
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52">
                {user ? (
                    // Render links for logged-in user
                    <>
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><a>Settings</a></li>
                        <li><Link to="/auth/logout">Logout</Link></li>
                    </>
                ) : (
                    // Render links for non-logged-in user
                    <>
                        <li><Link to="/auth/login">Login</Link></li>
                        <li><Link to="/auth/register">Register</Link></li>
                        {/* Add other links for non-logged-in user */}
                    </>
                )}
            </ul>
            </div>
        </div>
    </div>
  )
}

export default NavBar