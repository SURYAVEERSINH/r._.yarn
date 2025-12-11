import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import './Profile.css';
import profileDefault from '../assets/profile.jpg'; // We'll user default if no image

const Profile = () => {
    const { user, updateProfile, logout } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [verificationMsg, setVerificationMsg] = useState('');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState(null);

    const [myOrders, setMyOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [showOrders, setShowOrders] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone || '');
            setImage(user.profileImage || '');
            if (user.shippingAddress) {
                setAddress(user.shippingAddress.address || '');
                setCity(user.shippingAddress.city || '');
                setPostalCode(user.shippingAddress.postalCode || '');
                setCountry(user.shippingAddress.country || '');
            }
            fetchMyOrders();
            if (user.isAdmin) {
                fetchAllOrders();
            }
        }
    }, [user, navigate]);

    const fetchMyOrders = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            const { data } = await axios.get(`${API_URL}/api/orders/myorders`, config);
            setMyOrders(data);
        } catch (error) {
            console.error("Error fetching orders", error);
        }
    };

    const fetchAllOrders = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            // Note: need to make sure backend route exists for ALL orders
            const { data } = await axios.get(`${API_URL}/api/orders`, config);
            setAllOrders(data);
        } catch (error) {
            console.error("Error fetching all orders", error);
        }
    };

    const verifyPincode = async () => {
        if (!postalCode) {
            setVerificationStatus('error');
            setVerificationMsg('Please enter a Pincode first.');
            return;
        }
        setVerificationStatus('loading');
        setVerificationMsg('Verifying...');
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${postalCode}`);
            const data = await response.json();

            if (data && data[0] && data[0].Status === 'Success') {
                const postOfficeData = data[0].PostOffice;
                if (postOfficeData.length > 0) {
                    const detectedCity = postOfficeData[0].District;
                    const detectedState = postOfficeData[0].State;
                    const detectedCountry = postOfficeData[0].Country;

                    setCity(detectedCity);
                    setCountry(detectedCountry);

                    setVerificationStatus('success');
                    setVerificationMsg(`✅ Verified: ${detectedCity}, ${detectedState}, ${detectedCountry}`);
                } else {
                    setVerificationStatus('error');
                    setVerificationMsg('❌ Valid Pincode but no location details found.');
                }
            } else {
                setVerificationStatus('error');
                setVerificationMsg('❌ Invalid Pincode.');
            }
        } catch (error) {
            console.error(error);
            setVerificationStatus('error');
            setVerificationMsg('❌ Error verifying pincode.');
        }
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const { data } = await axios.post(`${API_URL}/api/upload`, formData, config);
            setImage(data.image);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            try {
                await updateProfile({
                    id: user._id,
                    name,
                    email,
                    phone,
                    password,
                    profileImage: image,
                    shippingAddress: {
                        address,
                        city,
                        postalCode,
                        country
                    }
                });
                setMessage('Profile Updated Successfully');
            } catch (error) {
                setMessage(error.message);
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="profile-container">
            <div className="profile-content">
                <div className="profile-sidebar">
                    <img
                        src={image ? `http://192.168.1.8:5000${image}` : profileDefault}
                        alt={name}
                        className="profile-pic-large"
                    />
                    <h2 className="profile-name">{name}</h2>
                    <p className="profile-email">{email}</p>
                    {user && user.isAdmin && <span className="badge-admin">Admin</span>}

                    <div className="profile-form">
                        <h3>Update Profile</h3>
                        {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
                        <form onSubmit={submitHandler}>
                            <div className="form-group" style={{ textAlign: 'center' }}>
                                <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>Profile Picture</label>
                                <input
                                    type="file"
                                    id="file-upload"
                                    onChange={uploadFileHandler}
                                    style={{ display: 'none' }}
                                />
                                <label
                                    htmlFor="file-upload"
                                    style={{
                                        display: 'inline-block',
                                        padding: '8px 20px',
                                        border: '2px solid #ffb6d8',
                                        borderRadius: '50px',
                                        background: 'white',
                                        color: '#d8268c',
                                        cursor: 'pointer',
                                        fontWeight: '500',
                                        transition: '0.3s',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    Choose File
                                </label>
                                {uploading && <p style={{ marginTop: '5px', fontSize: '0.8rem', color: '#666' }}>Uploading...</p>}
                            </div>

                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Address (Flat, House no., Building, Company, Apartment)</label>
                                <input
                                    type="text"
                                    placeholder="Enter address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Postal Code</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="text"
                                        placeholder="Enter postal code"
                                        value={postalCode}
                                        onChange={(e) => {
                                            setPostalCode(e.target.value);
                                            setVerificationStatus(null);
                                            setVerificationMsg('');
                                        }}
                                        style={{ flex: 1 }}
                                    />
                                    <button
                                        type="button"
                                        onClick={verifyPincode}
                                        className="btn-secondary"
                                        style={{ marginTop: 0, padding: '0 15px' }}
                                    >
                                        Verify
                                    </button>
                                </div>
                                {verificationMsg && (
                                    <small style={{
                                        color: verificationStatus === 'success' ? 'green' : 'red',
                                        display: 'block',
                                        marginTop: '5px'
                                    }}>
                                        {verificationMsg}
                                    </small>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Change Password</label>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>


                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="login-btn" style={{ width: '100%', marginTop: '10px' }}>Update</button>
                        </form>
                    </div>

                    <button className="btn-secondary" style={{ marginTop: '20px' }} onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                <div className="profile-main">
                    <div className="order-history-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h2>{user && user.isAdmin ? 'All Orders (Admin)' : 'My Orders'}</h2>
                        <button
                            className="btn-primary"
                            onClick={() => setShowOrders(!showOrders)}
                            style={{
                                padding: '8px 16px',
                                fontSize: '0.9rem',
                                borderRadius: '20px',
                                background: '#ff69b4',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 2px 5px rgba(255, 105, 180, 0.3)'
                            }}
                        >
                            {showOrders ? 'Hide Order History' : 'View Order History'}
                        </button>
                    </div>

                    {showOrders && (user && user.isAdmin ? (
                        <div className="table-container">
                            <table className="order-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>USER</th>
                                        <th>DATE</th>
                                        <th>ITEMS</th>
                                        <th>ADDRESS</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allOrders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id.substring(0, 10)}...</td>
                                            <td>{order.user && order.user.name}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td className="items-cell">
                                                {order.orderItems.map(item => (
                                                    <div key={item._id || item.name} className="order-item-list">
                                                        {item.name} (x{item.qty})
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="address-cell">
                                                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}
                                            </td>
                                            <td>₹{order.totalPrice}</td>
                                            <td>
                                                {order.isPaid ? (
                                                    <span className="status-paid">Paid</span>
                                                ) : (
                                                    <span className="status-not-paid">Not Paid</span>
                                                )}
                                            </td>
                                            <td>
                                                {order.isDelivered ? (
                                                    <span className="status-paid">Delivered</span>
                                                ) : (
                                                    <span className="status-not-paid">Pending</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table className="order-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>ITEMS</th>
                                        <th>ADDRESS</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myOrders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td className="items-cell">
                                                {order.orderItems.map(item => (
                                                    <div key={item._id || item.name} className="order-item-list">
                                                        {item.name} (x{item.qty})
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="address-cell">
                                                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}
                                            </td>
                                            <td>₹{order.totalPrice}</td>
                                            <td>
                                                {order.isPaid ? (
                                                    <span className="status-paid">Paid</span>
                                                ) : (
                                                    <span className="status-not-paid">Not Paid</span>
                                                )}
                                            </td>
                                            <td>
                                                {order.isDelivered ? (
                                                    <span className="status-paid">Delivered</span>
                                                ) : (
                                                    <span className="status-not-paid">Pending</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {myOrders.length === 0 && <p style={{ marginTop: '20px' }}>No orders found.</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
