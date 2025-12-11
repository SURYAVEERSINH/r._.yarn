import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const MIN_BUY_AMOUNT = 500;
    const FREE_DELIVERY_THRESHOLD = 500;
    const deliveryFee = total > FREE_DELIVERY_THRESHOLD ? 0 : 70;
    const finalTotal = total + deliveryFee;

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        const res = await loadRazorpay();

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        try {
            const response = await fetch('http://192.168.1.8:5000/api/payment/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: finalTotal }),
            });

            const order = await response.json();

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'r._.yarn',
                description: 'Order Payment',
                order_id: order.id,
                handler: async function (response) {
                    // Create Order in Backend
                    try {
                        const orderData = {
                            orderItems: cartItems.map(item => ({
                                name: item.name,
                                qty: item.quantity,
                                image: item.imageUrl,
                                price: item.price,
                                product: item._id
                            })),
                            shippingAddress: user.shippingAddress || {
                                address: '',
                                city: '',
                                postalCode: '',
                                country: ''
                            },
                            paymentMethod: 'Razorpay',
                            itemsPrice: total,
                            shippingPrice: deliveryFee,
                            taxPrice: 0,
                            totalPrice: finalTotal,
                            paymentResult: {
                                id: response.razorpay_payment_id,
                                status: 'COMPLETED',
                                update_time: new Date().toISOString(),
                                email_address: user.email
                            }
                        };

                        const config = {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${user.token}`
                            }
                        };

                        await fetch('http://192.168.1.8:5000/api/orders', {
                            method: 'POST',
                            headers: config.headers,
                            body: JSON.stringify(orderData)
                        });

                        alert(`Payment Successful! Order Placed.`);
                        clearCart();
                        navigate('/profile');

                    } catch (error) {
                        alert('Order creation failed after payment. Please contact support.');
                        console.error(error);
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.phone || '',
                },
                theme: {
                    color: '#e91e63',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-container">
                <h2 className="cart-title">Your Cart</h2>
                <div className="empty-cart">
                    <p>Your cart is empty.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Cart</h2>
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div key={item._id} className="cart-item">
                        <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h3 className="cart-item-name">{item.name}</h3>
                            <p className="cart-item-price">₹{item.price}</p>
                        </div>
                        <div className="cart-item-actions">
                            <button
                                className="quantity-btn"
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            >
                                -
                            </button>
                            <span className="quantity-display">{item.quantity}</span>
                            <button
                                className="quantity-btn"
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            >
                                +
                            </button>
                            <button
                                className="remove-btn"
                                onClick={() => removeFromCart(item._id)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>₹{total.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                    <span>Delivery Charge:</span>
                    <span>{deliveryFee === 0 ? <span style={{ color: '#4caf50', fontWeight: 'bold' }}>FREE</span> : `₹${deliveryFee}`}</span>
                </div>

                {total <= FREE_DELIVERY_THRESHOLD && (
                    <div className="min-buy-warning" style={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}>
                        <p style={{ marginTop: '10px' }}>
                            Add items worth ₹{(FREE_DELIVERY_THRESHOLD - total + 0.01).toFixed(2)} more for <strong>FREE DELIVERY</strong>.
                        </p>
                    </div>
                )}

                <div className="cart-total">
                    Total: ₹{finalTotal.toFixed(2)}
                </div>
                <button
                    className="checkout-btn"
                    onClick={handleCheckout}
                >
                    {user ? 'Proceed to Checkout' : 'Login to Checkout'}
                </button>
            </div>
        </div>
    );
};

export default Cart;
