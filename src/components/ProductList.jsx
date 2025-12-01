// src/components/ProductList.jsx
import React from 'react';
import ProductCard from './ProductCard'; // Import the card component

// ProductList receives the array of products, addToCart function, and openProductModal function
function ProductList({ products, addToCart, openProductModal }) {
    return (
        <section id="shop" className="product-listing">
            <div className="container">
                <h2>Our Collection</h2>
                <div className="product-grid">
                    {/* The core of React rendering: mapping data to components */}
                    {products.map(product => (
                        <ProductCard
                            key={product.id} // Key is essential for React lists
                            product={product}
                            addToCart={addToCart}
                            openProductModal={openProductModal}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProductList;