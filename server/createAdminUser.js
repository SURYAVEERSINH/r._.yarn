const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config();
connectDB();

const createAdmin = async () => {
    try {
        const email = 'richapatel@gmail.com';
        const password = 'RICHAPATEL2006';
        const name = 'Richa Patel';

        const userExists = await User.findOne({ email });

        if (userExists) {
            userExists.name = name;
            userExists.isAdmin = true;
            userExists.password = password; // Will be hashed by pre-save hook in User model
            await userExists.save();
            console.log('User updated to Admin successfully');
        } else {
            await User.create({
                name,
                email,
                password,
                isAdmin: true
            });
            console.log('New Admin User created successfully');
        }
        process.exit();
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdmin();
