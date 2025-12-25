import React from 'react';

function CategoryFilter({ selectedCategory, setSelectedCategory }) {
    const categories = [
        { id: 'All', label: 'All Collection' },
        { id: 'women', label: 'Women' },
        { id: 'men', label: 'Men' },
        { id: 'children', label: 'Children' }
    ];

    return (
        <div className="category-filter-container">
            <div className="category-buttons">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat.id)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;