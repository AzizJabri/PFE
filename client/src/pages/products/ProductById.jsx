import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '@/services/products'
import Loading from '@/components/Loading'
import Product from '@/components/Product'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '@/providers/cart'
import ProductInfo from '../../components/ProductInfo'

const ProductById = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()
    const {cart , addToCart} = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            await getProduct(id).then(response => setProduct(response.data))
            .catch(error => {
                toast.error('Product not found')
                navigate('/products')
            });
        }
        fetchProduct()
    }, [id])

    if(!product) {
        return <Loading/> 
    }

  return (
    <ProductInfo product={product} addToCart={addToCart} />
  )
}

export default ProductById