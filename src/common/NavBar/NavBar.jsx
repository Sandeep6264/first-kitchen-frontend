// src/common/NavBar/NavBar.jsx
import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiTag, FiPackage, FiHome } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const { ...context } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleConfirmLogout = () => {
    setIsLoggingOut(true);  
    setTimeout(() => {
      context.setUserToken(null);
      context.setUserRole([]);  
      context.setIsLoggedIn(false);
      setIsLoggingOut(false);
      setShowPopup(false);
      navigate('/login', { replace: true });
    }, 1000);
  }
  const handleCancelLogout = () => {
    setShowPopup(false);
  }


  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <h1>First Kitchen</h1>
        </div>

        {/* Desktop Menu */}
        <div className="desktopMenu">
          <NavLink to="/home"><button><FiHome /> Home</button></NavLink>
          <NavLink to="/offers"><button><FiTag /> Offers</button></NavLink>
          <NavLink to="/myorders"><button><FiPackage /> My Orders</button></NavLink>
          {context.isLoggedIn && <div><button onClick={() => setShowPopup(true)}>Logout</button></div>}
          {context.isLoggedIn || <NavLink to="/login"><button>Login</button></NavLink>}
          {context.isLoggedIn || <NavLink to="/signup"><button>Sign Up</button></NavLink>}
          <div className="cart-wrapper" onClick={() => navigate('/cart')}>
            <FiShoppingCart className="cart-icon" />
            {context.cart.length > 0 && (
              <span className="cart-badge">{context.cart.length}</span>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button className="hamburger" onClick={toggleMenu}>
          <span></span><span></span><span></span>
        </button>

        {/* Mobile Menu */}
        <div className={`mobileMenu ${isOpen ? 'open' : 'closed'}`}>
          <NavLink to="/home" onClick={toggleMenu}><button><FiHome /> Home</button></NavLink>
          <NavLink to="/offers" onClick={toggleMenu}><button><FiTag /> Offers</button></NavLink>
          <NavLink to="/myorders" onClick={toggleMenu}><button><FiPackage /> My Orders</button></NavLink>

          <NavLink to="/login" onClick={toggleMenu}><button>Login</button></NavLink>
          <NavLink to="/signup" onClick={toggleMenu}><button >Sign Up</button></NavLink>
          <NavLink to="/cart" onClick={toggleMenu} state={{
            textDecoration: 'none'
          }}>
            <button className="cart-button mobile-cart-btn" style={{ textDecoration: "none" }} >
              <FiShoppingCart className="cart-icon" />
              {context.cart.length > 0 && (
                <span className="cart-badge">{context.cart.length} </span>
              )}
              Cart
            </button>
          </NavLink>
        </div>
      </nav>

      <div className="mobileSearchBar">
        <input type="text" placeholder="Search items..." />
      </div>
      {showPopup && (
        <div className="popup-overlay" onClick={handleCancelLogout}>
      <div 
        className="popup-content" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        aria-describedby="popup-description"
      >
        {/* Popup Header with Kitchen Theme */}
        <div className="popup-header">
          <div className="popup-icon">
            <i className="fas fa-utensils"></i>
          </div>
          <h2 id="popup-title" className="popup-title">Confirm Logout</h2>
        </div>

        {/* Popup Body */}
        <div className="popup-body">
          <p id="popup-description" className="popup-description">
            Are you sure you want to leave the kitchen? You'll need to log in again to access your recipes and orders.
          </p>
          
          {/* Kitchen-themed illustration */}
          <div className="kitchen-illustration">
            <div className="kitchen-icon">
              <i className="fas fa-door-open"></i>
            </div>
            <div className="kitchen-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="popup-actions">
          <button
            className="popup-btn popup-btn-cancel"
            onClick={handleCancelLogout}
            disabled={isLoggingOut}
          >
            Stay in Kitchen
          </button>
          
          <button
            className="popup-btn popup-btn-confirm"
            onClick={handleConfirmLogout}
            disabled={isLoggingOut}
            autoFocus
          >
            {isLoggingOut ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Leaving...
              </>
            ) : (
              'Yes, Logout'
            )}
          </button>
        </div>

        {/* Close button */}
        <button
          className="popup-close"
          onClick={handleCancelLogout}
          aria-label="Close logout confirmation"
          disabled={isLoggingOut}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
      )}

    </>
  );
}

export default NavBar;
// button