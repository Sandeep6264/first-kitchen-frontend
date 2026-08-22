import React, { useState, useEffect } from 'react';
import {
  FaFire,
  FaPauseCircle,
  FaTimes,
  FaClock,
  FaHourglassHalf,
  FaCheckCircle,
  FaTachometerAlt,
  FaHistory,
  FaBell,
  FaPrint,
  FaCalendar,
  FaCog,
  FaInfoCircle,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
  FaCircle,
  FaPlayCircle,
  FaStopCircle,
  FaUtensils,
  FaUsers,
  FaStar,
  FaChartBar
} from 'react-icons/fa';
import './KitchenStatus.css';

const KitchenStatus = () => {
  const [kitchenStatus, setKitchenStatus] = useState(true);
  const [tempOffline, setTempOffline] = useState(false);
  const [offlineDuration, setOfflineDuration] = useState(60);
  const [offlineReason, setOfflineReason] = useState('maintenance');
  const [offlineMessage, setOfflineMessage] = useState('Kitchen is currently undergoing maintenance. We apologize for the inconvenience.');

  const statusHistory = [
    { time: '2:45 PM', status: 'online', duration: '3h 15m', reason: '' },
    { time: '11:30 AM', status: 'offline', duration: '45m', reason: 'Equipment Maintenance' },
    { time: '10:45 AM', status: 'online', duration: '45m', reason: '' },
    { time: '9:00 AM', status: 'offline', duration: '1h 45m', reason: 'Morning Prep' },
    { time: '7:15 AM', status: 'online', duration: '1h 45m', reason: '' },
    { time: 'Yesterday, 10:00 PM', status: 'offline', duration: '9h 15m', reason: 'Closed' },
  ];

  const currentMetrics = {
    activeOrders: 18,
    prepTime: '22 mins',
    completionRate: '92%',
    kitchenLoad: '75%'
  };

  const handleToggleStatus = () => {
    if (kitchenStatus) {
      setTempOffline(true);
    } else {
      setKitchenStatus(true);
      setTempOffline(false);
    }
  };

  const handleConfirmOffline = () => {
    setKitchenStatus(false);
    setTempOffline(false);
  };

  const handleCancelOffline = () => {
    setTempOffline(false);
  };

  useEffect(() => {
    if (kitchenStatus) {
      const interval = setInterval(() => {
        // Simulate order updates
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [kitchenStatus]);

  return (
    <div className="kitchen-status">
      {/* Header */}
      <div className="page-header">
        <div className="header-left">
          <h1>Kitchen Status</h1>
          <p>Monitor and control your kitchen operations</p>
        </div>
        <div className="header-right">
          <div className="status-badge">
            <span className={`status-indicator ${kitchenStatus ? 'online' : 'offline'}`}>
              <FaCircle className="status-dot" size={10} />
              {kitchenStatus ? 'LIVE' : 'OFFLINE'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Status Control */}
      <div className="status-control">
        <div className="control-header">
          <h2>Kitchen Availability</h2>
          <p className="control-subtitle">Control whether the kitchen accepts new orders</p>
        </div>

        <div className="control-body">
          <div className="toggle-section">
            <div className={`status-display ${kitchenStatus ? 'online' : 'offline'}`}>
              <div className="status-icon">
                {kitchenStatus ? <FaFire size={32} /> : <FaPauseCircle size={32} />}
              </div>
              <div className="status-text">
                <span className="status-label">Kitchen is</span>
                <span className="status-value">
                  {kitchenStatus ? 'LIVE & Accepting Orders' : 'OFFLINE'}
                </span>
              </div>
            </div>

            <div className="toggle-wrapper">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={kitchenStatus}
                  onChange={handleToggleStatus}
                />
                <span className="toggle-slider"></span>
              </label>
              <div className="toggle-labels">
                <span className={kitchenStatus ? 'active' : ''}>ON</span>
                <span className={!kitchenStatus ? 'active' : ''}>OFF</span>
              </div>
            </div>
          </div>

          {!kitchenStatus && (
            <div className="offline-banner">
              <FaInfoCircle className="banner-icon" size={20} />
              <div className="banner-content">
                <strong>Kitchen is currently offline</strong>
                <p>{offlineMessage}</p>
                <div className="banner-meta">
                  <span>Reason: {offlineReason}</span>
                  <span>Started: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
          )}

          {tempOffline && (
            <div className="offline-modal">
              <div className="modal-header">
                <h3>Set Kitchen Offline</h3>
                <button className="modal-close" onClick={handleCancelOffline}>
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label>Duration (minutes)</label>
                  <div className="duration-options">
                    {[15, 30, 60, 120, 240].map(minutes => (
                      <button
                        key={minutes}
                        type="button"
                        className={`duration-btn ${offlineDuration === minutes ? 'active' : ''}`}
                        onClick={() => setOfflineDuration(minutes)}
                      >
                        {minutes} min
                      </button>
                    ))}
                  </div>
                  <div className="custom-duration">
                    <input
                      type="number"
                      min="1"
                      value={offlineDuration}
                      onChange={(e) => setOfflineDuration(parseInt(e.target.value) || 1)}
                      className="form-input"
                      placeholder="Custom minutes"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Reason for Going Offline</label>
                  <select
                    className="form-select"
                    value={offlineReason}
                    onChange={(e) => setOfflineReason(e.target.value)}
                  >
                    <option value="maintenance">Maintenance</option>
                    <option value="staffing">Staffing Issue</option>
                    <option value="equipment">Equipment Problem</option>
                    <option value="inventory">Inventory Restock</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="break">Staff Break</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message to Customers (Optional)</label>
                  <textarea
                    className="form-textarea"
                    rows="3"
                    value={offlineMessage}
                    onChange={(e) => setOfflineMessage(e.target.value)}
                    placeholder="Explain why the kitchen is offline..."
                  />
                </div>

                <div className="warning-box">
                  <FaExclamationTriangle size={16} />
                  <span>New orders will not be accepted while kitchen is offline.</span>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-cancel" onClick={handleCancelOffline}>
                  Cancel
                </button>
                <button className="btn-confirm" onClick={handleConfirmOffline}>
                  Confirm Offline
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
            <FaClock size={24} />
          </div>
          <div className="metric-info">
            <div className="metric-value">{currentMetrics.activeOrders}</div>
            <div className="metric-label">Active Orders</div>
            <div className="metric-trend positive">
              <FaArrowUp size={12} />
              +3 from yesterday
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
            <FaHourglassHalf size={24} />
          </div>
          <div className="metric-info">
            <div className="metric-value">{currentMetrics.prepTime}</div>
            <div className="metric-label">Avg. Prep Time</div>
            <div className="metric-trend negative">
              <FaArrowUp size={12} />
              +2 mins
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: '#f0fdf4', color: '#22c55e' }}>
            <FaCheckCircle size={24} />
          </div>
          <div className="metric-info">
            <div className="metric-value">{currentMetrics.completionRate}</div>
            <div className="metric-label">On-time Completion</div>
            <div className="metric-trend positive">
              <FaArrowUp size={12} />
              +5% this week
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: '#fef2ef', color: '#E54304' }}>
            <FaTachometerAlt size={24} />
          </div>
          <div className="metric-info">
            <div className="metric-value">{currentMetrics.kitchenLoad}</div>
            <div className="metric-label">Kitchen Load</div>
            <div className="load-bar">
              <div className="load-fill" style={{ width: currentMetrics.kitchenLoad }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Status History */}
      <div className="history-card">
        <div className="card-header">
          <h3>Status History</h3>
          <button className="btn-outline">
            <FaHistory size={14} />
            View All
          </button>
        </div>

        <div className="timeline">
          {statusHistory.map((record, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker">
                <div className={`marker ${record.status}`}>
                  {record.status === 'online' ? <FaPlayCircle size={12} /> : <FaStopCircle size={12} />}
                </div>
                {index < statusHistory.length - 1 && <div className="timeline-line"></div>}
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-time">{record.time}</span>
                  <span className={`status-tag ${record.status}`}>
                    {record.status === 'online' ? 'Online' : 'Offline'}
                  </span>
                </div>
                <div className="timeline-details">
                  <span><FaClock size={12} /> Duration: {record.duration}</span>
                  {record.reason && (
                    <span><FaInfoCircle size={12} /> Reason: {record.reason}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <div className="quick-actions-header">
          <h3>Quick Actions</h3>
        </div>
        <div className="quick-actions-grid">
          <button className="quick-action-btn">
            <div className="quick-action-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
              <FaBell size={20} />
            </div>
            <span>Notify Staff</span>
          </button>
          <button className="quick-action-btn">
            <div className="quick-action-icon" style={{ background: '#f0fdf4', color: '#22c55e' }}>
              <FaPrint size={20} />
            </div>
            <span>Print Report</span>
          </button>
          <button className="quick-action-btn">
            <div className="quick-action-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
              <FaCalendar size={20} />
            </div>
            <span>Schedule Offline</span>
          </button>
          <button className="quick-action-btn">
            <div className="quick-action-icon" style={{ background: '#fef2ef', color: '#E54304' }}>
              <FaCog size={20} />
            </div>
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default KitchenStatus;