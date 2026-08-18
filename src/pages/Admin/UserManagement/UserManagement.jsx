import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import {
  Layout, Menu, Card, Statistic, Table, Tag, Button, Switch,
  Input, Select, Modal, Form, Avatar, Tabs, Badge, Drawer,
  Timeline, Descriptions, Upload, Space, Divider, Alert, notification
} from 'antd';
import {
  DashboardOutlined, ShoppingCartOutlined, AppstoreOutlined,
  FireOutlined, TeamOutlined, PieChartOutlined,
  SettingOutlined, LogoutOutlined, CheckCircleOutlined,
  ClockCircleOutlined, DollarOutlined, UserOutlined,
  EditOutlined, DeleteOutlined, EyeOutlined,
  PlusOutlined, FilterOutlined, UploadOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;
const { Search } = Input;

// Mock Data
const dashboardData = {
  totalOrders: 142,
  pendingOrders: 8,
  preparingOrders: 12,
  completedOrders: 122,
  revenueToday: 28450,
  kitchenStatus: 'ON'
};

const recentOrders = [
  { id: '#ORD-7842', customer: 'John Smith', items: '2x Burger, 1x Fries', total: '$24.50', status: 'preparing', time: '12:30 PM' },
  { id: '#ORD-7841', customer: 'Emma Wilson', items: '1x Pizza, 2x Coke', total: '$18.75', status: 'ready', time: '12:15 PM' },
  { id: '#ORD-7840', customer: 'Mike Johnson', items: '3x Tacos, 1x Salad', total: '$32.20', status: 'delivered', time: '11:45 AM' },
  { id: '#ORD-7839', customer: 'Sarah Lee', items: '1x Pasta, 1x Garlic Bread', total: '$16.90', status: 'delivered', time: '11:20 AM' },
  { id: '#ORD-7838', customer: 'David Chen', items: '2x Sushi Platter', total: '$45.00', status: 'accepted', time: '11:00 AM' }
];

const menuItems = [
  { id: 1, name: 'Classic Burger', category: 'Non-Veg', price: '$12.99', status: 'active', image: '🍔' },
  { id: 2, name: 'Margherita Pizza', category: 'Veg', price: '$14.99', status: 'active', image: '🍕' },
  { id: 3, name: 'Caesar Salad', category: 'Veg', price: '$9.99', status: 'active', image: '🥗' },
  { id: 4, name: 'Grilled Chicken', category: 'Non-Veg', price: '$16.99', status: 'inactive', image: '🍗' },
  { id: 5, name: 'Fish & Chips', category: 'Non-Veg', price: '$13.99', status: 'active', image: '🐟' }
];

const staffMembers = [
  { id: 1, name: 'Alex Johnson', role: 'Admin', email: 'alex@firstkitchen.com', status: 'active' },
  { id: 2, name: 'Maria Garcia', role: 'Staff', email: 'maria@firstkitchen.com', status: 'active' },
  { id: 3, name: 'David Kim', role: 'Staff', email: 'david@firstkitchen.com', status: 'inactive' },
  { id: 4, name: 'Sarah Miller', role: 'Staff', email: 'sarah@firstkitchen.com', status: 'active' }
];

// Dashboard Component
const Dashboard = ({ kitchenStatus, setKitchenStatus }) => {
  const stats = [
    { title: 'Total Orders Today', value: dashboardData.totalOrders, icon: <ShoppingCartOutlined />, color: '#1890ff' },
    { title: 'Pending Orders', value: dashboardData.pendingOrders, icon: <ClockCircleOutlined />, color: '#faad14' },
    { title: 'Revenue Today', value: `$${dashboardData.revenueToday}`, icon: <DollarOutlined />, color: '#52c41a' },
    { title: 'Kitchen Status', value: kitchenStatus, icon: <FireOutlined />, color: kitchenStatus === 'ON' ? '#52c41a' : '#f5222d' }
  ];

  const orderStatusData = [
    { name: 'Placed', value: 25 },
    { name: 'Accepted', value: 20 },
    { name: 'Preparing', value: 15 },
    { name: 'Ready', value: 10 },
    { name: 'Delivered', value: 80 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const columns = [
    { title: 'Order ID', dataIndex: 'id', key: 'id' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Items', dataIndex: 'items', key: 'items' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={
          status === 'delivered' ? 'green' :
          status === 'ready' ? 'blue' :
          status === 'preparing' ? 'orange' : 'cyan'
        }>
          {status.toUpperCase()}
        </Tag>
      )
    },
    { title: 'Time', dataIndex: 'time', key: 'time' }
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: 16 }}>Operational Dashboard</h2>
        <p style={{ color: '#666' }}>Real-time overview of kitchen operations</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 24 }}>
        {stats.map((stat, index) => (
          <Card key={index} bordered={false} style={{ background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: 4 }}>{stat.title}</div>
                <div style={{ fontSize: '24px', fontWeight: 600, color: stat.color }}>{stat.value}</div>
              </div>
              <div style={{ fontSize: '24px', color: stat.color }}>{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <Card title="Order Status Distribution" bordered={false}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Revenue Trend (Last 7 Days)" bordered={false}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={[
                { day: 'Mon', revenue: 4200 },
                { day: 'Tue', revenue: 5200 },
                { day: 'Wed', revenue: 6100 },
                { day: 'Thu', revenue: 5800 },
                { day: 'Fri', revenue: 8200 },
                { day: 'Sat', revenue: 9800 },
                { day: 'Sun', revenue: 7500 }
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#52c41a" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="Recent Orders" bordered={false}>
        <Table
          dataSource={recentOrders}
          columns={columns}
          pagination={false}
          size="middle"
        />
      </Card>
    </div>
  );
};

// Orders Management Component
const OrdersManagement = () => {
  const [activeTab, setActiveTab] = useState('placed');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const ordersByStatus = {
    placed: recentOrders,
    accepted: recentOrders.filter(o => o.status === 'accepted'),
    preparing: recentOrders.filter(o => o.status === 'preparing'),
    ready: recentOrders.filter(o => o.status === 'ready'),
    delivered: recentOrders.filter(o => o.status === 'delivered'),
    cancelled: []
  };

  const OrderCard = ({ order }) => (
    <Card style={{ marginBottom: 16 }} size="small">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '16px' }}>{order.id}</div>
          <div style={{ color: '#666', fontSize: '14px' }}>{order.customer}</div>
          <div style={{ fontSize: '14px', marginTop: 4 }}>{order.items}</div>
          <div style={{ fontSize: '14px', marginTop: 4 }}>Ordered: {order.time}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#1890ff' }}>{order.total}</div>
          <Tag color={
            order.status === 'delivered' ? 'green' :
            order.status === 'ready' ? 'blue' :
            order.status === 'preparing' ? 'orange' : 'cyan'
          } style={{ marginTop: 8 }}>
            {order.status.toUpperCase()}
          </Tag>
          <div style={{ marginTop: 8 }}>
            <Select defaultValue={order.status} style={{ width: 120 }}>
              <Option value="accepted">Accepted</Option>
              <Option value="preparing">Preparing</Option>
              <Option value="ready">Ready</Option>
              <Option value="delivered">Delivered</Option>
            </Select>
            <Button 
              type="link" 
              icon={<EyeOutlined />} 
              onClick={() => {
                setSelectedOrder(order);
                setDrawerVisible(true);
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Orders Management</h2>
        <Space style={{ marginTop: 16 }}>
          <Search placeholder="Search orders..." style={{ width: 300 }} />
          <Select defaultValue="all" style={{ width: 150 }}>
            <Option value="all">All Status</Option>
            <Option value="placed">Placed</Option>
            <Option value="preparing">Preparing</Option>
          </Select>
          <Select defaultValue="all" style={{ width: 150 }}>
            <Option value="all">All Payment</Option>
            <Option value="card">Card</Option>
            <Option value="cash">Cash</Option>
          </Select>
          <Button icon={<FilterOutlined />}>More Filters</Button>
        </Space>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab={<span><Badge count={5} offset={[10, 0]}>Placed</Badge></span>} key="placed">
          {ordersByStatus.placed.map(order => <OrderCard key={order.id} order={order} />)}
        </TabPane>
        <TabPane tab={<span><Badge count={3} offset={[10, 0]}>Accepted</Badge></span>} key="accepted">
          {ordersByStatus.accepted.map(order => <OrderCard key={order.id} order={order} />)}
        </TabPane>
        <TabPane tab={<span><Badge count={8} offset={[10, 0]}>Preparing</Badge></span>} key="preparing">
          {ordersByStatus.preparing.map(order => <OrderCard key={order.id} order={order} />)}
        </TabPane>
        <TabPane tab="Ready" key="ready">
          {ordersByStatus.ready.map(order => <OrderCard key={order.id} order={order} />)}
        </TabPane>
        <TabPane tab="Delivered" key="delivered">
          {ordersByStatus.delivered.map(order => <OrderCard key={order.id} order={order} />)}
        </TabPane>
        <TabPane tab="Cancelled" key="cancelled">
          {ordersByStatus.cancelled.length === 0 && (
            <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>
              No cancelled orders
            </div>
          )}
        </TabPane>
      </Tabs>

      <Drawer
        title="Order Details"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={500}
      >
        {selectedOrder && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Order ID">{selectedOrder.id}</Descriptions.Item>
            <Descriptions.Item label="Customer">{selectedOrder.customer}</Descriptions.Item>
            <Descriptions.Item label="Items">{selectedOrder.items}</Descriptions.Item>
            <Descriptions.Item label="Total Amount">{selectedOrder.total}</Descriptions.Item>
            <Descriptions.Item label="Order Time">{selectedOrder.time}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color="blue">{selectedOrder.status.toUpperCase()}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Payment Status">
              <Tag color="green">PAID</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Special Instructions">
              No onions, extra cheese
            </Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </div>
  );
};

// Menu Management Component
const MenuManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const columns = [
    {
      title: 'Item',
      dataIndex: 'image',
      key: 'image',
      render: (image, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: '24px', marginRight: 12 }}>{image}</div>
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>ID: #{record.id}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag color={category === 'Veg' ? 'green' : 'red'}>{category}</Tag>
      )
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'right'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Switch 
          checked={status === 'active'} 
          checkedChildren="Active" 
          unCheckedChildren="Inactive" 
        />
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => {
              setEditingItem(record);
              setIsModalVisible(true);
            }}
          />
          <Button type="link" danger icon={<DeleteOutlined />} />
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Menu Management</h2>
          <p style={{ color: '#666' }}>Manage your food items and pricing</p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => {
            setEditingItem(null);
            setIsModalVisible(true);
          }}
        >
          Add New Item
        </Button>
      </div>

      <Card bordered={false}>
        <Table
          dataSource={menuItems}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingItem ? "Edit Menu Item" : "Add New Menu Item"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="Item Name">
            <Input placeholder="Enter item name" defaultValue={editingItem?.name} />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea rows={3} placeholder="Enter item description" />
          </Form.Item>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Form.Item label="Price">
              <Input prefix="$" placeholder="0.00" defaultValue={editingItem?.price?.replace('$', '')} />
            </Form.Item>
            <Form.Item label="Category">
              <Select defaultValue={editingItem?.category || 'Veg'}>
                <Option value="Veg">Vegetarian</Option>
                <Option value="Non-Veg">Non-Vegetarian</Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item label="Image Upload">
            <Upload>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Status">
            <Switch defaultChecked={editingItem?.status === 'active'} />
          </Form.Item>
          <div style={{ textAlign: 'right' }}>
            <Button style={{ marginRight: 8 }} onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>
            <Button type="primary">
              {editingItem ? 'Update Item' : 'Add Item'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

// Kitchen Status Component
const KitchenStatus = ({ kitchenStatus, setKitchenStatus }) => {
  const [reason, setReason] = useState('');
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const handleStatusToggle = () => {
    if (kitchenStatus === 'ON') {
      setIsConfirmModalVisible(true);
    } else {
      setKitchenStatus('ON');
      notification.success({
        message: 'Kitchen Status Updated',
        description: 'Kitchen is now ON'
      });
    }
  };

  const confirmTurnOff = () => {
    setKitchenStatus('OFF');
    setIsConfirmModalVisible(false);
    notification.warning({
      message: 'Kitchen Status Updated',
      description: `Kitchen is now OFF${reason ? `: ${reason}` : ''}`
    });
    setReason('');
  };

  const statusHistory = [
    { status: 'ON', changedBy: 'Alex Johnson', timestamp: 'Today, 9:00 AM', reason: 'Start of day' },
    { status: 'OFF', changedBy: 'Maria Garcia', timestamp: 'Yesterday, 10:30 PM', reason: 'Closing time' },
    { status: 'ON', changedBy: 'Alex Johnson', timestamp: 'Yesterday, 8:00 AM', reason: 'Opening' }
  ];

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: 16 }}>Kitchen Status Control</h2>
        <p style={{ color: '#666' }}>Manage kitchen operational status</p>
      </div>

      <Card bordered={false} style={{ marginBottom: 24 }}>
        <div style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: '48px', marginBottom: 24 }}>
            {kitchenStatus === 'ON' ? '🔥' : '❄️'}
          </div>
          <div style={{ fontSize: '32px', fontWeight: 600, marginBottom: 16 }}>
            Kitchen is <span style={{ color: kitchenStatus === 'ON' ? '#52c41a' : '#f5222d' }}>
              {kitchenStatus}
            </span>
          </div>
          <div style={{ fontSize: '16px', color: '#666', marginBottom: 32 }}>
            {kitchenStatus === 'ON' 
              ? 'Kitchen is accepting and preparing orders' 
              : 'Kitchen is not accepting new orders'}
          </div>
          <Button 
            type={kitchenStatus === 'ON' ? 'default' : 'primary'}
            danger={kitchenStatus === 'ON'}
            size="large"
            style={{ width: 200, height: 50, fontSize: '16px' }}
            onClick={handleStatusToggle}
          >
            {kitchenStatus === 'ON' ? 'TURN KITCHEN OFF' : 'TURN KITCHEN ON'}
          </Button>
        </div>
      </Card>

      <Card title="Status History" bordered={false}>
        <Timeline>
          {statusHistory.map((item, index) => (
            <Timeline.Item 
              key={index}
              color={item.status === 'ON' ? 'green' : 'red'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 500 }}>Kitchen turned {item.status}</div>
                  <div style={{ color: '#666', fontSize: '14px' }}>By {item.changedBy}</div>
                  {item.reason && (
                    <div style={{ color: '#999', fontSize: '12px', marginTop: 4 }}>Reason: {item.reason}</div>
                  )}
                </div>
                <div style={{ color: '#999' }}>{item.timestamp}</div>
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>

      <Modal
        title="Turn Kitchen OFF"
        visible={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        onOk={confirmTurnOff}
        okText="Turn OFF Kitchen"
        okButtonProps={{ danger: true }}
      >
        <p style={{ marginBottom: 16 }}>Are you sure you want to turn the kitchen OFF? New orders will not be accepted.</p>
        <Form layout="vertical">
          <Form.Item label="Reason (Optional)">
            <Input.TextArea
              rows={3}
              placeholder="Enter reason for turning kitchen off"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// Users Management Component
const UsersManagement = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const columns = [
    {
      title: 'Staff Member',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar style={{ marginRight: 12, backgroundColor: '#1890ff' }}>
            {name.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'Admin' ? 'red' : 'blue'}>{role}</Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status === 'active' ? 'Active' : 'Inactive'}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} />
          <Switch defaultChecked={record.status === 'active'} />
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Staff Management</h2>
          <p style={{ color: '#666' }}>Manage admin and staff access</p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setIsAddModalVisible(true)}
        >
          Add Staff
        </Button>
      </div>

      <Card bordered={false}>
        <Table
          dataSource={staffMembers}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="Add New Staff Member"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="Full Name">
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item label="Email">
            <Input placeholder="Enter email address" />
          </Form.Item>
          <Form.Item label="Role">
            <Select defaultValue="Staff">
              <Option value="Admin">Admin</Option>
              <Option value="Staff">Staff</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Permissions">
            <Select mode="multiple" defaultValue={['orders', 'menu']}>
              <Option value="orders">Manage Orders</Option>
              <Option value="menu">Manage Menu</Option>
              <Option value="kitchen">Kitchen Control</Option>
              <Option value="reports">View Reports</Option>
            </Select>
          </Form.Item>
          <div style={{ textAlign: 'right' }}>
            <Button style={{ marginRight: 8 }} onClick={() => setIsAddModalVisible(false)}>
              Cancel
            </Button>
            <Button type="primary">Add Staff</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

// Main App Component
const FirstKitchenAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [kitchenStatus, setKitchenStatus] = useState('ON');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user] = useState({
    name: 'Alex Johnson',
    role: 'Admin'
  });

  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: 'orders', icon: <ShoppingCartOutlined />, label: 'Orders' },
    { key: 'menu', icon: <AppstoreOutlined />, label: 'Menu Management' },
    { key: 'kitchen', icon: <FireOutlined />, label: 'Kitchen Status' },
    { key: 'users', icon: <TeamOutlined />, label: 'Users / Staff' },
    { key: 'reports', icon: <PieChartOutlined />, label: 'Reports' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Settings' }
  ];

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard kitchenStatus={kitchenStatus} setKitchenStatus={setKitchenStatus} />;
      case 'orders':
        return <OrdersManagement />;
      case 'menu':
        return <MenuManagement />;
      case 'kitchen':
        return <KitchenStatus kitchenStatus={kitchenStatus} setKitchenStatus={setKitchenStatus} />;
      case 'users':
        return <UsersManagement />;
      default:
        return <Dashboard kitchenStatus={kitchenStatus} setKitchenStatus={setKitchenStatus} />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={260}
        style={{
          background: '#fff',
          boxShadow: '2px 0 8px rgba(0,0,0,0.06)'
        }}
      >
        <div style={{ padding: '24px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#1890ff' }}>
            {collapsed ? 'FK' : 'First Kitchen'}
          </div>
          {!collapsed && (
            <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
              ADMIN PANEL
            </div>
          )}
        </div>
        <Divider style={{ margin: 0 }} />
        <Menu
          mode="inline"
          selectedKeys={[currentPage]}
          items={menuItems}
          onSelect={({ key }) => setCurrentPage(key)}
          style={{ borderRight: 0, padding: '8px' }}
        />
      </Sider>

      <Layout>
        <Header style={{
          background: '#fff',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
        }}>
          <div style={{ fontSize: '18px', fontWeight: 600 }}>
            {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              background: kitchenStatus === 'ON' ? '#f6ffed' : '#fff2f0',
              border: `1px solid ${kitchenStatus === 'ON' ? '#b7eb8f' : '#ffccc7'}`,
              borderRadius: 4
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: kitchenStatus === 'ON' ? '#52c41a' : '#f5222d'
              }} />
              <span style={{ fontWeight: 500 }}>
                Kitchen: {kitchenStatus}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar style={{ backgroundColor: '#1890ff' }}>
                {user.name.charAt(0)}
              </Avatar>
              <div>
                <div style={{ fontWeight: 500 }}>{user.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{user.role}</div>
              </div>
              <Button 
                type="text" 
                icon={<LogoutOutlined />}
                style={{ marginLeft: 8 }}
              />
            </div>
          </div>
        </Header>

        <Content style={{ margin: '24px', overflow: 'auto' }}>
          <div style={{ 
            background: '#fff', 
            padding: 24, 
            minHeight: 'calc(100vh - 112px)',
            borderRadius: 8
          }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

// Main App Export
export default FirstKitchenAdmin;