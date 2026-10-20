
import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import './CartTotals.css'

import { useNavigate } from 'react-router-dom';
const CartTotals = () => {

  const {
    getCartAmount,
    deliveryFee
  } = useContext(ShopContext)

  const navigate= useNavigate()
  const cartAmount = getCartAmount()
  const totalAmount = cartAmount + deliveryFee

  return (
    <div className="cart-totals">

      <h2>Cart Totals</h2>

      <div className="total-row">
        <p>Cart Amount</p>
        <p>₹{cartAmount}</p>
      </div>

      <div className="total-row">
        <p>Delivery Fee</p>
        <p>₹{deliveryFee}</p>
      </div>

      <div className="divider"></div>

      <div className="total-row final-total">
        <h3>Total</h3>
        <h3>₹{totalAmount}</h3>
      </div>

      <button onClick={()=>navigate('/placeOrder')} className="checkout-btn">
        PROCEED TO CHECKOUT
      </button>

    </div>
  )
}

export default CartTotals
