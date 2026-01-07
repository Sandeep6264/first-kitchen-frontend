// src/pages/Checkout.jsx → 100% WORKING – NO [object Object]
import React, { useState } from 'react';
import './Checkout.css';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiCreditCard, FiPhone } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import API from '../../Service/API';

const Checkout = () => {
  const { cart, setCart, loader, setloader } = useAuth();
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(false);

  const [address] = useState({
    name: "Sandeep Kumar",
    phone: "9876543210",
    flat: "A-102, Green Valley",
    landmark: "Near Metro Station",
    type: "Home"
  });

  const subtotal = cart.reduce((s, i) => s + i.itemPrice * i.qty, 0);
  const delivery = 45;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + taxes;

  const [paymentMethod, setPaymentMethod] = useState('cod');

  const placeOrder = async () => {
    try {
      const orderData = {
        orderItem: cart,
        address: address,
        paymentMethod: paymentMethod,
        totalAmount: total,
        status: 'Placed',
        orderDate: new Date().toISOString()
      };
      setloader(true);
      const response = await API.placeOrder(orderData);
      console.log('Order Response:', response.data);
      const { ...result } = response.data;
      if (result.responseCode !== 200 && result.responseStatus !== 'F') {
        setloader(false);
        alert('Failed to place order. Please try again.');
        return;
      }

      if (result.responseCode === 200 && result.responseStatus === 'S') {
        setCart([]);
        localStorage.removeItem('firstKitchenCart');
        setShowSuccess(true);
        setTimeout(() => navigate('/home'), 2000);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Order placement failed:', error);
      return;
    } finally {
      setloader(false);
    }
  };

  // SUCCESS SCREEN – SVG ICON (NO REACT COMPONENT ISSUE)
  if (showSuccess) {
    return (
      <div className="success-screen">
        <div className="success-icon">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#d4380d" strokeWidth="8" />
            <path d="M28 50 L43 65 L72 36" fill="none" stroke="#d4380d" strokeWidth="10"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1>Order Placed Successfully!</h1>
        <p>Your food is on the way • 25–35 mins</p>
        <button onClick={() => navigate('/')} className="home-btn">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <div className="address-card">
        <div className="address-header">
          <div><FiMapPin /> <strong>Deliver to</strong></div>
          <button className="change-btn">Change</button>
        </div>
        <div className="address-details">
          <h3>{address.name} • {address.phone}</h3>
          <p>{address.flat}, {address.landmark}</p>
          <span className="tag">{address.type}</span>
        </div>
      </div>

      <div className="payment-section">
        <h2>Payment Method</h2>
        <label className={`payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}>
          <input type="radio" name="pay" checked={paymentMethod === 'cod'}
            onChange={() => setPaymentMethod('cod')} />
          <FiCreditCard /> <span>Cash on Delivery (COD)</span>
          <strong>₹{total}</strong>
        </label>
        <label className={`payment-option ${paymentMethod === 'online' ? 'active' : ''}`}>
          <input type="radio" name="pay" checked={paymentMethod === 'online'}
            onChange={() => setPaymentMethod('online')} />
          <FiPhone /> <span>UPI / Cards / Wallet</span>
        </label>
      </div>

      <div className="price-summary">
        <div className="price-row"><span>Item Total</span><span>₹{subtotal}</span></div>
        <div className="price-row"><span>Delivery Fee</span><span>₹{delivery}</span></div>
        <div className="price-row"><span>Taxes & Charges</span><span>₹{taxes}</span></div>
        <div className="price-total"><strong>To Pay</strong><strong>₹{total}</strong></div>
      </div>

      <button className="place-order-btn" onClick={placeOrder}>
        {paymentMethod === 'cod' ? `Place Order • ₹${total}` : `Pay Online • ₹${total}`}
      </button>
    </div>
  );
};

export default Checkout;