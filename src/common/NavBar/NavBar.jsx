// src/common/NavBar/NavBar.jsx
import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiTag, FiPackage, FiHome } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { ...context } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close mobile menu automatically when switching to desktop screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <h1>First Kitchen</h1>
        </div>

        {/* Desktop Menu */}
        <div className="desktopMenu">
          <NavLink to="/"><button><FiHome /> Home</button></NavLink>
          <NavLink to="/offers"><button><FiTag /> Offers</button></NavLink>
          <NavLink to="/myorders"><button><FiPackage /> My Orders</button></NavLink>

          <NavLink to="/login"><button>Login</button></NavLink>
          <NavLink to="/signup">
            <button className="signup">Sign Up</button>
          </NavLink>

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
          <NavLink to="/" onClick={toggleMenu}><button><FiHome /> Home</button></NavLink>
          <NavLink to="/offers" onClick={toggleMenu}><button><FiTag /> Offers</button></NavLink>
          <NavLink to="/myorders" onClick={toggleMenu}><button><FiPackage /> My Orders</button></NavLink>

          <NavLink to="/login" onClick={toggleMenu}><button>Login</button></NavLink>
          <NavLink to="/signup" onClick={toggleMenu}><button >Sign Up</button></NavLink>
          <NavLink to="/cart" onClick={toggleMenu} state={{
            textDecoration: 'none'
          }}>
            <button className="cart-button mobile-cart-btn" style={{textDecoration:"none"}} >
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
    </>
  );
}

export default NavBar;
// button