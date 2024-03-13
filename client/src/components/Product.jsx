import React from 'react'

const Product = ({product}) => {

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={product?.images[0]?.url} alt={product?.name} /></figure>
        <div className="card-body">
            <h2 className="card-title">
            {product?.name}
            <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>{product.description}</p>
            <div className="card-actions justify-end">
                <div className="badge badge-outline">{product?.category?.name}</div>
            </div>
        </div>
        {/*Center Buy button */}
        <div className="card-actions justify-center">
            <button className="btn btn-primary">Buy</button>
        </div>
    </div>
  )
}

export default Product