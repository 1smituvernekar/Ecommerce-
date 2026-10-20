
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Product.css'
import { ShopContext } from '../Context/ShopContext'

const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { products, addToCart } = useContext(ShopContext)

  const [size, setSize] = useState('')

  // Find product using its ID
  const product = products.find(
    (item) => String(item._id) === String(id)
  )

  // Show loading while products are fetched
  if (products.length === 0) {
    return <h2>Loading product...</h2>
  }

  // Show message if ID doesn't match any product
  if (!product) {
    return <h2>Product Not Found</h2>
  }

  // Add product using ShopContext
  const handleAddToCart = async (e) => {
    e.preventDefault()

    if (!size) {
      alert('Please select a size')
      return
    }

    const token = localStorage.getItem('token')

    if (!token) {
      alert('Please login first')
      navigate('/login')
      return
    }

    // Context handles API request and cart state
    await addToCart(product._id, size)
  }

  return (
    <div className="product-page">
      <div className="product-container">

        {/* PRODUCT IMAGE */}
        <div className="product-image">
          <img
            src={
              Array.isArray(product.images)
                ? product.images[0]
                : Array.isArray(product.image)
                  ? product.image[0]
                  : product.image || product.images
            }
            alt={product.name}
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div className="product-details">
          <h1>{product.name}</h1>

          <p className="description">
            {product.description}
          </p>

          <p className="price">
            ₹{product.price}
          </p>

          {/* SELECT SIZE */}
          <h4>Select Size</h4>

          <div className="sizes">
            {product.sizes?.map((itemSize) => (
              <button
                key={itemSize}
                type="button"
                className={
                  size === itemSize
                    ? 'selected-size'
                    : ''
                }
                onClick={() => setSize(itemSize)}
              >
                {itemSize}
              </button>
            ))}
          </div>

          {/* ADD TO CART */}
          <button
            type="button"
            className="add-cart"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div>

      </div>
    </div>
  )
}

export default Product
