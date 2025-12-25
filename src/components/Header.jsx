// src/components/Header.jsx
import React, { useState } from 'react';

// The Header component now receives necessary data and functions via props
function Header({ cartCount, toggleCart, setSelectedCategory }) {
    // Local state to manage the mobile menu's open/closed status
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = (category) => {
        if (setSelectedCategory) {
            setSelectedCategory(category);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        <header>
            <nav className="container">
                <div className="logo" onClick={() => handleNavClick('All')} style={{ cursor: 'pointer' }}>
                    <span>M</span><span>.N.</span><span>S</span>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                ></div>

                {/* Nav Links - Slide in panel */}
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks">
                    <li><a href="#home" onClick={toggleMenu}>HOME</a></li>
                    <li><a href="#shop" onClick={toggleMenu}>SHOP</a></li>
                    <li><a href="#how-it-works" onClick={toggleMenu}>HOW IT WORKS</a></li>
                    <li><a href="#faq" onClick={toggleMenu}>FAQ</a></li>
                    <li><a href="#contact" onClick={toggleMenu}>CONTACT</a></li>
                </ul>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {/* Cart Icon */}
                    <div className="cart-icon" onClick={toggleCart}>
                        🛒
                        <span className="cart-count" id="cartCount">{cartCount}</span>
                    </div>

                    {/* Menu Toggle */}
                    <div className="menu-toggle" onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;