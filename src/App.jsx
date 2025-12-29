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

    // Global date state (from home page calendar)
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
            const existingItem = prev.find(item => 
                item.id === product.id && 
                item.pickupDate === product.pickupDate && 
                item.returnDate === product.returnDate
            );
            
            if (existingItem) {
                return prev.map(item =>
                    (item.id === product.id && 
                     item.pickupDate === product.pickupDate && 
                     item.returnDate === product.returnDate)
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });

        // Calculate duration for toast message
        const duration = product.rentalDays || 1;
        setToast({
            message: `${product.name} added for ${duration} day${duration > 1 ? 's' : ''}`,
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

        // Calculate total with rental days
        const total = cart.reduce((sum, item) => {
            const days = item.rentalDays || 1;
            return sum + (item.price * days * (item.quantity || 1));
        }, 0);
        
        setToast({
            message: `✨ Order placed! Total: $${total.toFixed(2)}`,
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
    };

    // Category filtering
    const filteredProducts =
        selectedCategory === 'All'
            ? products
            : products.filter(p => p.category === selectedCategory);

    // Calculate total items and total cost
    const cartItemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    // ==========================
    // UI OUTPUT
    // ==========================

    return (
        <div className="App">

            <Header
                cartCount={cartItemCount}
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

            {/* Product Detail Modal - Pass global dates */}
            <ProductDetailModal
                product={selectedProduct}
                isOpen={isProductModalOpen}
                onClose={closeProductModal}
                addToCart={addToCart}
                globalPickupDate={pickupDate}
                globalReturnDate={returnDate}
            />

            <Hero />

            {/* Global Date Selector - This affects product modal */}
            <DateSelector
                pickupDate={pickupDate}
                setPickupDate={setPickupDate}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
            />

            {/* Show message if dates are selected */}
            {pickupDate && returnDate && (
                <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    background: 'var(--color-bg-light)',
                    margin: '0 auto',
                    maxWidth: '600px',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: '30px'
                }}>
                    <p style={{ 
                        fontSize: '1rem', 
                        color: 'var(--color-text-main)',
                        fontWeight: '500'
                    }}>
                        📅 Viewing items available from{' '}
                        <strong style={{ color: 'var(--color-primary)' }}>
                            {new Date(pickupDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </strong>
                        {' '}to{' '}
                        <strong style={{ color: 'var(--color-primary)' }}>
                            {new Date(returnDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </strong>
                    </p>
                    <p style={{ 
                        fontSize: '0.85rem', 
                        color: 'var(--color-text-muted)',
                        marginTop: '5px'
                    }}>
                        These dates will be pre-filled when you add items to cart
                    </p>
                </div>
            )}

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