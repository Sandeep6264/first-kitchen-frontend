import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './ResetPassword.css';
import API from '../../Service/API';
import { toast } from 'react-toastify';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!token) {
            toast.error('Invalid or missing reset token.');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        if (password.length < 8) {
            toast.error('Password must be at least 8 characters.');
            return;
        }

        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await API.resetPassword({
                token: token,
                newPassword: password
            });

            console.log('Password reset response:', response);

            toast.success('Password reset successfully. Please login.');
            navigate('/login');

        } catch (error) {
            console.error('Reset password error:', error);

            const message =
                error?.response?.data?.message ||
                'Invalid or expired reset link.';

            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="reset-password-page">
            <div className="reset-password-container">
                <h2>Reset Password</h2>
                <p className="subhead">
                    Enter your new password below.
                </p>

                {!token ? (
                    <div className="error-message">
                        Invalid or missing reset link.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <span className="icon">🔒</span>
                            <input
                                type="password"
                                placeholder=" "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={8}
                                required
                                disabled={isSubmitting}
                            />
                            <label className="floating-label">
                                Enter new password
                            </label>
                        </div>

                        <div className="input-group">
                            <span className="icon">🔒</span>
                            <input
                                type="password"
                                placeholder=" "
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                minLength={8}
                                required
                                disabled={isSubmitting}
                            />
                            <label className="floating-label">
                                Confirm new password
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}

                <p>
                    Remember your password?{' '}
                    <span onClick={() => navigate('/login')}>
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}