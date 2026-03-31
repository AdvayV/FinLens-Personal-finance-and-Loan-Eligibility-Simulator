# JavaScript Core Functionalities from HTML Components

This file documents the important JavaScript logic present inside each HTML component page. It is focused on core functional behavior only (API calls, calculations, rendering flows, and interaction handlers).

## 1. `login.html`

### Core purpose

Handles tab switching between login/register, performs authentication API calls, stores JWT token, and redirects to dashboard.

### Core JS snippets

```javascript
function switchTab(tab, btn) {
  document
    .querySelectorAll(".tab-switch button")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document
    .querySelectorAll(".form-panel")
    .forEach((f) => f.classList.remove("active"));
  document.getElementById("form-" + tab).classList.add("active");
}

async function handleRegister() {
  const payload = { firstName, lastName, email, password };
  const res = await fetch("http://localhost:5001/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    setTimeout(() => (window.location.href = "dashboard.html"), 1500);
  }
}

async function goToDashboard() {
  const res = await fetch("http://localhost:5001/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  }
}
```

## 2. `dashboard.html`

### Core purpose

Fetches all transactions, computes KPI totals, calculates discipline score, renders recent transactions and category-spend visualization, and auto-refreshes.

### Core JS snippets

```javascript
async function loadDashboard() {
  const res = await fetch("http://localhost:5001/api/transactions");
  const items = await res.json();

  let inc = 0,
    exp = 0,
    discSpend = 0;
  const catSpend = {};
  const monthSet = new Set();

  items.forEach((t) => {
    const d = new Date(t.date);
    if (!isNaN(d)) monthSet.add(d.getFullYear() + "-" + d.getMonth());
    if (t.type === "income") inc += t.amount;
    else {
      exp += t.amount;
      if (discCats.includes(t.cat)) discSpend += t.amount;
      catSpend[t.cat] = (catSpend[t.cat] || 0) + t.amount;
    }
  });

  const numMonths = Math.max(monthSet.size, 1);
  const saveRatio = inc > 0 ? ((inc - exp) / inc) * 100 : 0;
  const discRatio = exp > 0 ? (discSpend / exp) * 100 : 0;
  let scr = 100;

  Object.entries(catSpend).forEach(([cat, totalSpent]) => {
    const budget = BUDGETS[cat];
    if (budget && totalSpent / numMonths > budget) scr -= 8;
  });

  // savings and discretionary penalties/bonuses
  scr = Math.max(0, Math.min(100, scr));
  document.getElementById("kpi-score").textContent = Math.round(scr);
}

loadDashboard();
setInterval(loadDashboard, 15000);
```

## 3. `transactions.html`

### Core purpose

Manages transaction dataset loading (API with offline fallback), add/delete flows, table rendering with pagination, filtering, CSV export, and toasts.

### Core JS snippets

```javascript
async function fetchTransactions() {
  try {
    const res = await fetch("http://localhost:5001/api/transactions");
    if (res.ok) {
      const apiData = await res.json();
      if (apiData && apiData.length > 0) transactions = apiData;
    }
  } catch {
    // fallback to local parsed snapshot
  }
  filteredTransactions = [...transactions];
  renderTable();
}

async function addTransaction() {
  const payload = { date, desc, cat, type: currentType, amount };
  try {
    const res = await fetch("http://localhost:5001/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const newTx = await res.json();
    transactions.unshift(newTx);
  } catch {
    transactions.unshift({ ...payload, _id: "local-" + Date.now() });
  }
  filterTable();
}

function filterTable(searchVal) {
  const q = (searchVal || "").toLowerCase();
  filteredTransactions = transactions.filter(
    (t) =>
      (t.desc.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q)) &&
      (!typeF || t.type === typeF) &&
      (!catF || t.cat === catF),
  );
  currentPage = 1;
  renderTable();
}
```

## 4. `behaviour.html`

### Core purpose

Computes a behavioral finance score using monthly-average budget violations, savings ratio, and discretionary ratio; renders score breakdown, ethics signals, violations, top spends, and monthly cadence chart.

### Core JS snippets

```javascript
function computeScore(txs, numMonths) {
  let inc = 0,
    exp = 0,
    disc = 0;
  const catSpend = {};
  txs.forEach((tx) => {
    if (tx.type === "income") inc += tx.amount;
    else {
      exp += tx.amount;
      if (DISC_CATS.has(tx.cat)) disc += tx.amount;
      catSpend[tx.cat] = (catSpend[tx.cat] || 0) + tx.amount;
    }
  });

  const saveRatio = inc > 0 ? ((inc - exp) / inc) * 100 : 0;
  const discRatio = exp > 0 ? (disc / exp) * 100 : 0;
  let score = 100;

  Object.entries(catSpend).forEach(([cat, totalSpent]) => {
    const budget = BUDGETS[cat];
    if (budget && totalSpent / (numMonths || 1) > budget) score -= 8;
  });

  // apply savings bonus/penalty and discretionary penalties
  return {
    score: Math.min(Math.max(score, 0), 100),
    saveRatio,
    discRatio,
    catSpend,
    inc,
    exp,
  };
}

async function init() {
  const res = await fetch(API);
  const txs = await res.json();
  const byMonth = groupByMonth(txs);
  const result = computeScore(txs, Object.keys(byMonth).length);
  renderScoreAndPanels(result, txs, byMonth);
}

init();
setInterval(init, 15000);
```

## 5. `insights.html`

### Core purpose

Builds advanced analytics: lifestyle inflation trend (Chart.js), what-if simulator, day-of-week profile, recurring expense detector, goal projection, and impulse-spend detection.

### Core JS snippets

```javascript
function computeScore(inc, exp, discSpend, catSpend, numMonths) {
  const saveRatio = inc > 0 ? ((inc - exp) / inc) * 100 : 0;
  const discRatio = exp > 0 ? (discSpend / exp) * 100 : 0;
  let score = 100;
  Object.entries(catSpend).forEach(([cat, total]) => {
    const b = BUDGETS[cat];
    if (b && total / numMonths > b) score -= 8;
  });
  return Math.min(Math.max(score, 0), 100);
}

function buildWhatIf(inc, exp, disc, catSpend) {
  window.simData = { inc, exp, disc, catSpend, sliderState: {} };
  runSim();
}

function runSim() {
  const { inc, catSpend, sliderState } = window.simData;
  let newExp = 0,
    newDisc = 0;
  const newCatSpend = {};

  Object.entries(catSpend).forEach(([cat, total]) => {
    const adjusted = total * (1 + (sliderState[cat] || 0) / 100);
    newCatSpend[cat] = adjusted;
    newExp += adjusted;
    if (DISC_CATS.has(cat)) newDisc += adjusted;
  });

  const score = computeScore(inc, newExp, newDisc, newCatSpend, globalMonths);
  updateSimCards(score, inc, newExp);
}

function buildRecurring() {
  // detect descriptions seen in 3+ distinct months
}

function buildImpulse() {
  // flags high-risk spends using:
  // (1) amount > 2x category average
  // (2) multiple same-category txns same day
  // (3) weekend discretionary spikes
}
```

## 6. `advisor.html`

### Core purpose

Loads real transaction metrics, computes discipline score, updates AI context fields, supports Gemini API key management, and powers chat with live API or fallback rule-based responses.

### Core JS snippets

```javascript
function saveApiKey() {
  const key = document.getElementById("apiKeyInput").value.trim();
  localStorage.setItem("gemini_api_key", key);
}

async function loadAdvisor() {
  const res = await fetch("http://localhost:5001/api/transactions");
  const items = await res.json();
  // compute inc/exp/saveRatio/discRatio and discipline score
  dynInc = inc;
  dynExp = exp;
  dynSave = inc - exp;
  dynScore = scr;
}

async function sendMessage() {
  const apiKey = localStorage.getItem("gemini_api_key") || "";
  if (!apiKey) {
    addMessage(getFallbackResponse(text), false);
    return;
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ systemInstruction, contents, generationConfig }),
    },
  );
}
```

## 7. `loan.html`

### Core purpose

Uses transaction-derived behavior score to adjust interest rate, evaluate eligibility (FOIR), compute EMI and max eligible amount, and persist loan analysis to backend.

### Core JS snippets

```javascript
async function fetchUserData() {
  const res = await fetch("http://localhost:5001/api/transactions");
  const txs = await res.json();
  // compute income, expense, discretionary spend, monthly budget violations
  calculatedDisciplineScore = Math.min(Math.max(0, score), 100);
}

function evaluateLoan() {
  let baseRate = credit === "good" ? 9.5 : credit === "avg" ? 11.5 : 14.5;
  if (calculatedDisciplineScore > 80) baseRate -= 0.5;
  if (calculatedDisciplineScore < 50) baseRate += 1.0;

  const monthlyRate = baseRate / 100 / 12;
  const emi =
    (loanAmt * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1);
  const foir = Math.round((emi / income) * 100);
  const maxEligible = Math.round(
    income * 12 * (calculatedDisciplineScore / 100),
  );

  fetch("http://localhost:5001/api/loans", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: loanAmt,
      rate: baseRate,
      tenure,
      emi: Math.round(emi),
      foir,
      maxEligible,
    }),
  });
}
```

## 8. `reports.html`

### Core purpose

Builds reporting views: monthly report cards, overall score/grade summary, financial snapshot table, loan assessment history, and transaction audit trail.

### Core JS snippets

```javascript
function computeScore(txs, numMonths) {
  let inc = 0,
    exp = 0,
    disc = 0;
  const cs = {};
  txs.forEach((tx) => {
    if (tx.type === "income") inc += tx.amount;
    else {
      exp += tx.amount;
      if (DISC_CATS.has(tx.cat)) disc += tx.amount;
      cs[tx.cat] = (cs[tx.cat] || 0) + tx.amount;
    }
  });
  // apply same scoring rules as other modules
  return { score, inc, exp, disc, saveRatio: sr, discRatio: dr, catSpend: cs };
}

async function loadReports() {
  const res = await fetch(API);
  const items = await res.json();

  const byMonth = groupByMonth(items);
  const overall = computeScore(items, Object.keys(byMonth).length);

  renderMonthlyCards(byMonth);
  renderSnapshot(overall);
  await loadLoanHistory();
  renderAuditTrail(items);
}

loadReports();
setInterval(loadReports, 15000);
```

## 9. `influence.html`

### Core purpose

Creates an interactive influence network map using D3 force simulation to show relationships between spending categories and external/social/macro factors.

### Core JS snippets

```javascript
const simulation = d3
  .forceSimulation(nodes)
  .force(
    "link",
    d3
      .forceLink(links)
      .id((d) => d.id)
      .distance(100),
  )
  .force("charge", d3.forceManyBody().strength(-300))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force(
    "collision",
    d3.forceCollide().radius((d) => d.size + 10),
  );

const node = container
  .append("g")
  .selectAll(".node")
  .data(nodes)
  .enter()
  .append("g")
  .call(
    d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended),
  )
  .on("click", (event, d) => showDetails(d));

simulation.on("tick", () => {
  link
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);

  node.attr("transform", (d) => `translate(${d.x},${d.y})`);
});

function showDetails(d) {
  // updates side panel with contextual factor insight
}
```

## Common Core Pattern Across Pages

Most pages (`dashboard`, `behaviour`, `insights`, `advisor`, `loan`, `reports`) share the same behavior-scoring model:

```javascript
score = 100
- monthlyBudgetViolations * 8
+/- savingsRate bonus/penalty
- discretionarySpend penalty
clamped to [0, 100]
```

This shared model is the backbone for KPIs, advisor prompts, report grading, and loan risk decisions.

---

## 10. `backend/server.js` — Express + MongoDB Integration

### Core purpose

Node.js/Express REST API server that connects to MongoDB via Mongoose, handles user authentication (bcrypt + JWT), exposes CRUD endpoints for transactions and loans, processes bulk CSV uploads, and proxies AI advisor requests to the Gemini API.

### 10.1 MongoDB Connection & Middleware Setup

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// MongoDB Connection — URI loaded from .env
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('Error connecting to MongoDB:', err));
```

### 10.2 Mongoose Schema Definitions (MongoDB Models)

**Transaction Model** — stores each income/expense record:

```javascript
const transactionSchema = new mongoose.Schema({
  date: { type: String, required: true },
  desc: { type: String, required: true },
  cat:  { type: String, required: true },
  type: { type: String, required: true, enum: ['income', 'expense'] },
  amount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
```

**User Model** — stores registered user credentials:

```javascript
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```

**Loan Model** — persists each loan eligibility assessment:

```javascript
const loanSchema = new mongoose.Schema({
  amount:      { type: Number, required: true },
  rate:        { type: Number, required: true },
  tenure:      { type: Number, required: true },
  emi:         { type: Number, required: true },
  foir:        { type: Number, required: true },
  maxEligible: { type: Number, required: true },
  verdict:     { type: String, required: true },
  date:        { type: Date, default: Date.now }
});

module.exports = mongoose.model('Loan', loanSchema);
```

### 10.3 Authentication Routes (Register & Login)

```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register — hash password with bcrypt, return JWT
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: 'User already exists' });

  user = new User({ firstName, lastName, email, password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
  res.status(201).json({ token, user: { id: user._id, firstName, email } });
});

// Login — verify password, return JWT
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user._id, firstName: user.firstName, email } });
});
```

### 10.4 Transaction CRUD Routes

```javascript
// GET all transactions (sorted newest-first)
app.get('/api/transactions', async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
});

// POST a single new transaction
app.post('/api/transactions', async (req, res) => {
  const { date, desc, cat, type, amount } = req.body;
  const newTx = new Transaction({ date, desc, cat, type, amount });
  await newTx.save();
  res.status(201).json(newTx);
});

// DELETE a transaction by MongoDB _id
app.delete('/api/transactions/:id', async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: 'Transaction removed' });
});
```

### 10.5 Bulk CSV Upload Route

```javascript
app.post('/api/transactions/upload', async (req, res) => {
  const { csvContent } = req.body;
  const rows = csvContent.split('\n').map(r => r.trim()).filter(r => r.length > 0);
  rows.shift(); // remove header row

  const transactionsToInsert = [];

  for (const row of rows) {
    const cols = row.match(/(\s*"[^"]+"\s*|\s*[^,]+|,)(?=,|$)/g)
      ?.map(c => c.replace(/^"|"$/g, '').trim()) || [];
    if (cols.length < 5) continue;

    const [dateStr, desc, cat, type, amountStr] = cols;
    const parsedAmount = parseFloat(amountStr);
    if (isNaN(parsedAmount)) continue;

    transactionsToInsert.push({
      date: new Date(dateStr),
      desc: desc || 'Unknown',
      cat: cat || 'Other',
      type: type.toLowerCase() === 'income' ? 'income' : 'expense',
      amount: parsedAmount
    });
  }

  // Mongoose bulk insert into MongoDB
  if (transactionsToInsert.length > 0) {
    await Transaction.insertMany(transactionsToInsert);
  }
  res.status(200).json({ message: `Imported ${transactionsToInsert.length} transactions` });
});
```

### 10.6 Loan Assessment Routes

```javascript
// GET all saved loan assessments
app.get('/api/loans', async (req, res) => {
  const loans = await Loan.find().sort({ date: -1 });
  res.json(loans);
});

// POST a new loan evaluation result
app.post('/api/loans', async (req, res) => {
  const { amount, rate, tenure, emi, foir, maxEligible, verdict } = req.body;
  const newLoan = new Loan({ amount, rate, tenure, emi, foir, maxEligible, verdict });
  await newLoan.save();
  res.status(201).json(newLoan);
});
```

### 10.7 AI Advisor Proxy Route (Gemini API)

```javascript
app.post('/api/advisor', async (req, res) => {
  const { prompt, history, data } = req.body;

  const systemPrompt = `You are FinLens, an expert AI financial advisor...
User Context:
- Income: ₹${data.income}, Expenses: ₹${data.expense}
- Savings Rate: ${data.saveRatio.toFixed(1)}%, Score: ${data.score}/100`;

  const contents = [];
  if (history) history.forEach(msg => {
    contents.push({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.parts[0].text }] });
  });
  contents.push({ role: 'user', parts: [{ text: prompt }] });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: systemPrompt }] }, contents })
    }
  );

  const aiData = await response.json();
  res.json({ response: aiData.candidates[0].content.parts[0].text });
});
```

### 10.8 Server Start

```javascript
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
```

---

## Backend–Frontend Integration Summary

| Frontend Page | API Endpoints Used | MongoDB Collection |
|---|---|---|
| `login.html` | `POST /api/register`, `POST /api/login` | `users` |
| `dashboard.html` | `GET /api/transactions` | `transactions` |
| `transactions.html` | `GET`, `POST`, `DELETE /api/transactions` | `transactions` |
| `behaviour.html` | `GET /api/transactions` | `transactions` |
| `insights.html` | `GET /api/transactions` | `transactions` |
| `advisor.html` | `GET /api/transactions` | `transactions` |
| `loan.html` | `GET /api/transactions`, `POST /api/loans` | `transactions`, `loans` |
| `reports.html` | `GET /api/transactions`, `GET /api/loans` | `transactions`, `loans` |
| `upload_data.js` | `POST /api/transactions/upload` | `transactions` |
