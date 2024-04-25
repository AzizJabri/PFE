import React, {useEffect} from 'react'
import toast from 'react-hot-toast'
import landscape from '../assets/8.svg'
import { Link } from 'react-router-dom'

const NotFound = () => {
  useEffect(() => {
    toast.error('Page Not Found', { duration: 2000 })
  }, [])

  return (
    <div className="relative h-screen overflow-hidden bg-indigo-900">
        <img src={landscape} class="absolute object-cover w-full h-full"/>
        <div className="absolute inset-0 bg-black opacity-25">
        </div>
        <div className="container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
            <div className="relative z-10 flex flex-col items-center w-full font-mono">
                <h1 className="mt-4 text-5xl font-extrabold leading-tight text-center text-white">
                    You&#x27;re alone here
                </h1>
                <p className="font-extrabold text-white text-8xl my-44 animate-bounce">
                    404
                </p>
                <Link to="/" className="px-8 py-4 mb-4 font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600">
                    Go back home
                </Link>
            </div>
            
        </div>
    </div>
  )
}

export default NotFound