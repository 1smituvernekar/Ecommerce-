
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './List.css'

const List = () => {
  const backendUrl = 'http://localhost:4000'

  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  // Fetch products from backend
  const fetchList = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/product/list`
      )

      if (data.success) {
        setProducts(data.products)
      }
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  // Delete product
  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem('token')

      const { data } = await axios.delete(
        `${backendUrl}/api/product/${id}`,
        {
          headers: { token }
        }
      )

      console.log(data.message)
      fetchList()
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  // Check admin login
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
      return
    }

    fetchList()
  }, [])

  return (
    <div className="list-div">
      <h2>Products List</h2>

      <div className="table-container">
        <div className="list table-row">
          <p>Image</p>
          <p>Name</p>
          <p>Description</p>
          <p>Price</p>
          <p>Sizes</p>
          <p>Category</p>
          <p>SubCategory</p>
          <p>BestSeller</p>
          <p>Delete</p>
        </div>

        {products.length > 0 ? (
          products.map((item) => (
            <div className="items table-row" key={item._id}>
              {/* Image */}
              <div className="image-cell">
                <img
                  className="img"
                  src={item.images?.[0] || item.image?.[0] || item.image || ''}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.style.visibility = 'hidden'
                    console.log('Image URL failed:', e.currentTarget.src)
                  }}
                />
              </div>

              {/* Name */}
              <p className="name">
                {item.name || 'N/A'}
              </p>

              {/* Description */}
              <p className="desc">
                {item.description || 'N/A'}
              </p>

              {/* Price */}
              <p className="prc">
                ₹{item.price ?? 0}
              </p>

              {/* Sizes */}
              <p>
                {Array.isArray(item.sizes)
                  ? item.sizes.join(', ')
                  : item.sizes || 'N/A'}
              </p>

              {/* Category */}
              <p>
                {item.category || 'N/A'}
              </p>

              {/* SubCategory */}
              <p>
                {item.subCategory || 'N/A'}
              </p>

              {/* BestSeller */}
              <p>
                {String(item.bestSeller ?? false)}
              </p>

              {/* Delete */}
              <button
                className="delete-btn"
                onClick={() => removeItem(item._id)}
                type="button"
              >
                ❌
              </button>
            </div>
          ))
        ) : (
          <p className="empty-message">
            No products found.
          </p>
        )}
      </div>
    </div>
  )
}

export default List
