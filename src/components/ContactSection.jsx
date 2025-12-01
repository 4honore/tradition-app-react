// src/components/ContactSection.jsx
import React, { useState } from 'react';

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
        if (!formData.name.trim()) return "Name is required";
        if (!formData.email.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Please enter a valid email";
        if (!formData.message.trim()) return "Message is required";
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
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Form Submitted:', formData);
            setToast('Thank you for your message! We will get back to you soon.');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setToast('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <h2>Contact Us</h2>
                <p className="contact-intro">Have questions about renting traditional attire? Get in touch!</p>

                <div className="contact-simple">
                    <div className="contact-details">
                        <div className="contact-item">
                            <span className="contact-icon">📧</span>
                            <div>
                                <h3>Email</h3>
                                <p>traditional@gmail.com</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <span className="contact-icon">📞</span>
                            <div>
                                <h3>Phone</h3>
                                <p>+250 784 964 022</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <span className="contact-icon">📍</span>
                            <div>
                                <h3>Location</h3>
                                <p>Kigali, Rwanda</p>
                            </div>
                        </div>
                    </div>

                    <form className="simple-contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;