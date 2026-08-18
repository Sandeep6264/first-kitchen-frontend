// pages/Dashboard.jsx
import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [kitchenLive, setKitchenLive] = useState(true);

  // Stats data
  const stats = [
    { title: 'Total Orders (Today)', value: '142', change: '+12%', icon: 'fas fa-shopping-bag', color: '#d4380d' },
    { title: 'Revenue Today', value: '$2,845.50', change: '+8.5%', icon: 'fas fa-dollar-sign', color: '#52c41a' },
    { title: 'Active Orders', value: '18', change: '-2', icon: 'fas fa-clock', color: '#1890ff' },
    { title: 'Monthly Revenue', value: '$45,320.80', change: '+15.2%', icon: 'fas fa-chart-line', color: '#722ed1' },
  ];

  // Recent orders data
  const recentOrders = [
    { id: '#FK-2847', customer: 'John Smith', amount: '$45.50', status: 'completed', time: '12:30 PM' },
    { id: '#FK-2848', customer: 'Emma Johnson', amount: '$28.75', status: 'preparing', time: '12:45 PM' },
    { id: '#FK-2849', customer: 'Michael Chen', amount: '$67.20', status: 'new', time: '1:15 PM' },
    { id: '#FK-2850', customer: 'Sarah Wilson', amount: '$15.99', status: 'completed', time: '1:30 PM' },
    { id: '#FK-2851', customer: 'David Brown', amount: '$52.40', status: 'cancelled', time: '2:00 PM' },
  ];

  return (
    <div className="dashboard">
      <div className="screen-header">
        <h1>Dashboard Overview</h1>
        <div className="header-actions">
          <div className="date-selector">
            <i className="fas fa-calendar-alt"></i>
            <span>Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
          </div>
          <button className="btn btn-outline">
            <i className="fas fa-download"></i>
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
              <i className={stat.icon} style={{ color: stat.color }}></i>
            </div>
            <div className="stat-content">
              <h4>{stat.title}</h4>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                {stat.change} from yesterday
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-row">
          {/* Order Status Pie Chart */}
          <div className="chart-card">
            <div className="card-header">
              <h3>Order Status Distribution</h3>
              <select className="period-select">
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
            <div className="pie-chart-container">
              <div className="pie-chart">
                <div className="pie-chart-visual">
                  <div className="pie-segment" style={{ '--percent': '50%', '--color': '#52c41a' }}></div>
                  <div className="pie-segment" style={{ '--percent': '30%', '--color': '#fa8c16' }}></div>
                  <div className="pie-segment" style={{ '--percent': '15%', '--color': '#1890ff' }}></div>
                  <div className="pie-segment" style={{ '--percent': '5%', '--color': '#ff4d4f' }}></div>
                </div>
                <div className="pie-legend">
                  <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#52c41a' }}></span>
                    <span>Completed (50%)</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#fa8c16' }}></span>
                    <span>Preparing (30%)</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#1890ff' }}></span>
                    <span>New (15%)</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#ff4d4f' }}></span>
                    <span>Cancelled (5%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="chart-card">
            <div className="card-header">
              <h3>Revenue Trend</h3>
              <select className="period-select">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last Quarter</option>
              </select>
            </div>
            <div className="revenue-chart">
              <div className="chart-bars">
                {[65, 80, 75, 90, 85, 95, 70].map((height, index) => (
                  <div key={index} className="bar-wrapper">
                    <div className="bar" style={{ height: `${height}%` }}></div>
                    <span className="bar-label">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
                  </div>
                ))}
              </div>
              <div className="chart-y-axis">
                <span>$2k</span>
                <span>$1.5k</span>
                <span>$1k</span>
                <span>$500</span>
                <span>$0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kitchen Status & Recent Orders */}
      <div className="bottom-section">
        <div className="kitchen-status-card">
          <div className="card-header">
            <h3>Kitchen Status</h3>
            <div className="status-toggle">
              <span className={`toggle-label ${kitchenLive ? 'active' : ''}`}>
                {kitchenLive ? 'LIVE' : 'OFFLINE'}
              </span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={kitchenLive}
                  onChange={(e) => setKitchenLive(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
          <div className="status-info">
            <div className="status-message">
              {kitchenLive ? (
                <><i className="fas fa-check-circle"></i> Kitchen is accepting orders</>
              ) : (
                <><i className="fas fa-pause-circle"></i> Kitchen is paused - Not accepting orders</>
              )}
            </div>
            <div className="status-stats">
              <div className="stat">
                <span className="stat-value">18</span>
                <span className="stat-label">Active Orders</span>
              </div>
              <div className="stat">
                <span className="stat-value">4</span>
                <span className="stat-label">In Kitchen</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="recent-orders-card">
          <div className="card-header">
            <h3>Recent Orders</h3>
            <button className="btn btn-outline">
              View All
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <div className="orders-table">
            <table className="data-table">
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
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td className="order-id">{order.id}</td>
                    <td className="customer">{order.customer}</td>
                    <td className="amount">{order.amount}</td>
                    <td>
                      <span className={`status-tag ${
                        order.status === 'completed' ? 'status-success' :
                        order.status === 'preparing' ? 'status-pending' :
                        order.status === 'new' ? 'status-info' :
                        'status-cancelled'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
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
    </div>
  );
};

export default Dashboard;