
import React from 'react';
import { 
  FaBars, 
  FaSearch, 
  FaBell, 
  FaSignOutAlt,
  FaUserCircle 
} from 'react-icons/fa';
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
          <FaBars size={20} />
        </button>
        <div className="logo">
          <span className="logo-text">First Kitchen Admin</span>
        </div>
      </div>
      
      <div className="header-center">
        <div className="search-container">
          <FaSearch className="search-icon" size={16} />
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
          <FaBell size={20} />
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
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;