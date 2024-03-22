import React from 'react'

const GhostProduct = () => {
  return (
    <div className="card w-full bg-base-100 shadow-xl p-3 border border-base-300">
        <figure className="avatar">
          <div className="skeleton rounded w-96">
            <div className="skeleton-img"></div>
          </div>
        </figure>
        <div className="card-body">
            <div className="card-title">
                <div className="skeleton w-full h-full"></div>
                <div className="badge skeleton w-24"></div>
            </div>
            <div className='skeleton w-full h-5 my-1'></div>
            <div className='skeleton w-full h-5 my-1'></div>
            <div className="card-actions justify-end">
                <div className="badge skeleton w-24"></div>
            </div>
        </div>
        <div className="card-actions grid grid-cols-2">
            <button className="btn skeleton"></button>
            <button className="btn skeleton"></button>
        </div>

    </div>
  )
}

export default GhostProduct