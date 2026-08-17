// src/pages/RestaurantDetail.jsx
import React from "react";
import "./RestaurantDetail.css";

const menu = [
  {
    id: 1,
    name: "Butter Chicken",
    description: "Creamy tomato gravy with tender chicken pieces",
    price: 350,
  },
  {
    id: 2,
    name: "Paneer Lababdar",
    description: "Rich & mildly spiced paneer curry",
    price: 280,
  },
  {
    id: 3,
    name: "Chicken Fried Rice",
    description: "Wok tossed rice with chicken & veggies",
    price: 240,
  },
];

const RestaurantDetail = () => {
  return (
    <div className="resto-page">
      {/* Banner */}
      <div className="resto-banner">
        <div className="resto-overlay">
          <h1 className="resto-name">First Kitchen</h1>
          <p className="resto-cuisine">
            North Indian • Chinese • Fast Food
          </p>

          <div className="resto-info">
            <span className="info-chip rating-chip">★ 4.5</span>
            <span className="info-chip">25–30 mins</span>
            <span className="info-chip">₹250 for one</span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="menu-section">
        <h2 className="menu-title">Recommended</h2>

        {menu.map((item) => (
          <div key={item.id} className="dish-card">
            <div className="dish-info">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="price">₹{item.price}</span>
            </div>

            <button className="add-btn">ADD</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetail;
