// src/pages/Cart.jsx → FINAL WORKING VERSION 2025
import React, { useState, useEffect } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiMinus, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Cart = () => {
  const [showBill, setShowBill] = useState(false);
  const { cart, setCart, setitemCount } = useAuth();
  const navigate = useNavigate();

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('firstKitchenCart', JSON.stringify(cart));
    setitemCount(cart.length);
  }, [cart, setitemCount]);

  // Update quantity
  const update = (id, delta) => {
    const updated = cart
      .map(item => item.itemId === id ? { ...item, qty: item.qty + delta } : item)
      .filter(item => item.qty > 0);
    setCart(updated);
  };

  // Remove item
  const remove = (id) => setCart(cart.filter(i => i.itemId !== id));

  const subtotal = cart.reduce((s, i) => s + i.itemPrice * i.qty, 0);
  const total = subtotal + 45;

  // ← NEW: Show floating bar only when near bottom
  useEffect(() => {
    const handleScroll = () => {
      const bar = document.querySelector('.floating-bar');
      if (!bar) return;
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 180;
      bar.classList.toggle('visible', nearBottom);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!cart.length) {
    return (
      <div className="no-cart">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="shop-now">
          Explore Menu
        </button>
      </div>
    );
  }

  return (
    <div className="clean-cart">
      <div className="cart-top">
        <h1>Cart</h1>
        <span className="cart-count">{cart.length} item{cart.length > 1 ? 's' : ''}</span>
      </div>

      <div className="cart-list">
        {cart.map(item => (
          <div key={item.itemId} className="item-line">
            <div className="item-text">
              <h3>{item.itemName}</h3>
              <p className="unit-price">₹{item.itemPrice} each</p>
            </div>

            <div className="item-actions">
              <div className="qty">
                <button onClick={() => update(item.itemId, -1)} disabled={item.qty === 1}>
                  <FiMinus />
                </button>
                <span>{item.qty}</span>
                <button onClick={() => update(item.itemId, +1)}>
                  <FiPlus />
                </button>
              </div>

              <span className="line-total">₹{item.itemPrice * item.qty}</span>

              <button onClick={() => remove(item.itemId)} className="del">
                <FiX />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Bar — Slides up only when near bottom */}
      <div className="floating-bar" onClick={() => setShowBill(true)}>
        <div className="bar-left">
          <strong>₹{total} To Pay</strong>
          <p>View detailed bill ↓</p>
        </div>
        <button className="pay-float-btn">Place Order</button>
      </div>

      {/* Slide-up Bill Sheet */}
      {showBill && (
        <div className="bill-overlay" onClick={() => setShowBill(false)}>
          <div className="bill-sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-content">
              <h3>Bill Details</h3>
              <div className="detail-row">
                <span>Item Total</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="detail-row">
                <span>Delivery Partner Fee</span>
                <span>₹45</span>
              </div>
              <div className="detail-total">
                <strong>To Pay</strong>
                <strong>₹{total}</strong>
              </div>
              <button 
                className="pay-full-btn"
                onClick={() => navigate('/checkout')}  // ← Your checkout route
              >
                Place Order • ₹{total}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;