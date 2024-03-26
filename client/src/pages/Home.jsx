import NavBar from '@/components/NavBar'
import React, {useState, useEffect} from 'react'
import { useCart } from '@/providers/cart'
import { getProducts } from '@/services/products'
import Loading from '@/components/Loading'
import Product from '@/components/Product'

const Home = () => {
  const { addToCart } = useCart()
  const item = { id: 1, name: 'Item 1', price : 100}
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts()
      setProducts(response.data.content)
    }
    fetchProducts()
  }, [])

  if (products.length === 0) {
    return <Loading/>
  }


  return (
    <div>
      <NavBar />
      <ul>
        {products.map(product => (
          <Product key={product.id} product={product}/>
        ))}
      </ul>
    </div>
  )
}

export default Home