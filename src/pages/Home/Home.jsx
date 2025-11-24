// src/pages/Home.jsx
import React, { useState, useEffect, use } from 'react';
import './Home.css';
import { FiSearch, FiShoppingCart, FiPlus, FiMinus, FiCheck } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import API from '../../Service/API';

const initialItems = [
  { id: 1, name: "Chicken Biryani", price: 320, category: "Biryani" },
  { id: 2, name: "Paneer Butter Masala", price: 280, category: "Veg" },
  { id: 3, name: "Margherita Pizza", price: 399, category: "Pizza" },
  { id: 4, name: "Butter Chicken", price: 350, category: "Non-Veg" },
  { id: 5, name: "Veg Fried Rice", price: 180, category: "Chinese" },
  { id: 6, name: "Tandoori Roti", price: 25, category: "Breads" },
];

const Home = () => {
  const { ...context } = useAuth();
  const fetchItemData = async () => {
    try {
      context.setloader(true);
      const response = await API.getAllItems();
      const { ...result } = response.data;
      if (result && result.responseStatus == "S" && result.responseCode == 200) {
        context.setItems(result.responseContent);
      }
      else {
        context.setItems(initialItems);
      }
    } catch (error) {
      console.error('Error fetching item data:', error);
    } finally {
      context.setloader(false);
    }
  };
  useEffect(() => {
    fetchItemData();
  }, []);

  useEffect(() => {
    localStorage.setItem('firstKitchenCart', JSON.stringify(context.cart));
  }, [context.cart]);



  const addToCart = (item) => {
    context.setCart(prev => {
      const existing = prev.find(i => i.itemId === item.itemId);
      if (existing) {
        return prev.map(i => i.itemId === item.itemId ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
    context.setitemCount(prev => prev + 1);
  };

  const updateQty = (id, change) => {
    context.setCart(prev => {
      return prev
        .map(item =>
          item.itemId === id ? { ...item, qty: item.qty + change } : item
        )
        .filter(item => item.qty > 0);
    });
  };

  const getQty = (id) => {
    const item = context.cart.find(i => i.itemId === id);
    console.log('Getting qty for itemId:', id, 'Found item:', item);
    return item ? item.qty : 0;
  }


  return (
    <div className="home-page">
      <div className="hero">
        <h1>Order Delicious Food</h1>
        <p>Fresh • Hot • Delivered in 30 mins</p>
        <div className="search-bar">
          <FiSearch className="icon" />
          <input type="text" placeholder="Search for dishes..." />
        </div>
      </div>

      <div className="menu-container">
        <h2 className="menu-title">Our Menu</h2>
        <div className="menu-grid">
          {context.items.map(item => {
            const qty = getQty(item.itemId);
            return (
              <div key={item.itemId} className="food-card">
                <div className="food-img placeholder item-image">
                  <img src={item.itemImg} alt={item.itemName} />
                </div>
                <div className="food-info">
                  <h3>{item.itemName}</h3>
                  <p className="category">{item.itemCategory}</p>
                  <div className="price-add">
                    <span className="price">₹{item.itemPrice}</span>

                    {qty === 0 ? (
                      <button className="add-btn" onClick={() => addToCart(item)}>
                        <FiShoppingCart /> Add
                      </button>
                    ) : (
                      <div className="qty-control">
                        <button onClick={() => updateQty(item.itemId, -1)}>
                          <FiMinus />
                        </button>
                        <span className="qty-num">{qty}</span>
                        <button onClick={() => updateQty(item.itemId, +1)}>
                          <FiPlus />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;