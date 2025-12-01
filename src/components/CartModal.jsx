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
function CartModal({ isOpen, toggleCart, cartItems, removeItemFromCart, onCheckout }) {
    
    // If the modal is not open, return null (nothing rendered)
    if (!isOpen) {
        return null;
    }

    // LOGIC: Calculate the Totals
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    const taxRate = 0.18; // Example 18% tax
    const taxAmount = subtotal * taxRate;
    const finalTotal = subtotal + taxAmount;
    
    return (
        // The modal overlay uses position: fixed and a high z-index (via CSS)
        <div className="modal-overlay">
            <div className="cart-modal">
                <div className="modal-header">
                    <h2>Your Cart</h2>
                    {/* Close button calls the toggleCart function from App.jsx */}
                    <button className="close-btn" onClick={toggleCart}>&times;</button>
                </div>

                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <p className="empty-cart-message">Your cart is empty. Start shopping!</p>
                    ) : (
                        cartItems.map((item, index) => (
                            // Using index as the key is acceptable here since cart item order is managed by App.jsx
                            <div key={index} className="cart-item">
                                <span className="item-name">{item.name}</span>
                                <span className="item-price">${item.price.toFixed(2)}</span>
                                <button 
                                    className="remove-item-btn" 
                                    // 🌟 CRITICAL: This calls the App.jsx function with the item's index 🌟
                                    onClick={() => removeItemFromCart(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-summary">
                        <p>Subtotal: <span>${subtotal.toFixed(2)}</span></p>
                        <p>Tax (18%): <span>${taxAmount.toFixed(2)}</span></p>
                        <h3 className="final-total">Total: <span>${finalTotal.toFixed(2)}</span></h3>
                        <button className="btn checkout-btn" onClick={onCheckout}>Proceed to Checkout</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartModal;