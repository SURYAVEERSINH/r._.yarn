import React from 'react';
import API_URL from '../config';
import { ShoppingBag, Heart, Search, Menu, User, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import profileDefault from '../assets/profile.jpg'; // Still keeping this as app logo/mascot if needed, or user default

const Navbar = () => {
    const { cartItems } = useCart();
    const { favorites } = useFavorites();
    const { user, loading } = useAuth();
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const favoritesCount = favorites.length;

    const [searchQuery, setSearchQuery] = React.useState('');
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
            closeMenu();
            setIsSearchOpen(false);
        }
    };

    return (
        <nav className="navbar-container">
            <div className="navbar-content">
                <div className="navbar-flex">
                    {/* Logo */}
                    <div className="navbar-logo">
                        <img
                            src={profileDefault}
                            alt="Logo"
                            className="navbar-profile-pic"
                        />
                        <span className="navbar-logo-text">r._.yarn</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="navbar-links">
                        <Link to="/" className="navbar-link">Home</Link>
                        <Link to="/cart" className="navbar-link">Cart</Link>
                        <Link to="/favorites" className="navbar-link">Favorites</Link>
                        <Link to="/contact" className="navbar-link">Contact</Link>
                    </div>

                    {/* Icons */}
                    <div className="navbar-icons">
                        <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
                            <span className="kitten-mascot" role="img" aria-label="kitten">🐱</span>
                            <form onSubmit={handleSearchSubmit} className="search-form">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                                <button type="submit" className="search-btn">
                                    <Search className="w-5 h-5" />
                                </button>
                            </form>
                        </div>

                        {/* Mobile Search Toggle Icon */}
                        <button className="icon-btn mobile-search-trigger" onClick={toggleSearch}>
                            <Search className="w-6 h-6" />
                        </button>

                        <Link to="/favorites" className="icon-btn">
                            <Heart className="w-6 h-6" />
                            {favoritesCount > 0 && <span className="cart-badge" style={{ backgroundColor: '#e91e63' }}>{favoritesCount}</span>}
                        </Link>
                        <Link to="/cart" className="icon-btn cart-btn">
                            <ShoppingBag className="w-6 h-6" />
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </Link>

                        <button className="mobile-menu-btn" onClick={toggleMenu}>
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Auth Link */}
                        {loading ? (
                            <div className="icon-btn"><Loader className="w-5 h-5 animate-spin" /></div>
                        ) : user ? (
                            <Link to="/profile" className={user.profileImage ? "profile-link" : "icon-btn profile-link"} title={user.name}>
                                {user.profileImage ? (
                                    <img
                                        src={`${API_URL}${user.profileImage}`}
                                        alt={user.name}
                                        className="user-profile-icon"
                                        onError={(e) => { e.target.onerror = null; e.target.src = profileDefault; }} // Fallback if image not on server
                                    />
                                ) : (
                                    <User className="w-6 h-6" />
                                )}
                            </Link>
                        ) : (
                            <Link to="/login" className="login-btn-nav">
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <div className="mobile-menu-dropdown">
                        <Link to="/" className="mobile-menu-link" onClick={closeMenu}>Home</Link>
                        <Link to="/cart" className="mobile-menu-link" onClick={closeMenu}>Cart ({cartCount})</Link>
                        <Link to="/favorites" className="mobile-menu-link" onClick={closeMenu}>Favorites ({favoritesCount})</Link>
                        <Link to="/contact" className="mobile-menu-link" onClick={closeMenu}>Contact</Link>
                        {!user && (
                            <Link to="/login" className="mobile-menu-link highlight" onClick={closeMenu}>Login / Signup</Link>
                        )}
                        {user && (
                            <Link to="/profile" className="mobile-menu-link highlight" onClick={closeMenu}>My Profile</Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
