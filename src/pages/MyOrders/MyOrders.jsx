// src/pages/MyOrders.jsx
import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import { useAuth } from "../../context/AuthContext";
import API from "../../Service/API";

import { toast } from 'react-toastify';
import OrderDetailsPopup from "../../common/OrderItemPopup/OrderItemPopUp";




const MyOrders = () => {
  const { ...context } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const handleClick = (order) => {
    setSelectedOrder(order);
    setShowPopup(true);
  };

  const fetchOrders = async () => {
    try {
      context.setloader(true);
      const response = await API.getMyOrders();
      const { ...result } = response.data;
      if (result.responseCode !== 200 && result.responseStatus !== "S") {
        toast.error(result.responseMessage || "Failed to fetch orders.");
        return;
      } else {
        context.setOrders(result.responseContent);
        console.log("Orders fetched:", result.responseContent);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      // setError({ status: true, msg: "Failed to fetch orders", icon: "error" })
      toast.error("An error occurred while fetching orders. Please try again.");
    } finally {
      context.setloader(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);



  return (
    <div className="orders-page">
      {showPopup && <OrderDetailsPopup order={selectedOrder} isOpen={showPopup} onClose={() => setShowPopup(false)} />}
      <h1 className="orders-title">My Orders</h1>

      {context.orders.length === 0 ? (
        <p className="empty-orders">You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {context.orders.map((order) => (
            <div key={order.id} className="order-card" >
              <div className="order-left">
                <h3 className="order-id">Order #{order.orderId}</h3>
                <p className="order-meta">
                  {new Date(order.orderDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })} • {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </p>
              </div>

              <div className="order-right">
                <div className="order-total">₹{order.totalAmount}</div>
                <span
                  className={`order-status ${order.status.toLowerCase()
                    }`}
                >
                  {order.status}
                </span>
                <button className="reorder-btn" onClick={() => {
                  handleClick(order);
                }}>Reorder</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
