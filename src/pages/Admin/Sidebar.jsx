// components/Sidebar.jsx
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ collapsed, activePage, setActivePage }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fas fa-chart-line', label: 'Dashboard' },
    { id: 'orders', icon: 'fas fa-shopping-cart', label: 'Orders' },
    { id: 'menu', icon: 'fas fa-utensils', label: 'Menu Management' },
    { id: 'categories', icon: 'fas fa-tags', label: 'Categories' },
    { id: 'users', icon: 'fas fa-users', label: 'Users / Customers' },
    { id: 'payments', icon: 'fas fa-credit-card', label: 'Payments & Revenue' },
    { id: 'kitchen-status', icon: 'fas fa-fire', label: 'Kitchen Status' },
    { id: 'reports', icon: 'fas fa-chart-bar', label: 'Reports & Analytics' },
    { id: 'settings', icon: 'fas fa-cog', label: 'Settings' },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
            aria-label={item.label}
          >
            <i className={item.icon}></i>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
        
        <div className="sidebar-divider"></div>
        
        <button
          className="nav-item logout-item"
          onClick={() => setActivePage('logout')}
        >
          <i className="fas fa-sign-out-alt"></i>
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>
      
      {!collapsed && (
        <div className="sidebar-footer">
          <div className="current-status">
            <div className="status-indicator active">
              <span className="status-dot"></span>
              <span>Kitchen Live</span>
            </div>
            <div className="status-time">Since 9:00 AM</div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;