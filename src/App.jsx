import React, { useState } from 'react';

// Styles
import './index.css';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import DateSelector from './components/DateSelector';
import ProductList from './components/ProductList';
import HowItWorks from './components/HowItWorks';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import CartModal from './components/CartModal';
import ProductDetailModal from './components/ProductDetailModal';
import Footer from './components/Footer';
import Toast from './components/Toast';
import CategoryFilter from './components/CategoryFilter';

// Data
import { products } from './productData';

function App() {
    // ==========================
    // STATE
    // ==========================

    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Toast message
    const [toast, setToast] = useState(null);

    // Filter category
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Product detail modal
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);

    // ==========================
    // FUNCTIONS
    // ==========================

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const addToCart = (product) => {
        setCart(prev => [...prev, product]);
        setToast(`${product.name} added to cart`);
    };

    const removeItemFromCart = (index) => {
        setCart(prev => prev.filter((_, i) => i !== index));
        setToast("Item removed from cart");
    };

    const closeToast = () => setToast(null);

    // Checkout handler
    const handleCheckout = () => {
        if (cart.length === 0) {
            setToast("Your cart is empty!");
            return;
        }

        // For now, just show a success message and clear cart
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        setToast(`Order placed successfully! Total: $${total.toFixed(2)}`);
        setCart([]);
        setIsCartOpen(false);
    };

    // Product modal handlers
    const openProductModal = (product) => {
        setSelectedProduct(product);
        setIsProductModalOpen(true);
    };

    const closeProductModal = () => {
        setIsProductModalOpen(false);
        setSelectedProduct(null);
    };

    // Category filtering
    const filteredProducts =
        selectedCategory === 'All'
            ? products
            : products.filter(p => p.category === selectedCategory);

    // ==========================
    // UI OUTPUT
    // ==========================

    return (
        <div className="App">

            <Header
                cartCount={cart.length}
                toggleCart={toggleCart}
            />

            <CartModal
                isOpen={isCartOpen}
                toggleCart={toggleCart}
                cartItems={cart}
                removeItemFromCart={removeItemFromCart}
                onCheckout={handleCheckout}
            />

            {/* Product Detail Modal */}
            {isProductModalOpen && selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    isOpen={isProductModalOpen}
                    onClose={closeProductModal}
                    addToCart={addToCart}
                />
            )}

            <Hero />

            <DateSelector
                pickupDate={pickupDate}
                setPickupDate={setPickupDate}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
            />

            {/* CATEGORY FILTER */}
            <CategoryFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <ProductList
                products={filteredProducts}
                addToCart={addToCart}
                openProductModal={openProductModal}
            />

            <HowItWorks />

            <FAQSection />

            <ContactSection setToast={setToast} />

            <Footer />

            {/* Toast notification */}
            {toast && (
                <Toast
                    message={toast}
                    onClose={closeToast}
                />
            )}

        </div>
    );
}


export default App;
