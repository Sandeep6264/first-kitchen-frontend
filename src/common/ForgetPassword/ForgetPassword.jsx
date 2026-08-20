import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgetPassword.css';
import { FaUser, FaLock } from "react-icons/fa";
import API from '../../Service/API';
import { toast } from 'react-toastify';

export default function ForgetPassword() {

    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        if (email.trim() === '') {
            toast.error('Please enter your email address.');
            return;
        }

        setIsSubmitting(true);

        try {

            const response = await API.forgotPassword({
                email: email.trim()
            });

            console.log(
                'Password reset response:',
                response
            );

            /*
             * Keep the message generic.
             * Don't tell the user whether the email exists.
             */
            toast.success(
                'If this email is registered, you will receive password reset instructions.'
            );

            navigate('/login');

        } catch (error) {

            console.error(
                'Forgot password error:',
                error
            );

            console.log(
                'Forgot password error response:',
                error.response
            );

            toast.error(
                error.response?.data?.responseMessage ||
                error.response?.data?.message ||
                'Something went wrong. Please try again later.'
            );

        } finally {

            setIsSubmitting(false);
        }
    };

    return (
        <div className="forget-password-page">

            <div className="forget-password-container">

                <h2>Forgot Password</h2>

                <p className="subhead">
                    Enter your email address and we'll send you
                    a link to reset your password
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <FaUser className="icon" />
                        <input
                            type="email"
                            placeholder=" "
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                            disabled={isSubmitting}
                        />

                        <label className="floating-label">
                            Your email address
                        </label>

                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? 'Sending...'
                            : 'Send Reset Link'}
                    </button>

                </form>

                <p>
                    Remember your password?{' '}

                    <span
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </span>
                </p>

            </div>

        </div>
    );
}