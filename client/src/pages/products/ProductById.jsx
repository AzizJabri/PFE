import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '@/services/products'

const ProductById = () => {
    const { id } = useParams()
    const [product, setProduct] = useState({})

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await getProduct(id)
            setProduct(response.data)
        }
        fetchProduct()
    }, [id])


  return (
    <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>
    </div>
  )
}

export default ProductById