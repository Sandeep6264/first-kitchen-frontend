// pages/Settings.jsx
import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('kitchen-info');
  const [kitchenInfo, setKitchenInfo] = useState({
    name: 'First Kitchen - Downtown',
    phone: '+1 (555) 123-4567',
    email: 'contact@firstkitchen.com',
    address: '123 Food Street, Downtown, City 12345',
    description: 'Premium food delivery service specializing in modern cuisine.'
  });

  const [operatingHours, setOperatingHours] = useState([
    { day: 'Monday', open: '09:00', close: '22:00', enabled: true },
    { day: 'Tuesday', open: '09:00', close: '22:00', enabled: true },
    { day: 'Wednesday', open: '09:00', close: '22:00', enabled: true },
    { day: 'Thursday', open: '09:00', close: '22:00', enabled: true },
    { day: 'Friday', open: '09:00', close: '23:00', enabled: true },
    { day: 'Saturday', open: '10:00', close: '23:00', enabled: true },
    { day: 'Sunday', open: '10:00', close: '21:00', enabled: true }
  ]);

  const [taxSettings, setTaxSettings] = useState({
    taxRate: 8.5,
    serviceCharge: 5.0,
    deliveryFee: 2.99,
    minOrderAmount: 15.00
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    orderAlerts: true,
    revenueAlerts: true,
    lowStockAlerts: true,
    newCustomerAlerts: true,
    weeklyReport: true
  });

  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin User',
    email: 'admin@firstkitchen.com',
    phone: '+1 (555) 987-6543',
    role: 'Super Admin',
    language: 'en',
    timezone: 'America/New_York',
    twoFactorAuth: true
  });

  const sections = [
    { id: 'kitchen-info', label: 'Kitchen Info', icon: 'fas fa-store' },
    { id: 'operating-hours', label: 'Operating Hours', icon: 'fas fa-clock' },
    { id: 'tax-charges', label: 'Tax & Charges', icon: 'fas fa-receipt' },
    { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
    { id: 'admin-profile', label: 'Admin Profile', icon: 'fas fa-user-cog' }
  ];

  const handleOperatingHourChange = (index, field, value) => {
    const updated = [...operatingHours];
    updated[index] = { ...updated[index], [field]: value };
    setOperatingHours(updated);
  };

  const handleTaxSettingChange = (field, value) => {
    setTaxSettings(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const handleNotificationToggle = (field) => {
    setNotificationSettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleAdminProfileChange = (field, value) => {
    setAdminProfile(prev => ({ ...prev, [field]: value }));
  };

  const renderSectionContent = () => {
    switch(activeSection) {
      case 'kitchen-info':
        return (
          <div className="settings-form">
            <h3>Kitchen Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Kitchen Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={kitchenInfo.name}
                  onChange={(e) => setKitchenInfo({...kitchenInfo, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Contact Phone *</label>
                <input
                  type="tel"
                  className="form-control"
                  value={kitchenInfo.phone}
                  onChange={(e) => setKitchenInfo({...kitchenInfo, phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Contact Email *</label>
                <input
                  type="email"
                  className="form-control"
                  value={kitchenInfo.email}
                  onChange={(e) => setKitchenInfo({...kitchenInfo, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Address *</label>
                <input
                  type="text"
                  className="form-control"
                  value={kitchenInfo.address}
                  onChange={(e) => setKitchenInfo({...kitchenInfo, address: e.target.value})}
                />
              </div>
              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={kitchenInfo.description}
                  onChange={(e) => setKitchenInfo({...kitchenInfo, description: e.target.value})}
                />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary">
                Save Changes
              </button>
              <button className="btn btn-outline">
                Cancel
              </button>
            </div>
          </div>
        );

      case 'operating-hours':
        return (
          <div className="settings-form">
            <h3>Operating Hours</h3>
            <p className="section-description">
              Set your kitchen's operating hours. Orders will only be accepted during these hours.
            </p>
            
            <div className="hours-table">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Status</th>
                    <th>Opening Time</th>
                    <th>Closing Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {operatingHours.map((day, index) => (
                    <tr key={day.day}>
                      <td>
                        <div className="day-name">{day.day}</div>
                      </td>
                      <td>
                        <label className="toggle-switch-small">
                          <input
                            type="checkbox"
                            checked={day.enabled}
                            onChange={(e) => handleOperatingHourChange(index, 'enabled', e.target.checked)}
                          />
                          <span className="slider"></span>
                          <span className="toggle-label">
                            {day.enabled ? 'Open' : 'Closed'}
                          </span>
                        </label>
                      </td>
                      <td>
                        <input
                          type="time"
                          className="form-control time-input"
                          value={day.open}
                          onChange={(e) => handleOperatingHourChange(index, 'open', e.target.value)}
                          disabled={!day.enabled}
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          className="form-control time-input"
                          value={day.close}
                          onChange={(e) => handleOperatingHourChange(index, 'close', e.target.value)}
                          disabled={!day.enabled}
                        />
                      </td>
                      <td>
                        {index === 0 && (
                          <button 
                            className="btn btn-outline"
                            onClick={() => {
                              const sameHours = operatingHours.map(d => ({ ...d, open: day.open, close: day.close }));
                              setOperatingHours(sameHours);
                            }}
                          >
                            Apply to All
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="quick-actions">
              <button 
                className="btn btn-outline"
                onClick={() => setOperatingHours(hours => hours.map(h => ({ ...h, enabled: true })))}
              >
                Open All Days
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => setOperatingHours(hours => hours.map(h => ({ ...h, enabled: false })))}
              >
                Close All Days
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => setOperatingHours(hours => 
                  hours.map(h => 
                    h.day === 'Sunday' ? { ...h, enabled: false } : h
                  )
                )}
              >
                Close Sundays
              </button>
            </div>
            
            <div className="form-actions">
              <button className="btn btn-primary">
                Save Schedule
              </button>
            </div>
          </div>
        );

      case 'tax-charges':
        return (
          <div className="settings-form">
            <h3>Tax & Charges Settings</h3>
            <p className="section-description">
              Configure tax rates and additional charges for orders.
            </p>
            
            <div className="form-grid">
              <div className="form-group">
                <label>
                  Tax Rate (%)
                  <span className="hint">Applied to all orders</span>
                </label>
                <div className="input-with-suffix">
                  <input
                    type="number"
                    className="form-control"
                    value={taxSettings.taxRate}
                    onChange={(e) => handleTaxSettingChange('taxRate', e.target.value)}
                    step="0.1"
                    min="0"
                    max="100"
                  />
                  <span className="input-suffix">%</span>
                </div>
              </div>
              
              <div className="form-group">
                <label>
                  Service Charge (%)
                  <span className="hint">Optional service fee</span>
                </label>
                <div className="input-with-suffix">
                  <input
                    type="number"
                    className="form-control"
                    value={taxSettings.serviceCharge}
                    onChange={(e) => handleTaxSettingChange('serviceCharge', e.target.value)}
                    step="0.1"
                    min="0"
                    max="100"
                  />
                  <span className="input-suffix">%</span>
                </div>
              </div>
              
              <div className="form-group">
                <label>
                  Delivery Fee ($)
                  <span className="hint">Fixed delivery charge</span>
                </label>
                <div className="input-with-prefix">
                  <span className="input-prefix">$</span>
                  <input
                    type="number"
                    className="form-control"
                    value={taxSettings.deliveryFee}
                    onChange={(e) => handleTaxSettingChange('deliveryFee', e.target.value)}
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>
                  Minimum Order Amount ($)
                  <span className="hint">Minimum for delivery</span>
                </label>
                <div className="input-with-prefix">
                  <span className="input-prefix">$</span>
                  <input
                    type="number"
                    className="form-control"
                    value={taxSettings.minOrderAmount}
                    onChange={(e) => handleTaxSettingChange('minOrderAmount', e.target.value)}
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            </div>
            
            <div className="tax-preview">
              <h4>Preview</h4>
              <div className="preview-card">
                <div className="preview-item">
                  <span>Order Subtotal:</span>
                  <span>$25.00</span>
                </div>
                <div className="preview-item">
                  <span>Tax ({taxSettings.taxRate}%):</span>
                  <span>${(25 * taxSettings.taxRate / 100).toFixed(2)}</span>
                </div>
                <div className="preview-item">
                  <span>Service Charge ({taxSettings.serviceCharge}%):</span>
                  <span>${(25 * taxSettings.serviceCharge / 100).toFixed(2)}</span>
                </div>
                <div className="preview-item">
                  <span>Delivery Fee:</span>
                  <span>${taxSettings.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="preview-total">
                  <span>Total:</span>
                  <span>${(
                    25 + 
                    (25 * taxSettings.taxRate / 100) + 
                    (25 * taxSettings.serviceCharge / 100) + 
                    taxSettings.deliveryFee
                  ).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button className="btn btn-primary">
                Save Tax Settings
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="settings-form">
            <h3>Notification Settings</h3>
            <p className="section-description">
              Choose which notifications you want to receive and how.
            </p>
            
            <div className="notifications-grid">
              <div className="notification-category">
                <h4>Email Notifications</h4>
                <div className="notification-list">
                  <label className="notification-item">
                    <div className="notification-info">
                      <div className="notification-title">Order Alerts</div>
                      <div className="notification-desc">Get notified for new orders</div>
                    </div>
                    <label className="toggle-switch-small">
                      <input
                        type="checkbox"
                        checked={notificationSettings.orderAlerts}
                        onChange={() => handleNotificationToggle('orderAlerts')}
                      />
                      <span className="slider"></span>
                    </label>
                  </label>
                  
                  <label className="notification-item">
                    <div className="notification-info">
                      <div className="notification-title">Revenue Alerts</div>
                      <div className="notification-desc">Daily revenue summaries</div>
                    </div>
                    <label className="toggle-switch-small">
                      <input
                        type="checkbox"
                        checked={notificationSettings.revenueAlerts}
                        onChange={() => handleNotificationToggle('revenueAlerts')}
                      />
                      <span className="slider"></span>
                    </label>
                  </label>
                </div>
              </div>
              
              <div className="notification-category">
                <h4>SMS Notifications</h4>
                <div className="notification-list">
                  <label className="notification-item">
                    <div className="notification-info">
                      <div className="notification-title">Order Alerts</div>
                      <div className="notification-desc">Get SMS for new orders</div>
                    </div>
                    <label className="toggle-switch-small">
                      <input
                        type="checkbox"
                        checked={notificationSettings.orderAlerts && notificationSettings.smsNotifications}
                        onChange={() => handleNotificationToggle('smsNotifications')}
                      />
                      <span className="slider"></span>
                    </label>
                  </label>
                </div>
              </div>
              
              <div className="notification-category">
                <h4>Alert Types</h4>
                <div className="notification-list">
                  <label className="notification-item">
                    <div className="notification-info">
                      <div className="notification-title">Low Stock Alerts</div>
                      <div className="notification-desc">When items are running low</div>
                    </div>
                    <label className="toggle-switch-small">
                      <input
                        type="checkbox"
                        checked={notificationSettings.lowStockAlerts}
                        onChange={() => handleNotificationToggle('lowStockAlerts')}
                      />
                      <span className="slider"></span>
                    </label>
                  </label>
                  
                  <label className="notification-item">
                    <div className="notification-info">
                      <div className="notification-title">New Customer Alerts</div>
                      <div className="notification-desc">When new customers register</div>
                    </div>
                    <label className="toggle-switch-small">
                      <input
                        type="checkbox"
                        checked={notificationSettings.newCustomerAlerts}
                        onChange={() => handleNotificationToggle('newCustomerAlerts')}
                      />
                      <span className="slider"></span>
                    </label>
                  </label>
                  
                  <label className="notification-item">
                    <div className="notification-info">
                      <div className="notification-title">Weekly Reports</div>
                      <div className="notification-desc">Weekly performance summaries</div>
                    </div>
                    <label className="toggle-switch-small">
                      <input
                        type="checkbox"
                        checked={notificationSettings.weeklyReport}
                        onChange={() => handleNotificationToggle('weeklyReport')}
                      />
                      <span className="slider"></span>
                    </label>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="notification-frequency">
              <h4>Notification Frequency</h4>
              <div className="frequency-options">
                <label className="frequency-option">
                  <input type="radio" name="frequency" defaultChecked />
                  <span className="option-label">Real-time</span>
                  <span className="option-desc">Immediate notifications</span>
                </label>
                <label className="frequency-option">
                  <input type="radio" name="frequency" />
                  <span className="option-label">Every 15 minutes</span>
                  <span className="option-desc">Batched notifications</span>
                </label>
                <label className="frequency-option">
                  <input type="radio" name="frequency" />
                  <span className="option-label">Hourly Digest</span>
                  <span className="option-desc">Hourly summary</span>
                </label>
              </div>
            </div>
            
            <div className="form-actions">
              <button className="btn btn-primary">
                Save Notification Settings
              </button>
            </div>
          </div>
        );

      case 'admin-profile':
        return (
          <div className="settings-form">
            <h3>Admin Profile</h3>
            
            <div className="profile-header">
              <div className="profile-avatar">
                <div className="avatar-placeholder">
                  {adminProfile.name.charAt(0)}
                </div>
                <button className="avatar-change">
                  <i className="fas fa-camera"></i>
                </button>
              </div>
              <div className="profile-info">
                <h4>{adminProfile.name}</h4>
                <div className="profile-role">{adminProfile.role}</div>
                <div className="profile-email">{adminProfile.email}</div>
              </div>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={adminProfile.name}
                  onChange={(e) => handleAdminProfileChange('name', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  className="form-control"
                  value={adminProfile.email}
                  onChange={(e) => handleAdminProfileChange('email', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  value={adminProfile.phone}
                  onChange={(e) => handleAdminProfileChange('phone', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>Language</label>
                <select
                  className="form-control"
                  value={adminProfile.language}
                  onChange={(e) => handleAdminProfileChange('language', e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Timezone</label>
                <select
                  className="form-control"
                  value={adminProfile.timezone}
                  onChange={(e) => handleAdminProfileChange('timezone', e.target.value)}
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT)</option>
                </select>
              </div>
            </div>
            
            <div className="security-settings">
              <h4>Security Settings</h4>
              <div className="security-item">
                <div className="security-info">
                  <div className="security-title">Two-Factor Authentication</div>
                  <div className="security-desc">Add an extra layer of security to your account</div>
                </div>
                <label className="toggle-switch-small">
                  <input
                    type="checkbox"
                    checked={adminProfile.twoFactorAuth}
                    onChange={() => handleAdminProfileChange('twoFactorAuth', !adminProfile.twoFactorAuth)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="security-actions">
                <button className="btn btn-outline">
                  <i className="fas fa-key"></i>
                  Change Password
                </button>
                <button className="btn btn-outline">
                  <i className="fas fa-shield-alt"></i>
                  View Login History
                </button>
              </div>
            </div>
            
            <div className="form-actions">
              <button className="btn btn-primary">
                Update Profile
              </button>
              <button className="btn btn-outline">
                Discard Changes
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings-screen">
      <div className="screen-header">
        <h1>Settings</h1>
        <div className="header-actions">
          <button className="btn btn-primary">
            <i className="fas fa-save"></i>
            Save All Changes
          </button>
        </div>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <div className="sidebar-header">
            <h3>Settings</h3>
          </div>
          <nav className="settings-nav">
            {sections.map(section => (
              <button
                key={section.id}
                className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <i className={section.icon}></i>
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="settings-content">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;