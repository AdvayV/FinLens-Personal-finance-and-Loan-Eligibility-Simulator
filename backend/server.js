const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// MongoDB Connection Setup
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Transaction = require('./models/Transaction');

const JWT_SECRET = 'your_super_secret_key_here'; // in production, move to .env

// =======================
// AUTH ROUTES
// =======================

// Register
app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ firstName, lastName, email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: { id: user._id, firstName, email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, firstName: user.firstName, email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// =======================
// TRANSACTION ROUTES
// =======================

// Get all transactions
app.get('/api/transactions', async (req, res) => {
  try {
    // Note: To make it multi-user, you would filter by req.user.id using JWT auth middleware.
    // For this prototype, we'll just fetch all transactions.
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a transaction
app.post('/api/transactions', async (req, res) => {
  try {
    const { date, desc, cat, type, amount } = req.body;
    const newTx = new Transaction({ date, desc, cat, type, amount });
    await newTx.save();
    res.status(201).json(newTx);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload Transactions via CSV Text (MUST be before DELETE /:id route)
app.post('/api/transactions/upload', async (req, res) => {
  try {
    const { csvContent } = req.body;
    if (!csvContent) {
      return res.status(400).json({ message: 'No CSV data provided' });
    }

    const rows = csvContent.split('\n').map(row => row.trim()).filter(row => row.length > 0);
    rows.shift(); // Remove header

    const transactionsToInsert = [];

    for (const row of rows) {
      // Split by comma, but ignore commas inside quotes
      const cols = row.match(/(\s*"[^"]+"\s*|\s*[^,]+|,)(?=,|$)/g)?.map(c => c.replace(/^"|"$/g, '').replace(/^,$/, '').trim()) || [];
      // Clean up empty empty values
      for (let i = 0; i < cols.length; i++) {
        if (cols[i] === ',') cols[i] = '';
      }

      if (cols.length < 5) continue;

      const [dateStr, desc, cat, type, amountStr] = cols;
      const parsedAmount = parseFloat(amountStr);
      if (isNaN(parsedAmount)) continue;

      transactionsToInsert.push({
        date: new Date(dateStr) || new Date(),
        desc: desc || 'Unknown',
        cat: cat || 'Other',
        type: type.toLowerCase() === 'income' ? 'income' : 'expense',
        amount: parsedAmount
      });
    }

    if (transactionsToInsert.length > 0) {
      await Transaction.insertMany(transactionsToInsert);
    }

    res.status(200).json({ message: `Successfully imported ${transactionsToInsert.length} transactions!` });

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Error processing CSV', error: error.message });
  }
});

// Delete a transaction
app.delete('/api/transactions/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// =======================
// LOAN ROUTES
// =======================
const Loan = require('./models/Loan');

// Get all loan assessments
app.get('/api/loans', async (req, res) => {
  try {
    const loans = await Loan.find().sort({ date: -1 });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Save a new loan assessment
app.post('/api/loans', async (req, res) => {
  try {
    const { amount, rate, tenure, emi, foir, maxEligible, verdict } = req.body;
    const newLoan = new Loan({ amount, rate, tenure, emi, foir, maxEligible, verdict });
    await newLoan.save();
    res.status(201).json(newLoan);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// AI Advisor Route (Using native fetch to avoid dependencies)
app.post('/api/advisor', async (req, res) => {
  try {
    const { prompt, history, data } = req.body;

    const systemPrompt = `You are an expert AI financial advisor named FinLens integrated into a user's local web tracker. Your goal is to give brief, helpful, and highly insightful financial advice based on the provided user context. Do not format with markdown headers, use simple plain text with bolding where necessary, keep responses strictly under 4 sentences. Break down numbers logically.

User Context Snapshot:
- Total Income Tracked: ₹${data.income}
- Total Expenses Tracked: ₹${data.expense}
- Current Savings Rate: ${data.saveRatio.toFixed(1)}%
- App calculated Discipline Score: ${data.score}/100`;

    // Format history for Gemini REST API
    const contents = [];
    if (history && history.length > 0) {
      history.forEach(msg => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.parts[0].text }]
        });
      });
    }

    contents.push({ role: "user", parts: [{ text: prompt }] });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: contents
      })
    });

    const aiData = await response.json();

    if (aiData.error) {
      throw new Error(aiData.error.message);
    }

    const responseText = aiData.candidates[0].content.parts[0].text;
    res.json({ response: responseText });

  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ message: 'AI generation failed', error: err.message });
  }
});

// (upload route moved above to correct ordering)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
