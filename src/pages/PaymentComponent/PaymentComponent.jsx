// Frontend example using React
import React, { use, useState } from 'react';
import axios from 'axios';
import './PaymentComponent.css';
import API from '../../Service/API';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

const PaymentComponent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [address] = useState({
        name: "Sandeep Kumar",
        phone: "9876543210",
        flat: "A-102, Green Valley",
        landmark: "Near Metro Station",
        type: "Home"
    });
    const { cart, setCart, loader, setloader } = useAuth();
    const [paymentStatus, setPaymentStatus] = useState(null);
    const { ...context } = useAuth();
    const location = useLocation();
    console.log("Location State:", location.state);
    console.log("context UserName:", context.userName);
    console.log("context UserEmail:", context.userEmail);
    console.log(sessionStorage.getItem("userEmail"));
    console.log(context)
    const data = location.state || { orderTotal: 0.00 };
    const [orderDetails, setOrderDetails] = useState({
        amount: data.orderTotal || 0.00,
        currency: 'INR',
        customerName: context.userName,
        customerEmail: context.userEmail,
        description: 'Premium Plan Subscription'
    });

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement('script');
            script.src = 'http://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setLoading(true);
        setPaymentStatus(null);

        try {
            const isScriptLoaded = await loadRazorpayScript();
            if (!isScriptLoaded) {
                throw new Error('Failed to load payment service');
            }
            const orderResponse = await API.createOrder({
                amount: orderDetails.amount,
                currency: orderDetails.currency,
                receipt: `rcptid_${Math.floor(Math.random() * 1000000)}`,
                customer: {
                    name: orderDetails.customerName,
                    email: orderDetails.customerEmail,
                    phone: '9999999999',

                },
                description: orderDetails.description
            });

            const { orderId, razorpayOrderId, amount, currency, customerEmail, customerName } = orderResponse.data.responseContent;

            const options = {
                key: "rzp_test_S34JO6MNJA84dX",
                amount: parseFloat(amount) * 100,
                currency: currency,
                name: 'Premium Services',
                description: orderDetails.description,
                image: 'http://yourcompany.com/logo.png',
                order_id: razorpayOrderId,
                handler: async (response) => {

                    try {
                        const verificationResponse = await API.verifyPayment({
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature
                        });

                        if (verificationResponse.data.responseStatus === 'S' && verificationResponse.data.responseCode === 200) {
                            setPaymentStatus('success');
                            try {
                                const orderData = {
                                    orderItem: cart,
                                    address: address,
                                    paymentMethod: paymentMethod,
                                    totalAmount: orderDetails.amount,
                                    status: 'Placed',
                                    orderDate: new Date().toISOString()
                                };
                                setloader(true);
                                const response = await API.placeOrder(orderData);
                                console.log('Order Response:', response.data);
                                const { ...result } = response.data;
                                if (result.responseCode !== 200 && result.responseStatus !== 'F') {
                                    setloader(false);
                                    alert('Failed to place order. Please try again.');
                                    return;
                                }

                                if (result.responseCode === 200 && result.responseStatus === 'S') {
                                    setCart([]);
                                    localStorage.removeItem('firstKitchenCart');
                                    setTimeout(() => navigate('/home'), 2000);
                                } else {
                                    alert('Failed to place order. Please try again.');
                                }
                            } catch (error) {
                                console.error('Order placement failed:', error);
                                return;
                            } finally {
                                setloader(false);
                            }
                            // Handle successful payment
                        } else {
                            setPaymentStatus('failed');
                        }
                    } catch (error) {
                        console.error('Payment verification failed:', error);
                        setPaymentStatus('failed');
                    }
                },
                prefill: {
                    name: customerName,
                    email: customerEmail,
                    contact: '+919999999999'
                },
                notes: {
                    orderId: orderId
                },
                theme: {
                    color: '#4F46E5'
                },
                modal: {
                    ondismiss: () => {
                        setLoading(false);
                        console.log('Checkout closed by user');
                    },
                    escape: true,
                    handleback: true
                },
                retry: {
                    enabled: true,
                    max_count: 2
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.on('payment.failed', function (response) {
                console.error(response.error);
                setPaymentStatus('failed');
            });
            razorpay.open();

        } catch (error) {
            console.error('Payment error:', error);
            setPaymentStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-container">

            <div className="payment-card">
                <div className="payment-header">
                    <div className="payment-logo">
                        <div className="logo-icon">₹</div>
                        <h2>Secure Payment</h2>
                    </div>
                    <div className="secure-badge">
                        <span className="lock-icon">🔒</span>
                        100% Secure
                    </div>
                </div>

                <div className="payment-details">
                    <div className="detail-row">
                        <span className="detail-label">Description:</span>
                        <span className="detail-value">{orderDetails.description}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Amount:</span>
                        <span className="detail-value amount">
                            ₹{orderDetails.amount.toFixed(2)}
                            <span className="currency"> ({orderDetails.currency})</span>
                        </span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Customer:</span>
                        <span className="detail-value">{orderDetails.customerName}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Email:</span>
                        <span className="detail-value">{orderDetails.customerEmail}</span>
                    </div>
                </div>

                <div className="payment-features">
                    <div className="feature">
                        <span className="feature-icon">✓</span>
                        <span>Secure SSL Encryption</span>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">✓</span>
                        <span>No Extra Charges</span>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">✓</span>
                        <span>Instant Confirmation</span>
                    </div>
                </div>

                <div className="payment-button-container">
                    <button
                        className={`payment-button ${loading ? 'loading' : ''}`}
                        onClick={handlePayment}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Processing...
                            </>
                        ) : (
                            <>
                                <span className="button-icon">💳</span>
                                Pay ₹{orderDetails.amount.toFixed(2)}
                            </>
                        )}
                    </button>
                    <p className="payment-note">
                        You will be redirected to Razorpay's secure payment page
                    </p>
                </div>

                {paymentStatus === 'success' && (
                    <div className="status-message success">
                        <div className="status-icon">✅</div>
                        <div>
                            <h3>Payment Successful!</h3>
                            <p>Your payment has been processed successfully. You will receive a confirmation email shortly.</p>
                        </div>
                    </div>
                )}

                {paymentStatus === 'failed' && (
                    <div className="status-message error">
                        <div className="status-icon">❌</div>
                        <div>
                            <h3>Payment Failed</h3>
                            <p>There was an issue processing your payment. Please try again or use a different payment method.</p>
                            <button
                                className="retry-button"
                                onClick={handlePayment}
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {paymentStatus === 'error' && (
                    <div className="status-message error">
                        <div className="status-icon">⚠️</div>
                        <div>
                            <h3>Error Occurred</h3>
                            <p>Something went wrong. Please refresh the page and try again.</p>
                        </div>
                    </div>
                )}

                <div className="payment-footer">
                    <div className="accepted-payments">
                        <span className="footer-label">We accept:</span>
                        <div className="payment-methods">
                            <span className="method-icon">💳</span>
                            <span className="method-icon">🏦</span>
                            <span className="method-icon">📱</span>
                            <span className="method-icon">🪙</span>
                        </div>
                    </div>
                    <p className="security-info">
                        Your payment details are secured with 256-bit SSL encryption
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentComponent;