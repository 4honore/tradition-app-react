// src/components/ProductDetailModal.jsx
import React, { useState, useEffect } from 'react';

function ProductDetailModal({ product, isOpen, onClose, addToCart, globalPickupDate, globalReturnDate }) {
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [dateError, setDateError] = useState('');

    // Initialize with global dates if available
    useEffect(() => {
        if (globalPickupDate) setPickupDate(globalPickupDate);
        if (globalReturnDate) setReturnDate(globalReturnDate);
    }, [globalPickupDate, globalReturnDate, isOpen]);

    if (!product) return null;

    const today = new Date().toISOString().split('T')[0];

    const calculateDuration = () => {
        if (pickupDate && returnDate) {
            const pickup = new Date(pickupDate);
            const returnD = new Date(returnDate);
            const days = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24));
            return days > 0 ? days : 0;
        }
        return 0;
    };

    const duration = calculateDuration();
    const totalPrice = duration > 0 ? product.price * duration : product.price;

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('modal-backdrop-premium')) {
            onClose();
        }
    };

    const validateDates = () => {
        if (!pickupDate || !returnDate) {
            setDateError('Please select both pickup and return dates');
            return false;
        }

        const pickup = new Date(pickupDate);
        const returnD = new Date(returnDate);

        if (pickup >= returnD) {
            setDateError('Return date must be after pickup date');
            return false;
        }

        setDateError('');
        return true;
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!validateDates()) {
            return;
        }

        // Make sure we're sending all the date information
        const productWithDates = {
            ...product,
            pickupDate: pickupDate,
            returnDate: returnDate,
            rentalDays: duration,
            // Add formatted dates for display
            formattedPickup: new Date(pickupDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            }),
            formattedReturn: new Date(returnDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            })
        };

        console.log('Adding to cart with dates:', productWithDates); // Debug log

        addToCart(productWithDates);
        
        // Keep dates for next modal open
        setDateError('');
        onClose();
    };

    const handlePickupChange = (e) => {
        const selectedDate = e.target.value;
        setPickupDate(selectedDate);
        setDateError('');
        
        // Auto-adjust return date if it becomes invalid
        if (returnDate && selectedDate >= returnDate) {
            setReturnDate('');
        }
    };

    const handleReturnChange = (e) => {
        setReturnDate(e.target.value);
        setDateError('');
    };

    const quickSelectReturn = (days) => {
        if (!pickupDate) return;
        const date = new Date(pickupDate);
        date.setDate(date.getDate() + days);
        setReturnDate(date.toISOString().split('T')[0]);
        setDateError('');
    };

    return (
        <div className={`modal-backdrop-premium ${isOpen ? 'open' : ''}`} onClick={handleBackdropClick}>
            <div className="product-modal-premium">

                {/* Left Column: Image */}
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
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                            <span className="modal-price">${product.price}</span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                per day
                            </span>
                        </div>
                        {duration > 0 && (
                            <div style={{ 
                                marginTop: '10px',
                                padding: '12px',
                                background: 'var(--color-bg-light)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: 'var(--color-primary)'
                            }}>
                                Total: ${totalPrice.toFixed(2)} for {duration} day{duration > 1 ? 's' : ''}
                            </div>
                        )}
                    </div>

                    <div className="modal-description">
                        <p>{product.longDescription || product.description}</p>
                    </div>

                    {/* Enhanced Date Selection */}
                    <div className="modal-date-selection">
                        <h4 style={{ 
                            fontSize: '0.95rem', 
                            fontWeight: '700',
                            textTransform: 'uppercase', 
                            color: 'var(--color-text-main)',
                            marginBottom: '15px',
                            letterSpacing: '0.5px'
                        }}>
                            📅 Select Rental Period
                        </h4>
                        
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: '1fr 1fr', 
                            gap: '15px',
                            marginBottom: '15px'
                        }}>
                            <div>
                                <label style={{ 
                                    display: 'block', 
                                    fontSize: '0.9rem', 
                                    marginBottom: '8px',
                                    color: 'var(--color-text-main)',
                                    fontWeight: '700'
                                }}>
                                    📦 Pickup Date
                                </label>
                                <input
                                    type="date"
                                    value={pickupDate}
                                    onChange={handlePickupChange}
                                    min={today}
                                    style={{
                                        width: '100%',
                                        padding: '14px',
                                        borderRadius: 'var(--radius-md)',
                                        border: `2px solid ${pickupDate ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                        background: 'var(--color-bg-white)',
                                        color: 'var(--color-text-main)',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        fontFamily: 'var(--font-main)',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ 
                                    display: 'block', 
                                    fontSize: '0.9rem', 
                                    marginBottom: '8px',
                                    color: 'var(--color-text-main)',
                                    fontWeight: '700'
                                }}>
                                    🔄 Return Date
                                </label>
                                <input
                                    type="date"
                                    value={returnDate}
                                    onChange={handleReturnChange}
                                    min={pickupDate || today}
                                    disabled={!pickupDate}
                                    style={{
                                        width: '100%',
                                        padding: '14px',
                                        borderRadius: 'var(--radius-md)',
                                        border: `2px solid ${returnDate ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                        background: !pickupDate ? 'var(--color-bg-light)' : 'var(--color-bg-white)',
                                        color: 'var(--color-text-main)',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        fontFamily: 'var(--font-main)',
                                        opacity: !pickupDate ? 0.5 : 1,
                                        cursor: !pickupDate ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Quick Select Buttons */}
                        {pickupDate && (
                            <div style={{ marginBottom: '15px' }}>
                                <p style={{ 
                                    fontSize: '0.85rem', 
                                    color: 'var(--color-text-muted)',
                                    marginBottom: '10px',
                                    fontWeight: '600'
                                }}>
                                    Quick select return date:
                                </p>
                                <div style={{ 
                                    display: 'flex', 
                                    gap: '10px',
                                    flexWrap: 'wrap'
                                }}>
                                    <button
                                        type="button"
                                        onClick={() => quickSelectReturn(3)}
                                        className="quick-select-modal-btn"
                                        style={{
                                            padding: '10px 20px',
                                            borderRadius: '25px',
                                            border: '2px solid var(--color-border)',
                                            background: 'var(--color-bg-white)',
                                            color: 'var(--color-text-main)',
                                            fontSize: '0.9rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            fontFamily: 'var(--font-main)'
                                        }}
                                    >
                                        3 Days
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => quickSelectReturn(7)}
                                        className="quick-select-modal-btn"
                                        style={{
                                            padding: '10px 20px',
                                            borderRadius: '25px',
                                            border: '2px solid var(--color-border)',
                                            background: 'var(--color-bg-white)',
                                            color: 'var(--color-text-main)',
                                            fontSize: '0.9rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            fontFamily: 'var(--font-main)'
                                        }}
                                    >
                                        1 Week
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => quickSelectReturn(14)}
                                        className="quick-select-modal-btn"
                                        style={{
                                            padding: '10px 20px',
                                            borderRadius: '25px',
                                            border: '2px solid var(--color-border)',
                                            background: 'var(--color-bg-white)',
                                            color: 'var(--color-text-main)',
                                            fontSize: '0.9rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            fontFamily: 'var(--font-main)'
                                        }}
                                    >
                                        2 Weeks
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {dateError && (
                            <div style={{
                                padding: '10px 14px',
                                background: 'rgba(220, 38, 38, 0.1)',
                                color: 'var(--color-error)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.85rem',
                                fontWeight: '500',
                                marginBottom: '12px',
                                border: '1px solid rgba(220, 38, 38, 0.2)'
                            }}>
                                ⚠️ {dateError}
                            </div>
                        )}

                        {/* Success Message */}
                        {pickupDate && returnDate && !dateError && duration > 0 && (
                            <div style={{
                                padding: '10px 14px',
                                background: 'rgba(5, 150, 105, 0.1)',
                                color: 'var(--color-success)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.85rem',
                                fontWeight: '500',
                                marginBottom: '12px',
                                border: '1px solid rgba(5, 150, 105, 0.2)'
                            }}>
                                ✓ {duration} day{duration > 1 ? 's' : ''} selected • Total: ${totalPrice.toFixed(2)}
                            </div>
                        )}
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

                        {product.features && (
                            <div className="spec-item">
                                <h4>Highlights</h4>
                                <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                    {product.features.slice(0, 4).map((feature, idx) => (
                                        <li key={idx} style={{ marginBottom: '4px' }}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="modal-actions">
                        <button 
                            className="btn" 
                            onClick={handleAddToCart}
                            disabled={!pickupDate || !returnDate || dateError}
                            style={{
                                opacity: (!pickupDate || !returnDate || dateError) ? 0.6 : 1,
                                cursor: (!pickupDate || !returnDate || dateError) ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {!pickupDate || !returnDate ? 'Select Dates to Continue' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailModal;