// src/pages/MyOrders.jsx
import React from 'react';
import './MyOrders.css';

const orders = [
  { id: 1001, date: "15 Nov", items: 3, total: 689, status: "Delivered" },
  { id: 998, date: "12 Nov", items: 2, total: 420, status: "Delivered" },
];

const MyOrders = () => {
  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <div className="order-info">
            <h3>Order #{order.id}</h3>
            <p>{order.date} • {order.items} items</p>
          </div>
          <div className="order-price">₹{order.total}</div>
          <div className="order-status delivered">{order.status}</div>
          <button className="reorder-btn">Reorder</button>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;