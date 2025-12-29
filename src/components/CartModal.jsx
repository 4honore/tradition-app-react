// src/components/CartModal.jsx
import React from 'react';

function CartModal({ isOpen, toggleCart, cartItems = [], removeItemFromCart, updateQuantity, onCheckout }) {

    // Calculate totals with rental days
    const subtotal = cartItems.reduce((total, item) => {
        const days = item.rentalDays || 1;
        return total + (item.price * days * (item.quantity || 1));
    }, 0);
    
    const taxRate = 0.18;
    const taxAmount = subtotal * taxRate;
    const finalTotal = subtotal + taxAmount;

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={toggleCart}></div>
            <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>Shopping Cart ({cartItems.length})</h2>
                    <button className="cart-close-btn" onClick={toggleCart}>&times;</button>
                </div>

                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart-message">
                            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🛒</span>
                            <p>Your cart is empty.</p>
                            <button className="btn" onClick={toggleCart} style={{ marginTop: '1rem' }}>
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        cartItems.map((item, index) => {
                            const days = item.rentalDays || 1;
                            const itemTotal = item.price * days * (item.quantity || 1);
                            
                            // Debug log to see what data we have
                            console.log('Cart item:', {
                                name: item.name,
                                rentalDays: item.rentalDays,
                                pickupDate: item.pickupDate,
                                returnDate: item.returnDate,
                                formattedPickup: item.formattedPickup,
                                formattedReturn: item.formattedReturn
                            });
                            
                            return (
                                <div key={index} className="cart-item" style={{ paddingBottom: '15px' }}>
                                    <div className="cart-item-info" style={{ width: '100%' }}>
                                        <span className="cart-item-name" style={{ 
                                            fontSize: '1.1rem',
                                            marginBottom: '8px',
                                            display: 'block'
                                        }}>
                                            {item.name}
                                        </span>
                                        
                                        {/* Rental dates - ALWAYS SHOW IF AVAILABLE */}
                                        {(item.pickupDate || item.returnDate) && (
                                            <div style={{ 
                                                fontSize: '0.9rem', 
                                                color: 'var(--color-text-main)',
                                                marginTop: '6px',
                                                marginBottom: '10px',
                                                padding: '10px',
                                                background: 'var(--color-bg-light)',
                                                borderRadius: 'var(--radius-sm)',
                                                borderLeft: '3px solid var(--color-primary)'
                                            }}>
                                                <div style={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    marginBottom: '4px'
                                                }}>
                                                    <span style={{ fontSize: '1rem' }}>📅</span>
                                                    <strong>Rental Period:</strong>
                                                </div>
                                                <div style={{ marginLeft: '26px', lineHeight: '1.6' }}>
                                                    <div>
                                                        <strong>Pickup:</strong> {item.formattedPickup || formatDate(item.pickupDate)}
                                                    </div>
                                                    <div>
                                                        <strong>Return:</strong> {item.formattedReturn || formatDate(item.returnDate)}
                                                    </div>
                                                    <div style={{ 
                                                        marginTop: '6px',
                                                        color: 'var(--color-primary)',
                                                        fontWeight: '700',
                                                        fontSize: '0.95rem'
                                                    }}>
                                                        Duration: {days} day{days !== 1 ? 's' : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Price breakdown */}
                                        <div style={{ 
                                            fontSize: '0.85rem', 
                                            color: 'var(--color-text-muted)',
                                            marginBottom: '10px'
                                        }}>
                                            ${item.price}/day × {days} day{days !== 1 ? 's' : ''} × {item.quantity || 1} item{(item.quantity || 1) > 1 ? 's' : ''}
                                        </div>
                                        
                                        <span className="cart-item-price" style={{ 
                                            fontSize: '1.3rem',
                                            display: 'block',
                                            marginBottom: '12px'
                                        }}>
                                            ${itemTotal.toFixed(2)}
                                        </span>

                                        <div className="cart-quantity-controls" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            marginTop: '8px'
                                        }}>
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(index, -1)}
                                                disabled={(item.quantity || 1) <= 1}
                                                style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '50%',
                                                    border: '2px solid var(--color-border)',
                                                    background: 'var(--color-bg-light)',
                                                    color: 'var(--color-text-main)',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '1.1rem',
                                                    fontWeight: '700'
                                                }}
                                            >−</button>
                                            <span className="qty-val" style={{ 
                                                minWidth: '30px', 
                                                textAlign: 'center',
                                                fontWeight: '700',
                                                fontSize: '1.1rem'
                                            }}>
                                                {item.quantity || 1}
                                            </span>
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(index, 1)}
                                                style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '50%',
                                                    border: '2px solid var(--color-border)',
                                                    background: 'var(--color-bg-light)',
                                                    color: 'var(--color-text-main)',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '1.1rem',
                                                    fontWeight: '700'
                                                }}
                                            >+</button>
                                        </div>
                                    </div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeItemFromCart(index)}
                                        style={{
                                            alignSelf: 'flex-start',
                                            marginTop: '5px'
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax (18%)</span>
                            <span>${taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>${finalTotal.toFixed(2)}</span>
                        </div>
                        <button className="btn checkout-btn" onClick={onCheckout}>
                            Checkout Now
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartModal;