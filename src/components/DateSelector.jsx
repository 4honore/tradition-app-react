// src/components/DateSelector.jsx
import React from 'react';

function DateSelector({ pickupDate, setPickupDate, returnDate, setReturnDate }) {
    
    // Handler functions to update the parent state (in App.jsx)
    const handlePickupChange = (e) => {
        setPickupDate(e.target.value);
    };

    const handleReturnChange = (e) => {
        setReturnDate(e.target.value);
    };

    return (
        // The parent section is just a wrapper for layout purposes
        <div className="container">
            <div className="date-selector">
                <h3>📅 Select a rental period</h3>
                <p style={{ marginBottom: '1rem' }}>View prices and availability</p>
                
                <div className="date-inputs">
                    {/* Pickup Date Input */}
                    <div className="date-group">
                        <label htmlFor="pickupDate">Pickup</label>
                        <input 
                            type="date" 
                            id="pickupDate"
                            value={pickupDate || ''} // Controlled component value
                            onChange={handlePickupChange} // Use React's event handler
                        />
                    </div>
                    
                    <div className="arrow">→</div>
                    
                    {/* Return Date Input */}
                    <div className="date-group">
                        <label htmlFor="returnDate">Return</label>
                        <input 
                            type="date" 
                            id="returnDate" 
                            value={returnDate || ''} // Controlled component value
                            onChange={handleReturnChange} // Use React's event handler
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DateSelector;