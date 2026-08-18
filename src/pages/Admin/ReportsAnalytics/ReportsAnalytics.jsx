// pages/ReportsAnalytics.jsx
import React, { useState } from 'react';
import './ReportsAnalytics.css';

const ReportsAnalytics = () => {
  const [dateRange, setDateRange] = useState('thisMonth');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-31');
  const [reportType, setReportType] = useState('sales');
  const [exportFormat, setExportFormat] = useState('csv');

  const quickStats = [
    { label: 'Total Revenue', value: '$45,320.80', change: '+15.2%', trend: 'up' },
    { label: 'Total Orders', value: '1,395', change: '+8.5%', trend: 'up' },
    { label: 'Avg. Order Value', value: '$32.45', change: '+4.2%', trend: 'up' },
    { label: 'New Customers', value: '142', change: '+12.7%', trend: 'up' },
    { label: 'Customer Retention', value: '84.5%', change: '+2.3%', trend: 'up' },
    { label: 'Cancellation Rate', value: '5.2%', change: '-1.1%', trend: 'down' }
  ];

  const salesByCategory = [
    { category: 'Burgers', revenue: 12450.80, orders: 384, change: '+12.5%' },
    { category: 'Pizza', revenue: 9870.50, orders: 298, change: '+8.2%' },
    { category: 'Main Course', revenue: 8560.30, orders: 245, change: '+15.7%' },
    { category: 'Desserts', revenue: 5240.90, orders: 186, change: '+22.3%' },
    { category: 'Beverages', revenue: 4120.40, orders: 156, change: '+5.4%' },
    { category: 'Salads', revenue: 3878.90, orders: 126, change: '+7.8%' }
  ];

  const topSellingItems = [
    { name: 'Classic Cheeseburger', category: 'Burgers', sales: 142, revenue: 1843.58 },
    { name: 'Margherita Pizza', category: 'Pizza', sales: 89, revenue: 1423.11 },
    { name: 'Chocolate Lava Cake', category: 'Desserts', sales: 105, revenue: 943.95 },
    { name: 'Grilled Salmon', category: 'Main Course', sales: 67, revenue: 1674.33 },
    { name: 'Fresh Lemonade', category: 'Beverages', sales: 156, revenue: 778.44 }
  ];

  const getMaxRevenue = () => Math.max(...salesByCategory.map(item => item.revenue));

  return (
    <div className="reports-analytics-screen">
      <div className="screen-header">
        <h1>Reports & Analytics</h1>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => {/* Export logic */}}>
            <i className="fas fa-download"></i>
            Export Report
          </button>
          <div className="export-format">
            <select 
              className="form-control"
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
            >
              <option value="csv">CSV</option>
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-card">
        <div className="filters-header">
          <h3>Report Filters</h3>
          <button className="btn btn-outline">
            <i className="fas fa-redo"></i>
            Reset Filters
          </button>
        </div>
        
        <div className="filters-grid">
          <div className="filter-group">
            <label>Date Range</label>
            <select 
              className="form-control"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="thisWeek">This Week</option>
              <option value="lastWeek">Last Week</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="thisQuarter">This Quarter</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {dateRange === 'custom' && (
            <>
              <div className="filter-group">
                <label>Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label>End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="filter-group">
            <label>Report Type</label>
            <select 
              className="form-control"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="sales">Sales Report</option>
              <option value="orders">Orders Report</option>
              <option value="customers">Customers Report</option>
              <option value="inventory">Inventory Report</option>
              <option value="performance">Performance Report</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Category Filter</label>
            <select className="form-control">
              <option value="">All Categories</option>
              <option value="burgers">Burgers</option>
              <option value="pizza">Pizza</option>
              <option value="main-course">Main Course</option>
              <option value="desserts">Desserts</option>
              <option value="beverages">Beverages</option>
              <option value="salads">Salads</option>
            </select>
          </div>
        </div>

        <div className="filters-actions">
          <button className="btn btn-primary">
            <i className="fas fa-chart-bar"></i>
            Generate Report
          </button>
          <button className="btn btn-outline">
            <i className="fas fa-eye"></i>
            Preview Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats-grid">
        {quickStats.map((stat, index) => (
          <div key={index} className="quick-stat-card">
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-change ${stat.trend === 'up' ? 'positive' : 'negative'}`}>
              <i className={`fas fa-arrow-${stat.trend}`}></i>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Sales by Category Chart */}
        <div className="chart-card wide">
          <div className="card-header">
            <h3>Sales by Category</h3>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color revenue"></span>
                <span>Revenue</span>
              </div>
              <div className="legend-item">
                <span className="legend-color orders"></span>
                <span>Orders</span>
              </div>
            </div>
          </div>
          <div className="category-chart">
            <div className="chart-y-axis">
              <span>${(getMaxRevenue() / 1000).toFixed(0)}k</span>
              <span>${(getMaxRevenue() * 0.75 / 1000).toFixed(0)}k</span>
              <span>${(getMaxRevenue() * 0.5 / 1000).toFixed(0)}k</span>
              <span>${(getMaxRevenue() * 0.25 / 1000).toFixed(0)}k</span>
              <span>$0</span>
            </div>
            <div className="chart-bars">
              {salesByCategory.map((item, index) => {
                const revenueHeight = (item.revenue / getMaxRevenue()) * 100;
                const ordersHeight = (item.orders / Math.max(...salesByCategory.map(i => i.orders))) * 80;
                
                return (
                  <div key={index} className="bar-group">
                    <div className="bar-wrapper">
                      <div 
                        className="bar revenue-bar" 
                        style={{ height: `${revenueHeight}%` }}
                        title={`Revenue: $${item.revenue.toFixed(2)}`}
                      >
                        <div className="bar-value">${(item.revenue / 1000).toFixed(1)}k</div>
                      </div>
                      <div 
                        className="bar orders-bar" 
                        style={{ height: `${ordersHeight}%` }}
                        title={`Orders: ${item.orders}`}
                      ></div>
                    </div>
                    <div className="bar-label">{item.category}</div>
                    <div className="bar-change">{item.change}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Orders Over Time */}
        <div className="chart-card">
          <div className="card-header">
            <h3>Orders Over Time</h3>
            <select className="period-select">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <div className="orders-chart">
            <div className="chart-lines">
              {[120, 95, 140, 110, 160, 135, 180, 155, 200, 175, 220, 195].map((value, index) => (
                <div key={index} className="line-point" style={{ left: `${(index * 100) / 11}%`, bottom: `${(value / 250) * 100}%` }}>
                  <div className="point-value">{value}</div>
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
          </div>
        </div>
      </div>

      {/* Top Selling Items */}
      <div className="top-items-card">
        <div className="card-header">
          <h3>Top Selling Items</h3>
          <button className="btn btn-outline">
            View All Items
          </button>
        </div>
        <div className="items-table">
          <table className="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Total Sales</th>
                <th>Revenue</th>
                <th>Trend</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {topSellingItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="item-info">
                      <div className="item-rank">{index + 1}</div>
                      <div className="item-details">
                        <div className="item-name">{item.name}</div>
                        <div className="item-id">ID: {index + 1001}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="category-tag">{item.category}</span>
                  </td>
                  <td>
                    <div className="sales-count">{item.sales} sales</div>
                  </td>
                  <td>
                    <div className="revenue-amount">${item.revenue.toFixed(2)}</div>
                  </td>
                  <td>
                    <div className="trend-indicator positive">
                      <i className="fas fa-arrow-up"></i>
                      <span>+12.5%</span>
                    </div>
                  </td>
                  <td>
                    <button className="btn-icon">
                      <i className="fas fa-chart-line"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Summary */}
      <div className="summary-card">
        <div className="summary-header">
          <h3>Report Summary</h3>
          <div className="report-info">
            <span className="info-item">
              <i className="fas fa-calendar"></i>
              Date Range: {startDate} to {endDate}
            </span>
            <span className="info-item">
              <i className="fas fa-clock"></i>
              Generated: {new Date().toLocaleString()}
            </span>
          </div>
        </div>
        <div className="summary-content">
          <div className="summary-stats">
            <div className="summary-stat">
              <div className="stat-label">Total Revenue</div>
              <div className="stat-value">$45,320.80</div>
              <div className="stat-change positive">+15.2% vs previous period</div>
            </div>
            <div className="summary-stat">
              <div className="stat-label">Total Orders</div>
              <div className="stat-value">1,395</div>
              <div className="stat-change positive">+8.5% vs previous period</div>
            </div>
            <div className="summary-stat">
              <div className="stat-label">Avg. Order Value</div>
              <div className="stat-value">$32.45</div>
              <div className="stat-change positive">+4.2% vs previous period</div>
            </div>
            <div className="summary-stat">
              <div className="stat-label">Best Performing Category</div>
              <div className="stat-value">Desserts</div>
              <div className="stat-change positive">+22.3% growth</div>
            </div>
          </div>
          <div className="summary-actions">
            <button className="btn btn-primary">
              <i className="fas fa-download"></i>
              Download Full Report
            </button>
            <button className="btn btn-outline">
              <i className="fas fa-share"></i>
              Share Report
            </button>
            <button className="btn btn-outline">
              <i className="fas fa-print"></i>
              Print Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;