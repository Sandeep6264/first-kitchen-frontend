// src/pages/RestaurantDetail.jsx
import React from 'react';
import './RestaurantDetail.css';

const RestaurantDetail = () => {
  return (
    <div className="resto-page">
      <div className="resto-banner">
        <h1>First Kitchen</h1>
        <p>North Indian • Chinese • Fast Food</p>
        <div className="rating">4.5 ★ (2.5k+ ratings)</div>
      </div>
      <div className="menu-list">
        <div className="dish">Butter Chicken • ₹350 <button>Add</button></div>
        <div className="dish">Paneer Lababdar • ₹280 <button>Add</button></div>
      </div>
    </div>
  );
};

export default RestaurantDetail;