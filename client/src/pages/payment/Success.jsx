import React, {useEffect} from 'react'
import { success } from '@/services/payment'
import { useCart } from '@/providers/cart'
import { useSearchParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Success = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { clearCart } = useCart()

    useEffect(() => {
        const fetchPayment = async () => {
            await success(searchParams.get('session_id')).then(response => {
                toast.success(response.data.message)
                clearCart()
            }).catch(error => {
                toast.error(error.response.data.message)
            }).finally(() => {
                setTimeout(() => {
                    navigate('/products')
                }, 3000)
            })
        }
        fetchPayment()
    }, [searchParams])

  return (
    <div className="flex justify-center items-center h-screen">
        <div className="text-center p-10 rounded-lg bg-base-300">
            <h1 className="text-2xl font-bold text-green-500">Payment Successful</h1>
        </div>
    </div>

  )
}

export default Success