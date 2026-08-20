import React, { useRef, useState } from 'react';
import './Signup.css';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import API from '../../Service/API';
import { NavLink } from 'react-router';

const Signup = () => {
  const { ...context } = useAuth();
  const [signupData, setSignupData] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    deliveryAddress: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });
  const notMatching = useRef(false);
  const handleChange = (e) => {
    const { name, value } = e.target
    setSignupData({ ...signupData, [name]: value });
  }
  const resetForm = () => {
    setSignupData({
      fullName: '',
      emailAddress: '',
      phoneNumber: '',
      deliveryAddress: '',
      password: '',
      confirmPassword: '',
      gender: ''
    });
    notMatching.current = false;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signupData.fullName.trim() === "" || signupData.emailAddress.trim() === "" || signupData.phoneNumber.trim() === "" || signupData.deliveryAddress.trim() === "" || signupData.password.trim() === "" || signupData.confirmPassword.trim() === "" || signupData.gender.trim() === "") {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      context.setloader(true);
      if (signupData.password !== signupData.confirmPassword) {
        notMatching.current = true;
        toast.error("Passwords do not match.");
        return;
      }
      const userData = { ...signupData, role: "ROLE_USER" }
      const response = await API.SignUp(userData);
      const { ...result } = response.data;
      if (result && result.responseStatus == "S" && result.responseCode == 200) {
        toast.success("Signup successful! Please login.");
      }
      else {
        toast.error(result.responseMessage || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      context.setloader(false);
      resetForm();
    }
  }

  return (
    <div className="signup-page" >
      <div className="signup-container">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <input type="text" name="fullName" value={signupData.fullName} onChange={handleChange} placeholder="Full Name" required />
            <input type="email" name="emailAddress" value={signupData.emailAddress} onChange={handleChange} placeholder="emailAddress" required />
          </div>

          <div className="input-row">
            <input type="tel" name="phoneNumber" value={signupData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
            <input type="text" name="deliveryAddress" value={signupData.deliveryAddress} onChange={handleChange} placeholder="Delivery Address" required />
          </div>

          <div className="input-row">
            <input type="password" name="password" value={signupData.password} onChange={handleChange} placeholder="Password" required />
            <input type="password" name="confirmPassword" style={{ border: notMatching.current && "1px solid red" }} value={signupData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
          </div>
          <div className="input-row" >
            <select name="gender" value={signupData.gender} onChange={handleChange} required >
              <option value="" disabled >Select Gender</option>
              <option value="male" >Male</option>
              <option value="female" >Female</option>
              <option value="other" >Other</option>
            </select>
          </div>

          <button type="submit" onClick={handleSubmit} >Sign Up</button>
        </form>


        <p>Already have an account? <NavLink to="/login" style={{ textDecoration: "none" }}> <span>Login</span></NavLink></p>
      </div>
    </div >
  );
}

export default Signup;