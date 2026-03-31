const http = require('http');

const rawCsv = `Date,Description,Category,Type,Amount
01-03-2024,Monthly Salary,Salary,Income,75000
01-03-2024,Bank Charges,Other,Expense,318
02-03-2024,IndiGo Flight,Travel,Expense,3349
02-03-2024,Myntra,Shopping,Expense,1712
03-03-2024,IndiGo Flight,Travel,Expense,3288
03-03-2024,Yoga Classes,Healthcare,Expense,549
03-03-2024,Metro Card Recharge,Travel,Expense,2770
04-03-2024,Netflix,Entertainment,Expense,389
05-03-2024,Udemy Course,Education,Expense,1271
05-03-2024,Movie Tickets,Entertainment,Expense,111
05-03-2024,Gift for Friend,Other,Expense,214
06-03-2024,Local Cafe,Food & Dining,Expense,212
06-03-2024,BigBasket,Food & Dining,Expense,862
06-03-2024,Local Cafe,Food & Dining,Expense,988
07-03-2024,Coursera,Education,Expense,2599
07-03-2024,Bank Charges,Other,Expense,922
07-03-2024,Medicine,Healthcare,Expense,356
10-03-2024,Zomato Order,Food & Dining,Expense,288
10-03-2024,Gaming,Entertainment,Expense,816
10-03-2024,Swiggy,Food & Dining,Expense,1106
12-03-2024,Myntra,Shopping,Expense,1048
12-03-2024,Health Checkup,Healthcare,Expense,1422
14-03-2024,Health Checkup,Healthcare,Expense,933
14-03-2024,Movie Tickets,Entertainment,Expense,976
15-03-2024,Fuel,Travel,Expense,3153
15-03-2024,Doctor Consultation,Healthcare,Expense,153
17-03-2024,Workshop Fee,Education,Expense,2375
18-03-2024,Misc Expense,Other,Expense,960
18-03-2024,Doctor Consultation,Healthcare,Expense,578
18-03-2024,Medicine,Healthcare,Expense,246
19-03-2024,Zomato Order,Food & Dining,Expense,287
19-03-2024,Apollo Pharmacy,Healthcare,Expense,1848
22-03-2024,Local Cafe,Food & Dining,Expense,1294
22-03-2024,Grocery Store,Food & Dining,Expense,582
22-03-2024,Gift for Friend,Other,Expense,857
23-03-2024,IndiGo Flight,Travel,Expense,1330
23-03-2024,Netflix,Entertainment,Expense,866
24-03-2024,Books,Education,Expense,1040
28-03-2024,Cult.fit Gym,Healthcare,Expense,962
30-03-2024,Train Ticket,Travel,Expense,2179
30-03-2024,Ola Cab,Travel,Expense,3419
31-03-2024,Jio Internet,Utilities,Expense,1431
01-04-2024,Monthly Salary,Salary,Income,75000
01-04-2024,Misc Expense,Other,Expense,816
06-04-2024,Books,Education,Expense,2716
06-04-2024,College Fee,Education,Expense,202
06-04-2024,Amazon Purchase,Shopping,Expense,776
07-04-2024,Uber Ride,Travel,Expense,1056
07-04-2024,H&M,Shopping,Expense,582
08-04-2024,Electricity Bill,Utilities,Expense,1633
09-04-2024,IndiGo Flight,Travel,Expense,4569
10-04-2024,Grocery Store,Food & Dining,Expense,1255
11-04-2024,Yoga Classes,Healthcare,Expense,811
11-04-2024,Misc Expense,Other,Expense,546
11-04-2024,Train Ticket,Travel,Expense,2261
13-04-2024,IPL Tickets,Entertainment,Expense,959
17-04-2024,Netflix,Entertainment,Expense,341
17-04-2024,H&M,Shopping,Expense,3895
17-04-2024,Gas Cylinder,Utilities,Expense,309
20-04-2024,Swiggy,Food & Dining,Expense,893
20-04-2024,Local Cafe,Food & Dining,Expense,618
20-04-2024,Uber Ride,Travel,Expense,4714
21-04-2024,DTH Recharge,Utilities,Expense,2133
21-04-2024,Jio Internet,Utilities,Expense,853
27-04-2024,Notes Printing,Education,Expense,2050
01-05-2024,Monthly Salary,Salary,Income,75000
01-05-2024,Medicine,Healthcare,Expense,406
03-05-2024,College Fee,Education,Expense,1075
03-05-2024,Gift for Friend,Other,Expense,1280
03-05-2024,DTH Recharge,Utilities,Expense,1667
08-05-2024,Cult.fit Gym,Healthcare,Expense,146
20-05-2024,Netflix,Entertainment,Expense,1084
20-05-2024,Jio Internet,Utilities,Expense,1294
22-05-2024,Vi Recharge,Utilities,Expense,1988
22-05-2024,Uber Ride,Travel,Expense,1101
23-05-2024,Udemy Course,Education,Expense,1411
25-05-2024,H&M,Shopping,Expense,3878
25-05-2024,Workshop Fee,Education,Expense,1824
26-05-2024,Yoga Classes,Healthcare,Expense,1069
26-05-2024,Water Bill,Utilities,Expense,1212
26-05-2024,IPL Tickets,Entertainment,Expense,1571
28-05-2024,Books,Education,Expense,775
28-05-2024,BigBasket,Food & Dining,Expense,588
31-05-2024,Flipkart,Shopping,Expense,1687
31-05-2024,Spotify,Entertainment,Expense,172
01-06-2024,Monthly Salary,Salary,Income,75000
03-06-2024,Freelance Project,Freelance,Income,16595
01-06-2024,Movie Tickets,Entertainment,Expense,547
03-06-2024,Swiggy,Food & Dining,Expense,367
03-06-2024,Medicine,Healthcare,Expense,913
03-06-2024,Medicine,Healthcare,Expense,622
04-06-2024,College Fee,Education,Expense,2414
05-06-2024,Vi Recharge,Utilities,Expense,2238
07-06-2024,Flipkart,Shopping,Expense,892
07-06-2024,Ola Cab,Travel,Expense,2053
07-06-2024,Movie Tickets,Entertainment,Expense,808
09-06-2024,Jio Internet,Utilities,Expense,686
10-06-2024,Books,Education,Expense,1565
10-06-2024,Books,Education,Expense,3011
10-06-2024,Misc Expense,Other,Expense,418
13-06-2024,Jio Internet,Utilities,Expense,1480
13-06-2024,Coursera,Education,Expense,1558
13-06-2024,Jio Internet,Utilities,Expense,1494
14-06-2024,Myntra,Shopping,Expense,2565
14-06-2024,Amazon Purchase,Shopping,Expense,2479
14-06-2024,Yoga Classes,Healthcare,Expense,463
16-06-2024,Electricity Bill,Utilities,Expense,126
17-06-2024,Medicine,Healthcare,Expense,848
17-06-2024,IndiGo Flight,Travel,Expense,284
19-06-2024,Dominos Pizza,Food & Dining,Expense,1281
20-06-2024,Gaming,Entertainment,Expense,917
23-06-2024,Ola Cab,Travel,Expense,730
23-06-2024,Movie Tickets,Entertainment,Expense,986
24-06-2024,Starbucks,Food & Dining,Expense,1003
24-06-2024,Jio Internet,Utilities,Expense,1650
24-06-2024,Haldirams,Food & Dining,Expense,1080
25-06-2024,Workshop Fee,Education,Expense,2194
26-06-2024,Charity Donation,Other,Expense,793
26-06-2024,Flipkart,Shopping,Expense,1614
27-06-2024,ATM Withdrawal,Other,Expense,731
27-06-2024,Spotify,Entertainment,Expense,590
28-06-2024,Meesho,Shopping,Expense,2681
28-06-2024,Jio Internet,Utilities,Expense,724
28-06-2024,Yoga Classes,Healthcare,Expense,1103
01-07-2024,Monthly Salary,Salary,Income,82000
03-07-2024,Freelance Project,Freelance,Income,17585
01-07-2024,Bank Charges,Other,Expense,911
01-07-2024,Croma Electronics,Shopping,Expense,239
02-07-2024,Cult.fit Gym,Healthcare,Expense,1999
06-07-2024,ATM Withdrawal,Other,Expense,1254
10-07-2024,College Fee,Education,Expense,2521
10-07-2024,Movie Tickets,Entertainment,Expense,214
12-07-2024,YouTube Premium,Entertainment,Expense,540
12-07-2024,Croma Electronics,Shopping,Expense,2896
12-07-2024,Vi Recharge,Utilities,Expense,2199
20-07-2024,Croma Electronics,Shopping,Expense,3938
22-07-2024,Workshop Fee,Education,Expense,915
22-07-2024,Workshop Fee,Education,Expense,2593
22-07-2024,Vi Recharge,Utilities,Expense,1161
26-07-2024,College Fee,Education,Expense,1600
29-07-2024,Myntra,Shopping,Expense,3709
30-07-2024,Train Ticket,Travel,Expense,3804
01-08-2024,Monthly Salary,Salary,Income,82000
01-08-2024,Netflix,Entertainment,Expense,1499
01-08-2024,Bank Charges,Other,Expense,1135
01-08-2024,Udemy Course,Education,Expense,694
03-08-2024,Bank Charges,Other,Expense,763
05-08-2024,College Fee,Education,Expense,1950
08-08-2024,Amazon Prime,Entertainment,Expense,1255
08-08-2024,Bank Charges,Other,Expense,897
08-08-2024,Ola Cab,Travel,Expense,1964
09-08-2024,IndiGo Flight,Travel,Expense,2259
09-08-2024,Books,Education,Expense,2605
12-08-2024,Haldirams,Food & Dining,Expense,186
13-08-2024,Notes Printing,Education,Expense,1280
13-08-2024,Starbucks,Food & Dining,Expense,1179
13-08-2024,Vi Recharge,Utilities,Expense,2195
14-08-2024,YouTube Premium,Entertainment,Expense,544
15-08-2024,Amazon Prime,Entertainment,Expense,120
15-08-2024,MakeMyTrip Hotel,Travel,Expense,2693
15-08-2024,Misc Expense,Other,Expense,721
16-08-2024,Spotify,Entertainment,Expense,1174
16-08-2024,MakeMyTrip Hotel,Travel,Expense,1497
19-08-2024,Electricity Bill,Utilities,Expense,831
22-08-2024,Gift for Friend,Other,Expense,202
24-08-2024,ATM Withdrawal,Other,Expense,466
26-08-2024,Ajio,Shopping,Expense,1799
31-08-2024,IndiGo Flight,Travel,Expense,1439
31-08-2024,Notes Printing,Education,Expense,1165
31-08-2024,Uber Ride,Travel,Expense,2108
01-09-2024,Monthly Salary,Salary,Income,82000
03-09-2024,Freelance Project,Freelance,Income,19401
03-09-2024,Spotify,Entertainment,Expense,112
04-09-2024,Zara,Shopping,Expense,3103
04-09-2024,Croma Electronics,Shopping,Expense,3849
05-09-2024,Misc Expense,Other,Expense,113
05-09-2024,Grocery Store,Food & Dining,Expense,1007
06-09-2024,Meesho,Shopping,Expense,202
06-09-2024,Electricity Bill,Utilities,Expense,1979
06-09-2024,Ola Cab,Travel,Expense,4480
07-09-2024,MakeMyTrip Hotel,Travel,Expense,4316
08-09-2024,Gift for Friend,Other,Expense,726
08-09-2024,ATM Withdrawal,Other,Expense,847
08-09-2024,Coursera,Education,Expense,446
09-09-2024,Notes Printing,Education,Expense,477
10-09-2024,Flipkart,Shopping,Expense,3196
10-09-2024,Udemy Course,Education,Expense,2226
10-09-2024,Uber Ride,Travel,Expense,265
12-09-2024,Gaming,Entertainment,Expense,1174
13-09-2024,Workshop Fee,Education,Expense,1609
13-09-2024,Notes Printing,Education,Expense,2761
13-09-2024,Amazon Purchase,Shopping,Expense,1530
16-09-2024,Ola Cab,Travel,Expense,1830
16-09-2024,Notes Printing,Education,Expense,512
16-09-2024,Coursera,Education,Expense,2446
17-09-2024,Local Cafe,Food & Dining,Expense,205
17-09-2024,Zomato Order,Food & Dining,Expense,911
19-09-2024,Yoga Classes,Healthcare,Expense,1351
19-09-2024,Cult.fit Gym,Healthcare,Expense,1492
19-09-2024,Fuel,Travel,Expense,2382
21-09-2024,Notes Printing,Education,Expense,362
21-09-2024,Vi Recharge,Utilities,Expense,830
21-09-2024,Zomato Order,Food & Dining,Expense,833
23-09-2024,Jio Internet,Utilities,Expense,2006
23-09-2024,Misc Expense,Other,Expense,1010
23-09-2024,Uber Ride,Travel,Expense,610
25-09-2024,DTH Recharge,Utilities,Expense,2029
28-09-2024,Medicine,Healthcare,Expense,873
28-09-2024,Apollo Pharmacy,Healthcare,Expense,328
29-09-2024,Misc Expense,Other,Expense,938
29-09-2024,Metro Card Recharge,Travel,Expense,2611
30-09-2024,Vi Recharge,Utilities,Expense,2452
30-09-2024,Ola Cab,Travel,Expense,4667
30-09-2024,Train Ticket,Travel,Expense,1258
01-10-2024,Monthly Salary,Salary,Income,82000
03-10-2024,Doctor Consultation,Healthcare,Expense,958
04-10-2024,Amazon Purchase,Shopping,Expense,2196
05-10-2024,Netflix,Entertainment,Expense,379
05-10-2024,Starbucks,Food & Dining,Expense,257
06-10-2024,Gift for Friend,Other,Expense,664
06-10-2024,YouTube Premium,Entertainment,Expense,1534
06-10-2024,Apollo Pharmacy,Healthcare,Expense,1892
07-10-2024,MakeMyTrip Hotel,Travel,Expense,528
07-10-2024,Croma Electronics,Shopping,Expense,2922
08-10-2024,Dominos Pizza,Food & Dining,Expense,534
11-10-2024,Bank Charges,Other,Expense,800
11-10-2024,Movie Tickets,Entertainment,Expense,1403
12-10-2024,Charity Donation,Other,Expense,834
12-10-2024,Yoga Classes,Healthcare,Expense,1312
12-10-2024,Flipkart,Shopping,Expense,2956
18-10-2024,Gift for Friend,Other,Expense,905
18-10-2024,Udemy Course,Education,Expense,2216
18-10-2024,Local Cafe,Food & Dining,Expense,1075
19-10-2024,Ola Cab,Travel,Expense,1106
21-10-2024,Fuel,Travel,Expense,1831
22-10-2024,Jio Internet,Utilities,Expense,1918
22-10-2024,Water Bill,Utilities,Expense,1432
22-10-2024,Zomato Order,Food & Dining,Expense,1261
24-10-2024,Apollo Pharmacy,Healthcare,Expense,1174
25-10-2024,Flipkart,Shopping,Expense,1066
25-10-2024,Cult.fit Gym,Healthcare,Expense,324
27-10-2024,Water Bill,Utilities,Expense,1183
27-10-2024,DTH Recharge,Utilities,Expense,1364
28-10-2024,Medicine,Healthcare,Expense,1547
01-11-2024,Monthly Salary,Salary,Income,82000
01-11-2024,Medicine,Healthcare,Expense,2004
02-11-2024,Coursera,Education,Expense,2903
02-11-2024,Coursera,Education,Expense,1266
02-11-2024,Gas Cylinder,Utilities,Expense,1079
03-11-2024,Ola Cab,Travel,Expense,2511
03-11-2024,Amazon Purchase,Shopping,Expense,3346
05-11-2024,Electricity Bill,Utilities,Expense,2157
05-11-2024,Amazon Purchase,Shopping,Expense,1248
05-11-2024,Udemy Course,Education,Expense,2261
06-11-2024,Fuel,Travel,Expense,3819
06-11-2024,Doctor Consultation,Healthcare,Expense,1640
06-11-2024,Gift for Friend,Other,Expense,654
08-11-2024,Flipkart,Shopping,Expense,311
08-11-2024,Gas Cylinder,Utilities,Expense,202
08-11-2024,Notes Printing,Education,Expense,2241
09-11-2024,Udemy Course,Education,Expense,1789
11-11-2024,Doctor Consultation,Healthcare,Expense,1678
12-11-2024,Cult.fit Gym,Healthcare,Expense,1022
12-11-2024,Zara,Shopping,Expense,474
15-11-2024,Ajio,Shopping,Expense,1902
17-11-2024,Starbucks,Food & Dining,Expense,536
17-11-2024,ATM Withdrawal,Other,Expense,359
17-11-2024,Misc Expense,Other,Expense,1063
19-11-2024,Apollo Pharmacy,Healthcare,Expense,1060
19-11-2024,Gaming,Entertainment,Expense,1020
19-11-2024,Metro Card Recharge,Travel,Expense,4494
21-11-2024,Local Cafe,Food & Dining,Expense,587
21-11-2024,Jio Internet,Utilities,Expense,1702
22-11-2024,Medicine,Healthcare,Expense,1879
22-11-2024,IndiGo Flight,Travel,Expense,197
22-11-2024,Netflix,Entertainment,Expense,1494
24-11-2024,Flipkart,Shopping,Expense,3873
24-11-2024,Uber Ride,Travel,Expense,1214
24-11-2024,ATM Withdrawal,Other,Expense,1196
25-11-2024,Grocery Store,Food & Dining,Expense,242
25-11-2024,Workshop Fee,Education,Expense,312
25-11-2024,Dominos Pizza,Food & Dining,Expense,821
27-11-2024,Flipkart,Shopping,Expense,995
29-11-2024,Train Ticket,Travel,Expense,1333
29-11-2024,Charity Donation,Other,Expense,816
29-11-2024,Water Bill,Utilities,Expense,1545
01-12-2024,Monthly Salary,Salary,Income,82000
03-12-2024,Freelance Project,Freelance,Income,10359
03-12-2024,Books,Education,Expense,1905
03-12-2024,Misc Expense,Other,Expense,258
03-12-2024,Vi Recharge,Utilities,Expense,244
04-12-2024,Meesho,Shopping,Expense,3844
05-12-2024,Medicine,Healthcare,Expense,861
05-12-2024,Gaming,Entertainment,Expense,1499
06-12-2024,Haldirams,Food & Dining,Expense,1022
07-12-2024,Coursera,Education,Expense,1731
07-12-2024,Croma Electronics,Shopping,Expense,3288
07-12-2024,ATM Withdrawal,Other,Expense,524
09-12-2024,Charity Donation,Other,Expense,564
09-12-2024,Spotify,Entertainment,Expense,930
12-12-2024,Myntra,Shopping,Expense,421
12-12-2024,Jio Internet,Utilities,Expense,1044
12-12-2024,Charity Donation,Other,Expense,1107
14-12-2024,IPL Tickets,Entertainment,Expense,374
14-12-2024,Meesho,Shopping,Expense,1124
15-12-2024,Cult.fit Gym,Healthcare,Expense,496
15-12-2024,Dominos Pizza,Food & Dining,Expense,629
18-12-2024,Uber Ride,Travel,Expense,124
18-12-2024,Misc Expense,Other,Expense,890
18-12-2024,Books,Education,Expense,1214
19-12-2024,Electricity Bill,Utilities,Expense,644
19-12-2024,Zara,Shopping,Expense,2657
19-12-2024,Dominos Pizza,Food & Dining,Expense,222
21-12-2024,Meesho,Shopping,Expense,741
21-12-2024,Metro Card Recharge,Travel,Expense,3838
23-12-2024,Workshop Fee,Education,Expense,1204
23-12-2024,Zomato Order,Food & Dining,Expense,259
23-12-2024,Flipkart,Shopping,Expense,2794
24-12-2024,Spotify,Entertainment,Expense,1562
25-12-2024,Workshop Fee,Education,Expense,440
26-12-2024,Apollo Pharmacy,Healthcare,Expense,1273
26-12-2024,Medicine,Healthcare,Expense,1979
27-12-2024,IndiGo Flight,Travel,Expense,2243
27-12-2024,Swiggy,Food & Dining,Expense,103
27-12-2024,Flipkart,Shopping,Expense,3748
28-12-2024,ATM Withdrawal,Other,Expense,1255
28-12-2024,Zara,Shopping,Expense,1767
29-12-2024,Doctor Consultation,Healthcare,Expense,846
29-12-2024,Starbucks,Food & Dining,Expense,714
31-12-2024,BigBasket,Food & Dining,Expense,631
31-12-2024,Local Cafe,Food & Dining,Expense,633
01-01-2025,Monthly Salary,Salary,Income,82000
03-01-2025,IPL Tickets,Entertainment,Expense,917
03-01-2025,Netflix,Entertainment,Expense,526
03-01-2025,Zomato Order,Food & Dining,Expense,943
04-01-2025,Jio Internet,Utilities,Expense,1450
06-01-2025,ATM Withdrawal,Other,Expense,900
08-01-2025,Uber Ride,Travel,Expense,3478
13-01-2025,Swiggy,Food & Dining,Expense,975
13-01-2025,Electricity Bill,Utilities,Expense,1302
13-01-2025,Myntra,Shopping,Expense,1384
15-01-2025,Bank Charges,Other,Expense,1297
19-01-2025,DTH Recharge,Utilities,Expense,1762
19-01-2025,ATM Withdrawal,Other,Expense,1195
20-01-2025,ATM Withdrawal,Other,Expense,967
20-01-2025,Spotify,Entertainment,Expense,435
22-01-2025,Amazon Prime,Entertainment,Expense,353
22-01-2025,Netflix,Entertainment,Expense,457
26-01-2025,Dominos Pizza,Food & Dining,Expense,1067
31-01-2025,Starbucks,Food & Dining,Expense,1090
31-01-2025,Gaming,Entertainment,Expense,404
01-02-2025,Monthly Salary,Salary,Income,82000
03-02-2025,Freelance Project,Freelance,Income,9983
02-02-2025,Metro Card Recharge,Travel,Expense,2559
03-02-2025,Doctor Consultation,Healthcare,Expense,1954
03-02-2025,Bank Charges,Other,Expense,1243
03-02-2025,Bank Charges,Other,Expense,373
04-02-2025,H&M,Shopping,Expense,2713
05-02-2025,Coursera,Education,Expense,1431
08-02-2025,Gift for Friend,Other,Expense,497
08-02-2025,Bank Charges,Other,Expense,614
10-02-2025,Meesho,Shopping,Expense,3569
10-02-2025,Fuel,Travel,Expense,1227
12-02-2025,Gaming,Entertainment,Expense,625
12-02-2025,College Fee,Education,Expense,1729
14-02-2025,Jio Internet,Utilities,Expense,2057
14-02-2025,IPL Tickets,Entertainment,Expense,1499
14-02-2025,Water Bill,Utilities,Expense,2037
15-02-2025,Grocery Store,Food & Dining,Expense,1243
15-02-2025,Gift for Friend,Other,Expense,285
16-02-2025,Gift for Friend,Other,Expense,996
20-02-2025,Swiggy,Food & Dining,Expense,816
21-02-2025,IPL Tickets,Entertainment,Expense,303
22-02-2025,Udemy Course,Education,Expense,2773
24-02-2025,Charity Donation,Other,Expense,1052
24-02-2025,YouTube Premium,Entertainment,Expense,1375
24-02-2025,Movie Tickets,Entertainment,Expense,1450
25-02-2025,Charity Donation,Other,Expense,856
27-02-2025,Local Cafe,Food & Dining,Expense,375
27-02-2025,Ola Cab,Travel,Expense,2733
27-02-2025,Misc Expense,Other,Expense,884
28-02-2025,Books,Education,Expense,1699
28-02-2025,Jio Internet,Utilities,Expense,451
28-02-2025,Vi Recharge,Utilities,Expense,154
01-03-2025,Monthly Salary,Salary,Income,82000
02-03-2025,Meesho,Shopping,Expense,4097
04-03-2025,Misc Expense,Other,Expense,1195
05-03-2025,Swiggy,Food & Dining,Expense,897
06-03-2025,Yoga Classes,Healthcare,Expense,1616`;

// Format dates from DD-MM-YYYY to YYYY-MM-DD for the server's Date constructor
const lines = rawCsv.split('\n');
const header = lines[0];
const formattedLines = [header];

for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    if (cols.length < 5) continue;

    // date is in cols[0] as DD-MM-YYYY
    const [d, m, y] = cols[0].split('-');
    const formattedDate = `${y}-${m}-${d}`;
    cols[0] = formattedDate;
    formattedLines.push(cols.join(','));
}

const csvContent = formattedLines.join('\n');
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
