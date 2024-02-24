import NavBar from '@/components/NavBar'
import React from 'react'
import { useCart } from '@/providers/cart'

const Home = () => {
  const { addToCart } = useCart()
  const item = { id: 1, name: 'Item 1', price : 100}

  return (
    <div>
      <NavBar />
      <button onClick={() => addToCart(item)}>Add to Cart</button>
    </div>
  )
}

export default Home