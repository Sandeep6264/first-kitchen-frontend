// components/Sidebar.jsx
import React from 'react';
import {
  FaChartLine,
  FaShoppingCart,
  FaUtensils,
  FaCreditCard,
  FaFire,
  FaChartBar,
  FaSignOutAlt,
  FaCircle,
  FaTags,
  FaUsers,
  FaCog
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ collapsed, activePage, setActivePage }) => {
  const menuItems = [
    { id: 'dashboard', icon: FaChartLine, label: 'Dashboard' },
    { id: 'orders', icon: FaShoppingCart, label: 'Orders' },
    { id: 'menu', icon: FaUtensils, label: 'Menu Management' },
    { id: 'payments', icon: FaCreditCard, label: 'Payments & Revenue' },
    { id: 'kitchen-status', icon: FaFire, label: 'Kitchen Status' },
    { id: 'reports', icon: FaChartBar, label: 'Reports & Analytics' },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <nav className="sidebar-nav">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
              aria-label={item.label}
            >
              <Icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}

        <div className="sidebar-divider"></div>

        <button
          className="nav-item logout-item"
          onClick={() => setActivePage('logout')}
        >
          <FaSignOutAlt size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>

      {!collapsed && (
        <div className="sidebar-footer">
          <div className="current-status">
            <div className="status-indicator active">
              <FaCircle className="status-dot" size={8} />
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