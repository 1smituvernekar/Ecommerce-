
import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'


import ProductItem from './ProductItem'
import './AllProducts.css'

import { ShopContext} from '../Context/ShopContext'


const AllProducts = () => {

  const { currency,products } = useContext(ShopContext)

  const [search, setSearch] = useState('')

  const location = useLocation()


  // Get search text from URL
  const query = new URLSearchParams(location.search).get('query') || ''


  // Show URL search first, otherwise input search
  const searchText = query || search


  // Filter products
  const searchProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  )


  return (
    <div className="all-products">

      {/* TOP SECTION */}
      <div className="products-info">

        <div>
          <h2>All Products</h2>

          <p>
            Discover all our latest collections
          </p>
        </div>


        {/* SEARCH */}
        <div className="product-search">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>


      {/* PRODUCTS */}
      {searchProducts.length > 0 ? (

        <div className="product-grid">

          {searchProducts.map((item) => (

            <ProductItem
  key={item._id}
  id={item._id}
  image={item.images?.[0]}
  name={item.name}
  price={`${item.price}`}
/>

          ))}

        </div>

      ) : (

        <div className="no-products">
          <h3>No Products Found</h3>

          <p>
            Try searching for another product.
          </p>
        </div>

      )}

    </div>
  )
}

export default AllProducts
