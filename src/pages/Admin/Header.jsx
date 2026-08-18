// components/Header.jsx
import React from 'react';
import './Header.css';

const Header = ({ onMenuClick, sidebarCollapsed }) => {
  return (
    <header className="admin-header">
      <div className="header-left">
        <button 
          className="menu-toggle"
          onClick={onMenuClick}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="logo">
          <span className="logo-text">First Kitchen Admin</span>
        </div>
      </div>
      
      <div className="header-center">
        <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input 
            type="search"
            className="search-input"
            placeholder="Search orders, menu, customers..."
            aria-label="Search"
          />
        </div>
      </div>
      
      <div className="header-right">
        <button className="notification-btn" aria-label="Notifications">
          <i className="fas fa-bell"></i>
          <span className="notification-badge">3</span>
        </button>
        
        <div className="admin-profile">
          <div className="admin-avatar">
            <img 
              src="https://ui-avatars.com/api/?name=Admin+User&background=d4380d&color=fff" 
              alt="Admin User"
            />
          </div>
          <span className="admin-name">Admin</span>
        </div>
        
        <button className="logout-btn" aria-label="Logout">
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;