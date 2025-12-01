// src/components/FAQItem.jsx
import React, { useState } from 'react';

// Receives a single item object (question and answer) as a prop
function FAQItem({ item }) {
    // 🌟 STATE: This tracks the open/closed status for THIS specific item
    const [isOpen, setIsOpen] = useState(false);

    // Handler to flip the state when the header is clicked
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`faq-item ${isOpen ? 'open' : ''}`}>
            {/* Header: Click event calls the state toggle function */}
            <div className="faq-question" onClick={toggleOpen}>
                <h3>{item.question}</h3>
                {/* Dynamically change the icon based on the state */}
                <span className="toggle-icon">{isOpen ? '−' : '+'}</span>
            </div>

            {/* Answer: Conditionally rendered based on the state */}
            {/* We use an "answer-content" div to apply height/transition CSS */}
            <div className="faq-answer-content">
                {/* The content itself is only rendered if isOpen is true */}
                {isOpen && <p>{item.answer}</p>}
            </div>
        </div>
    );
}

export default FAQItem;