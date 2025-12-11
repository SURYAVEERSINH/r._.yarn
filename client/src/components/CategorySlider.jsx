import React from 'react';
import './CategorySlider.css';

const categories = [
    { id: 'all', label: 'All' },
    { id: 'Flowers', label: 'Flowers' },
    { id: 'Claw Clips', label: 'Claw Clips' },
    { id: 'Keychains', label: 'Keychains' },
    { id: 'Bouquets', label: 'Bouquets' },
    { id: 'Muffler', label: 'Muffler' }
];

const CategorySlider = ({ selectedCategory, onSelectCategory }) => {
    return (
        <div className="category-slider-container">
            <div className="category-slider">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className={`category-pill ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => onSelectCategory(category.id)}
                    >
                        {category.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategorySlider;
