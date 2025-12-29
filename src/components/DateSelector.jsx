// src/components/DateSelector.jsx
import React from 'react';

function DateSelector({ pickupDate, setPickupDate, returnDate, setReturnDate }) {
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Calculate rental duration
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

    // Validation messages
    const getValidationMessage = () => {
        if (!pickupDate && !returnDate) return null;
        
        if (pickupDate && !returnDate) {
            return {
                type: 'info',
                message: '📅 Please select a return date'
            };
        }

        if (pickupDate && returnDate) {
            const pickup = new Date(pickupDate);
            const returnD = new Date(returnDate);
            
            if (returnD <= pickup) {
                return {
                    type: 'error',
                    message: '⚠️ Return date must be after pickup date'
                };
            }

            if (duration > 0) {
                return {
                    type: 'success',
                    message: `✓ Rental period: ${duration} day${duration > 1 ? 's' : ''} selected`
                };
            }
        }

        return null;
    };

    const validationMessage = getValidationMessage();

    const handlePickupChange = (e) => {
        const selectedDate = e.target.value;
        setPickupDate(selectedDate);
        
        // Auto-adjust return date if it becomes invalid
        if (returnDate && selectedDate >= returnDate) {
            setReturnDate('');
        }
    };

    const handleReturnChange = (e) => {
        setReturnDate(e.target.value);
    };

    return (
        <div className="container">
            <div className="date-selector">
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ 
                        fontSize: '1.8rem', 
                        marginBottom: '0.5rem',
                        color: 'var(--color-text-main)'
                    }}>
                        📅 Select Your Rental Period
                    </h3>
                    <p style={{ 
                        color: 'var(--color-text-muted)',
                        fontSize: '1rem'
                    }}>
                        Choose your pickup and return dates to view available items
                    </p>
                </div>
                
                <div className="date-inputs">
                    {/* Pickup Date Input */}
                    <div className="date-group">
                        <label htmlFor="pickupDate">
                            <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>📦</span>
                            Pickup Date
                        </label>
                        <input 
                            type="date" 
                            id="pickupDate"
                            value={pickupDate || ''}
                            onChange={handlePickupChange}
                            min={today}
                            className={pickupDate ? 'has-value' : ''}
                        />
                    </div>
                    
                    <div className="arrow">→</div>
                    
                    {/* Return Date Input */}
                    <div className="date-group">
                        <label htmlFor="returnDate">
                            <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>🔄</span>
                            Return Date
                        </label>
                        <input 
                            type="date" 
                            id="returnDate" 
                            value={returnDate || ''}
                            onChange={handleReturnChange}
                            min={pickupDate || today}
                            disabled={!pickupDate}
                            className={returnDate ? 'has-value' : ''}
                            style={{
                                opacity: !pickupDate ? 0.5 : 1,
                                cursor: !pickupDate ? 'not-allowed' : 'pointer'
                            }}
                        />
                    </div>
                </div>

                {/* Validation Message */}
                {validationMessage && (
                    <div className={`date-validation-message ${validationMessage.type}`}>
                        {validationMessage.message}
                    </div>
                )}

                {/* Quick Selection Buttons */}
                {pickupDate && (
                    <div className="quick-select-wrapper">
                        <p style={{ 
                            fontSize: '0.85rem', 
                            color: 'var(--color-text-muted)',
                            marginBottom: '10px',
                            textAlign: 'center'
                        }}>
                            Quick select return date:
                        </p>
                        <div className="quick-select-buttons">
                            <button
                                type="button"
                                className="quick-select-btn"
                                onClick={() => {
                                    const date = new Date(pickupDate);
                                    date.setDate(date.getDate() + 3);
                                    setReturnDate(date.toISOString().split('T')[0]);
                                }}
                            >
                                3 Days
                            </button>
                            <button
                                type="button"
                                className="quick-select-btn"
                                onClick={() => {
                                    const date = new Date(pickupDate);
                                    date.setDate(date.getDate() + 7);
                                    setReturnDate(date.toISOString().split('T')[0]);
                                }}
                            >
                                1 Week
                            </button>
                            <button
                                type="button"
                                className="quick-select-btn"
                                onClick={() => {
                                    const date = new Date(pickupDate);
                                    date.setDate(date.getDate() + 14);
                                    setReturnDate(date.toISOString().split('T')[0]);
                                }}
                            >
                                2 Weeks
                            </button>
                        </div>
                    </div>
                )}

                {/* Rental Summary */}
                {duration > 0 && (
                    <div className="rental-summary">
                        <div className="summary-item">
                            <span className="summary-label">Duration:</span>
                            <span className="summary-value">{duration} day{duration > 1 ? 's' : ''}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Pickup:</span>
                            <span className="summary-value">
                                {new Date(pickupDate).toLocaleDateString('en-US', { 
                                    weekday: 'short', 
                                    month: 'short', 
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Return:</span>
                            <span className="summary-value">
                                {new Date(returnDate).toLocaleDateString('en-US', { 
                                    weekday: 'short', 
                                    month: 'short', 
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DateSelector;