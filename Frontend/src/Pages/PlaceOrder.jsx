
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './PlaceOrder.css'
import CartTotals from '../Components/CartTotals'
import { ShopContext } from '../Context/ShopContext'

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const PlaceOrder = () => {
  const { cartItems, getCartAmount, clearCart } =
    useContext(ShopContext)

  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [loading, setLoading] = useState(false)

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    phone: '',
    pincode: ''
  })

  // Update address
  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    if (!token) {
      alert('Please login first')
      navigate('/login')
      return
    }

    // Convert cart into an array
    const items = []

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size]

        if (quantity > 0) {
          items.push({
            _id: itemId,
            size: size,
            quantity: quantity
          })
        }
      }
    }

    if (items.length === 0) {
      alert('Your cart is empty')
      return
    }

    const orderData = {
      items: items,
      amount: getCartAmount(),
      address: {
        ...address,
        fullName: address.firstName + ' ' + address.lastName
      }
    }

    try {
      setLoading(true)

      // COD ORDER
      if (paymentMethod === 'COD') {
        const response = await axios.post(
          `${backendUrl}/api/order/cod`,
          orderData,
          { headers: { token } }
        )

        if (response.data.success) {
          clearCart()
          alert('Order placed successfully!')
          navigate('/orders')
        } else {
          alert(response.data.message)
        }
      }

      // RAZORPAY PAYMENT
      if (paymentMethod === 'RAZORPAY') {
        const response = await axios.post(
          `${backendUrl}/api/order/razorpay`,
          orderData,
          { headers: { token } }
        )

        if (!response.data.success) {
          alert(response.data.message)
          return
        }

        const razorpayOrder = response.data.razorpayOrder
        const orderId = response.data.orderId
        const key = response.data.key

        if (!window.Razorpay) {
          alert('Razorpay Checkout is not loaded')
          return
        }

        const options = {
          key: key,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: 'My Ecommerce Store',
          description: 'Order Payment',
          order_id: razorpayOrder.id,

          // Verify payment
          handler: async (paymentResponse) => {
            try {
              const verifyResponse = await axios.post(
                `${backendUrl}/api/order/verifyRazorpay`,
                {
                  orderId: orderId,
                  razorpay_order_id: paymentResponse.razorpay_order_id,
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                  razorpay_signature: paymentResponse.razorpay_signature
                },
                { headers: { token } }
              )
              console.log(verifyResponse)

              if (verifyResponse.data.success) {
                clearCart()
                alert('Payment successful!')
                navigate('/orders')
              } else {
                alert('Payment verification failed')
              }
            } catch (error) {
              console.error(error)
              alert('Could not verify payment')
            }
          }
        }

        const razorpay = new window.Razorpay(options)

        razorpay.on('payment.failed', () => {
          alert('Payment failed. Please try again.')
        })

        razorpay.open()
      }
    } catch (error) {
      console.error(error)
      alert(
        error.response?.data?.message ||
        'Something went wrong'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="placeorder" onSubmit={handleSubmit}>

      <div className="address">
        <h2>Address Details</h2>

        <div className="input">
          <input name="firstName" value={address.firstName} onChange={handleChange} placeholder="First Name" required />
          <input name="lastName" value={address.lastName} onChange={handleChange} placeholder="Last Name" required />
        </div>

        <div className="input">
          <input name="email" type="email" value={address.email} onChange={handleChange} placeholder="Email" required />
          <input name="street" value={address.street} onChange={handleChange} placeholder="Address" required />
        </div>

        <div className="input">
          <input name="city" value={address.city} onChange={handleChange} placeholder="City" required />
          <input name="state" value={address.state} onChange={handleChange} placeholder="State" required />
        </div>

        <div className="input">
          <input name="phone" type="tel" value={address.phone} onChange={handleChange} placeholder="Phone" required />
          <input name="pincode" value={address.pincode} onChange={handleChange} placeholder="Pincode" required />
        </div>
      </div>

      <div className="order-right">
        <CartTotals />

        <h3>Payment Method</h3>

        <div className="payment">
          <label>
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === 'COD'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="RAZORPAY"
              checked={paymentMethod === 'RAZORPAY'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Razorpay
          </label>
        </div>

        <button
          type="submit"
          className="place-btn"
          disabled={loading}
        >
          {loading
            ? 'PLEASE WAIT...'
            : paymentMethod === 'COD'
              ? 'PLACE ORDER'
              : 'PAY WITH RAZORPAY'}
        </button>
      </div>

    </form>
  )
}

export default PlaceOrder
