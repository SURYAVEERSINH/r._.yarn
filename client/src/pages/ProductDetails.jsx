
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';
import './ProductDetails.css';
import API_URL from '../config';
import axios from 'axios'; // Assuming axios is intended to be used with the provided snippet

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const { isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);
                // Fetch single product
                const productResponse = await axios.get(`${API_URL} /api/products / ${id} `);
                const productData = productResponse.data;
                setProduct(productData);

                // Fetch all products to filter for similar ones
                // Ideally this should be a backend query, but for now we filter client side
                const allData = await allResponse.json();

                const sim = allData.filter(p =>
                    p.category === data.category && p._id !== data._id
                ).slice(0, 4); // Limit to 4 similar items

                setSimilarProducts(sim);
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductData();
            window.scrollTo(0, 0);
        }
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;
    if (!product) return <div className="error">Product not found</div>;

    const handleAddToCart = () => {
        addToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            imageUrl: product.image,
            ...product
        });
    };

    return (
        <div className="product-details-container">
            <Link to="/" className="back-shop-btn">
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Shop
            </Link>

            <div className="product-details-wrapper">
                <div className="product-image-section">
                    <img src={product.image} alt={product.name} className="product-details-image" />
                </div>

                <div className="product-info-section">
                    <span className="product-category">{product.category}</span>
                    <h1 className="product-title">{product.name}</h1>
                    <p className="product-price">₹{product.price}</p>

                    <div className="product-description-container">
                        <h3 className="product-description-title">About this item</h3>
                        <p className="product-description">{product.description || "No description available."}</p>
                    </div>

                    <div className="action-buttons">
                        <button className="add-cart-btn-large" onClick={handleAddToCart}>
                            <ShoppingCart className="w-6 h-6" />
                            Add to Cart
                        </button>
                        <button
                            className={`favorite - btn - large ${isFavorite(product._id) ? 'active' : ''} `}
                            onClick={() => toggleFavorite(product)}
                        >
                            <Heart className={`w - 6 h - 6 ${isFavorite(product._id) ? 'fill-current text-purple-600' : 'text-gray-400'} `} />
                        </button>
                    </div>
                </div>
            </div>

            {similarProducts.length > 0 && (
                <div className="similar-products-section">
                    <h2 className="section-title">Similar Products</h2>
                    <div className="similar-products-grid">
                        {similarProducts.map(p => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
