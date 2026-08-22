import React, { useState } from 'react';
import {
  FaDollarSign,
  FaCalendarDay,
  FaChartLine,
  FaCheckCircle,
  FaDownload,
  FaArrowUp,
  FaArrowDown,
  FaCreditCard,
  FaMobileAlt,
  FaMoneyBill,
  FaUniversity,
  FaEye,
  FaCheck,
  FaUndo,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaWallet,
  FaPercent,
  FaClock,
  FaCalendarAlt,
  FaSearch,
  FaShoppingBag
} from 'react-icons/fa';
import './PaymentsRevenue.css';

const PaymentsRevenue = () => {
  const [activeFilter, setActiveFilter] = useState('today');
  const [selectedDateRange, setSelectedDateRange] = useState('thisMonth');
  const [searchTerm, setSearchTerm] = useState('');

  const revenueStats = [
    {
      title: 'Total Revenue',
      value: '$45,320.80',
      change: '+15.2%',
      period: 'This Month',
      icon: FaDollarSign,
      color: '#22c55e'
    },
    {
      title: "Today's Revenue",
      value: '$2,845.50',
      change: '+8.5%',
      period: 'vs Yesterday',
      icon: FaCalendarDay,
      color: '#3b82f6'
    },
    {
      title: 'Average Order Value',
      value: '$32.45',
      change: '+4.2%',
      period: 'This Month',
      icon: FaChartLine,
      color: '#8b5cf6'
    },
    {
      title: 'Successful Payments',
      value: '98.2%',
      change: '+0.8%',
      period: 'Success Rate',
      icon: FaCheckCircle,
      color: '#E54304'
    }
  ];

  const paymentMethods = [
    { method: 'Credit Card', percentage: 65, amount: '$29,458.52', count: 892, icon: FaCreditCard },
    { method: 'Digital Wallet', percentage: 25, amount: '$11,330.20', count: 343, icon: FaMobileAlt },
    { method: 'Cash on Delivery', percentage: 8, amount: '$3,625.66', count: 110, icon: FaMoneyBill },
    { method: 'Bank Transfer', percentage: 2, amount: '$906.42', count: 27, icon: FaUniversity }
  ];

  const paymentHistory = [
    { id: '#FK-2849', amount: '$67.20', method: 'Credit Card', status: 'completed', date: '2024-01-15', time: '1:15 PM' },
    { id: '#FK-2848', amount: '$28.75', method: 'Digital Wallet', status: 'completed', date: '2024-01-15', time: '12:45 PM' },
    { id: '#FK-2847', amount: '$45.50', method: 'Credit Card', status: 'completed', date: '2024-01-15', time: '12:30 PM' },
    { id: '#FK-2851', amount: '$52.40', method: 'Cash on Delivery', status: 'refunded', date: '2024-01-15', time: '2:00 PM' },
    { id: '#FK-2850', amount: '$15.99', method: 'Bank Transfer', status: 'pending', date: '2024-01-15', time: '1:30 PM' },
    { id: '#FK-2846', amount: '$89.75', method: 'Credit Card', status: 'completed', date: '2024-01-14', time: '8:45 PM' },
    { id: '#FK-2845', amount: '$23.50', method: 'Digital Wallet', status: 'completed', date: '2024-01-14', time: '7:30 PM' },
    { id: '#FK-2844', amount: '$120.25', method: 'Credit Card', status: 'completed', date: '2024-01-14', time: '6:15 PM' }
  ];

  const getPaymentMethodColor = (method) => {
    switch (method) {
      case 'Credit Card': return '#3b82f6';
      case 'Digital Wallet': return '#22c55e';
      case 'Cash on Delivery': return '#8b5cf6';
      case 'Bank Transfer': return '#f59e0b';
      default: return '#E54304';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'pending': return '#f59e0b';
      case 'refunded': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  const filteredPayments = paymentHistory.filter(payment =>
    payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="payments-revenue">
      {/* Header */}
      <div className="page-header">
        <div className="header-left">
          <h1>Payments & Revenue</h1>
          <p>Monitor your financial performance and payment activity</p>
        </div>
        <div className="header-right">
          <div className="date-filters">
            {['today', 'week', 'month', 'quarter', 'year'].map(filter => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
          <button className="btn-primary">
            <FaDownload size={14} />
            Export
          </button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="stats-grid">
        {revenueStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                  <Icon size={20} />
                </div>
                <span className="stat-period">{stat.period}</span>
              </div>
              <div className="stat-body">
                <h3>{stat.title}</h3>
                <div className="stat-value">{stat.value}</div>
                <div className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                  {stat.change.startsWith('+') ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Payment Methods */}
        <div className="chart-card">
          <div className="card-header">
            <h3>Payment Methods</h3>
            <select
              className="period-select"
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
            >
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="thisQuarter">This Quarter</option>
              <option value="thisYear">This Year</option>
            </select>
          </div>
          <div className="payment-methods">
            <div className="donut-chart">
              <div className="donut-ring">
                {paymentMethods.map((method, index) => {
                  const prevPercentages = paymentMethods.slice(0, index).reduce((acc, m) => acc + m.percentage, 0);
                  return (
                    <div
                      key={method.method}
                      className="donut-segment"
                      style={{
                        transform: `rotate(${prevPercentages * 3.6}deg)`,
                        background: `conic-gradient(${getPaymentMethodColor(method.method)} 0% ${method.percentage}%, transparent ${method.percentage}% 100%)`
                      }}
                    />
                  );
                })}
                <div className="donut-center">
                  <FaWallet size={24} />
                  <span className="center-value">100%</span>
                  <span className="center-label">Total</span>
                </div>
              </div>
            </div>
            <div className="methods-list">
              {paymentMethods.map(method => {
                const Icon = method.icon;
                return (
                  <div key={method.method} className="method-item">
                    <div className="method-info">
                      <div className="method-icon" style={{ color: getPaymentMethodColor(method.method) }}>
                        <Icon size={16} />
                      </div>
                      <span className="method-name">{method.method}</span>
                    </div>
                    <div className="method-stats">
                      <span className="method-percentage">{method.percentage}%</span>
                      <span className="method-amount">{method.amount}</span>
                      <span className="method-count">{method.count} payments</span>
                    </div>
                    <div className="method-bar">
                      <div
                        className="method-bar-fill"
                        style={{
                          width: `${method.percentage}%`,
                          background: getPaymentMethodColor(method.method)
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="chart-card">
          <div className="card-header">
            <h3>Revenue Trend</h3>
            <select className="period-select">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="trend-chart">
            <div className="chart-container">
              <div className="chart-y-axis">
                <span>$50k</span>
                <span>$37.5k</span>
                <span>$25k</span>
                <span>$12.5k</span>
                <span>$0</span>
              </div>
              <div className="chart-grid">
                {[80, 65, 75, 85, 70, 90, 85, 95, 80, 75, 85, 90].map((value, index) => (
                  <div key={index} className="bar-wrapper">
                    <div
                      className="trend-bar"
                      style={{
                        height: `${value}%`,
                        background: `linear-gradient(to top, #E54304, #f59e0b)`
                      }}
                    />
                    <span className="bar-label">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="trend-summary">
              <div className="trend-stat">
                <FaChartLine size={16} style={{ color: '#22c55e' }} />
                <div>
                  <span className="trend-label">Total Revenue</span>
                  <span className="trend-value">$45,320.80</span>
                </div>
              </div>
              <div className="trend-stat">
                <FaCalendarAlt size={16} style={{ color: '#3b82f6' }} />
                <div>
                  <span className="trend-label">This Month</span>
                  <span className="trend-value">+15.2% growth</span>
                </div>
              </div>
              <div className="trend-stat">
                <FaClock size={16} style={{ color: '#8b5cf6' }} />
                <div>
                  <span className="trend-label">Avg. Daily Revenue</span>
                  <span className="trend-value">$1,510.69</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="history-card">
        <div className="card-header">
          <h3>Payment History</h3>
          <div className="history-controls">
            <div className="search-box">
              <FaSearch size={14} />
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="filter-select">
              <option>All Status</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Refunded</option>
            </select>
            <button className="btn-filter">
              <FaFilter size={14} />
              Filter
            </button>
          </div>
        </div>
        <div className="table-container">
          <table className="payments-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date & Time</th>
                <th>Order ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(payment => (
                <tr key={payment.id}>
                  <td>
                    <span className="payment-id">PAY-{payment.id.slice(4)}</span>
                  </td>
                  <td>
                    <span className="payment-amount">{payment.amount}</span>
                  </td>
                  <td>
                    <span
                      className="method-badge"
                      style={{
                        background: `${getPaymentMethodColor(payment.method)}15`,
                        color: getPaymentMethodColor(payment.method)
                      }}
                    >
                      {payment.method === 'Credit Card' && <FaCreditCard size={12} />}
                      {payment.method === 'Digital Wallet' && <FaMobileAlt size={12} />}
                      {payment.method === 'Cash on Delivery' && <FaMoneyBill size={12} />}
                      {payment.method === 'Bank Transfer' && <FaUniversity size={12} />}
                      {payment.method}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${payment.status}`}
                      style={{
                        background: `${getStatusColor(payment.status)}15`,
                        color: getStatusColor(payment.status)
                      }}
                    >
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="payment-date">
                      <span className="date">{payment.date}</span>
                      <span className="time">{payment.time}</span>
                    </div>
                  </td>
                  <td>
                    <span className="order-link">{payment.id}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn view" title="View">
                        <FaEye size={14} />
                      </button>
                      {payment.status === 'pending' && (
                        <button className="action-btn approve" title="Approve">
                          <FaCheck size={14} />
                        </button>
                      )}
                      {payment.status !== 'refunded' && (
                        <button className="action-btn refund" title="Refund">
                          <FaUndo size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <div className="summary-stats">
            <div className="summary-item">
              <span className="summary-label">Total:</span>
              <span className="summary-value">$1,450.34</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Completed:</span>
              <span className="summary-value" style={{ color: '#22c55e' }}>$1,397.89</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Pending:</span>
              <span className="summary-value" style={{ color: '#f59e0b' }}>$15.99</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Refunded:</span>
              <span className="summary-value" style={{ color: '#ef4444' }}>$52.40</span>
            </div>
          </div>
          <div className="pagination">
            <button className="page-btn" disabled>
              <FaChevronLeft size={12} />
            </button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">
              <FaChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsRevenue;