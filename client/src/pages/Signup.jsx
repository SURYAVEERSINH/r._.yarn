import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Signup.css';
import './Login.css'; // Importing Login css to reuse form-group styles

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signup(name, email, password, phone);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-content">
                <h1 className="signup-title">Create Account</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Choose a password"
                            required
                        />
                    </div>
                    <button type="submit" className="signup-btn">
                        Sign Up
                    </button>
                </form>
                <div className="login-links">
                    Already have an account? <Link to="/login" className="login-link">Login here</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
