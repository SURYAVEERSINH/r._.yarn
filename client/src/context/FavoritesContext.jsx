import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (product) => {
        setFavorites((prev) => {
            if (prev.find((item) => item._id === product._id)) {
                return prev;
            }
            return [...prev, product];
        });
    };

    const removeFromFavorites = (productId) => {
        setFavorites((prev) => prev.filter((item) => item._id !== productId));
    };

    const isFavorite = (productId) => {
        return favorites.some((item) => item._id === productId);
    };

    const toggleFavorite = (product) => {
        if (isFavorite(product._id)) {
            removeFromFavorites(product._id);
        } else {
            addToFavorites(product);
        }
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                isFavorite,
                toggleFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};
