import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Failure = () => {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }, [])
  return (
    <div className="flex justify-center items-center h-screen">
        <div className="text-center p-10 rounded-lg bg-base-300">
            <h1 className="text-2xl font-bold text-red-500">Payment Failed!</h1>
        </div>
    </div>
  )
}

export default Failure