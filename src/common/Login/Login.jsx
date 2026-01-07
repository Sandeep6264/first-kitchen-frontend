import React, { use } from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import API, { setAuthToken } from '../../Service/API';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

function Login() {
  const { ...context } = useAuth();
  const naviaget = useNavigate();
  const [userData, setUserData] = React.useState({
    userName: '',
    password: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.userName.trim() === "" || userData.password.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }
    try {
      context.setloader(true);
      const response = await API.Login(userData);
      const { ...result } = response.data;
      if (result && result.responseStatus == "S" && result.responseCode == 200) {
        toast.success("Login successful!");
        context.setUserRole(result.responseContent.accessRole);
        context.setUserToken(result.responseContent.accessToken);
        context.setuserId(result.responseContent.userId);
        context.setuserEmail(result.responseContent.email);
        setAuthToken(result.responseContent.accessToken);
        context.setIsLoggedIn(true);
        naviaget('/home', { replace: true });

      } else {
        toast.error(result.responseMessage || "Login failed. Please try again.");
      }
    } catch (error) {
      // console.error("Login error:", error);
      console.log("Login error response:", error.response);
      // toast.error("An error occurred during login. Please try again.");
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
            <input type="text" name="userName" value={userData.userName} onChange={handleChange} placeholder="Username or Email" required />
            <FaUser className="icon" />
          </div>

          <div className="input-group">
            <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" required />
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