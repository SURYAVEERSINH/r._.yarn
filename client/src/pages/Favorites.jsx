import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';
import './Favorites.css';

const Favorites = () => {
    const { favorites } = useFavorites();

    if (favorites.length === 0) {
        return (
            <div className="favorites-container">
                <h2 className="favorites-title">Your Favorites</h2>
                <div className="empty-favorites">
                    <p>No favorites yet. Start adding some!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-container">
            <h2 className="favorites-title">Your Favorites</h2>
            <div className="favorites-grid">
                {favorites.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
