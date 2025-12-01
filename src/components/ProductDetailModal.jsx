// src/components/ProductDetailModal.jsx
import React from 'react';

function ProductDetailModal({ product, isOpen, onClose, addToCart }) {
    if (!isOpen) return null;

    const handleAddToCart = () => {
        addToCart(product);
        onClose(); // Close modal after adding to cart
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleBackdropClick}>
            <div className="product-detail-modal">
                <div className="modal-header">
                    <h2>{product.name}</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-content">
                    <div className="product-image-section">
                        <div className="product-image-large">
                            {product.image ? (
                                <img src={product.image} alt={product.name} />
                            ) : (
                                <div className="image-placeholder">
                                    <span className="placeholder-icon">
                                        {product.category === 'women' ? '👗' :
                                         product.category === 'men' ? '👔' : '👶'}
                                    </span>
                                    <p>Traditional Attire</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="product-info-section">
                        <div className="product-price">${product.price}</div>

                        <div className="product-meta">
                            <span className={`category-badge category-${product.category}`}>
                                {product.category}
                            </span>
                        </div>

                        <div className="product-description">
                            <p>{product.longDescription || product.description}</p>
                        </div>

                        {product.features && (
                            <div className="product-features">
                                <h4>Features</h4>
                                <ul>
                                    {product.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="product-details-grid">
                            {product.sizes && (
                                <div className="detail-item">
                                    <h4>Available Sizes</h4>
                                    <div className="sizes">
                                        {product.sizes.map(size => (
                                            <span key={size} className="size-tag">{size}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="detail-item">
                                <h4>Rental Period</h4>
                                <p>{product.rentalPeriod || "Up to 3 days"}</p>
                            </div>

                            {product.careInstructions && (
                                <div className="detail-item">
                                    <h4>Care Instructions</h4>
                                    <p>{product.careInstructions}</p>
                                </div>
                            )}
                        </div>

                        <div className="modal-actions">
                            <button className="btn" onClick={handleAddToCart}>
                                Add to Cart - ${product.price}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailModal;
