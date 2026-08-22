import React, { useState } from 'react';
import {
  FaPlusCircle,
  FaFileExport,
  FaSearch,
  FaTimes,
  FaSlidersH,
  FaList,
  FaBell,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaCheck,
  FaPrint,
  FaEye,
  FaEdit,
  FaEllipsisV,
  FaPhone,
  FaMapMarkerAlt,
  FaInbox,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import './Orders.css';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Tab configuration
  const tabs = [
    { id: 'all', label: 'All Orders', count: 45, icon: FaList },
    { id: 'new', label: 'New', count: 12, icon: FaBell, color: '#3b82f6' },
    { id: 'preparing', label: 'Preparing', count: 8, icon: FaClock, color: '#f59e0b' },
    { id: 'completed', label: 'Completed', count: 22, icon: FaCheckCircle, color: '#22c55e' },
    { id: 'cancelled', label: 'Cancelled', count: 3, icon: FaTimesCircle, color: '#ef4444' },
  ];

  // Sample orders
  const orders = [
    {
      id: '#FK-2849',
      customer: 'Michael Chen',
      items: 5,
      amount: 67.20,
      payment: 'paid',
      status: 'new',
      time: '1:15 PM',
      phone: '(555) 123-4567',
      address: '123 Main St, Apt 4B'
    },
    {
      id: '#FK-2848',
      customer: 'Emma Johnson',
      items: 2,
      amount: 28.75,
      payment: 'paid',
      status: 'preparing',
      time: '12:45 PM',
      phone: '(555) 987-6543',
      address: '456 Oak Ave, Floor 2'
    },
    {
      id: '#FK-2847',
      customer: 'John Smith',
      items: 3,
      amount: 45.50,
      payment: 'paid',
      status: 'completed',
      time: '12:30 PM',
      phone: '(555) 456-7890',
      address: '789 Pine Rd, Unit 12'
    },
    {
      id: '#FK-2851',
      customer: 'David Brown',
      items: 4,
      amount: 52.40,
      payment: 'refunded',
      status: 'cancelled',
      time: '2:00 PM',
      phone: '(555) 321-0987',
      address: '321 Elm St, Suite 8'
    },
    {
      id: '#FK-2850',
      customer: 'Sarah Wilson',
      items: 1,
      amount: 15.99,
      payment: 'paid',
      status: 'completed',
      time: '1:30 PM',
      phone: '(555) 654-3210',
      address: '654 Birch Blvd, Apt 5'
    },
  ];

  // Helper functions
  const getStatusColor = (status) => {
    const colors = {
      completed: '#22c55e',
      preparing: '#f59e0b',
      new: '#3b82f6',
      cancelled: '#ef4444'
    };
    return colors[status] || '#64748b';
  };

  const getPaymentColor = (status) => {
    const colors = {
      paid: '#22c55e',
      pending: '#f59e0b',
      refunded: '#ef4444'
    };
    return colors[status] || '#64748b';
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm);
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  // Selection handlers
  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  return (
    <div className="orders-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-left">
          <h1>Orders</h1>
          <p>Manage and track all your orders in one place</p>
        </div>
        <div className="header-right">
          <button className="btn btn-primary">
            <FaPlusCircle size={16} />
            New Order
          </button>
          <button className="btn btn-outline">
            <FaFileExport size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-item">
          <span className="stat-value">45</span>
          <span className="stat-label">Total Orders</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-value" style={{ color: '#3b82f6' }}>12</span>
          <span className="stat-label">New</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-value" style={{ color: '#f59e0b' }}>8</span>
          <span className="stat-label">Preparing</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-value" style={{ color: '#22c55e' }}>22</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-value" style={{ color: '#ef4444' }}>3</span>
          <span className="stat-label">Cancelled</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="search-filters">
        <div className="search-box">
          <FaSearch className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Search by order ID, customer name, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <FaTimes size={14} />
            </button>
          )}
        </div>
        <div className="filter-group">
          <select className="filter-select">
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>This Month</option>
            <option>Custom Range</option>
          </select>
          <select className="filter-select">
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>Highest Amount</option>
            <option>Lowest Amount</option>
          </select>
          <button className="btn-filter">
            <FaSlidersH size={16} />
            More Filters
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-wrapper">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={14} />
              {tab.label}
              <span className="tab-count">{tab.count}</span>
            </button>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="orders-table-wrapper">
        {/* Table Toolbar */}
        <div className="table-toolbar">
          <div className="toolbar-left">
            <label className="select-all">
              <input
                type="checkbox"
                checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                onChange={handleSelectAll}
              />
              <span>Select All</span>
            </label>
            {selectedOrders.length > 0 && (
              <div className="bulk-actions">
                <span className="bulk-count">{selectedOrders.length} selected</span>
                <button className="bulk-btn accept">
                  <FaCheck size={12} /> Accept
                </button>
                <button className="bulk-btn reject">
                  <FaTimes size={12} /> Reject
                </button>
                <button className="bulk-btn print">
                  <FaPrint size={12} /> Print
                </button>
              </div>
            )}
          </div>
          <div className="toolbar-right">
            <span>Showing {filteredOrders.length} orders</span>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th className="col-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="col-id">Order</th>
                <th className="col-customer">Customer</th>
                <th className="col-items">Items</th>
                <th className="col-amount">Amount</th>
                <th className="col-payment">Payment</th>
                <th className="col-status">Status</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="order-row">
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                    />
                  </td>
                  <td>
                    <div className="order-info">
                      <span className="order-id">{order.id}</span>
                      <span className="order-time">{order.time}</span>
                    </div>
                  </td>
                  <td>
                    <div className="customer-info">
                      <span className="customer-name">{order.customer}</span>
                      <div className="customer-details">
                        <span>
                          <FaPhone size={12} className="icon-mr" /> {order.phone}
                        </span>
                        <span>
                          <FaMapMarkerAlt size={12} className="icon-mr" /> {order.address}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="items-count">{order.items}</td>
                  <td className="amount">{formatCurrency(order.amount)}</td>
                  <td>
                    <span
                      className="badge payment-badge"
                      style={{
                        background: `${getPaymentColor(order.payment)}15`,
                        color: getPaymentColor(order.payment)
                      }}
                    >
                      {order.payment.charAt(0).toUpperCase() + order.payment.slice(1)}
                    </span>
                  </td>
                  <td>
                    <span
                      className="badge status-badge"
                      style={{
                        background: `${getStatusColor(order.status)}15`,
                        color: getStatusColor(order.status)
                      }}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn view" title="View Details">
                        <FaEye size={14} />
                      </button>
                      <button className="action-btn edit" title="Edit Order">
                        <FaEdit size={14} />
                      </button>
                      {order.status === 'new' && (
                        <button className="action-btn accept" title="Accept Order">
                          <FaCheck size={14} />
                        </button>
                      )}
                      {(order.status === 'new' || order.status === 'preparing') && (
                        <button className="action-btn reject" title="Reject Order">
                          <FaTimes size={14} />
                        </button>
                      )}
                      <button className="action-btn more" title="More Actions">
                        <FaEllipsisV size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="8" className="empty-state">
                    <FaInbox size={48} className="empty-icon" />
                    <p>No orders found</p>
                    <span>Try adjusting your filters or search</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="table-footer">
          <div className="pagination">
            <button className="page-btn" disabled>
              <FaChevronLeft size={12} />
            </button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span className="page-dots">...</span>
            <button className="page-btn">10</button>
            <button className="page-btn">
              <FaChevronRight size={12} />
            </button>
          </div>
          <div className="page-info">
            Showing 1-{Math.min(5, filteredOrders.length)} of {filteredOrders.length} orders
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;