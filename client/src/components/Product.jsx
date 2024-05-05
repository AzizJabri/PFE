import React from 'react'
import { useCart } from '@/providers/cart'
import { Link } from 'react-router-dom'

const Product = ({product}) => {
  const { addToCart } = useCart()

  return (
    <div className="card w-full bg-base-100 shadow-xl p-1 border border-base-300">
        <figure className="avatar bg-base-200 p-3">
          <div className="rounded w-96">
            <img src={product?.images[0]?.url} alt={product?.name} />
          </div>
        </figure>
        <div className="card-body">
            <Link to={`/products/${product.id}`} className="card-title">
            {product?.name}
            <div className="badge text-xs badge-accent md:text-base w-auto">{product?.price}$</div>
            </Link>
            {product.stock === 0 && <div className="badge badge-error badge-lg w-auto">Out of Stock</div>}
            <p>{product.description}</p>
            <div className="card-actions justify-end">
                <Link to={`/products/?category=${product?.category?.id}`} className="badge badge-outline badge-info">{product?.category?.name || "No Category"}</Link>
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