import React, { createContext, useContext, useState, useEffect } from 'react';

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
            const response = await fetch('http://192.168.1.8:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                let message = 'Login failed';
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    message = errorData.message || message;
                } else {
                    const text = await response.text();
                    // Extract error message from HTML if possible or just use status text
                    message = response.statusText || 'Login failed';
                    console.error('Non-JSON login error:', text);
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

    const signup = async (name, email, password, phone) => {
        try {
            const response = await fetch('http://192.168.1.8:5000/api/users', {
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
            const response = await fetch('http://192.168.1.8:5000/api/users/profile', {
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
