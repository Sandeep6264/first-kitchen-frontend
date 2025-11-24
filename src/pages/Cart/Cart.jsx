// src/pages/Cart.jsx
import React, { useState, useEffect } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiMinus, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';


const Cart = () => {
  const [showBill, setShowBill] = useState(false);
  const context = useAuth();
  const { cart, setCart, itemCount, setitemCount } = useAuth();
  const navigate=useNavigate();

  useEffect(() => {
    localStorage.setItem('firstKitchenCart', JSON.stringify(cart));
    setitemCount(cart.length);
  }, [cart]);

  const update = (id, delta) => {
    const allItem = [...cart]
    allItem.forEach(item => {
      if (item.itemId === id) {
        item.qty += delta;
      }
    });
    const filterItem = allItem.filter(item => item.qty > 0)
    setCart(filterItem);

  };

  const remove = (id) => setCart(prev => prev.filter(i => i.itemId != id));

  const subtotal = cart.reduce((s, i) => s + i.itemPrice * i.qty, 0);
  const total = subtotal + 45;

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
        <span className="cart-count">{cart.length} cart</span>
      </div>

      <div className="cart-list">
        {cart.map(item => (
          <div key={item.itemId} className="item-line">
            <div className="item-text">
              <h3>{item.itemName}</h3>
              <p className="unit-price">₹{item.itemPrice}</p>
            </div>

            <div className="item-actions">
              <div className="qty">
                <button onClick={() => update(item.itemId, -1)}><FiMinus /></button>
                <span>{item.qty}</span>
                <button onClick={() => update(item.itemId, +1)}><FiPlus /></button>
              </div>

              <span className="line-total">₹{item.itemPrice * item.qty}</span>

              <button onClick={() => remove(item.itemId)} className="del">
                <FiX />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* // Only replace the <div className="fixed-bottom"> part with this: */}

      {/* Floating Mini Bottom Bar — Exactly like Swiggy */}
      <div className="floating-bar" onClick={() => setShowBill(true)}>
        <div className="bar-left">
          <strong>To Pay ₹{total}</strong>
          <p>View detailed bill ↓</p>
        </div>
        <button className="pay-float-btn">
          Pay ₹{total}
        </button>
      </div>

      {/* Slide-up Bill Sheet */}
      {showBill && (
        <div className="bill-sheet" onClick={() => setShowBill(false)}>
          <div className="sheet-handle" />
          <div className="sheet-content" onClick={e => e.stopPropagation()}>
            <h3>Bill Details</h3>
            <div className="detail-row">
              <span>Item Total</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="detail-row">
              <span>Delivery Partner Fee</span>
              <span>₹45</span>
            </div>
            <div className="detail-row">
              <span>GST & Restaurant Charges</span>
              <span>₹24</span>
            </div>
            <div className="detail-total">
              <strong>To Pay</strong>
              <strong>₹{total}</strong>
            </div>
            <button className="pay-full-btn">
              Proceed to Payment • ₹{total}
            </button>
          </div>
        </div>
      )}


    </div>
  );
};

export default Cart;