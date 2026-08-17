// pages/Users.jsx
import React, { useState } from 'react';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      totalOrders: 24,
      totalSpent: 548.50,
      status: 'active',
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Emma Johnson',
      email: 'emma.j@email.com',
      phone: '+1 (555) 987-6543',
      totalOrders: 12,
      totalSpent: 289.75,
      status: 'active',
      joinDate: '2023-03-22'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.c@email.com',
      phone: '+1 (555) 456-7890',
      totalOrders: 8,
      totalSpent: 156.80,
      status: 'inactive',
      joinDate: '2023-05-10'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.w@email.com',
      phone: '+1 (555) 321-0987',
      totalOrders: 31,
      totalSpent: 842.90,
      status: 'active',
      joinDate: '2022-11-05'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.b@email.com',
      phone: '+1 (555) 654-3210',
      totalOrders: 5,
      totalSpent: 98.40,
      status: 'active',
      joinDate: '2023-07-18'
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      email: 'lisa.a@email.com',
      phone: '+1 (555) 789-0123',
      totalOrders: 18,
      totalSpent: 425.60,
      status: 'active',
      joinDate: '2023-02-28'
    },
    {
      id: 7,
      name: 'Robert Taylor',
      email: 'robert.t@email.com',
      phone: '+1 (555) 234-5678',
      totalOrders: 3,
      totalSpent: 67.20,
      status: 'inactive',
      joinDate: '2023-08-14'
    },
    {
      id: 8,
      name: 'Jessica Martinez',
      email: 'jessica.m@email.com',
      phone: '+1 (555) 876-5432',
      totalOrders: 42,
      totalSpent: 1248.30,
      status: 'active',
      joinDate: '2022-09-30'
    }
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleToggleStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  return (
    <div className="users-screen">
      <div className="screen-header">
        <h1>Users & Customers</h1>
        <div className="header-actions">
          <button className="btn btn-primary">
            <i className="fas fa-user-plus"></i>
            Add User
          </button>
          <button className="btn btn-secondary">
            <i className="fas fa-download"></i>
            Export Users
          </button>
        </div>
      </div>

      <div className="users-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{users.length}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{users.filter(u => u.status === 'active').length}</div>
            <div className="stat-label">Active Users</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-shopping-bag"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{users.reduce((sum, user) => sum + user.totalOrders, 0)}</div>
            <div className="stat-label">Total Orders</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">${users.reduce((sum, user) => sum + user.totalSpent, 0).toFixed(2)}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search users by name, email, or phone..." />
        </div>
        <div className="filter-controls">
          <select className="form-control">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select className="form-control">
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="orders">Total Orders</option>
            <option value="spent">Total Spent</option>
            <option value="recent">Most Recent</option>
          </select>
          <button className="btn btn-outline">
            <i className="fas fa-filter"></i>
            Filter
          </button>
        </div>
      </div>

      <div className="users-table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Contact</th>
              <th>Total Orders</th>
              <th>Total Spent</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">
                      {user.name.charAt(0)}
                    </div>
                    <div className="user-details">
                      <div className="user-name">{user.name}</div>
                      <div className="user-id">ID: {user.id.toString().padStart(4, '0')}</div>
                      <div className="user-join">Joined: {user.joinDate}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="contact-info">
                    <div className="contact-email">
                      <i className="fas fa-envelope"></i>
                      {user.email}
                    </div>
                    <div className="contact-phone">
                      <i className="fas fa-phone"></i>
                      {user.phone}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="orders-count">{user.totalOrders} orders</div>
                </td>
                <td>
                  <div className="total-spent">${user.totalSpent.toFixed(2)}</div>
                </td>
                <td>
                  <span className={`status-tag ${user.status === 'active' ? 'status-success' : 'status-cancelled'}`}>
                    {user.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-icon view-btn"
                      onClick={() => setSelectedUser(user)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      className={`btn-icon ${user.status === 'active' ? 'disable-btn' : 'enable-btn'}`}
                      onClick={() => handleToggleStatus(user.id)}
                    >
                      <i className={`fas fa-${user.status === 'active' ? 'user-slash' : 'user-check'}`}></i>
                    </button>
                    <button className="btn-icon edit-btn">
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="modal-overlay">
          <div className="modal user-detail-modal">
            <div className="modal-header">
              <h2>User Profile</h2>
              <button className="modal-close" onClick={() => setSelectedUser(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="user-profile-header">
                <div className="profile-avatar">
                  {selectedUser.name.charAt(0)}
                </div>
                <div className="profile-info">
                  <h3>{selectedUser.name}</h3>
                  <div className="profile-stats">
                    <div className="stat">
                      <div className="stat-value">{selectedUser.totalOrders}</div>
                      <div className="stat-label">Total Orders</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value">${selectedUser.totalSpent.toFixed(2)}</div>
                      <div className="stat-label">Total Spent</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value">{selectedUser.joinDate}</div>
                      <div className="stat-label">Member Since</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="user-details-grid">
                <div className="detail-group">
                  <label>Email</label>
                  <div className="detail-value">{selectedUser.email}</div>
                </div>
                <div className="detail-group">
                  <label>Phone</label>
                  <div className="detail-value">{selectedUser.phone}</div>
                </div>
                <div className="detail-group">
                  <label>Status</label>
                  <div className="detail-value">
                    <span className={`status-tag ${selectedUser.status === 'active' ? 'status-success' : 'status-cancelled'}`}>
                      {selectedUser.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="detail-group">
                  <label>User ID</label>
                  <div className="detail-value">{selectedUser.id.toString().padStart(4, '0')}</div>
                </div>
              </div>
              
              <div className="user-actions">
                <button className="btn btn-outline">
                  <i className="fas fa-envelope"></i>
                  Send Email
                </button>
                <button className="btn btn-primary">
                  <i className="fas fa-edit"></i>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;