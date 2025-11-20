import React, { useState } from 'react';
import './NavBar.css';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar">
        {/* Logo */}
        <div className="logo">
          <h1>First Kitchen</h1>
        </div>

        {/* Desktop Search */}
        <div className="desktopSearch">
          <input type="text" placeholder="Search items..." />
        </div>

        {/* Desktop Buttons */}
        <div className="desktopMenu">
          <button>Home</button>
          <button>Login</button>
          <button className="signup">Sign Up</button>
        </div>

        {/* Hamburger Icon - Mobile Only */}
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Dropdown Menu */}
        <div className={`mobileMenu ${isOpen ? 'open' : ''}`}>
          <button onClick={toggleMenu}>Home</button>
          <button onClick={toggleMenu}>Login</button>
          <button onClick={toggleMenu} className="signup">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Mobile Full-Width Search Bar (below navbar) */}
      <div className="mobileSearchBar">
        <input type="text" placeholder="Search items..." />
      </div>
    </>
  );
}

export default NavBar;