const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Order = require('./models/Order');

dotenv.config();
connectDB();

const checkOrders = async () => {
    try {
        const orders = await Order.find({});
        console.log(`Found ${orders.length} orders.`);

        orders.forEach(order => {
            console.log(`Order ID: ${order._id}`);
            console.log('Shipping Address:', JSON.stringify(order.shippingAddress, null, 2));
            console.log('---');
        });

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkOrders();
