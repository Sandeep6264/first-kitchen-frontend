// OrderDetailsPopup.jsx - UPDATED
import React, { useEffect } from 'react';
import './OrderDetailsPopup.css';
import { RxCross2 } from "react-icons/rx";


const OrderDetailsPopup = ({ order, isOpen, onClose }) => {
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, onClose]);


    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Get status color based on order status
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return '#52c41a';
            case 'preparing':
                return '#faad14';
            case 'pending':
                return '#fa8c16';
            case 'cancelled':
                return '#ff4d4f';
            default:
                return '#d4380d';
        }
    };

    // Don't render if not open or no order data
    if (!isOpen || !order) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container">
                {/* Modal Header - Fixed at top */}
                <div className="modal-header">
                    <div className="order-title">
                        <h2>Order #{order.orderId}</h2>
                        <span className="order-date">{formatDate(order.orderDate)}</span>
                    </div>
                    <button className="close-button" onClick={onClose} aria-label="Close">
                        <RxCross2 />
                    </button>
                </div>

                {/* Scrollable content area */}
                <div className="modal-content">
                    {/* Order Status */}
                    <div className="order-status-section">
                        <span
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(order.status) }}
                        >
                            {order.status}
                        </span>
                    </div>

                    {/* Order Items */}
                    <div className="order-items-section">
                        <h3 className="section-title">Order Items</h3>
                        <div className="items-container">
                            {order.items.map((item, index) => (
                                <div className="order-item" key={index}>
                                    <div className="item-info">
                                        <span className="item-name">{item.itemName}</span>
                                        <span className="item-quantity">x{item.qty}</span>
                                    </div>
                                    <span className="item-price">${item.price.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            {/* <span>${order.subtotal.toFixed(2)}</span> */}
                        </div>
                        <div className="summary-row">
                            <span>Delivery Fee</span>
                            {/* <span>${order.deliveryFee.toFixed(2)}</span> */}
                        </div>
                        <div className="summary-row">
                            <span>Tax</span>
                            {/* <span>${order.tax.toFixed(2)}</span> */}
                        </div>
                        <div className="summary-row total-row">
                            <span>Total Amount</span>
                            <span className="total-amount">${order.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons - Fixed at bottom */}
                <div className="modal-actions">
                    <button className="btn-secondary" onClick={onClose}>
                        Close
                    </button>
                    {order.status === 'pending' && (
                        <button className="btn-primary">
                            Update Order Status
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPopup;