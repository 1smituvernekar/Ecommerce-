import React, { useState, useEffect, useContext } from 'react'
import './Orders.css'
import axios from 'axios'
import { ShopContext } from '../Context/ShopContext'

const Orders = () => {
const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { products } = useContext(ShopContext)
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token')

      const response = await axios.get(
        `${backendUrl}/api/order/userorders`,
        {
          headers: { token }
        }
      )

      if (response.data.success) {
        setOrders(response.data.orders)
      }
    } catch (error) {
      console.log(
        'Error fetching orders:',
        error.response?.data || error.message
      )
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="orders-page">

      <div className="orders-title">
        <h2>My Orders</h2>
        <p>View your recent orders and their status</p>
      </div>

      {orders.length > 0 ? (

        <div className="orders-list">

          {orders.map((order) => (

            <div className="order-card" key={order._id}>

              <div className="order-header">
                <div>
                  <p className="order-id">
                    Order ID: {order._id}
                  </p>

                  <p className="order-date">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : ''}
                  </p>
                </div>

                <span className="order-status">
                  {order.status}
                </span>
              </div>

              <div className="order-items">

                {order.items.map((item, index) => {

                  const product = products.find(
                    (product) =>
                      String(product._id) === String(item._id)
                  )

                  return (
                    <div className="order-item" key={index}>

                      <img
                        src={product?.images?.[0] || ''}
                        alt={product?.name || 'Product'}
                      />

                      <div className="item-info">
                        <h3>
                          {product?.name || 'Product not found'}
                        </h3>

                        <p>Size: {item.size}</p>

                        <p>Quantity: {item.quantity}</p>

                        <p>
                          Price: ₹{product?.price ?? 'N/A'}
                        </p>
                      </div>

                    </div>
                  )
                })}

              </div>

              <div className="order-footer">

                <div>
                  <p>
                    Payment Method:{' '}
                    <strong>{order.paymentMethod}</strong>
                  </p>

                  <p>
                    Payment Status:{' '}
                    <strong>
                      {order.payment ? 'Paid' : 'Pending'}
                    </strong>
                  </p>

                  <p>
                    Total: <strong>₹{order.amount}</strong>
                  </p>
                </div>

                <button className="track-btn">
                  Track Order
                </button>

              </div>

            </div>

          ))}

        </div>

      ) : (

        <div className="no-orders">
          <h3>No Orders Yet</h3>
          <p>You haven't placed any orders yet.</p>
        </div>

      )}

    </div>
  )
}

export default Orders