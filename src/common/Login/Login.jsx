import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import API from '../../Service/API';

function Login() {
  const { ...context } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userName: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const refreshUserFromSession = () => {
    context.setuserName(sessionStorage.getItem("userName"));
    context.setUserRole(sessionStorage.getItem("userRole"));
    context.setUserToken(sessionStorage.getItem("userToken"));
    context.setuserId(sessionStorage.getItem("userId"));
    context.setuserEmail(sessionStorage.getItem("userEmail"));
    context.setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.userName.trim() === "" || userData.password.trim() === "") {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      context.setloader(true);
      const response = await API.Login(userData);
      const { ...result } = response.data;
      if (result && result.responseStatus == "S" && result.responseCode == 200) {
        toast.success("Login successful!");
        sessionStorage.setItem("userRole", [result.responseContent.accessRole]);
        sessionStorage.setItem("userToken", result.responseContent.accessToken);
        sessionStorage.setItem("userId", result.responseContent.userId);
        sessionStorage.setItem("userEmail", result.responseContent.userEmail);
        sessionStorage.setItem("userName", result.responseContent.userName);
        sessionStorage.setItem("userGender", result.responseContent.userGender);
        sessionStorage.setItem("isLoggedIn", true);
        refreshUserFromSession();
        navigate('/home', { replace: true });

      } else {
        toast.error(result.responseMessage || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      console.log("Login error response:", error.response);
      toast.error(error.response?.data?.responseMessage || "An error occurred during login. Please try again.");
    } finally {
      context.setloader(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login to your account</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              name="userName"
              value={userData.userName}
              onChange={handleChange}
              placeholder=" "
              required
              id="username"
            />
            <label className="floating-label" htmlFor="username">
              Username or Email
            </label>
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder=" "
              required
              id="password"
            />
            <label className="floating-label" htmlFor="password">
              Password
            </label>
            {/* <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
              tabIndex="-1"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              )}
            </button> */}
          </div>

          <div className="input-group" style={{ textAlign: 'left' }}>
            <span className="forgot-password" onClick={() => navigate('/forgot-password')}>
              Forget Password?
            </span>
          </div>

          <button type="submit">
            Login
          </button>
        </form>

        <p>
          Don't have an account? <span onClick={() => navigate('/signup')}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;