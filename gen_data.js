const fs = require('fs');

// Start from March 2024, end at March 2026
const startDate = new Date('2024-03-01');
const endDate = new Date('2026-03-03');

const categories = [
    'Food & Dining', 'Shopping', 'Travel',
    'Utilities', 'Entertainment', 'Healthcare',
    'Education', 'Other'
];

const descPool = {
    'Food & Dining': ['Zomato Order', 'Swiggy', 'Starbucks', 'Dominos Pizza', 'Local Cafe', 'Grocery Store', 'BigBasket', 'Haldirams'],
    'Shopping': ['Amazon Purchase', 'Flipkart', 'Myntra', 'H&M', 'Zara', 'Meesho', 'Croma Electronics', 'Ajio'],
    'Travel': ['Uber Ride', 'Ola Cab', 'IndiGo Flight', 'Train Ticket', 'Metro Card Recharge', 'Fuel', 'MakeMyTrip Hotel'],
    'Utilities': ['Electricity Bill', 'Water Bill', 'Jio Internet', 'Vi Recharge', 'Gas Cylinder', 'DTH Recharge'],
    'Entertainment': ['Netflix', 'Spotify', 'Movie Tickets', 'Amazon Prime', 'YouTube Premium', 'IPL Tickets', 'Gaming'],
    'Healthcare': ['Apollo Pharmacy', 'Doctor Consultation', 'Health Checkup', 'Cult.fit Gym', 'Yoga Classes', 'Medicine'],
    'Education': ['Udemy Course', 'Books', 'Coursera', 'Workshop Fee', 'College Fee', 'Notes Printing'],
    'Other': ['ATM Withdrawal', 'Gift for Friend', 'Charity Donation', 'Bank Charges', 'Misc Expense']
};

// Salary varies slightly each month (realistic increment mid-year)
function getSalary(date) {
    const yr = date.getFullYear();
    const mo = date.getMonth(); // 0-indexed
    if (yr === 2024 && mo < 6) return 75000;
    if (yr === 2024 && mo >= 6) return 82000; // mid-year hike
    if (yr === 2025 && mo < 6) return 82000;
    return 90000; // 2025 hike + 2026
}

// Discretionary spend limits by month (sometimes higher, sometimes lower)
function spendBudget(date) {
    const mo = date.getMonth();
    // Festival months (Oct, Nov, Dec) spend more; Jan austerity
    if ([9, 10, 11].includes(mo)) return 55000;
    if (mo === 0) return 30000;
    return 42000;
}

let rows = ['Date,Description,Category,Type,Amount'];
let d = new Date(startDate);

let lastSalaryMonth = -1;

while (d <= endDate) {
    const mo = d.getMonth();
    const yr = d.getFullYear();
    const day = d.getDate();

    // Salary on 1st of each month
    if (day === 1 && mo !== lastSalaryMonth) {
        lastSalaryMonth = mo;
        const sal = getSalary(d);
        rows.push(`${d.toISOString().slice(0, 10)},Monthly Salary,Salary,Income,${sal}`);

        // Occasional freelance income (roughly 1-in-3 months)
        if (Math.random() > 0.65) {
            const fAmt = 5000 + Math.floor(Math.random() * 20000);
            const nextDay = new Date(d); nextDay.setDate(nextDay.getDate() + 2);
            if (nextDay <= endDate)
                rows.push(`${nextDay.toISOString().slice(0, 10)},Freelance Project,Freelance,Income,${fAmt}`);
        }
    }

    // 3-7 expense transactions per week (not every day)
    if (Math.random() > 0.45) {
        const numTx = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < numTx; i++) {
            const cat = categories[Math.floor(Math.random() * categories.length)];
            const descs = descPool[cat];
            const desc = descs[Math.floor(Math.random() * descs.length)];

            let maxAmt;
            if (cat === 'Travel') maxAmt = 5000;
            else if (cat === 'Shopping') maxAmt = 4000;
            else if (cat === 'Utilities') maxAmt = 2500;
            else if (cat === 'Healthcare') maxAmt = 2000;
            else if (cat === 'Education') maxAmt = 3000;
            else if (cat === 'Entertainment') maxAmt = 1500;
            else maxAmt = 1200;

            const amount = 100 + Math.floor(Math.random() * maxAmt);
            rows.push(`${d.toISOString().slice(0, 10)},${desc},${cat},Expense,${amount}`);
        }
    }

    d.setDate(d.getDate() + 1);
}

const filename = '2_Year_FinLens_Transactions.csv';
fs.writeFileSync(filename, rows.join('\n'));
console.log(`Done! Written ${rows.length - 1} transactions to ${filename}`);
