const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config();
connectDB();

const verifyUsers = async () => {
    const users = await User.find({});
    console.log('Users found:', users.length);
    users.forEach(user => {
        console.log(`- ${user.email} (Admin: ${user.isAdmin})`);
    });
    process.exit();
};

verifyUsers();
