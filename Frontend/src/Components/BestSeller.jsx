
import React, { useContext } from 'react'
import ProductItem from './ProductItem'
import './BestSeller.css'
import { ShopContext } from '../Context/ShopContext'

const BestSeller = () => {
  const { products } = useContext(ShopContext)

  const bestSeller = products.slice(0, 5) 

  return (
    <section className="best-seller">

      <div className="best-seller-header">
        <span>OUR COLLECTION</span>
        <h2>Best Sellers</h2>
        <p>
          Discover our most loved products, carefully selected for you.
        </p>
      </div>

      <div className="best-seller-products">

        {bestSeller.map((item) => (
          <div className="best-seller-card" key={item._id}>

            <ProductItem
              id={item._id}
              image={item.images?.[0]}
              name={item.name}
              price={item.price}
            />

          </div>
        ))}

      </div>

    </section>
  )
}

export default BestSeller
