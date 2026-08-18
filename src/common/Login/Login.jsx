import React, { use } from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
// import API, { setAuthToken } from '../../Service/API';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import API from '../../Service/API';

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
  const refreshUserFromSession = () => {
    context.setuserName(sessionStorage.getItem("userName"));
    context.setUserRole(sessionStorage.getItem("userRole"));
    context.setUserToken(sessionStorage.getItem("userToken"));
    context.setuserId(sessionStorage.getItem("userId"));
    context.setuserEmail(sessionStorage.getItem("userEmail"));
    // context.setuserGender(sessionStorage.getItem("userGender"));
    context.setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
  };
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
        sessionStorage.setItem("userRole", [result.responseContent.accessRole]);
        sessionStorage.setItem("userToken", result.responseContent.accessToken);
        sessionStorage.setItem("userId", result.responseContent.userId);
        sessionStorage.setItem("userEmail", result.responseContent.userEmail);
        sessionStorage.setItem("userName", result.responseContent.userName);
        sessionStorage.setItem("userGender", result.responseContent.userGender);
        sessionStorage.setItem("isLoggedIn", true);
        refreshUserFromSession();
        naviaget('/home', { replace: true });

      } else {
        toast.error(result.responseMessage || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
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
          <div className="input-group" style={{ textAlign: 'left' }} >
            <span onClick={() => naviaget('/forgot-password')}>Forget Password?</span>
          </div >
          <button type="submit">
            Login
          </button>
        </form>

        {/* <p>Don't have an account? <span>Sign Up</span></p> */}
        {/* navlink to signup */}
        <div className="signup-link"></div>
        <p>Don't have an account? <span onClick={() => naviaget('/signup')}>Sign Up</span></p>
      </div>

    </div>
  );
}

export default Login;