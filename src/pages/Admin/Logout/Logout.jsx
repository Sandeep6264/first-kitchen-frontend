// pages/Logout.jsx
import React, { useState, useEffect } from 'react';
import './Logout.css';

const Logout = () => {
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Simulate logout process
    setTimeout(() => {
      window.location.href = '/login'; // Redirect to login page in real app
    }, 2000);
  };

  const handleCancel = () => {
    // In a real app, this would navigate back to previous page
    window.history.back();
  };

  useEffect(() => {
    if (isLoggingOut) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLoggingOut]);

  if (isLoggingOut) {
    return (
      <div className="logout-screen">
        <div className="logout-progress">
          <div className="progress-header">
            <div className="progress-icon">
              <i className="fas fa-sign-out-alt"></i>
            </div>
            <h1>Logging Out...</h1>
            <p>Please wait while we securely log you out</p>
          </div>
          
          <div className="progress-indicator">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              ></div>
            </div>
            <div className="progress-text">
              <span>Redirecting in {countdown} seconds</span>
            </div>
          </div>
          
          <div className="logout-message">
            <div className="message-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <div className="message-content">
              <h3>Secure Logout</h3>
              <p>Your session is being cleared and you will be redirected to the login page.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="logout-screen">
      {showConfirmation && (
        <div className="logout-confirmation">
          <div className="confirmation-header">
            <div className="warning-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h1>Confirm Logout</h1>
            <p>Are you sure you want to log out of your admin account?</p>
          </div>
          
          <div className="confirmation-details">
            <div className="detail-item">
              <i className="fas fa-user"></i>
              <div className="detail-content">
                <div className="detail-label">Logged in as</div>
                <div className="detail-value">Admin User</div>
              </div>
            </div>
            
            <div className="detail-item">
              <i className="fas fa-clock"></i>
              <div className="detail-content">
                <div className="detail-label">Session Active Since</div>
                <div className="detail-value">2 hours ago</div>
              </div>
            </div>
            
            <div className="detail-item">
              <i className="fas fa-desktop"></i>
              <div className="detail-content">
                <div className="detail-label">Last Activity</div>
                <div className="detail-value">Just now</div>
              </div>
            </div>
          </div>
          
          <div className="confirmation-warning">
            <i className="fas fa-info-circle"></i>
            <p>Any unsaved changes will be lost. Make sure to save your work before logging out.</p>
          </div>
          
          <div className="confirmation-actions">
            <button 
              className="btn btn-outline"
              onClick={handleCancel}
            >
              <i className="fas fa-times"></i>
              Cancel
            </button>
            <button 
              className="btn btn-primary logout-btn"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt"></i>
              Yes, Logout
            </button>
          </div>
          
          <div className="confirmation-footer">
            <div className="security-tip">
              <i className="fas fa-lock"></i>
              <span>For security reasons, always log out when you're done.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;