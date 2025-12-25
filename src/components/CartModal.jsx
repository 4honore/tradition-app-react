// src/components/CartModal.jsx
import React from 'react';

/**
 * Renders the shopping cart modal.
 * @param {boolean} isOpen - Controls visibility.
 * @param {function} toggleCart - Function to close the modal.
 * @param {Array<Object>} cartItems - The list of products in the cart.
 * @param {function} removeItemFromCart - Function to remove an item by its index.
 * @param {function} onCheckout - Function to handle checkout.

 */
function CartModal({ isOpen, toggleCart, cartItems = [], removeItemFromCart, updateQuantity, onCheckout }) {

    // LOGIC: Calculate the Totals
    // LOGIC: Calculate the Totals
    const subtotal = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    const taxRate = 0.18; // Example 18% tax
    const taxAmount = subtotal * taxRate;
    const finalTotal = subtotal + taxAmount;

    // If the modal is not open, we still render it but with 'open' classes for animation
    // However, for mounting/unmounting simplicity, we can keep it conditional OR 
    // better yet: always render it but control classNames. 
    // To keep it simple with existing App.jsx logic (which conditionally renders),
    // we will stick to conditional + simple CSS transition handling would require 
    // mounting changes. For now, let's assume it mounts/unmounts. 
    // To support slide-in animation properly while conditional, we need a small trick 
    // or just use CSS Keyframes on mount. 
    // BETTER APPROACH: The 'active' class approach is best if parent doesn't unmount it.
    // BUT App.jsx likely does: {isCartOpen && <CartModal ... />}
    // Let's stick to the structure provided in CSS which assumes it might be always present 
    // OR we rely on CSS animation on mount. 

    // Changing approach: The provided CSS uses .open class. 
    // To make it simpler without changing App.jsx too much, we will render
    // the markup that matches the new CSS.

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
                        cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <div className="cart-item-info">
                                    <span className="cart-item-name">{item.name}</span>
                                    <span className="cart-item-price">${(item.price * (item.quantity || 1)).toFixed(2)}</span>

                                    <div className="cart-quantity-controls">
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(index, -1)}
                                            disabled={(item.quantity || 1) <= 1}
                                        >-</button>
                                        <span className="qty-val">{item.quantity || 1}</span>
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(index, 1)}
                                        >+</button>
                                    </div>
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeItemFromCart(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
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