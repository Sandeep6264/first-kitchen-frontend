import React, { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaDownload, 
  FaShoppingBag, 
  FaDollarSign, 
  FaClock, 
  FaChartLine,
  FaCheckCircle,
  FaPauseCircle,
  FaArrowRight
} from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [kitchenLive, setKitchenLive] = useState(true);

  // Stats data - Simple and clear
  const stats = [
    { title: 'Total Orders', value: '142', change: '+12%', icon: FaShoppingBag, color: '#E54304' },
    { title: 'Revenue Today', value: '$2,845', change: '+8.5%', icon: FaDollarSign, color: '#22c55e' },
    { title: 'Active Orders', value: '18', change: '-2', icon: FaClock, color: '#3b82f6' },
    { title: 'Monthly Revenue', value: '$45,320', change: '+15.2%', icon: FaChartLine, color: '#8b5cf6' },
  ];

  // Recent orders - Clear structure
  const recentOrders = [
    { id: '#FK-2847', customer: 'John Smith', amount: '$45.50', status: 'completed', time: '12:30 PM' },
    { id: '#FK-2848', customer: 'Emma Johnson', amount: '$28.75', status: 'preparing', time: '12:45 PM' },
    { id: '#FK-2849', customer: 'Michael Chen', amount: '$67.20', status: 'new', time: '1:15 PM' },
    { id: '#FK-2850', customer: 'Sarah Wilson', amount: '$15.99', status: 'completed', time: '1:30 PM' },
    { id: '#FK-2851', customer: 'David Brown', amount: '$52.40', status: 'cancelled', time: '2:00 PM' },
  ];

  // Get status badge class
  const getStatusClass = (status) => {
    const classes = {
      completed: 'status-completed',
      preparing: 'status-preparing',
      new: 'status-new',
      cancelled: 'status-cancelled'
    };
    return classes[status] || '';
  };

  // Get status display name
  const getStatusName = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle">Welcome back! Here's your kitchen overview</p>
        </div>
        <div className="header-actions">
          <div className="date-display">
            <FaCalendarAlt size={14} />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}</span>
          </div>
          <button className="btn-export">
            <FaDownload size={14} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="stat-top">
                <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                  <Icon size={18} />
                </div>
                <span className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="stat-bottom">
                <p className="stat-title">{stat.title}</p>
                <h2 className="stat-value">{stat.value}</h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Section - Kitchen Status & Order Status */}
      <div className="middle-section">
        {/* Kitchen Status Card */}
        <div className="card kitchen-card">
          <div className="card-header">
            <h3>Kitchen Status</h3>
            <div className="toggle-container">
              <span className={`status-dot ${kitchenLive ? 'active' : 'inactive'}`}>
                {kitchenLive ? '● Live' : '○ Offline'}
              </span>
              <label className="toggle">
                <input 
                  type="checkbox" 
                  checked={kitchenLive}
                  onChange={(e) => setKitchenLive(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
          <div className="kitchen-info">
            <div className="kitchen-stats">
              <div>
                <span className="number">18</span>
                <span className="label">Active Orders</span>
              </div>
              <div>
                <span className="number">4</span>
                <span className="label">In Kitchen</span>
              </div>
              <div>
                <span className="number">12</span>
                <span className="label">Ready</span>
              </div>
            </div>
            <div className={`kitchen-message ${kitchenLive ? 'active' : 'inactive'}`}>
              {kitchenLive ? (
                <>
                  <FaCheckCircle size={14} />
                  Accepting orders
                </>
              ) : (
                <>
                  <FaPauseCircle size={14} />
                  Not accepting orders
                </>
              )}
            </div>
          </div>
        </div>

        {/* Order Status Card */}
        <div className="card orders-card">
          <div className="card-header">
            <h3>Order Status</h3>
            <select className="filter-select">
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="order-stats">
            <div>
              <span className="stat-number" style={{ color: '#22c55e' }}>71</span>
              <span className="stat-label">Completed</span>
              <div className="bar" style={{ width: '50%', background: '#22c55e' }}></div>
            </div>
            <div>
              <span className="stat-number" style={{ color: '#f59e0b' }}>43</span>
              <span className="stat-label">Preparing</span>
              <div className="bar" style={{ width: '30%', background: '#f59e0b' }}></div>
            </div>
            <div>
              <span className="stat-number" style={{ color: '#3b82f6' }}>21</span>
              <span className="stat-label">New</span>
              <div className="bar" style={{ width: '15%', background: '#3b82f6' }}></div>
            </div>
            <div>
              <span className="stat-number" style={{ color: '#ef4444' }}>7</span>
              <span className="stat-label">Cancelled</span>
              <div className="bar" style={{ width: '5%', background: '#ef4444' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="card table-card">
        <div className="card-header">
          <h3>Recent Orders</h3>
          <button className="btn-view-all">
            View All
            <FaArrowRight size={12} />
          </button>
        </div>
        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.customer}</td>
                  <td className="amount">{order.amount}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                      {getStatusName(order.status)}
                    </span>
                  </td>
                  <td className="time">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;