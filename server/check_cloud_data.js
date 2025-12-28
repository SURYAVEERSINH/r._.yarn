const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const checkData = async () => {
    try {
        console.log('Connecting to:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected');

        const productCount = await Product.countDocuments();
        const userCount = await User.countDocuments();

        console.log(`📦 Products in DB: ${productCount}`);
        console.log(`👤 Users in DB: ${userCount}`);

        if (productCount === 0) {
            console.log('⚠️  DATABASE IS EMPTY! You need to run seeder or migration.');
        }

        process.exit();
    } catch (error) {
        console.error('❌ Connection Failed:', error);
        process.exit(1);
    }
};

checkData();
