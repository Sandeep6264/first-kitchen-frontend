// pages/Orders.jsx
import React, { useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrders, setSelectedOrders] = useState([]);

  const tabs = [
    { id: 'all', label: 'All Orders', count: 45 },
    { id: 'new', label: 'New', count: 12 },
    { id: 'preparing', label: 'Preparing', count: 8 },
    { id: 'completed', label: 'Completed', count: 22 },
    { id: 'cancelled', label: 'Cancelled', count: 3 },
  ];

  const orders = [
    { 
      id: '#FK-2849', 
      customer: 'Michael Chen', 
      items: 5, 
      amount: '$67.20', 
      paymentStatus: 'paid', 
      orderStatus: 'new',
      time: '1:15 PM',
      customerPhone: '+1 (555) 123-4567',
      deliveryAddress: '123 Main St, Apt 4B'
    },
    { 
      id: '#FK-2848', 
      customer: 'Emma Johnson', 
      items: 2, 
      amount: '$28.75', 
      paymentStatus: 'paid', 
      orderStatus: 'preparing',
      time: '12:45 PM',
      customerPhone: '+1 (555) 987-6543',
      deliveryAddress: '456 Oak Ave, Floor 2'
    },
    { 
      id: '#FK-2847', 
      customer: 'John Smith', 
      items: 3, 
      amount: '$45.50', 
      paymentStatus: 'paid', 
      orderStatus: 'completed',
      time: '12:30 PM',
      customerPhone: '+1 (555) 456-7890',
      deliveryAddress: '789 Pine Rd, Unit 12'
    },
    { 
      id: '#FK-2851', 
      customer: 'David Brown', 
      items: 4, 
      amount: '$52.40', 
      paymentStatus: 'refunded', 
      orderStatus: 'cancelled',
      time: '2:00 PM',
      customerPhone: '+1 (555) 321-0987',
      deliveryAddress: '321 Elm St, Suite 8'
    },
    { 
      id: '#FK-2850', 
      customer: 'Sarah Wilson', 
      items: 1, 
      amount: '$15.99', 
      paymentStatus: 'paid', 
      orderStatus: 'completed',
      time: '1:30 PM',
      customerPhone: '+1 (555) 654-3210',
      deliveryAddress: '654 Birch Blvd, Apt 5'
    },
  ];

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map(order => order.id));
    }
  };

  return (
    <div className="orders-screen">
      <div className="screen-header">
        <h1>Order Management</h1>
        <div className="header-actions">
          <button className="btn btn-primary">
            <i className="fas fa-plus"></i>
            New Order
          </button>
          <button className="btn btn-secondary">
            <i className="fas fa-download"></i>
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-card">
        <div className="filters-grid">
          <div className="filter-group">
            <label>Date Range</label>
            <select className="form-control">
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Sort By</label>
            <select className="form-control">
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Amount: High to Low</option>
              <option>Amount: Low to High</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Search</label>
            <div className="search-wrapper">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Order ID, customer name, phone..."
              />
            </div>
          </div>
          <div className="filter-group">
            <label>&nbsp;</label>
            <button className="btn btn-primary" style={{ marginTop: '8px' }}>
              <i className="fas fa-filter"></i>
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="orders-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <span className="tab-badge">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="orders-table-card">
        <div className="table-header">
          <div className="table-actions">
            <div className="checkbox-wrapper">
              <input 
                type="checkbox" 
                id="select-all"
                checked={selectedOrders.length === orders.length}
                onChange={handleSelectAll}
              />
              <label htmlFor="select-all">Select All</label>
            </div>
            {selectedOrders.length > 0 && (
              <div className="selected-actions">
                <span className="selected-count">{selectedOrders.length} selected</span>
                <button className="btn btn-outline">
                  <i className="fas fa-check"></i>
                  Accept
                </button>
                <button className="btn btn-outline">
                  <i className="fas fa-times"></i>
                  Reject
                </button>
                <button className="btn btn-outline">
                  <i className="fas fa-print"></i>
                  Print
                </button>
              </div>
            )}
          </div>
          <div className="table-stats">
            Showing {orders.length} orders
          </div>
        </div>

        <div className="table-container">
          <table className="data-table orders-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedOrders.length === orders.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Payment Status</th>
                <th>Order Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                    />
                  </td>
                  <td>
                    <div className="order-id-cell">
                      <strong>{order.id}</strong>
                      <div className="order-time">{order.time}</div>
                    </div>
                  </td>
                  <td>
                    <div className="customer-cell">
                      <div className="customer-name">{order.customer}</div>
                      <div className="customer-info">
                        <i className="fas fa-phone"></i>
                        {order.customerPhone}
                      </div>
                      <div className="customer-address">
                        <i className="fas fa-map-marker-alt"></i>
                        {order.deliveryAddress}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="items-count">{order.items} items</div>
                  </td>
                  <td>
                    <div className="amount-cell">{order.amount}</div>
                  </td>
                  <td>
                    <span className={`status-tag ${
                      order.paymentStatus === 'paid' ? 'status-success' :
                      order.paymentStatus === 'pending' ? 'status-pending' :
                      'status-cancelled'
                    }`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td>
                    <span className={`status-tag ${
                      order.orderStatus === 'completed' ? 'status-success' :
                      order.orderStatus === 'preparing' ? 'status-pending' :
                      order.orderStatus === 'new' ? 'status-info' :
                      'status-cancelled'
                    }`}>
                      {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon view-btn" title="View Order">
                        <i className="fas fa-eye"></i>
                      </button>
                      {order.orderStatus === 'new' && (
                        <button className="btn-icon accept-btn" title="Accept Order">
                          <i className="fas fa-check"></i>
                        </button>
                      )}
                      {order.orderStatus === 'new' || order.orderStatus === 'preparing' ? (
                        <button className="btn-icon reject-btn" title="Reject Order">
                          <i className="fas fa-times"></i>
                        </button>
                      ) : null}
                      <button className="btn-icon more-btn" title="More Actions">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <div className="pagination">
            <button className="page-btn" disabled>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span className="page-dots">...</span>
            <button className="page-btn">10</button>
            <button className="page-btn">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="page-info">
            Showing 1-5 of 45 orders
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;