// src/pages/Offers.jsx
import React from "react";
import "./Offers.css";

const offers = [
  {
    code: "FIRST50",
    title: "50% OFF",
    description: "Up to ₹150 discount",
    condition: "On orders above ₹299",
    tag: "New User",
  },
  {
    code: "FLAT100",
    title: "Flat ₹100 OFF",
    description: "Instant savings",
    condition: "On first order above ₹399",
    tag: "Limited",
  },
  {
    code: "SAVE200",
    title: "₹200 OFF",
    description: "On large orders",
    condition: "Minimum order ₹999",
    tag: "Hot Deal",
  },
];

const Offers = () => {
  return (
    <div className="offers-page">
      <h1 className="offers-title">Offers for You</h1>

      <div className="offers-grid">
        {offers.map((offer) => (
          <div key={offer.code} className="offer-card">
            <span className="offer-tag">{offer.tag}</span>

            <div className="offer-code">{offer.code}</div>

            <h2 className="offer-title">{offer.title}</h2>
            <p className="offer-desc">{offer.description}</p>
            <p className="offer-condition">{offer.condition}</p>

            <button className="apply-btn">Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
