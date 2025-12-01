import React from 'react';

function CategoryFilter({ activeCategory, setCategory }) {
    const categories = [
        { id: 'all', label: 'All Collection' },
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
                        className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setCategory(cat.id)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;