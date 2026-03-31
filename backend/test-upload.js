const fs = require('fs');

async function uploadCSV() {
    const csvContent = fs.readFileSync('../2_Year_FinLens_Transactions.csv', 'utf8');
    try {
        const res = await fetch('http://localhost:5001/api/transactions/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ csvContent })
        });
        const data = await res.json();
        console.log(data);
    } catch (e) {
        console.error(e);
    }
}
uploadCSV();
