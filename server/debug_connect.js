const mongoose = require('mongoose');

// 1. The string user insisted on (with 'x1' typo and db name)
const BAD_STRING = 'mongodb+srv://suryaveersinhbhati:HARIDEV496@cluster0.x1rpaae.mongodb.net/r_yarn_shop';

// 2. The likely correct string (with 'xl' and db name)
const GOOD_STRING = 'mongodb+srv://suryaveersinhbhati:HARIDEV496@cluster0.xlrpaae.mongodb.net/r_yarn_shop';

// 3. The string likely in Render Env Vars (from previous screenshot, usually without db name or with params)
const RENDER_ENV_STRING = 'mongodb+srv://suryaveersinhbhati:HARIDEV496@cluster0.xlrpaae.mongodb.net/?appName=Cluster0';

async function testConnection(uri, label) {
    try {
        console.log(`Testing ${label}: ${uri}`);
        await mongoose.connect(uri);
        console.log(`✅ ${label} Connected!`);
        await mongoose.disconnect();
    } catch (err) {
        console.error(`❌ ${label} Failed:`, err.message);
    }
}

async function run() {
    await testConnection(BAD_STRING, 'BAD_STRING (User Typo)');
    await testConnection(GOOD_STRING, 'GOOD_STRING (Fixed Typo)');
    await testConnection(RENDER_ENV_STRING, 'RENDER_ENV_STRING');
}

run();
