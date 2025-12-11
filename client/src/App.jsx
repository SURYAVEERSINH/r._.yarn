import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <Router>
            <div className="relative min-h-screen">
              <Navbar />
              <Background />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </Router>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
