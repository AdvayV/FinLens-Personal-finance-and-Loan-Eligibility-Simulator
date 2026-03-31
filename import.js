const fs = require('fs');

async function upload() {
    try {
        const csvData = fs.readFileSync('c:/Advay study/VIT/Sem 4 WIN 25-26/Web Programming/Project/2_Year_FinLens_Transactions.csv', 'utf8');
        const lines = csvData.split('\n');
        const filteredLines = lines.map(l => l.trim()).filter(l => l.length > 0);
        const header = filteredLines[0];
        const rows = filteredLines.slice(1, 301); // 300 transactions

        const limitedCsv = [header, ...rows].join('\n');
        console.log(`Sending ${rows.length} rows...`);

        // We will use native fetch (available in modern Node)
        const res = await fetch('http://localhost:5001/api/transactions/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ csvContent: limitedCsv })
        });

        if (res.ok) {
            const json = await res.json();
            console.log('Success:', json);
        } else {
            const err = await res.text();
            console.error('Error from server:', res.status, err);
        }
    } catch (err) {
        console.error('Failed to connect or process:', err.message);
    }
}

upload();
