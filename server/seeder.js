const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const User = require('./models/User');
const instagramProducts = require('./data/instagramProducts');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.create([
            {
                name: 'Admin User',
                email: 'rpatel2006@gmail.com',
                password: 'RPATEL',
                isAdmin: true,
                phone: '9999999999'
            }
        ]);

        const adminUser = createdUsers[0]._id;

        const productsToInsert = instagramProducts.map(product => {
            const { _id, ...rest } = product;
            return { ...rest };
        });

        const createdProducts = await Product.insertMany(productsToInsert);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
