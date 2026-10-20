
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import CartTotals from '../Components/CartTotals'
import './Cart.css'

const Cart = () => {
  const {
    cartItems,
    products,
   updateCart
  } = useContext(ShopContext)

  const [cartData, setCartData] = useState([])

  // Convert cart object into an array
  useEffect(() => {
    const tempData = []

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const quantity = Number(cartItems[itemId][size]) || 0

        if (quantity > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: quantity
          })
        }
      }
    }

    setCartData(tempData)
  }, [cartItems])

  return (
    <div className="cart-page">
      <h2>Cart</h2>

      {cartData.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartData.map((item) => {
          const productData = products.find(
            (product) =>
              String(product._id) === String(item._id)
          )

          if (!productData) {
            return null
          }

          // Support backend image and images fields
          const productImage = Array.isArray(productData.image)
            ? productData.image[0]
            : Array.isArray(productData.images)
              ? productData.images[0]
              : productData.image || productData.images

          return (
            <div
              className="container"
              key={`${item._id}-${item.size}`}
            >
              <img
                className="img"
                src={productImage}
                alt={productData.name}
                width="100"
              />

              <div className="name">
                <p>{productData.name}</p>

                <p className="size">
                  Size: {item.size}
                </p>

                <p className="price">
                  Price: ₹{productData.price}
                </p>

              
<div className="btn">
  {/* Decrease quantity */}
  <button
    onClick={() =>
      updateCart(
        item._id,
        item.size,
        item.quantity - 1
      )
    }
  >
    −
  </button>

  <span>{item.quantity}</span>

  {/* Increase quantity */}
  <button
    onClick={() =>
      updateCart(
        item._id,
        item.size,
        item.quantity + 1
      )
    }
  >
    +
  </button>
</div>


                <p>
                  Subtotal: ₹
                  {Number(productData.price) * item.quantity}
                </p>
              </div>
            </div>
          )
        })
      )}

      {cartData.length > 0 && <CartTotals />}
    </div>
  )
}

export default Cart
