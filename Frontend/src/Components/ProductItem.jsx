
import React from 'react'
import { Link } from 'react-router-dom'
import './ProductItem.css' 

const ProductItem = ({ id, image, name, price }) => {

  return (
    <Link to={`/product/${id}`} className="product-item">

      <div className="product-image-container">
        <img
          src={image}
          alt={name || 'Product image'}
          className="product-image"
          onError={(e) => {
            console.log('Image failed to load:', image)
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>

      <h3>{name}</h3>

      <p>₹{price}</p>

    </Link>
  )
}

export default ProductItem
