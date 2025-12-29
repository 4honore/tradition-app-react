// src/components/Header.jsx
import React, { useState, useEffect } from 'react';

function Header({ cartCount, toggleCart, setSelectedCategory }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        // Get saved theme or default to 'light'
        return localStorage.getItem('theme') || 'light';
    });

    // Apply theme on mount and when it changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

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

                {/* Nav Links */}
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks">
                    <li><a href="#home" onClick={toggleMenu}>HOME</a></li>
                    <li><a href="#shop" onClick={toggleMenu}>SHOP</a></li>
                    <li><a href="#how-it-works" onClick={toggleMenu}>HOW IT WORKS</a></li>
                    <li><a href="#faq" onClick={toggleMenu}>FAQ</a></li>
                    <li><a href="#contact" onClick={toggleMenu}>CONTACT</a></li>
                </ul>

                <div className="header-actions">
                    {/* Dark Mode Toggle */}
                    <div 
                        className="theme-toggle" 
                        onClick={toggleTheme}
                        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        <div className="theme-toggle-slider">
                            {theme === 'light' ? '☀️' : '🌙'}
                        </div>
                    </div>

                    {/* Cart Icon */}
                    <div className="cart-icon" onClick={toggleCart}>
                        🛒
                        {cartCount > 0 && (
                            <span className="cart-count" id="cartCount">{cartCount}</span>
                        )}
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