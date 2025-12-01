// src/components/FAQSection.jsx
import React from 'react';
import FAQItem from './FAQItem'; // Import the child item component
import { faqItems } from '../faqData'; // Import the data

function FAQSection() {
    return (
        <section id="faq" className="faq-section">
            <div className="container">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                    {/* Maps over the imported data and renders an FAQItem for each */}
                    {faqItems.map(item => (
                        <FAQItem 
                            key={item.id} // Essential for list rendering
                            item={item} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQSection;