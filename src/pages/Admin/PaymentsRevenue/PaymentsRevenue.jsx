// pages/PaymentsRevenue.jsx
import React, { useState } from 'react';
import './PaymentsRevenue.css';

const PaymentsRevenue = () => {
  const [activeFilter, setActiveFilter] = useState('today');
  const [selectedDateRange, setSelectedDateRange] = useState('thisMonth');

  const revenueStats = [
    { 
      title: 'Total Revenue', 
      value: '$45,320.80', 
      change: '+15.2%', 
      period: 'This Month',
      icon: 'fas fa-dollar-sign',
      color: '#52c41a'
    },
    { 
      title: "Today's Revenue", 
      value: '$2,845.50', 
      change: '+8.5%', 
      period: 'vs Yesterday',
      icon: 'fas fa-calendar-day',
      color: '#1890ff'
    },
    { 
      title: 'Average Order Value', 
      value: '$32.45', 
      change: '+4.2%', 
      period: 'This Month',
      icon: 'fas fa-chart-line',
      color: '#722ed1'
    },
    { 
      title: 'Successful Payments', 
      value: '98.2%', 
      change: '+0.8%', 
      period: 'Success Rate',
      icon: 'fas fa-check-circle',
      color: '#d4380d'
    }
  ];

  const paymentMethods = [
    { method: 'Credit Card', percentage: 65, amount: '$29,458.52', count: 892 },
    { method: 'Digital Wallet', percentage: 25, amount: '$11,330.20', count: 343 },
    { method: 'Cash on Delivery', percentage: 8, amount: '$3,625.66', count: 110 },
    { method: 'Bank Transfer', percentage: 2, amount: '$906.42', count: 27 }
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
    switch(method) {
      case 'Credit Card': return '#1890ff';
      case 'Digital Wallet': return '#52c41a';
      case 'Cash on Delivery': return '#722ed1';
      case 'Bank Transfer': return '#fa8c16';
      default: return '#d4380d';
    }
  };

  return (
    <div className="payments-revenue-screen">
      <div className="screen-header">
        <h1>Payments & Revenue</h1>
        <div className="header-actions">
          <div className="date-filters">
            {['today', 'week', 'month', 'quarter', 'year'].map(filter => (
              <button
                key={filter}
                className={`date-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
          <button className="btn btn-primary">
            <i className="fas fa-download"></i>
            Export Report
          </button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="revenue-stats-grid">
        {revenueStats.map((stat, index) => (
          <div key={index} className="revenue-stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
                <i className={stat.icon} style={{ color: stat.color }}></i>
              </div>
              <div className="stat-period">{stat.period}</div>
            </div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                <i className={`fas fa-${stat.change.startsWith('+') ? 'arrow-up' : 'arrow-down'}`}></i>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Payment Method Distribution */}
        <div className="chart-card">
          <div className="card-header">
            <h3>Payment Method Distribution</h3>
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
          <div className="payment-methods-chart">
            <div className="donut-chart">
              <div className="donut-chart-visual">
                {paymentMethods.map((method, index) => (
                  <div
                    key={method.method}
                    className="donut-segment"
                    style={{
                      '--percentage': `${method.percentage}%`,
                      '--color': getPaymentMethodColor(method.method),
                      '--rotation': `${paymentMethods.slice(0, index).reduce((acc, m) => acc + m.percentage, 0) * 3.6}deg`
                    }}
                  ></div>
                ))}
              </div>
              <div className="donut-center">
                <div className="center-value">100%</div>
                <div className="center-label">Total</div>
              </div>
            </div>
            <div className="methods-legend">
              {paymentMethods.map(method => (
                <div key={method.method} className="method-item">
                  <div className="method-header">
                    <div className="method-color" style={{ backgroundColor: getPaymentMethodColor(method.method) }}></div>
                    <span className="method-name">{method.method}</span>
                    <span className="method-percentage">{method.percentage}%</span>
                  </div>
                  <div className="method-details">
                    <div className="method-amount">{method.amount}</div>
                    <div className="method-count">{method.count} payments</div>
                  </div>
                </div>
              ))}
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
          <div className="revenue-trend-chart">
            <div className="trend-lines">
              {[80, 65, 75, 85, 70, 90, 85, 95, 80, 75, 85, 90].map((value, index) => (
                <div key={index} className="line-point" style={{ left: `${(index * 100) / 11}%`, bottom: `${value}%` }}>
                  <div className="point-value">${(value * 50).toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div className="chart-x-axis">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
            <div className="chart-y-axis">
              <span>$50k</span>
              <span>$40k</span>
              <span>$30k</span>
              <span>$20k</span>
              <span>$10k</span>
              <span>$0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="payment-history-card">
        <div className="card-header">
          <h3>Payment History</h3>
          <div className="history-filters">
            <select className="form-control">
              <option>All Status</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Refunded</option>
              <option>Failed</option>
            </select>
            <input
              type="date"
              className="form-control"
              defaultValue="2024-01-15"
            />
            <button className="btn btn-outline">
              <i className="fas fa-filter"></i>
              Filter
            </button>
          </div>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Date & Time</th>
                <th>Order ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map(payment => (
                <tr key={payment.id}>
                  <td>
                    <div className="payment-id">PAY-{payment.id.slice(4)}</div>
                  </td>
                  <td>
                    <div className="payment-amount">{payment.amount}</div>
                  </td>
                  <td>
                    <div className="payment-method">
                      <span className="method-badge" style={{ 
                        backgroundColor: `${getPaymentMethodColor(payment.method)}20`,
                        color: getPaymentMethodColor(payment.method)
                      }}>
                        <i className={`fas fa-${payment.method === 'Credit Card' ? 'credit-card' : payment.method === 'Digital Wallet' ? 'mobile-alt' : payment.method === 'Cash on Delivery' ? 'money-bill' : 'university'}`}></i>
                        {payment.method}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-tag ${
                      payment.status === 'completed' ? 'status-success' :
                      payment.status === 'pending' ? 'status-pending' :
                      'status-cancelled'
                    }`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="payment-date">
                      <div className="date">{payment.date}</div>
                      <div className="time">{payment.time}</div>
                    </div>
                  </td>
                  <td>
                    <div className="order-id-link">{payment.id}</div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon view-btn" title="View Details">
                        <i className="fas fa-eye"></i>
                      </button>
                      {payment.status === 'pending' && (
                        <button className="btn-icon approve-btn" title="Approve Payment">
                          <i className="fas fa-check"></i>
                        </button>
                      )}
                      {payment.status !== 'refunded' && (
                        <button className="btn-icon refund-btn" title="Issue Refund">
                          <i className="fas fa-undo"></i>
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
              <span className="label">Total:</span>
              <span className="value">$1,450.34</span>
            </div>
            <div className="summary-item">
              <span className="label">Completed:</span>
              <span className="value">$1,397.89</span>
            </div>
            <div className="summary-item">
              <span className="label">Pending:</span>
              <span className="value">$15.99</span>
            </div>
            <div className="summary-item">
              <span className="label">Refunded:</span>
              <span className="value">$52.40</span>
            </div>
          </div>
          <div className="pagination">
            <button className="page-btn" disabled>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsRevenue;