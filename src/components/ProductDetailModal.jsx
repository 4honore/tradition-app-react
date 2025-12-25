// src/components/ProductDetailModal.jsx
import React from 'react';

function ProductDetailModal({ product, isOpen, onClose, addToCart }) {
    // Enhanced rendering for the new Premium Modal
    // We do NOT return null if !isOpen, so that the CSS transition can play.
    // We only return null if no product is selected yet.
    if (!product) return null;

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('modal-backdrop-premium')) {
            onClose();
        }
    };

    return (
        <div className={`modal-backdrop-premium ${isOpen ? 'open' : ''}`} onClick={handleBackdropClick}>
            <div className="product-modal-premium">

                {/* Left Column: Huge Image */}
                <div className="modal-image-col">
                    {product.image ? (
                        <img src={product.image} alt={product.name} />
                    ) : (
                        <div style={{ fontSize: '5rem', opacity: 0.2 }}>
                            {product.category === 'women' ? '👗' :
                                product.category === 'men' ? '👔' : '✨'}
                        </div>
                    )}
                </div>

                {/* Right Column: Info & Details */}
                <div className="modal-info-col">
                    <button className="modal-close-abs" onClick={onClose}>&times;</button>

                    <div className="modal-product-header">
                        <span className="modal-badge">{product.category} Collection</span>
                        <h2>{product.name}</h2>
                        <span className="modal-price">${product.price}</span>
                    </div>

                    <div className="modal-description">
                        <p>{product.longDescription || product.description}</p>
                    </div>

                    <div className="detail-specs">
                        {product.sizes && (
                            <div className="spec-item">
                                <h4>Available Sizes</h4>
                                <div className="spec-tags">
                                    {product.sizes.map(size => (
                                        <span key={size} className="spec-tag">{size}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="spec-item">
                            <h4>Rental Terms</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                                {product.rentalPeriod || "Standard 3-day rental period. Extended options available."}
                            </p>
                        </div>

                        {product.features && (
                            <div className="spec-item">
                                <h4>Highlights</h4>
                                <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                    {product.features.map((feature, idx) => (
                                        <li key={idx} style={{ marginBottom: '4px' }}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="modal-actions">
                        <button className="btn" onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product);
                            onClose();
                        }}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailModal;
