// src/components/HowItWorks.jsx
import React from 'react';

function HowItWorks() {
    // Define the steps data here for easy editing
    const steps = [
        { 
            id: 1, 
            icon: "🔍", 
            title: "1. Browse", 
            description: "Explore our curated collection of traditional Rwandan attire for men and women." 
        },
        { 
            id: 2, 
            icon: "📅", 
            title: "2. Select Dates", 
            description: "Choose your pickup and return dates using our easy date selector above." 
        },
        { 
            id: 3, 
            icon: "✨", 
            title: "3. Enjoy", 
            description: "Pick up your freshly cleaned outfit, wear it to your event, and celebrate in style!" 
        }
    ];

    return (
        <section id="how-it-works" className="hiw-section">
            <div className="container">
                <h2>How It Works</h2>
                
                <div className="hiw-grid">
                    {steps.map(step => (
                        <div key={step.id} className="hiw-card">
                            <div className="hiw-icon">{step.icon}</div>
                            <div className="hiw-content">
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;