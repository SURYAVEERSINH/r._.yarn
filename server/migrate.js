const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const LOCAL_URI = 'mongodb://127.0.0.1:27017/r_yarn_shop';
const CLOUD_URI = 'mongodb+srv://suryaveersinhbhati:HARIDEV496@cluster0.x1rpaae.mongodb.net/r_yarn_shop';

const migrate = async () => {
    try {
        console.log('🔄 Starting Migration...');

        // 1. Connect to Local DB
        console.log('📍 Connecting to Local DB...');
        await mongoose.connect(LOCAL_URI);
        console.log('✅ Connected. Fetching data...');

        const users = await User.find({});
        const products = await Product.find({});
        const orders = await Order.find({});

        console.log(`📦 Found ${users.length} Users`);
        console.log(`📦 Found ${products.length} Products`);
        console.log(`📦 Found ${orders.length} Orders`);

        await mongoose.disconnect();
        console.log('🔌 Disconnected from Local DB.');

        // 2. Connect to Cloud DB
        console.log('☁️ Connecting to Cloud DB (Atlas)...');
        if (!CLOUD_URI) {
            throw new Error('MONGO_URI is not defined in .env');
        }
        await mongoose.connect(CLOUD_URI);
        console.log('✅ Connected to Atlas.');

        // 3. Clear Cloud DB
        console.log('🗑️ Clearing existing Cloud Data...');
        await User.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});
        console.log('✅ Cloud Data cleared.');

        // 4. Insert Data
        console.log('📤 Inserting Local Data to Cloud...');
        if (users.length > 0) await User.insertMany(users);
        if (products.length > 0) await Product.insertMany(products);
        if (orders.length > 0) await Order.insertMany(orders);

        console.log('🎉 Migration Complete!');
        process.exit();
    } catch (error) {
        console.error('❌ Migration Failed:', error);
        process.exit(1);
    }
};

migrate();
