// src/components/Header.jsx
import React, { useState } from 'react';

// The Header component now receives necessary data and functions via props
function Header({ cartCount, toggleCart }) {
    // Local state to manage the mobile menu's open/closed status
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <nav className="container">
                <div className="logo">
                    <span>M</span><span>.N.</span><span>S</span>
                </div>

                {/* Nav Links - dynamically add 'active' class based on state */}
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks">
                    {/* The onClick handler for menu links also closes the mobile menu */}
                    <li><a href="#home" onClick={toggleMenu}>HOME</a></li>
                    <li><a href="#shop" onClick={toggleMenu}>SHOP</a></li>
                    <li><a href="#how-it-works" onClick={toggleMenu}>HOW IT WORKS</a></li>
                    <li><a href="#faq" onClick={toggleMenu}>FAQ</a></li>
                    <li><a href="#contact" onClick={toggleMenu}>CONTACT</a></li>
                </ul>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {/* Cart Icon - click calls the function passed via props */}
                    <div className="cart-icon" onClick={toggleCart}>
                        🛒
                        {/* Cart Count uses the data passed via props */}
                        <span className="cart-count" id="cartCount">{cartCount}</span>
                    </div>

                    {/* Menu Toggle - click calls the local state toggle function */}
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