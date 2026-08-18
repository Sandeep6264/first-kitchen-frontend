// src/components/IngredientsModal.jsx (updated structure)
import React from 'react';
import { FiX, FiShoppingCart, FiPlus, FiMinus, FiTag, FiDollarSign } from 'react-icons/fi';
import './IngredientsModal.css';

const IngredientsModal = ({
    isOpen,
    onClose,
    foodItem,
    addToCart,
    updateQty,
    getQty
}) => {
    if (!isOpen || !foodItem) return null;

    const qty = getQty(foodItem.itemId);

    // Extract ingredients from the food item data
    const getIngredients = () => {
        if (foodItem.ingredients && Array.isArray(foodItem.ingredients) && foodItem.ingredients.length > 0) {
            return foodItem.ingredients;
        }

        // Fallback to default ingredients based on category
        const defaultIngredients = {
            'Non-Veg': ['Fresh Chicken', 'Premium Spices', 'Yogurt Marinade', 'Fresh Herbs', 'Special Masala', 'Ginger-Garlic Paste'],
            'Biryani': ['Basmati Rice', 'Premium Meat/Vegetables', 'Biryani Masala', 'Saffron', 'Mint Leaves', 'Fried Onions', 'Ghee'],
            'Veg': ['Fresh Vegetables', 'Creamy Gravy', 'Indian Spices', 'Herbs', 'Tomato Base'],
            'Pizza': ['Fresh Pizza Dough', 'Tomato Sauce', 'Mozzarella Cheese', 'Toppings', 'Italian Herbs'],
            'Chinese': ['Fresh Vegetables', 'Soy Sauce', 'Ginger', 'Garlic', 'Spring Onions'],
            'Breads': ['Whole Wheat Flour', 'Water', 'Yeast', 'Salt'],
        };

        return defaultIngredients[foodItem.itemCategory] ||
            ['Fresh Ingredients', 'Authentic Spices', 'Herbs', 'Traditional Preparation'];
    };

    const ingredients = getIngredients();

    const getServingInfo = () => {
        if (foodItem.serves) return foodItem.serves;

        const price = parseFloat(foodItem.itemPrice) || 0;
        if (price < 100) return '1 person';
        if (price < 250) return '2-3 people';
        if (price < 500) return '4-5 people';
        return 'Family pack';
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose} aria-label="Close">
                    <FiX />
                </button>

                <div className="modal-header">
                    <div className="food-hero">
                        <img
                            src={
                                foodItem.itemImg ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    foodItem.itemName
                                )}&background=d4380d&color=fff&size=400&bold=true`
                            }
                            alt={foodItem.itemName}
                            className="food-hero-img"
                            onError={(e) => {
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    foodItem.itemName
                                )}&background=d4380d&color=fff&size=400&bold=true`;
                            }}
                        />

                        <span className="food-badge category">
                            <FiTag />
                            {foodItem.itemCategory || "Special"}
                        </span>

                        <span className="food-badge price">
                            
                           ₹ {foodItem.itemPrice}
                        </span>

                        {/* name – bottom overlay */}
                        <div className="food-name">
                            {foodItem.itemName}
                        </div>
                    </div>
                </div>

                <div className="modal-body">
                    <h4 className="ingredients-title">Ingredients</h4>

                    {ingredients && ingredients.length > 0 ? (
                        <div className="ingredients-list">
                            {ingredients.map((ingredient, index) => (
                                <div key={index} className="ingredient-item">
                                    <span className="ingredient-name">
                                        {typeof ingredient === 'string' ? ingredient : ingredient.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-ingredients">
                            <span role="img" aria-label="food">📋</span>
                            Our chefs use the freshest ingredients and secret family recipes!
                        </p>
                    )}

                    <div className="food-description">
                        <h4>About this dish</h4>
                        <p>
                            {foodItem.itemDescription || foodItem.description ||
                                `Delicious ${foodItem.itemName} made with authentic spices and fresh ingredients. 
                Perfectly cooked to preserve flavors and served hot.`}
                        </p>
                        <div className="serving-info">
                            <strong>Serves:</strong> {getServingInfo()}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                    {qty === 0 ? (
                        <button
                            className="btn-primary add-to-cart-btn"
                            onClick={() => {
                                addToCart(foodItem);
                                onClose();
                            }}
                        >
                            <FiShoppingCart /> Add to Cart - ₹{foodItem.itemPrice}
                        </button>
                    ) : (
                        <div className="modal-qty-control">
                            <button
                                onClick={() => updateQty(foodItem.itemId, -1)}
                                aria-label="Decrease quantity"
                            >
                                <FiMinus />
                            </button>
                            <span className="modal-qty-num">{qty} in Cart</span>
                            <button
                                onClick={() => updateQty(foodItem.itemId, +1)}
                                aria-label="Increase quantity"
                            >
                                <FiPlus />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IngredientsModal;