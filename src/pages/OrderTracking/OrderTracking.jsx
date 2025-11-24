// src/pages/OrderTracking.jsx
import React from 'react';
import './OrderTracking.css';

const OrderTracking = () => {
  return (
    <div className="tracking-page">
      <div className="tracking-header">
        <h2>Order #1001</h2>
        <p>Estimated arrival: <strong>28 mins</strong></p>
      </div>

      <div className="status-steps">
        <div className="step done"><span>Order Confirmed</span></div>
        <div className="step done"><span>Preparing</span></div>
        <div className="step active"><span>Out for Delivery</span></div>
        <div className="step"><span>Delivered</span></div>
      </div>

      <div className="driver-info">
        <div className="driver-photo">RK</div>
        <div>
          <h3>Rahul Kumar</h3>
          <p>Delivering your order</p>
        </div>
        <button className="call-btn">Call</button>
      </div>

      <div className="map-placeholder">Live Map Coming Soon</div>
    </div>
  );
};

export default OrderTracking;