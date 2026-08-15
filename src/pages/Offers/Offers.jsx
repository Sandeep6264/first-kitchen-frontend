// src/pages/Offers.jsx
import React from 'react';
import './Offers.css';

const Offers = () => {
  return (
    <div className="offers-page">
      <h1>Offers for You</h1>
      <div className="offer-card">
        <h2>FIRST50</h2>
        <p>50% OFF up to ₹150</p>
        <span>Use code on orders above ₹299</span>
        <button>Apply</button>
      </div>
      <div className="offer-card">
        <h2>FLAT100</h2>
        <p>Flat ₹100 OFF</p>
        <span>On first order above ₹399</span>
        <button>Apply</button>
      </div>
    </div>
  );
};

export default Offers;