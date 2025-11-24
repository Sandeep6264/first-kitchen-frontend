// src/pages/Checkout.jsx
import React, { useState } from 'react';
import './Checkout.css';
import { FiMapPin, FiCreditCard, FiPhone } from 'react-icons/fi';

const Checkout = () => {
  const [address, setAddress] = useState({
    name: "Sandeep Kumar",
    phone: "9876543210",
    flat: "A-102, Green Valley",
    landmark: "Near Metro Station",
    type: "Home"
  });

  const total = 729;

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      {/* Address Section */}
      <div className="address-card">
        <div className="address-header">
          <FiMapPin /> <strong>Deliver to</strong>
          <button className="change-btn">Change</button>
        </div>
        <div className="address-details">
          <h3>{address.name} • {address.phone}</h3>
          <p>{address.flat}, {address.landmark}</p>
          <span className="tag">{address.type}</span>
        </div>
      </div>

      {/* Payment Options */}
      <div className="payment-section">
        <h2>Payment Method</h2>
        <label className="payment-option active">
          <input type="radio" name="pay" defaultChecked />
          <FiCreditCard /> <span>Cash on Delivery (COD)</span>
          <strong>₹{total}</strong>
        </label>
        <label className="payment-option">
          <input type="radio" name="pay" />
          <FiPhone /> <span>UPI / Cards / Wallet</span>
        </label>
      </div>

      {/* Price Breakdown */}
      <div className="price-summary">
        <div className="price-row"><span>Item Total</span><span>₹620</span></div>
        <div className="price-row"><span>Delivery Fee</span><span>₹45</span></div>
        <div className="price-row"><span>Taxes</span><span>₹64</span></div>
        <div className="price-total"><strong>To Pay</strong><strong>₹{total}</strong></div>
      </div>

      {/* Place Order Button */}
      <button className="place-order-btn">
        Place Order • ₹{total}
      </button>
    </div>
  );
};

export default Checkout;