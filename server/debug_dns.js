const dns = require('dns');

// The SRV record for the cluster
const hostname = '_mongodb._tcp.cluster0.xlrpaae.mongodb.net';

console.log(`🔍 Attempting to resolve DNS SRV record for: ${hostname}`);

dns.resolveSrv(hostname, (err, addresses) => {
    if (err) {
        console.error('❌ DNS Resolution Failed!');
        console.error('Error Code:', err.code);
        console.error('Message:', err.message);
        console.log('\n⚠️ Diagnosis: Your system cannot resolve "mongodb+srv" addresses.');
        console.log('   We need the "Standard Connection String" (starts with mongodb://).');
    } else {
        console.log('✅ DNS Resolution Succeeded!');
        console.log('SRV Records found:', addresses);

        const hosts = addresses.map(a => `${a.name}:${a.port}`).join(',');
        const standardString = `mongodb://suryaveersinhbhati:HARIDEV496@${hosts}/?ssl=true&replicaSet=atlas-xlrpaae-shard-0&authSource=admin&retryWrites=true&w=majority`;
        
        console.log('\n🎉 Generated Standard Connection String (Use this to bypass SRV):');
        console.log(standardString);
    }
});
