// Self-contained test: spawns server, tests, then exits
const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const serverProcess = spawn('node', ['server.js'], {
    cwd: path.join(__dirname, 'backend'),
    stdio: 'pipe'
});

let serverReady = false;

serverProcess.stdout.on('data', (data) => {
    const msg = data.toString();
    process.stdout.write('[SERVER] ' + msg);
    if (msg.includes('Connected to MongoDB') && !serverReady) {
        serverReady = true;
        runTest();
    }
});

serverProcess.stderr.on('data', (d) => process.stderr.write('[ERR] ' + d));

setTimeout(() => {
    if (!serverReady) {
        console.error('Server did not start in time');
        serverProcess.kill();
        process.exit(1);
    }
}, 15000);

function runTest() {
    const csvContent = [
        'Date,Description,Category,Type,Amount',
        '2024-03-01,Monthly Salary,Salary,Income,75000',
        '2024-03-03,Zomato Order,Food & Dining,Expense,450',
        '2024-03-05,Amazon Purchase,Shopping,Expense,1200',
        '2024-03-07,Uber Ride,Travel,Expense,230',
        '2024-03-08,Netflix,Entertainment,Expense,649'
    ].join('\n');

    const body = JSON.stringify({ csvContent });

    const options = {
        hostname: 'localhost',
        port: 5001,
        path: '/api/transactions/upload',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body)
        }
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log('\n=== UPLOAD TEST RESULT ===');
            console.log('HTTP Status:', res.statusCode);
            console.log('Response:', data);
            if (res.statusCode === 200) {
                console.log('\n✅ SUCCESS — Upload route is working correctly!');
            } else {
                console.log('\n❌ FAILED — Route returned non-200 status.');
            }
            serverProcess.kill();
            process.exit(res.statusCode === 200 ? 0 : 1);
        });
    });

    req.on('error', (e) => {
        console.error('\n❌ Request error:', e.message);
        serverProcess.kill();
        process.exit(1);
    });

    req.write(body);
    req.end();
}
