import React, { useState } from 'react';

import Dashboard from './Dashboard/Dashboard';
import Orders from './Orders/Orders';
import MenuManagement from './Menu/Menu';
import Categories from './Categories/Categories';
import Users from './UserManagement/UserManagement';
import Payments from './PaymentsRevenue/PaymentsRevenue';
import KitchenStatus from './KitchenStatus/KitchenStatus';
import Reports from './ReportsAnalytics/ReportsAnalytics';
import Settings from './Settings/Settings';

import AdminHeader from './Header';
import AdminSidebar from './Sidebar';

function AdminLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activePage, setActivePage] = useState('dashboard');

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard': return <Dashboard />;
            case 'orders': return <Orders />;
            case 'menu': return <MenuManagement />;
            case 'categories': return <Categories />;
            case 'users': return <Users />;
            case 'payments': return <Payments />;
            case 'kitchen-status': return <KitchenStatus />;
            case 'reports': return <Reports />;
            case 'settings': return <Settings />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className="admin-app">
            <AdminHeader
                onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            <div className="main-container">
                <AdminSidebar
                    collapsed={sidebarCollapsed}
                    activePage={activePage}
                    setActivePage={setActivePage}
                />

                <main className={`content-wrapper ${sidebarCollapsed ? 'collapsed' : ''}`}>
                    {renderPage()}
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
