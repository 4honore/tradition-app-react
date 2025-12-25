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
        setCart(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });

        setToast({
            message: `${product.name} added to cart`,
            image: product.image,
            type: 'success'
        });
    };

    const removeItemFromCart = (index) => {
        setCart(prev => prev.filter((_, i) => i !== index));
        setToast({ message: "Item removed from cart", type: 'info' });
    };

    const updateQuantity = (index, delta) => {
        setCart(prev => prev.map((item, i) => {
            if (i === index) {
                const newQuantity = (item.quantity || 1) + delta;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
            }
            return item;
        }));
    };

    const closeToast = () => setToast(null);

    // Checkout handler
    const handleCheckout = () => {
        if (cart.length === 0) {
            setToast({ message: "Your cart is empty!", type: 'error' });
            return;
        }

        // For now, just show a success message and clear cart
        const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        setToast({
            message: `Order placed successfully! Total: $${total.toFixed(2)}`,
            type: 'success'
        });
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
        // We do NOT plain null the product here, so it stays rendered during the fade-out animation.
        // It will be overwritten when the next product is opened.
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
                setSelectedCategory={setSelectedCategory}
            />

            <CartModal
                isOpen={isCartOpen}
                toggleCart={toggleCart}
                cartItems={cart}
                removeItemFromCart={removeItemFromCart}
                updateQuantity={updateQuantity}
                onCheckout={handleCheckout}
            />

            {/* Product Detail Modal - Always rendered for animations */}
            <ProductDetailModal
                product={selectedProduct}
                isOpen={isProductModalOpen}
                onClose={closeProductModal}
                addToCart={addToCart}
            />

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
                    message={toast.message}
                    image={toast.image}
                    type={toast.type}
                    onClose={closeToast}
                />
            )}

        </div>
    );
}


export default App;
