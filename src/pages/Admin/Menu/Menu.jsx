// pages/MenuManagement.jsx
import React, { useState } from 'react';
import './MenuManagement.css';

const MenuManagement = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    const menuItems = [
        {
            id: 1,
            name: 'Classic Cheeseburger',
            description: 'Beef patty, cheddar cheese, lettuce, tomato, special sauce',
            category: 'Burgers',
            price: 12.99,
            image: '🍔',
            status: 'active',
            sales: 142,
            ingredients: ['Beef Patty', 'Cheddar', 'Lettuce', 'Tomato'],
            prepTime: '15 mins',
            calories: 580
        },
        {
            id: 2,
            name: 'Margherita Pizza',
            description: 'Fresh mozzarella, tomato sauce, basil leaves',
            category: 'Pizza',
            price: 15.99,
            image: '🍕',
            status: 'active',
            sales: 89,
            ingredients: ['Mozzarella', 'Tomato Sauce', 'Basil'],
            prepTime: '20 mins',
            calories: 850
        },
        {
            id: 3,
            name: 'Caesar Salad',
            description: 'Romaine lettuce, croutons, parmesan, Caesar dressing',
            category: 'Salads',
            price: 10.99,
            image: '🥗',
            status: 'active',
            sales: 67,
            ingredients: ['Romaine', 'Croutons', 'Parmesan'],
            prepTime: '10 mins',
            calories: 320
        },
        {
            id: 4,
            name: 'Grilled Salmon',
            description: 'Atlantic salmon with lemon butter sauce and vegetables',
            category: 'Main Course',
            price: 24.99,
            image: '🐟',
            status: 'inactive',
            sales: 23,
            ingredients: ['Salmon', 'Lemon', 'Butter', 'Vegetables'],
            prepTime: '25 mins',
            calories: 450
        },
        {
            id: 5,
            name: 'Chocolate Lava Cake',
            description: 'Warm chocolate cake with molten chocolate center',
            category: 'Desserts',
            price: 8.99,
            image: '🍰',
            status: 'active',
            sales: 105,
            ingredients: ['Chocolate', 'Flour', 'Eggs', 'Butter'],
            prepTime: '12 mins',
            calories: 420
        },
        {
            id: 6,
            name: 'Fresh Lemonade',
            description: 'Freshly squeezed lemons with mint and honey',
            category: 'Beverages',
            price: 4.99,
            image: '🍋',
            status: 'active',
            sales: 156,
            ingredients: ['Lemons', 'Mint', 'Honey'],
            prepTime: '5 mins',
            calories: 120
        }
    ];

    const categories = [
        { name: 'Burgers', count: 8, status: 'active' },
        { name: 'Pizza', count: 6, status: 'active' },
        { name: 'Salads', count: 5, status: 'active' },
        { name: 'Main Course', count: 7, status: 'active' },
        { name: 'Desserts', count: 4, status: 'active' },
        { name: 'Beverages', count: 9, status: 'active' },
    ];

    const handleToggleStatus = (itemId) => {
        // In a real app, this would update the backend
        console.log(`Toggled status for item ${itemId}`);
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setShowAddModal(true);
    };

    const handleSaveItem = (itemData) => {
        // In a real app, this would save to backend
        console.log('Saving item:', itemData);
        setShowAddModal(false);
        setEditItem(null);
    };

    return (
        <div className="menu-management">
            <div className="screen-header">
                <h1>Menu Management</h1>
                <div className="header-actions">
                    <div className="view-toggle">
                        <button
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <i className="fas fa-th-large"></i>
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <i className="fas fa-list"></i>
                        </button>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowAddModal(true)}
                    >
                        <i className="fas fa-plus"></i>
                        Add New Item
                    </button>
                </div>
            </div>

            {/* Menu Stats */}
            <div className="menu-stats-grid">
                <div className="menu-stat-card">
                    <div className="stat-content">
                        <div className="stat-value">{menuItems.length}</div>
                        <div className="stat-label">Total Items</div>
                    </div>
                    <div className="stat-icon">
                        <i className="fas fa-utensils"></i>
                    </div>
                </div>
                <div className="menu-stat-card">
                    <div className="stat-content">
                        <div className="stat-value">{menuItems.filter(item => item.status === 'active').length}</div>
                        <div className="stat-label">Active Items</div>
                    </div>
                    <div className="stat-icon">
                        <i className="fas fa-check-circle"></i>
                    </div>
                </div>
                <div className="menu-stat-card">
                    <div className="stat-content">
                        <div className="stat-value">{categories.length}</div>
                        <div className="stat-label">Categories</div>
                    </div>
                    <div className="stat-icon">
                        <i className="fas fa-tags"></i>
                    </div>
                </div>
                <div className="menu-stat-card">
                    <div className="stat-content">
                        <div className="stat-value">142</div>
                        <div className="stat-label">Today's Orders</div>
                    </div>
                    <div className="stat-icon">
                        <i className="fas fa-shopping-bag"></i>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="categories-section">
                <div className="section-header">
                    <h3>Categories</h3>
                    <button className="btn btn-outline">
                        <i className="fas fa-plus"></i>
                        Add Category
                    </button>
                </div>
                <div className="categories-grid">
                    {categories.map(category => (
                        <div key={category.name} className="category-card">
                            <div className="category-header">
                                <h4>{category.name}</h4>
                                <span className="category-count">{category.count} items</span>
                            </div>
                            <div className="category-actions">
                                <span className={`status-tag ${category.status === 'active' ? 'status-success' : 'status-cancelled'}`}>
                                    {category.status === 'active' ? 'Active' : 'Inactive'}
                                </span>
                                <button className="btn-icon">
                                    <i className="fas fa-edit"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Menu Items */}
            <div className="menu-items-section">
                <div className="section-header">
                    <h3>Menu Items</h3>
                    <div className="section-filters">
                        <select className="form-control" style={{ width: '150px' }}>
                            <option>All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                        <select className="form-control" style={{ width: '150px' }}>
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                </div>

                {viewMode === 'grid' ? (
                    <div className="menu-items-grid">
                        {menuItems.map(item => (
                            <div key={item.id} className="menu-item-card">
                                <div className="item-image">
                                    <div className="image-placeholder">
                                        {item.image}
                                    </div>
                                    <div className={`item-status ${item.status}`}>
                                        {item.status === 'active' ? 'Active' : 'Inactive'}
                                    </div>
                                </div>
                                <div className="item-content">
                                    <div className="item-header">
                                        <h4>{item.name}</h4>
                                        <div className="item-price">${item.price.toFixed(2)}</div>
                                    </div>
                                    <p className="item-description">{item.description}</p>
                                    <div className="item-meta">
                                        <span className="item-category">{item.category}</span>
                                        <span className="item-sales">{item.sales} sales</span>
                                        <span className="item-time">{item.prepTime}</span>
                                    </div>
                                    <div className="item-ingredients">
                                        {item.ingredients.slice(0, 3).map((ing, idx) => (
                                            <span key={idx} className="ingredient-tag">{ing}</span>
                                        ))}
                                        {item.ingredients.length > 3 && (
                                            <span className="more-tag">+{item.ingredients.length - 3} more</span>
                                        )}
                                    </div>
                                </div>
                                <div className="item-actions">
                                    <button
                                        className="btn-icon edit-btn"
                                        onClick={() => handleEdit(item)}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className={`toggle-btn ${item.status}`}
                                        onClick={() => handleToggleStatus(item.id)}
                                    >
                                        {item.status === 'active' ? 'Disable' : 'Enable'}
                                    </button>
                                    <button className="btn-icon delete-btn">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="menu-items-table">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Sales</th>
                                    <th>Prep Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menuItems.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="table-item">
                                                <div className="item-emoji">{item.image}</div>
                                                <div className="item-details">
                                                    <div className="item-name">{item.name}</div>
                                                    <div className="item-desc">{item.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="category-tag">{item.category}</span>
                                        </td>
                                        <td>
                                            <div className="item-price">${item.price.toFixed(2)}</div>
                                        </td>
                                        <td>
                                            <span className={`status-tag ${item.status === 'active' ? 'status-success' : 'status-cancelled'}`}>
                                                {item.status === 'active' ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="sales-count">{item.sales}</div>
                                        </td>
                                        <td>
                                            <div className="prep-time">{item.prepTime}</div>
                                        </td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="btn-icon edit-btn"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button
                                                    className={`btn-icon ${item.status === 'active' ? 'disable-btn' : 'enable-btn'}`}
                                                    onClick={() => handleToggleStatus(item.id)}
                                                >
                                                    <i className={`fas fa-${item.status === 'active' ? 'pause' : 'play'}`}></i>
                                                </button>
                                                <button className="btn-icon delete-btn">
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add/Edit Item Modal */}
            {showAddModal && (
                <AddEditItemModal
                    item={editItem}
                    onClose={() => {
                        setShowAddModal(false);
                        setEditItem(null);
                    }}
                    onSave={handleSaveItem}
                />
            )}
        </div>
    );
};

const AddEditItemModal = ({ item, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: item?.name || '',
        description: item?.description || '',
        category: item?.category || '',
        price: item?.price || '',
        status: item?.status || 'active',
        prepTime: item?.prepTime || '',
        calories: item?.calories || '',
        ingredients: item?.ingredients?.join(', ') || ''
    });

    const categories = ['Burgers', 'Pizza', 'Salads', 'Main Course', 'Desserts', 'Beverages'];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(i => i)
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{item ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="name">Item Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Category *</label>
                                <select
                                    id="category"
                                    name="category"
                                    className="form-control"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price ($) *</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    className="form-control"
                                    value={formData.price}
                                    onChange={handleChange}
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    className="form-control"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="form-group full-width">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="form-control"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="prepTime">Preparation Time</label>
                                <input
                                    type="text"
                                    id="prepTime"
                                    name="prepTime"
                                    className="form-control"
                                    placeholder="e.g., 15 mins"
                                    value={formData.prepTime}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="calories">Calories</label>
                                <input
                                    type="number"
                                    id="calories"
                                    name="calories"
                                    className="form-control"
                                    value={formData.calories}
                                    onChange={handleChange}
                                    min="0"
                                />
                            </div>
                            <div className="form-group full-width">
                                <label htmlFor="ingredients">Ingredients (comma separated)</label>
                                <textarea
                                    id="ingredients"
                                    name="ingredients"
                                    className="form-control"
                                    rows="2"
                                    placeholder="e.g., Beef Patty, Lettuce, Tomato, Cheese"
                                    value={formData.ingredients}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {item ? 'Update Item' : 'Add Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MenuManagement;