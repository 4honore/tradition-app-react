// src/components/ContactSection.jsx
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

// IMPORTANT: Replace these with your actual EmailJS credentials
// Get them from: https://dashboard.emailjs.com/
const EMAILJS_SERVICE_ID = 'service_ekxxlvi'; // e.g., 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_e20smgb'; // e.g., 'template_xyz456'
const EMAILJS_PUBLIC_KEY = '7_18mWfhPPnFuIzSG'; // e.g., 'abcdefgh123456'

function ContactSection({ setToast }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) return { message: "Name is required", type: 'error' };
        if (!formData.email.trim()) return { message: "Email is required", type: 'error' };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return { message: "Please enter a valid email", type: 'error' };
        if (!formData.message.trim()) return { message: "Message is required", type: 'error' };
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validateForm();
        if (error) {
            setToast(error);
            return;
        }

        setIsSubmitting(true);

        try {
            // Send actual email using EmailJS
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_email: 'ishimwehonore450@gmail.com'
            };

            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            setToast({
                message: '✉️ Message sent successfully! We will get back to you shortly.',
                type: 'success'
            });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setToast({
                message: 'Failed to send message. Please try again or email us directly.',
                type: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <div className="text-center" style={{ marginBottom: '3rem' }}>
                    <h2>Get in Touch</h2>
                    <p className="contact-intro">We'd love to hear from you. Book your appointment or ask a question.</p>
                </div>

                <div className="contact-container-modern">
                    {/* Left Panel: Info */}
                    <div className="contact-info-panel">
                        <div>
                            <h3>Contact Information</h3>
                            <p>Fill up the form and we will get back to you within 24 hours.</p>

                            <div className="info-items">
                                <div className="info-item">
                                    <div className="info-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                        </svg>
                                    </div>
                                    <div className="info-text">
                                        <h4>Phone</h4>
                                        <span>+250 784 964 022</span>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                    </div>
                                    <div className="info-text">
                                        <h4>Email</h4>
                                        <a href="mailto:ishimwehonore450@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>ishimwehonore450@gmail.com</a>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                    </div>
                                    <div className="info-text">
                                        <h4>Location</h4>
                                        <span>Kigali, Rwanda</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Form */}
                    <div className="contact-form-panel">
                        <h3>Send us a Message</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group-modern">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder=" "
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="name">Your Name</label>
                            </div>

                            <div className="form-group-modern">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder=" "
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="email">Your Email</label>
                            </div>

                            <div className="form-group-modern">
                                <textarea
                                    name="message"
                                    id="message"
                                    placeholder=" "
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                                <label htmlFor="message">Your Message</label>
                            </div>

                            <button type="submit" className="btn btn-block" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;