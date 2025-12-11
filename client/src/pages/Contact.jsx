import React from 'react';
import { Instagram, Phone, MessageCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-container">
            <div className="contact-card">
                <h1 className="contact-title">Contact Us</h1>

                <div className="about-section">
                    <h2 className="about-title">About Us</h2>
                    <p className="about-text">
                        Welcome to r._.yarn! We are passionate about creating beautiful, handmade yarn products.
                        Each piece is crafted with love and attention to detail, bringing warmth and style to your life.
                        Explore our collection and find something special just for you.
                    </p>
                </div>

                <div className="contact-info">
                    <div className="phone-wrapper">
                        <Phone className="phone-icon" />
                        <span>9773447026</span>
                    </div>

                    <div className="buttons-wrapper">
                        <a
                            href="https://wa.me/919773447026"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-button whatsapp-button"
                        >
                            <MessageCircle className="button-icon" />
                            <span>WhatsApp</span>
                        </a>

                        <a
                            href="https://www.instagram.com/r._.yarn?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-button instagram-button"
                        >
                            <Instagram className="button-icon" />
                            <span>Instagram</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
