import React from 'react';

function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    {/* Section 1: Brand & About */}
                    <div className="footer-section">
                        <h3> TRADITION </h3>
                        <p>Celebrating Rwandan culture through traditional wear rental services.</p>
                    </div>

                    {/* Section 2: Navigation Links */}
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#shop">Shop</a></li>
                            <li><a href="#how-it-works">How It Works</a></li>
                            <li><a href="#faq">FAQ</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    {/* Section 3: Contact Info */}
                    <div className="footer-section">
                        <h3>Contact</h3>
                        <ul>
                            <li>📍 Kigali, Rwanda</li>
                            <li>📧 traditional@gmail.com</li>
                            <li>📞 +250 784 964 022</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} The Tradition Way. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;