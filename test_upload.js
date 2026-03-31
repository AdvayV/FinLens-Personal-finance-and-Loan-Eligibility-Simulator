const http = require('http');

const csvContent = `Date,Description,Category,Type,Amount
2024-03-01,Monthly Salary,Salary,Income,75000
2024-03-03,Zomato Order,Food & Dining,Expense,450
2024-03-05,Amazon Purchase,Shopping,Expense,1200
2024-03-07,Uber Ride,Travel,Expense,230
2024-03-08,Netflix,Entertainment,Expense,649`;

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
        console.log('Status:', res.statusCode);
        console.log('Response:', data);
    });
});

req.on('error', (e) => {
    console.error('Request failed:', e.message);
});

req.write(body);
req.end();
