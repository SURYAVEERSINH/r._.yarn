import React, { useEffect, useState } from 'react';
import './CustomOrderBanner.css';

const CustomOrderBanner = () => {
    const [key, setKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setKey(prevKey => prevKey + 1);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <a
            href="https://www.instagram.com/r._.yarn?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="custom-order-link"
        >
            <div key={key} className="custom-order-banner">
                Custom orders are accepted..!!! 💖
            </div>
        </a>
    );
};

export default CustomOrderBanner;
