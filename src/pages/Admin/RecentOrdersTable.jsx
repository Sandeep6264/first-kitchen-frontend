export default function RecentOrdersTable() {
    const orders = [
        { id: '#FK-2847', customer: 'John Smith', items: 3, total: '$45.50', status: 'completed', time: '12:30 PM' },
        { id: '#FK-2848', customer: 'Emma Johnson', items: 2, total: '$28.75', status: 'preparing', time: '12:45 PM' },
        { id: '#FK-2849', customer: 'Michael Chen', items: 5, total: '$67.20', status: 'new', time: '1:15 PM' },
        { id: '#FK-2850', customer: 'Sarah Wilson', items: 1, total: '$15.99', status: 'completed', time: '1:30 PM' },
        { id: '#FK-2851', customer: 'David Brown', items: 4, total: '$52.40', status: 'cancelled', time: '2:00 PM' },
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case 'completed': return 'status-success';
            case 'preparing': return 'status-pending';
            case 'new': return 'status-new';
            case 'cancelled': return 'status-cancelled';
            default: return '';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed': return 'Completed';
            case 'preparing': return 'Preparing';
            case 'new': return 'New';
            case 'cancelled': return 'Cancelled';
            default: return status;
        }
    };

    return (
        <div className="orders-table">
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td className="order-id">{order.id}</td>
                            <td className="customer">{order.customer}</td>
                            <td className="items">{order.items} items</td>
                            <td className="total">{order.total}</td>
                            <td>
                                <span className={`status-badge ${getStatusClass(order.status)}`}>
                                    {getStatusText(order.status)}
                                </span>
                            </td>
                            <td className="time">{order.time}</td>
                            <td>
                                <button className="table-action-btn">
                                    <i className="fas fa-ellipsis-v"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}