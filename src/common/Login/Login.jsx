import React from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";

function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login to your account</h2>

        <form>
          <div className="input-group">
            <input type="text" placeholder="Username or Email" required />
            <FaUser className="icon" />
          </div>

          <div className="input-group">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>

          <button type="submit">
            Login
          </button>
        </form>

        <p>Don't have an account? <span>Sign Up</span></p>
      </div>
    </div>
  );
}

export default Login;