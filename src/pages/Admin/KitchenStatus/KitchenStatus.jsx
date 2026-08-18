// pages/KitchenStatus.jsx
import React, { useState, useEffect } from 'react';
import './KitchenStatus.css';

const KitchenStatus = () => {
  const [kitchenStatus, setKitchenStatus] = useState(true);
  const [tempOffline, setTempOffline] = useState(false);
  const [offlineDuration, setOfflineDuration] = useState(60); // minutes
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

  // Simulate active orders update
  useEffect(() => {
    if (kitchenStatus) {
      const interval = setInterval(() => {
        // Simulate order updates
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [kitchenStatus]);

  return (
    <div className="kitchen-status-screen">
      <div className="screen-header">
        <h1>Kitchen Status Control</h1>
        <div className="header-actions">
          <div className="current-status-badge">
            <span className={`status-indicator ${kitchenStatus ? 'online' : 'offline'}`}>
              <span className="status-dot"></span>
              {kitchenStatus ? 'LIVE' : 'OFFLINE'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Status Control */}
      <div className="status-control-card">
        <div className="status-header">
          <h2>Kitchen Availability</h2>
          <div className="status-subtitle">
            Control whether the kitchen accepts new orders
          </div>
        </div>
        
        <div className="toggle-section">
          <div className="toggle-display">
            <div className={`toggle-visual ${kitchenStatus ? 'online' : 'offline'}`}>
              <div className="toggle-icon">
                <i className={`fas fa-${kitchenStatus ? 'fire' : 'pause-circle'}`}></i>
              </div>
              <div className="toggle-state">
                <div className="state-label">Kitchen is</div>
                <div className="state-value">{kitchenStatus ? 'LIVE & Accepting Orders' : 'OFFLINE'}</div>
              </div>
            </div>
            
            <div className="toggle-switch-large">
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={kitchenStatus}
                  onChange={handleToggleStatus}
                />
                <span className="slider"></span>
              </label>
              <div className="switch-labels">
                <span className={kitchenStatus ? 'active' : ''}>ON</span>
                <span className={!kitchenStatus ? 'active' : ''}>OFF</span>
              </div>
            </div>
          </div>

          {!kitchenStatus && (
            <div className="offline-message-banner">
              <i className="fas fa-info-circle"></i>
              <div className="message-content">
                <strong>Kitchen is currently offline</strong>
                <p>{offlineMessage}</p>
                <div className="message-meta">
                  <span>Reason: {offlineReason}</span>
                  <span>Started: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              </div>
            </div>
          )}

          {tempOffline && (
            <div className="offline-config-modal">
              <div className="config-header">
                <h3>Set Kitchen Offline</h3>
                <button className="close-btn" onClick={handleCancelOffline}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="config-body">
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
                      className="form-control"
                      placeholder="Custom minutes"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Reason for Going Offline</label>
                  <select 
                    className="form-control"
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
                    className="form-control"
                    rows="3"
                    value={offlineMessage}
                    onChange={(e) => setOfflineMessage(e.target.value)}
                    placeholder="Explain why the kitchen is offline..."
                  />
                </div>

                <div className="warning-message">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>New orders will not be accepted while kitchen is offline.</span>
                </div>
              </div>

              <div className="config-footer">
                <button className="btn btn-outline" onClick={handleCancelOffline}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleConfirmOffline}>
                  Confirm Offline
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Current Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="metric-content">
            <div className="metric-value">{currentMetrics.activeOrders}</div>
            <div className="metric-label">Active Orders</div>
            <div className="metric-trend positive">
              <i className="fas fa-arrow-up"></i>
              +3 from yesterday
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <i className="fas fa-hourglass-half"></i>
          </div>
          <div className="metric-content">
            <div className="metric-value">{currentMetrics.prepTime}</div>
            <div className="metric-label">Avg. Prep Time</div>
            <div className="metric-trend negative">
              <i className="fas fa-arrow-up"></i>
              +2 mins
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="metric-content">
            <div className="metric-value">{currentMetrics.completionRate}</div>
            <div className="metric-label">On-time Completion</div>
            <div className="metric-trend positive">
              <i className="fas fa-arrow-up"></i>
              +5% this week
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <i className="fas fa-tachometer-alt"></i>
          </div>
          <div className="metric-content">
            <div className="metric-value">{currentMetrics.kitchenLoad}</div>
            <div className="metric-label">Kitchen Load</div>
            <div className="metric-trend">
              <div className="load-bar">
                <div className="load-fill" style={{ width: currentMetrics.kitchenLoad }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status History */}
      <div className="history-card">
        <div className="card-header">
          <h3>Status History (Last 24 Hours)</h3>
          <button className="btn btn-outline">
            <i className="fas fa-history"></i>
            View Full History
          </button>
        </div>
        
        <div className="history-timeline">
          {statusHistory.map((record, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker">
                <div className={`marker ${record.status}`}></div>
                {index < statusHistory.length - 1 && <div className="timeline-line"></div>}
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <div className="time">{record.time}</div>
                  <div className={`status-badge ${record.status}`}>
                    {record.status === 'online' ? 'Online' : 'Offline'}
                  </div>
                </div>
                <div className="timeline-details">
                  <div className="duration">
                    <i className="fas fa-clock"></i>
                    Duration: {record.duration}
                  </div>
                  {record.reason && (
                    <div className="reason">
                      <i className="fas fa-info-circle"></i>
                      Reason: {record.reason}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-card">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-btn">
            <i className="fas fa-bell"></i>
            <span>Notify Staff</span>
          </button>
          <button className="action-btn">
            <i className="fas fa-print"></i>
            <span>Print Kitchen Report</span>
          </button>
          <button className="action-btn">
            <i className="fas fa-calendar"></i>
            <span>Schedule Offline Time</span>
          </button>
          <button className="action-btn">
            <i className="fas fa-cog"></i>
            <span>Auto-Offline Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default KitchenStatus;