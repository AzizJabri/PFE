import React from 'react'
import { useCart } from '@/providers/cart'
import { Link } from 'react-router-dom'

const Product = ({product}) => {
  const { addToCart } = useCart()

  return (
    <div className="card w-full bg-base-100 shadow-xl p-2 border border-base-300">
        <figure className="avatar bg-base-200">
          <div className="rounded w-96">
            <img src={product?.images[0]?.url} alt={product?.name} />
          </div>
        </figure>
        <div className="card-body">
            <Link to={`/products/${product.id}`} className="card-title">
            {product?.name}
            <div className="badge text-xs badge-accent md:text-base w-auto">{product?.price}$</div>
            </Link>
            <p>{product.description}</p>
            <div className="card-actions justify-end">
                <div className="badge badge-outline">{product?.category?.name || "No Category"}</div>
            </div>
        </div>
        {/*Center Buy button */}
        <div className="card-actions grid grid-cols-2">
            <Link className="btn btn-primary" to={`/products/${product.id}`}>Visit</Link>
            {product.stock > 0 ? (
              <button className="btn btn-accent" onClick={() => addToCart(product)}>Add to cart</button>
            ) : (
              <button className="btn btn-outline btn-disabled">Out of Stock</button>
            )
            }
        </div>

    </div>
  )
}

export default Product