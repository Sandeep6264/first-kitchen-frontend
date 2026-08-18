import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgetPassword.css';
import API from '../../Service/API';

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        console.log('Password reset requested for:', email);
        const response = await API.resetPassword(email);
        console.log('Password reset response:', response);
        setTimeout(() => {
            setIsSubmitting(false);
            alert('If this email is registered, you will receive password reset instructions.');
            navigate('/login');
        }, 2000);
    }

    return (
        <div className="forget-password-page">
            <div className="forget-password-container">
                <h2>Forgot Password</h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <span className="icon">✉</span>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                <p>
                    Remember your password? <span onClick={() => navigate('/login')}>Login</span>
                </p>
            </div>
        </div>
    );
}