import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductItem from '../Components/ProductItem'
import { ShopContext } from '../Context/ShopContext'
import './AllProducts.css'

const AllProducts = () => {
  const { currency, products } = useContext(ShopContext)

  const [search, setSearch] = useState('')
  const location = useLocation()

  // Get search text from URL
  const query = new URLSearchParams(location.search).get('query') || ''

  // Use Navbar search first, otherwise use the page search box
  const searchText = query || search

  // Filter products by name
  const filteredProducts = products.filter((item) =>
    (item.name || '')
      .toLowerCase()
      .includes(searchText.toLowerCase())
  )

  return (
    <div className="all-products">

      {/* Page Header */}
      <div className="products-header">
        <div>
          <h2>All <span>Products</span></h2>
          <p>Discover our latest collection</p>
        </div>

        {/* Search Box */}
        <div className="products-search">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Product Count */}
      <p className="products-count">
        Showing {filteredProducts.length} products
      </p>

      {/* Product List */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((item) => (
            <ProductItem
              key={item._id || item.id}
              id={item._id || item.id}
            image={item.images?.[0]}
              name={item.name}
              price={`${currency}${item.price}`}
            />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <div className="no-products-icon">⌕</div>
          <h3>No Products Found</h3>
          <p>Try searching for another product.</p>
        </div>
      )}

    </div>
  )
}

export default AllProducts