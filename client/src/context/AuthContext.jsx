import React, { createContext, useContext, useState, useEffect } from 'react';
import API_URL from '../config';
import axios from 'axios'; // Assuming axios is installed and needs to be imported

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/api/users/login`, { email, password });

            const data = response.data;
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            let message = 'Login failed';
            if (error.response && error.response.data && error.response.data.message) {
                message = error.response.data.message;
            } else if (error.message) {
                message = error.message;
            }
            throw new Error(message);
        }
    };

    const signup = async (name, email, password, phone) => {
        try {
            const response = await fetch(`${API_URL}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, phone }),
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                let message = 'Signup failed';
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    message = errorData.message || message;
                } else {
                    const text = await response.text();
                    message = response.statusText || 'Signup failed';
                    console.error('Non-JSON signup error:', text);
                }
                throw new Error(message);
            }

            const data = await response.json();
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    const updateProfile = async (userData) => {
        try {
            const response = await fetch(`${API_URL}/api/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                let message = 'Update failed';
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    message = errorData.message || message;
                } else {
                    const text = await response.text();
                    message = response.statusText || 'Update failed';
                    console.error('Non-JSON update error:', text);
                }
                throw new Error(message);
            }

            const data = await response.json();
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            throw error;
        }
    };

    const value = {
        user,
        login,
        signup,
        logout,
        updateProfile,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
