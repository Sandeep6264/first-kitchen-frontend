import React from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import API from '../../Service/API';
import { toast } from 'react-toastify';

function Login() {
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

      console.log("Login data submitted:", userData);
      const response = await API.Login(userData);
      const { ...result } = response.data;
      if (result && result.responseStatus == "S" && result.responseCode == 200) {
        toast.success("Login successful!");
        localStorage.setItem("token", result.responseContent.accessToken);
        localStorage.setItem("user", JSON.stringify(result.responseContent.accessRole));
        window.location.href = "/firstKitchen/home";

      } else {
        toast.error(result.responseMessage || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
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