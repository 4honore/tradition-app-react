// src/components/ProductCard.jsx
import React from 'react';

// ProductCard receives the product data, addToCart function, and openProductModal function as props
function ProductCard({ product, addToCart, openProductModal }) {
    const handleAddToCart = () => {
        // Call the function passed down from App.jsx, giving it the product object
        addToCart(product);
    };

    const handleViewDetails = () => {
        // Call the function passed down from App.jsx to open the product modal
        if (openProductModal) {
            openProductModal(product);
        }
    };

    // Generate a placeholder based on category
    const getPlaceholderIcon = (category) => {
        const icons = {
            women: '👗',
            men: '👔',
            children: '👶'
        };
        return icons[category] || '👕';
    };

    return (
        <div className="product-card">
            {/* Product Image with fallback */}
            <div className="product-image-container">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                <div className="product-image-placeholder">
                    <span className="placeholder-icon">{getPlaceholderIcon(product.category)}</span>
                    <span className="placeholder-text">Traditional Attire</span>
                </div>
            </div>
            
            <div className="product-info">
                <h4
                    className="product-name-link"
                    onClick={handleViewDetails}
                >
                    {product.name}
                </h4>
                <p className="price">${product.price}</p>
                <p className="description">{product.description}</p>

                <div className="card-actions">
                    <button
                        className="btn view-details-btn"
                        onClick={handleViewDetails}
                    >
                        View Details
                    </button>
                    <button
                        className="btn add-to-cart-btn"
                        onClick={handleAddToCart}
                        disabled={!product.available}
                    >
                        {product.available ? 'Add to Cart' : 'Unavailable'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;