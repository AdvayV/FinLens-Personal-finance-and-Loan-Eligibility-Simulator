const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });
console.log('Seed (more) script started...');

const TransactionSchema = new mongoose.Schema({
    date: { type: String, required: true },
    desc: { type: String, required: true },
    cat: { type: String, required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

// New 100 transactions: mid-March 2025 → May 2025
const rawData = `08-03-2025,BigBasket,Food & Dining,Expense,1345
09-03-2025,Netflix,Entertainment,Expense,649
09-03-2025,Uber Ride,Travel,Expense,1875
10-03-2025,Electricity Bill,Utilities,Expense,1720
10-03-2025,Amazon Purchase,Shopping,Expense,2360
12-03-2025,Starbucks,Food & Dining,Expense,580
12-03-2025,Coursera,Education,Expense,1999
13-03-2025,Cult.fit Gym,Healthcare,Expense,1499
14-03-2025,IndiGo Flight,Travel,Expense,4890
14-03-2025,Gas Cylinder,Utilities,Expense,920
15-03-2025,Movie Tickets,Entertainment,Expense,750
15-03-2025,Local Cafe,Food & Dining,Expense,410
16-03-2025,Metro Card Recharge,Travel,Expense,2500
18-03-2025,Zomato Order,Food & Dining,Expense,625
18-03-2025,ATM Withdrawal,Other,Expense,1000
20-03-2025,Workshop Fee,Education,Expense,3200
20-03-2025,Spotify,Entertainment,Expense,119
21-03-2025,Flipkart,Shopping,Expense,3100
22-03-2025,Vi Recharge,Utilities,Expense,899
22-03-2025,Medicine,Healthcare,Expense,475
24-03-2025,Ola Cab,Travel,Expense,1650
25-03-2025,Dominos Pizza,Food & Dining,Expense,510
25-03-2025,Gift for Friend,Other,Expense,1200
26-03-2025,Jio Internet,Utilities,Expense,999
27-03-2025,Books,Education,Expense,1140
28-03-2025,Apollo Pharmacy,Healthcare,Expense,690
28-03-2025,Swiggy,Food & Dining,Expense,380
29-03-2025,Train Ticket,Travel,Expense,2300
30-03-2025,H&M,Shopping,Expense,2890
31-03-2025,Misc Expense,Other,Expense,545
01-04-2025,Monthly Salary,Salary,Income,85000
02-04-2025,Freelance Project,Freelance,Income,12500
02-04-2025,Zara,Shopping,Expense,3400
03-04-2025,Haldirams,Food & Dining,Expense,720
03-04-2025,Uber Ride,Travel,Expense,2100
04-04-2025,Netflix,Entertainment,Expense,649
04-04-2025,Cult.fit Gym,Healthcare,Expense,1499
05-04-2025,Electricity Bill,Utilities,Expense,1890
05-04-2025,Water Bill,Utilities,Expense,650
06-04-2025,Myntra,Shopping,Expense,1950
06-04-2025,Dominos Pizza,Food & Dining,Expense,470
07-04-2025,IPL Tickets,Entertainment,Expense,2500
08-04-2025,BigBasket,Food & Dining,Expense,1560
08-04-2025,Jio Internet,Utilities,Expense,999
09-04-2025,Udemy Course,Education,Expense,1800
10-04-2025,IndiGo Flight,Travel,Expense,5200
10-04-2025,MakeMyTrip Hotel,Travel,Expense,3800
11-04-2025,Starbucks,Food & Dining,Expense,620
12-04-2025,Amazon Purchase,Shopping,Expense,4200
12-04-2025,Spotify,Entertainment,Expense,119
13-04-2025,Medicine,Healthcare,Expense,380
14-04-2025,Yoga Classes,Healthcare,Expense,1100
15-04-2025,Fuel,Travel,Expense,3200
15-04-2025,Grocery Store,Food & Dining,Expense,1380
16-04-2025,Notes Printing,Education,Expense,450
17-04-2025,ATM Withdrawal,Other,Expense,2000
17-04-2025,Charity Donation,Other,Expense,750
18-04-2025,Gaming,Entertainment,Expense,1350
19-04-2025,Swiggy,Food & Dining,Expense,560
19-04-2025,Ola Cab,Travel,Expense,1780
20-04-2025,Zomato Order,Food & Dining,Expense,490
20-04-2025,Croma Electronics,Shopping,Expense,7500
21-04-2025,DTH Recharge,Utilities,Expense,450
22-04-2025,College Fee,Education,Expense,2400
23-04-2025,Vi Recharge,Utilities,Expense,599
24-04-2025,Movie Tickets,Entertainment,Expense,1100
25-04-2025,Local Cafe,Food & Dining,Expense,350
26-04-2025,Meesho,Shopping,Expense,1290
27-04-2025,Doctor Consultation,Healthcare,Expense,800
28-04-2025,Books,Education,Expense,950
29-04-2025,Flipkart,Shopping,Expense,2700
30-04-2025,Train Ticket,Travel,Expense,1800
01-05-2025,Monthly Salary,Salary,Income,85000
02-05-2025,Bank Charges,Other,Expense,350
03-05-2025,Coursera,Education,Expense,2200
03-05-2025,Uber Ride,Travel,Expense,1450
04-05-2025,BigBasket,Food & Dining,Expense,1680
04-05-2025,YouTube Premium,Entertainment,Expense,189
05-05-2025,Metro Card Recharge,Travel,Expense,2500
06-05-2025,Netflix,Entertainment,Expense,649
06-05-2025,Apollo Pharmacy,Healthcare,Expense,910
07-05-2025,Amazon Purchase,Shopping,Expense,3600
08-05-2025,Zara,Shopping,Expense,2850
09-05-2025,Swiggy,Food & Dining,Expense,720
09-05-2025,Jio Internet,Utilities,Expense,999
10-05-2025,IndiGo Flight,Travel,Expense,4500
11-05-2025,Electricity Bill,Utilities,Expense,2100
12-05-2025,Yoga Classes,Healthcare,Expense,1100
13-05-2025,Workshop Fee,Education,Expense,2800
14-05-2025,Gift for Friend,Other,Expense,650
15-05-2025,Haldirams,Food & Dining,Expense,580
15-05-2025,Cult.fit Gym,Healthcare,Expense,1499
16-05-2025,H&M,Shopping,Expense,3200
17-05-2025,IPL Tickets,Entertainment,Expense,1800
18-05-2025,Fuel,Travel,Expense,2900
19-05-2025,Starbucks,Food & Dining,Expense,490
20-05-2025,Flipkart,Shopping,Expense,1850
20-05-2025,Misc Expense,Other,Expense,780
21-05-2025,Ola Cab,Travel,Expense,1650
22-05-2025,Grocery Store,Food & Dining,Expense,1420
23-05-2025,Charity Donation,Other,Expense,1000
25-05-2025,Dominos Pizza,Food & Dining,Expense,670`;

async function seed() {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error('MONGODB_URI not found in .env');

        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        const items = rawData.split('\n').filter(l => l.trim()).map(line => {
            const [date, desc, cat, type, amount] = line.split(',');
            return { date, desc, cat, type: type.toLowerCase(), amount: parseFloat(amount) };
        });

        await Transaction.insertMany(items);
        console.log(`Successfully added ${items.length} NEW transactions to MongoDB!`);

        // Show total count
        const total = await Transaction.countDocuments();
        console.log(`Total transactions in database: ${total}`);

        process.exit(0);
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
}

seed();
