import React, { useState } from 'react';
import {
    FaThLarge,
    FaList,
    FaPlus,
    FaUtensils,
    FaCheckCircle,
    FaTags,
    FaShoppingBag,
    FaEdit,
    FaTrash,
    FaPause,
    FaPlay,
    FaTimes,
    FaSearch,
    FaFilter,
    FaStar,
    FaFire,
    FaClock,
    FaDollarSign
} from 'react-icons/fa';
import './MenuManagement.css';

const MenuManagement = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

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
            rating: 4.8,
            ingredients: ['Beef Patty', 'Cheddar', 'Lettuce', 'Tomato'],
            prepTime: '15 mins',
            calories: 580,
            popular: true
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
            rating: 4.6,
            ingredients: ['Mozzarella', 'Tomato Sauce', 'Basil'],
            prepTime: '20 mins',
            calories: 850,
            popular: true
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
            rating: 4.3,
            ingredients: ['Romaine', 'Croutons', 'Parmesan'],
            prepTime: '10 mins',
            calories: 320,
            popular: false
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
            rating: 4.9,
            ingredients: ['Salmon', 'Lemon', 'Butter', 'Vegetables'],
            prepTime: '25 mins',
            calories: 450,
            popular: false
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
            rating: 4.7,
            ingredients: ['Chocolate', 'Flour', 'Eggs', 'Butter'],
            prepTime: '12 mins',
            calories: 420,
            popular: true
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
            rating: 4.4,
            ingredients: ['Lemons', 'Mint', 'Honey'],
            prepTime: '5 mins',
            calories: 120,
            popular: false
        }
    ];

    const categories = [
        { name: 'Burgers', count: 8, status: 'active', icon: '🍔' },
        { name: 'Pizza', count: 6, status: 'active', icon: '🍕' },
        { name: 'Salads', count: 5, status: 'active', icon: '🥗' },
        { name: 'Main Course', count: 7, status: 'active', icon: '🍽️' },
        { name: 'Desserts', count: 4, status: 'active', icon: '🍰' },
        { name: 'Beverages', count: 9, status: 'active', icon: '🥤' },
    ];

    const handleToggleStatus = (itemId) => {
        console.log(`Toggled status for item ${itemId}`);
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setShowAddModal(true);
    };

    const handleSaveItem = (itemData) => {
        console.log('Saving item:', itemData);
        setShowAddModal(false);
        setEditItem(null);
    };

    const filteredItems = menuItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="menu-management">
            {/* Header */}
            <div className="page-header">
                <div className="header-left">
                    <h1>Menu Management</h1>
                    <p>Manage your restaurant menu items and categories</p>
                </div>
                <div className="header-right">
                    <div className="view-toggle">
                        <button
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <FaThLarge size={16} />
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <FaList size={16} />
                        </button>
                    </div>
                    <button
                        className="btn-primary"
                        onClick={() => setShowAddModal(true)}
                    >
                        <FaPlus size={14} />
                        Add Item
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#fef2ef', color: '#E54304' }}>
                        <FaUtensils size={20} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{menuItems.length}</span>
                        <span className="stat-label">Total Items</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#f0fdf4', color: '#22c55e' }}>
                        <FaCheckCircle size={20} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{menuItems.filter(item => item.status === 'active').length}</span>
                        <span className="stat-label">Active Items</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#fef9e7', color: '#f59e0b' }}>
                        <FaTags size={20} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{categories.length}</span>
                        <span className="stat-label">Categories</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
                        <FaShoppingBag size={20} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">142</span>
                        <span className="stat-label">Today's Orders</span>
                    </div>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="search-filters">
                <div className="search-box">
                    <FaSearch className="search-icon" size={16} />
                    <input
                        type="text"
                        placeholder="Search menu items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button className="clear-search" onClick={() => setSearchTerm('')}>
                            <FaTimes size={14} />
                        </button>
                    )}
                </div>
                <div className="filter-group">
                    <select
                        className="filter-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                    <button className="btn-filter">
                        <FaFilter size={14} />
                        Filters
                    </button>
                </div>
            </div>

            {/* Categories */}
            <div className="categories-section">
                <div className="section-header">
                    <h3>Categories</h3>
                    <button className="btn-outline">
                        <FaPlus size={12} />
                        Add Category
                    </button>
                </div>
                <div className="categories-grid">
                    {categories.map(category => (
                        <div key={category.name} className="category-card">
                            <div className="category-icon">{category.icon}</div>
                            <div className="category-info">
                                <h4>{category.name}</h4>
                                <span className="category-count">{category.count} items</span>
                            </div>
                            <span className={`status-badge ${category.status === 'active' ? 'active' : 'inactive'}`}>
                                {category.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Menu Items */}
            <div className="menu-items-section">
                <div className="section-header">
                    <h3>Menu Items</h3>
                    <span className="items-count">{filteredItems.length} items</span>
                </div>

                {viewMode === 'grid' ? (
                    <div className="menu-grid">
                        {filteredItems.map(item => (
                            <div key={item.id} className="menu-card">
                                <div className="card-image">
                                    <div className="image-emoji">{item.image}</div>
                                    {item.popular && (
                                        <span className="popular-badge">
                                            <FaFire size={12} />
                                            Popular
                                        </span>
                                    )}
                                    <span className={`status-badge ${item.status}`}>
                                        {item.status === 'active' ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <div className="card-body">
                                    <div className="card-header">
                                        <h4>{item.name}</h4>
                                        <span className="price">
                                            <FaDollarSign size={12} />
                                            {item.price.toFixed(2)}
                                        </span>
                                    </div>
                                    <p className="description">{item.description}</p>
                                    <div className="card-meta">
                                        <span className="meta-tag">
                                            <FaClock size={12} />
                                            {item.prepTime}
                                        </span>
                                        <span className="meta-tag">
                                            <FaStar size={12} />
                                            {item.rating}
                                        </span>
                                        <span className="meta-tag">{item.sales} sales</span>
                                    </div>
                                    <div className="ingredients">
                                        {item.ingredients.slice(0, 3).map((ing, idx) => (
                                            <span key={idx} className="ingredient-tag">{ing}</span>
                                        ))}
                                        {item.ingredients.length > 3 && (
                                            <span className="more-tag">+{item.ingredients.length - 3}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="card-actions">
                                    <button
                                        className="action-btn edit"
                                        onClick={() => handleEdit(item)}
                                    >
                                        <FaEdit size={14} />
                                    </button>
                                    <button
                                        className={`action-btn toggle ${item.status}`}
                                        onClick={() => handleToggleStatus(item.id)}
                                    >
                                        {item.status === 'active' ? <FaPause size={14} /> : <FaPlay size={14} />}
                                    </button>
                                    <button className="action-btn delete">
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="table-container">
                        <table className="menu-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Sales</th>
                                    <th>Rating</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="table-item">
                                                <span className="item-emoji">{item.image}</span>
                                                <div>
                                                    <div className="item-name">{item.name}</div>
                                                    <div className="item-desc">{item.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="category-tag">{item.category}</span>
                                        </td>
                                        <td className="price-cell">${item.price.toFixed(2)}</td>
                                        <td>
                                            <span className={`status-badge ${item.status}`}>
                                                {item.status === 'active' ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td>{item.sales}</td>
                                        <td>
                                            <span className="rating">
                                                <FaStar size={12} color="#f59e0b" />
                                                {item.rating}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="action-btn edit"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    <FaEdit size={14} />
                                                </button>
                                                <button
                                                    className={`action-btn toggle ${item.status}`}
                                                    onClick={() => handleToggleStatus(item.id)}
                                                >
                                                    {item.status === 'active' ? <FaPause size={14} /> : <FaPlay size={14} />}
                                                </button>
                                                <button className="action-btn delete">
                                                    <FaTrash size={14} />
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

            {/* Modal */}
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

// Modal Component
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
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{item ? 'Edit Menu Item' : 'Add New Item'}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <FaTimes size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Item Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category *</label>
                                <select
                                    name="category"
                                    className="form-input"
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
                                <label>Price ($) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="form-input"
                                    value={formData.price}
                                    onChange={handleChange}
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    name="status"
                                    className="form-input"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="form-group full-width">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    className="form-input"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Prep Time</label>
                                <input
                                    type="text"
                                    name="prepTime"
                                    className="form-input"
                                    placeholder="e.g., 15 mins"
                                    value={formData.prepTime}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Calories</label>
                                <input
                                    type="number"
                                    name="calories"
                                    className="form-input"
                                    value={formData.calories}
                                    onChange={handleChange}
                                    min="0"
                                />
                            </div>
                            <div className="form-group full-width">
                                <label>Ingredients (comma separated)</label>
                                <textarea
                                    name="ingredients"
                                    className="form-input"
                                    rows="2"
                                    placeholder="e.g., Beef Patty, Lettuce, Tomato"
                                    value={formData.ingredients}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-save">
                            {item ? 'Update Item' : 'Add Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MenuManagement;