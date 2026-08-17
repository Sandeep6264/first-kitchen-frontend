// pages/Categories.jsx
import React, { useState } from 'react';
import './Categories.css';
import { FaEdit } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";




const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Burgers', itemCount: 8, status: 'active', description: 'All burger items' },
    { id: 2, name: 'Pizza', itemCount: 6, status: 'active', description: 'Various pizza types' },
    { id: 3, name: 'Salads', itemCount: 5, status: 'active', description: 'Fresh salads' },
    { id: 4, name: 'Main Course', itemCount: 7, status: 'active', description: 'Main dishes' },
    { id: 5, name: 'Desserts', itemCount: 4, status: 'inactive', description: 'Sweet treats' },
    { id: 6, name: 'Beverages', itemCount: 9, status: 'active', description: 'Drinks & beverages' },
    { id: 7, name: 'Appetizers', itemCount: 3, status: 'active', description: 'Starters' },
    { id: 8, name: 'Sides', itemCount: 5, status: 'active', description: 'Side dishes' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const handleToggleStatus = (id) => {
    setCategories(cats =>
      cats.map(cat =>
        cat.id === id
          ? { ...cat, status: cat.status === 'active' ? 'inactive' : 'active' }
          : cat
      )
    );
  };

  return (
    <div className="categories-screen">
      <div className="screen-header">
        <h1>Categories Management</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <i className="fas fa-plus"></i>
          Add Category
        </button>
      </div>

      <div className="stats-summary">
        <div className="stat-item">
          <div className="stat-value">{categories.length}</div>
          <div className="stat-label">Total Categories</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{categories.filter(c => c.status === 'active').length}</div>
          <div className="stat-label">Active Categories</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{categories.reduce((sum, cat) => sum + cat.itemCount, 0)}</div>
          <div className="stat-label">Total Items</div>
        </div>
      </div>

      <div className="categories-table-card">
        <div className="table-filters">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search categories..." />
          </div>
          <select className="status-filter">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Description</th>
              <th>Items Count</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td>
                  <div className="category-info">
                    <div className="category-name">{category.name}</div>
                  </div>
                </td>
                <td>
                  <div className="category-description">{category.description}</div>
                </td>
                <td>
                  <div className="item-count">{category.itemCount} items</div>
                </td>
                <td>
                  <span className={`status-tag ${category.status === 'active' ? 'status-success' : 'status-cancelled'}`}>
                    {category.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-icon edit-btn"
                      onClick={() => {
                        setEditCategory(category);
                        setShowAddModal(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={`btn-icon ${category.status === 'active' ? 'disable-btn' : 'enable-btn'}`}
                      onClick={() => handleToggleStatus(category.id)}
                    >
                      {category.status === 'active' ? <FaCirclePause className="text-danger" /> : <FaPlay className="text-success" />}
                    </button>
                    <button className="btn-icon delete-btn">
                      <MdDeleteForever size={20} />

                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <CategoryModal
          category={editCategory}
          onClose={() => {
            setShowAddModal(false);
            setEditCategory(null);
          }}
          onSave={(data) => {
            if (editCategory) {
              // Update existing category
              setCategories(cats =>
                cats.map(cat =>
                  cat.id === editCategory.id ? { ...cat, ...data } : cat
                )
              );
            } else {
              // Add new category
              setCategories(cats => [...cats, { id: cats.length + 1, ...data }]);
            }
            setShowAddModal(false);
            setEditCategory(null);
          }}
        />
      )}
    </div>
  );
};

const CategoryModal = ({ category, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || '',
    status: category?.status || 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{category ? 'Edit Category' : 'Add New Category'}</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Category Name *</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                className="form-control"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {category ? 'Update Category' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Categories;