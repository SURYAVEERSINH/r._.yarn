import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import API_URL from '../config';
import ProductCard from './ProductCard';
import CategorySlider from './CategorySlider';
import CustomOrderBanner from './CustomOrderBanner';
import './Home.css'; // CSS includes .petal, .sparkle, .product-grid

const Home = () => {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="home-container">

            {/* Floating petals */}
            {[...Array(200)].map((_, i) => (
                <div key={"petal" + i} className="petal"></div>
            ))}

            {/* Floating sparkles */}
            {[...Array(180)].map((_, i) => (
                <div key={"sparkle" + i} className="sparkle"></div>
            ))}

            {/* Page header */}
            <section className="hero-section">
                <h1 className="hero-title">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'Our Handmade Products 🌸'}
                </h1>
                <p className="hero-subtitle">Browse our cute and colorful creations made with love.</p>
            </section>

            {/* Category Slider */}
            <CategorySlider
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            {/* Custom Order Banner */}
            <CustomOrderBanner />

            {/* Product grid */}
            <section className="featured-section">
                <div className="product-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No products found matching your search. 🧶</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
