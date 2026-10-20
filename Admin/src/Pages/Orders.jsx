
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

const backendUrl = "http://localhost:4000";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to the admin panel first.");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        setError(response.data.message || "Failed to fetch orders.");
      }
    } catch (error) {
      console.log(
        "Error fetching orders:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Unable to fetch orders. Please login again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="admin-orders">
      <div className="admin-orders-title">
        <h2>All Orders</h2>
        <p>Manage and view customer orders</p>
      </div>

      {loading ? (
        <div className="orders-message">
          <p>Loading orders...</p>
        </div>
      ) : error ? (
        <div className="orders-error">
          <p>{error}</p>
          <button onClick={fetchAllOrders}>Try Again</button>
        </div>
      ) : orders.length === 0 ? (
        <div className="orders-empty">
          <h3>No Orders Found</h3>
          <p>Customer orders will appear here.</p>
        </div>
      ) : (
        <div className="admin-orders-list">
          {orders.map((order) => (
            <div className="admin-order-card" key={order._id}>
              {/* Order header */}
              <div className="admin-order-header">
                <div>
                  <h3>Order Details</h3>

                  <p className="admin-order-id">
                    Order ID: {order._id}
                  </p>

                  <p className="admin-order-date">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : order.date
                      ? new Date(order.date).toLocaleString()
                      : "Date unavailable"}
                  </p>
                </div>

                <span
                  className={`admin-order-status ${
                    order.status === "Delivered"
                      ? "status-delivered"
                      : order.status === "Cancelled"
                      ? "status-cancelled"
                      : "status-pending"
                  }`}
                >
                  {order.status || "Order Placed"}
                </span>
              </div>

              {/* Customer address: display once per order */}
              <div className="admin-order-address">
                <h4>Delivery Address</h4>

                <p className="customer-name">
                  {order.address?.firstName ||
                    order.address?.fullName ||
                    ""}{" "}
                  {order.address?.lastName}
                </p>

                <p>{order.address?.street}</p>

                <p>
                  {order.address?.city},{" "}
                  {order.address?.state} -{" "}
                  {order.address?.pincode}
                </p>

                <p>Email: {order.address?.email}</p>
                <p>Phone: {order.address?.phone}</p>
              </div>

              {/* Products */}
              <div className="admin-order-items">
                {(order.items || []).map((item, index) => {
                  const itemId = item._id || item.itemId;

                  return (
                    <div
                      className="admin-order-item"
                      key={`${itemId || "item"}-${item.size || ""}-${index}`}
                    >
                      <div className="admin-order-product-placeholder">
                        <img src={item.images} alt=''/>
                      </div>

                      <div className="admin-item-info">
                        <p className="admin-item-name">
                          Product ID: {itemId || "Unavailable"}
                        </p>

                        <p>Size: {item.size || "N/A"}</p>
                        <p>Quantity: {item.quantity || 0}</p>

                        {item.price !== undefined && (
                          <p>Price: ₹{item.price}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Payment details */}
              <div className="admin-order-footer">
                <div className="admin-payment-info">
                  <p>
                    Payment Method:{" "}
                    <strong>{order.paymentMethod || "N/A"}</strong>
                  </p>

                  <p>
                    Payment Status:{" "}
                    <strong
                      className={
                        order.payment
                          ? "payment-paid"
                          : "payment-pending"
                      }
                    >
                      {order.payment ? "Paid" : "Pending"}
                    </strong>
                  </p>

                  <p>
                    Total Amount:{" "}
                    <strong>₹{order.amount ?? 0}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
