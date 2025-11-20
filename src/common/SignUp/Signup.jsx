import React from 'react';
import './Signup.css';

const Signup = () => {
  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create Account</h2>

        <form>
          <div className="input-row">
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
          </div>

          <div className="input-row">
            <input type="tel" placeholder="Phone Number" required />
            <input type="text" placeholder="Delivery Address" required />
          </div>

          <div className="input-row">
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
          </div>

          <button type="submit">Sign Up</button>
        </form>

        <p className="login-link">
          Already have an account? <span>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;