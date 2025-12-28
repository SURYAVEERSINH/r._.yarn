const mongoose = require('mongoose');

// URI explicitly targeting the 'test' database
const TEST_DB_URI = 'mongodb+srv://suryaveersinhbhati:HARIDEV496@cluster0.x1rpaae.mongodb.net/test?appName=Cluster0';

const cleanupRef = async () => {
    try {
        console.log('🔌 Connecting to TEST database...');
        await mongoose.connect(TEST_DB_URI);

        console.log('🗑️ Dropping database [test]...');
        await mongoose.connection.dropDatabase();

        console.log('✅ Database [test] deleted successfully.');
        process.exit();
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

cleanupRef();
