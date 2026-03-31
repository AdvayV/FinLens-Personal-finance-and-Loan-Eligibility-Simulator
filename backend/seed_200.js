const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });

const TransactionSchema = new mongoose.Schema({
    date: { type: String, required: true },
    desc: { type: String, required: true },
    cat: { type: String, required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

const rawData = `07-03-2025,Zomato Order,Food & Dining,Expense,542
08-03-2025,Uber Ride,Travel,Expense,1876
09-03-2025,Amazon Purchase,Shopping,Expense,2345
10-03-2025,Netflix,Entertainment,Expense,649
11-03-2025,Electricity Bill,Utilities,Expense,1890
12-03-2025,Grocery Store,Food & Dining,Expense,1567
13-03-2025,Medicine,Healthcare,Expense,432
14-03-2025,Flipkart,Shopping,Expense,3210
15-03-2025,Ola Cab,Travel,Expense,890
16-03-2025,Starbucks,Food & Dining,Expense,456
17-03-2025,YouTube Premium,Entertainment,Expense,129
18-03-2025,Jio Internet,Utilities,Expense,999
19-03-2025,Cult.fit Gym,Healthcare,Expense,1500
20-03-2025,Myntra,Shopping,Expense,2890
21-03-2025,Swiggy,Food & Dining,Expense,678
22-03-2025,Train Ticket,Travel,Expense,1234
23-03-2025,Coursera,Education,Expense,1899
24-03-2025,Movie Tickets,Entertainment,Expense,560
25-03-2025,Water Bill,Utilities,Expense,890
26-03-2025,Doctor Consultation,Healthcare,Expense,1200
27-03-2025,H&M,Shopping,Expense,3450
28-03-2025,BigBasket,Food & Dining,Expense,2100
29-03-2025,Fuel,Travel,Expense,2500
30-03-2025,Spotify,Entertainment,Expense,119
31-03-2025,Gas Cylinder,Utilities,Expense,950
01-04-2025,Monthly Salary,Salary,Income,85000
01-04-2025,Bank Charges,Other,Expense,450
02-04-2025,Zara,Shopping,Expense,4500
03-04-2025,Dominos Pizza,Food & Dining,Expense,890
04-04-2025,Metro Card Recharge,Travel,Expense,1000
05-04-2025,Amazon Prime,Entertainment,Expense,1499
06-04-2025,Vi Recharge,Utilities,Expense,699
07-04-2025,Apollo Pharmacy,Healthcare,Expense,1678
08-04-2025,Croma Electronics,Shopping,Expense,8900
09-04-2025,Local Cafe,Food & Dining,Expense,345
10-04-2025,IndiGo Flight,Travel,Expense,5600
11-04-2025,Gaming,Entertainment,Expense,999
12-04-2025,DTH Recharge,Utilities,Expense,450
13-04-2025,Yoga Classes,Healthcare,Expense,800
14-04-2025,Ajio,Shopping,Expense,2340
15-04-2025,Haldirams,Food & Dining,Expense,567
15-04-2025,Freelance Project,Freelance,Income,12000
16-04-2025,Uber Ride,Travel,Expense,1230
17-04-2025,IPL Tickets,Entertainment,Expense,2500
18-04-2025,Electricity Bill,Utilities,Expense,2100
19-04-2025,Health Checkup,Healthcare,Expense,3500
20-04-2025,Meesho,Shopping,Expense,1890
21-04-2025,Zomato Order,Food & Dining,Expense,456
22-04-2025,Ola Cab,Travel,Expense,780
23-04-2025,Netflix,Entertainment,Expense,649
24-04-2025,Jio Internet,Utilities,Expense,999
25-04-2025,Medicine,Healthcare,Expense,567
26-04-2025,Flipkart,Shopping,Expense,4560
27-04-2025,Swiggy,Food & Dining,Expense,890
28-04-2025,Train Ticket,Travel,Expense,1890
29-04-2025,Udemy Course,Education,Expense,499
30-04-2025,Misc Expense,Other,Expense,1200
01-05-2025,Monthly Salary,Salary,Income,85000
01-05-2025,Gift for Friend,Other,Expense,2000
02-05-2025,Amazon Purchase,Shopping,Expense,3450
03-05-2025,Starbucks,Food & Dining,Expense,890
04-05-2025,Fuel,Travel,Expense,3200
05-05-2025,Movie Tickets,Entertainment,Expense,780
06-05-2025,Water Bill,Utilities,Expense,670
07-05-2025,Cult.fit Gym,Healthcare,Expense,1500
08-05-2025,Myntra,Shopping,Expense,5670
09-05-2025,BigBasket,Food & Dining,Expense,1890
10-05-2025,Metro Card Recharge,Travel,Expense,500
11-05-2025,Spotify,Entertainment,Expense,119
12-05-2025,Gas Cylinder,Utilities,Expense,950
13-05-2025,Doctor Consultation,Healthcare,Expense,800
14-05-2025,H&M,Shopping,Expense,2340
15-05-2025,Dominos Pizza,Food & Dining,Expense,670
15-05-2025,Freelance Project,Freelance,Income,15000
16-05-2025,Uber Ride,Travel,Expense,1450
17-05-2025,YouTube Premium,Entertainment,Expense,129
18-05-2025,Vi Recharge,Utilities,Expense,699
19-05-2025,Apollo Pharmacy,Healthcare,Expense,1234
20-05-2025,Croma Electronics,Shopping,Expense,12000
21-05-2025,Local Cafe,Food & Dining,Expense,456
22-05-2025,IndiGo Flight,Travel,Expense,7800
23-05-2025,Gaming,Entertainment,Expense,1500
24-05-2025,DTH Recharge,Utilities,Expense,450
25-05-2025,Yoga Classes,Healthcare,Expense,800
26-05-2025,Zara,Shopping,Expense,5600
27-05-2025,Haldirams,Food & Dining,Expense,890
28-05-2025,Ola Cab,Travel,Expense,560
29-05-2025,IPL Tickets,Entertainment,Expense,3500
30-05-2025,Electricity Bill,Utilities,Expense,1890
31-05-2025,Health Checkup,Healthcare,Expense,2500
01-06-2025,Monthly Salary,Salary,Income,85000
01-06-2025,Bank Charges,Other,Expense,350
02-06-2025,Meesho,Shopping,Expense,2340
03-06-2025,Zomato Order,Food & Dining,Expense,567
04-06-2025,Train Ticket,Travel,Expense,2100
05-06-2025,Netflix,Entertainment,Expense,649
06-06-2025,Jio Internet,Utilities,Expense,999
07-06-2025,Medicine,Healthcare,Expense,780
08-06-2025,Flipkart,Shopping,Expense,6700
09-06-2025,Swiggy,Food & Dining,Expense,450
10-06-2025,Fuel,Travel,Expense,2800
11-06-2025,Coursera,Education,Expense,2499
12-06-2025,Water Bill,Utilities,Expense,560
13-06-2025,Cult.fit Gym,Healthcare,Expense,1500
14-06-2025,Amazon Purchase,Shopping,Expense,4500
15-06-2025,Starbucks,Food & Dining,Expense,670
15-06-2025,Freelance Project,Freelance,Income,18000
16-06-2025,Metro Card Recharge,Travel,Expense,1000
17-06-2025,Movie Tickets,Entertainment,Expense,890
18-06-2025,Gas Cylinder,Utilities,Expense,950
19-06-2025,Doctor Consultation,Healthcare,Expense,1500
20-06-2025,Myntra,Shopping,Expense,3400
21-06-2025,BigBasket,Food & Dining,Expense,2300
22-06-2025,Uber Ride,Travel,Expense,1670
23-06-2025,Spotify,Entertainment,Expense,119
24-06-2025,Vi Recharge,Utilities,Expense,699
25-06-2025,Apollo Pharmacy,Healthcare,Expense,890
26-06-2025,H&M,Shopping,Expense,4500
27-06-2025,Dominos Pizza,Food & Dining,Expense,780
28-06-2025,Ola Cab,Travel,Expense,1230
29-06-2025,YouTube Premium,Entertainment,Expense,129
30-06-2025,Electricity Bill,Utilities,Expense,2200
01-07-2025,Monthly Salary,Salary,Income,88000
01-07-2025,Charity Donation,Other,Expense,5000
02-07-2025,Croma Electronics,Shopping,Expense,15000
03-07-2025,Local Cafe,Food & Dining,Expense,345
04-07-2025,IndiGo Flight,Travel,Expense,6500
05-07-2025,Gaming,Entertainment,Expense,2000
06-07-2025,DTH Recharge,Utilities,Expense,450
07-07-2025,Yoga Classes,Healthcare,Expense,800
08-07-2025,Ajio,Shopping,Expense,2890
09-07-2025,Haldirams,Food & Dining,Expense,670
10-07-2025,Train Ticket,Travel,Expense,1800
11-07-2025,Amazon Prime,Entertainment,Expense,1499
12-07-2025,Jio Internet,Utilities,Expense,999
13-07-2025,Health Checkup,Healthcare,Expense,4000
14-07-2025,Zara,Shopping,Expense,6700
15-07-2025,Zomato Order,Food & Dining,Expense,890
15-07-2025,Freelance Project,Freelance,Income,20000
16-07-2025,Fuel,Travel,Expense,3500
17-07-2025,Netflix,Entertainment,Expense,649
18-07-2025,Water Bill,Utilities,Expense,780
19-07-2025,Medicine,Healthcare,Expense,1200
20-07-2025,Flipkart,Shopping,Expense,5600
21-07-2025,Swiggy,Food & Dining,Expense,560
22-07-2025,Metro Card Recharge,Travel,Expense,500
23-07-2025,Udemy Course,Education,Expense,799
24-07-2025,Gas Cylinder,Utilities,Expense,950
25-07-2025,Cult.fit Gym,Healthcare,Expense,1500
26-07-2025,Meesho,Shopping,Expense,3400
27-07-2025,Starbucks,Food & Dining,Expense,780
28-07-2025,Uber Ride,Travel,Expense,1890
29-07-2025,Spotify,Entertainment,Expense,119
30-07-2025,Vi Recharge,Utilities,Expense,699
31-07-2025,Doctor Consultation,Healthcare,Expense,1000
01-08-2025,Monthly Salary,Salary,Income,88000
01-08-2025,ATM Withdrawal,Other,Expense,10000
02-08-2025,Amazon Purchase,Shopping,Expense,7800
03-08-2025,BigBasket,Food & Dining,Expense,2500
04-08-2025,Ola Cab,Travel,Expense,1340
05-08-2025,Movie Tickets,Entertainment,Expense,1200
06-08-2025,Electricity Bill,Utilities,Expense,2400
07-08-2025,Apollo Pharmacy,Healthcare,Expense,1560
08-08-2025,Myntra,Shopping,Expense,4300
09-08-2025,Dominos Pizza,Food & Dining,Expense,890
10-08-2025,IndiGo Flight,Travel,Expense,8500
11-08-2025,YouTube Premium,Entertainment,Expense,129
12-08-2025,DTH Recharge,Utilities,Expense,450
13-08-2025,Yoga Classes,Healthcare,Expense,800
14-08-2025,H&M,Shopping,Expense,5600
15-08-2025,Local Cafe,Food & Dining,Expense,450
15-08-2025,Freelance Project,Freelance,Income,22000
16-08-2025,Train Ticket,Travel,Expense,2300
17-08-2025,Gaming,Entertainment,Expense,1800
18-08-2025,Jio Internet,Utilities,Expense,999
19-08-2025,Health Checkup,Healthcare,Expense,3000
20-08-2025,Croma Electronics,Shopping,Expense,9500
21-08-2025,Haldirams,Food & Dining,Expense,780
22-08-2025,Fuel,Travel,Expense,3800
23-08-2025,IPL Tickets,Entertainment,Expense,4000
24-08-2025,Water Bill,Utilities,Expense,670
25-08-2025,Medicine,Healthcare,Expense,890
26-08-2025,Zara,Shopping,Expense,7200
27-08-2025,Zomato Order,Food & Dining,Expense,670
28-08-2025,Metro Card Recharge,Travel,Expense,1000
29-08-2025,Netflix,Entertainment,Expense,649
30-08-2025,Gas Cylinder,Utilities,Expense,950
31-08-2025,Cult.fit Gym,Healthcare,Expense,1500`;

async function seed() {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error('MONGODB_URI not found');

        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        const transactionsToInsert = rawData.split('\n').filter(l => l.trim()).map(line => {
            const [date, desc, cat, type, amount] = line.split(',');
            return {
                date,
                desc,
                cat,
                type: type.toLowerCase(),
                amount: parseFloat(amount)
            };
        });

        await Transaction.insertMany(transactionsToInsert);
        console.log(`Successfully added ${transactionsToInsert.length} more transactions to MongoDB!`);

        process.exit(0);
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
}

seed();
