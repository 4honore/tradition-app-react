// src/components/ProductDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../productData';

function ProductDetail({ addToCart, setToast }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <h2>Product not found</h2>
                <p>The product you're looking for doesn't exist.</p>
                <button className="btn" onClick={() => navigate('/')}>
                    Back to Home
                </button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product);
        setToast(`${product.name} added to cart!`);
    };

    return (
        <div className="product-detail-page">
            <div className="container">
                <button
                    className="back-button"
                    onClick={() => navigate('/')}
                >
                    ← Back to Products
                </button>

                <div className="product-detail-content">
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
                        <div className="product-header">
                            <h1>{product.name}</h1>
                            <div className="product-price">${product.price}</div>
                        </div>

                        <div className="product-meta">
                            <span className={`category-badge category-${product.category}`}>
                                {product.category}
                            </span>
                            <span className={`availability ${product.available ? 'available' : 'unavailable'}`}>
                                {product.available ? '✓ Available' : '✗ Unavailable'}
                            </span>
                        </div>

                        <div className="product-description">
                            <h3>Description</h3>
                            <p>{product.longDescription}</p>
                        </div>

                        <div className="product-features">
                            <h3>Features</h3>
                            <ul>
                                {product.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="product-details">
                            <div className="detail-item">
                                <h4>Available Sizes</h4>
                                <div className="sizes">
                                    {product.sizes.map(size => (
                                        <span key={size} className="size-tag">{size}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="detail-item">
                                <h4>Rental Period</h4>
                                <p>{product.rentalPeriod}</p>
                            </div>

                            <div className="detail-item">
                                <h4>Care Instructions</h4>
                                <p>{product.careInstructions}</p>
                            </div>
                        </div>

                        <div className="product-actions">
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
            </div>
        </div>
    );
}

export default ProductDetail;
