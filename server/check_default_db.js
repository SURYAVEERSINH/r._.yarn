const mongoose = require('mongoose');
const Product = require('./models/Product');

// URI WITHOUT database name (defaults to 'test')
const DEFAULT_URI = 'mongodb+srv://suryaveersinhbhati:HARIDEV496@cluster0.x1rpaae.mongodb.net/?appName=Cluster0';

const checkDefault = async () => {
    try {
        console.log('Connecting to DEFAULT DB (test)...');
        await mongoose.connect(DEFAULT_URI);
        const count = await Product.countDocuments();
        console.log(`📦 Products in Default DB: ${count}`);

        if (count > 0) {
            const sample = await Product.findOne();
            console.log('Sample Product:', sample.name);
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkDefault();
