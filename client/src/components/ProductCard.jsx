import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { image, name, description, price, category, _id } = product;
    const { addToCart } = useCart();
    const { isFavorite, toggleFavorite } = useFavorites();

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigation if clicking add to cart
        // Map product structure to what cart expects if needed, or pass as is
        // Assuming product object has _id, name, price, image/imageUrl
        addToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            imageUrl: product.image, // Mapping image to imageUrl as used in Cart.jsx
            ...product
        });
    };

    const handleToggleFavorite = (e) => {
        e.preventDefault(); // Prevent navigation
        toggleFavorite(product);
    }

    return (
        <div className="product-card">
            <Link to={`/product/${_id}`} className="no-underline text-inherit block h-full card-link-wrapper">
                <div className="card-image-container">
                    <img src={image} alt={name} loading="lazy" className="card-image" />
                </div>
            </Link>

            {/* Buttons positioned absolutely or relative to container, NOT inside Link */}
            <div className="card-actions-overlay">
                <button
                    className={`favorite-btn ${isFavorite(product._id) ? 'active' : ''}`}
                    onClick={handleToggleFavorite}
                >
                    <Heart className={`w-5 h-5 ${isFavorite(product._id) ? 'fill-current text-red-500' : ''}`} />
                </button>

                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    <ShoppingCart />
                </button>
            </div>

            <Link to={`/product/${_id}`} className="no-underline text-inherit">
                <div className="card-details">
                    <h3 className="card-title">{name}</h3>
                    {description && (
                        <p className="card-description">{description.slice(0, 60)}...</p>
                    )}
                    <div className="card-footer">
                        <span className="card-price">₹{price}</span>
                        <span className="card-category">{category}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
