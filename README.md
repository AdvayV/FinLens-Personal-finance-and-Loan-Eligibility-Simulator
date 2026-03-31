# FinLens: Personal Finance Insights Dashboard with In-Built Loan Eligibility Simulator

> A behaviour-aware personal finance analytics platform offering transparent financial intelligence through explainable loan eligibility assessment.

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Backend Architecture](#backend-architecture)
6. [Frontend Components](#frontend-components)
7. [Database Models](#database-models)
8. [API Reference](#api-reference)
9. [Installation & Setup](#installation--setup)
10. [Usage Guide](#usage-guide)
11. [Data Format](#data-format)
12. [Security Considerations](#security-considerations)

---

## Executive Summary

**FinLens** is a personal finance intelligence platform that combines transaction analytics, behavioural insights, and an in-built loan eligibility simulator. Users can upload financial data, monitor income and expenses, track savings discipline, and receive AI-powered recommendations for better financial decisions.

The platform includes dashboards, transaction management, smart insights, behaviour analysis, influence mapping, and report generation. Its loan module uses transparent FOIR-based logic to provide explainable eligibility outcomes (Approved, Conditional, Rejected). Built with a Node.js–MongoDB backend and interactive web frontend, FinLens delivers clarity, financial literacy, and practical decision support for individuals and fintech use cases.

### Key Differentiators

- ✅ **Explainable AI**: Every decision backed by transparent metrics (FOIR, behaviour score)
- ✅ **Behaviour Signals**: 14-point monitoring (beyond traditional credit score)
- ✅ **Conversational Advisor**: Natural language AI powered by Google Gemini
- ✅ **Privacy-First**: Local data uploads, no third-party aggregators
- ✅ **Open Data Format**: CSV imports/exports (user retains control)

### Target Users

- Individual consumers (25-45 yrs) monitoring personal finances
- Freelancers/self-employed with irregular income
- Students learning financial literacy
- Financial advisors auditing client spending
- Fintech lenders for transparent loan pre-qualification

---

## Features

| Feature                        | Description                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------------- |
| **Financial Dashboard**        | Central hub showing income/expense summary, savings rate, spending breakdown by category    |
| **Transaction Management**     | Complete transaction ledger with import/export, date filtering, category views              |
| **AI Financial Advisor**       | Chat-based conversational AI giving personalized financial advice based on user data        |
| **Loan Eligibility Simulator** | EMI calculator with loan eligibility verdict based on FOIR (Fixed Obligations Income Ratio) |
| **Smart Insights**             | ML-powered pattern detection (spending anomalies, seasonal trends, behaviour signals)       |
| **Behaviour Analysis**         | Discipline scoring (0-100), spending volatility tracking, 14 behaviour signals monitoring   |
| **Influence Map**              | Network visualization of spending influences and triggers                                   |
| **Reports & Audit**            | Exportable financial reports, transparency logs, audit trails                               |
| **User Authentication**        | Secure login/registration with JWT-based session management                                 |

---

## Tech Stack

### Backend

| Technology               | Version     | Purpose                                     |
| ------------------------ | ----------- | ------------------------------------------- |
| **Node.js**              | 18+         | JavaScript runtime environment              |
| **Express.js**           | 5.0.1       | Web application framework                   |
| **MongoDB**              | Atlas       | NoSQL database (cloud-hosted)               |
| **Mongoose**             | 8.9.5       | MongoDB object modeling (ODM)               |
| **JSON Web Token**       | 9.0.2       | Authentication & session management         |
| **bcryptjs**             | 2.4.3       | Password hashing                            |
| **Multer**               | 1.4.5-lts.1 | Multipart form data handling (file uploads) |
| **CORS**                 | 2.8.5       | Cross-Origin Resource Sharing               |
| **dotenv**               | 16.4.7      | Environment variable management             |
| **Google Generative AI** | 0.21.0      | Gemini API integration for AI advisor       |

### Frontend

| Technology             | Purpose                                           |
| ---------------------- | ------------------------------------------------- |
| **HTML5**              | Page structure and semantics                      |
| **CSS3**               | Styling with CSS variables, gradients, animations |
| **Vanilla JavaScript** | Interactive functionality (no frameworks)         |
| **Chart.js**           | Data visualization (embedded)                     |
| **Google Fonts**       | Typography (Outfit, Cormorant Garamond, DM Mono)  |

### Design System

- **Color Palette**: Gold (#c9a84c), Slate grays, Success green, Warning orange, Error red
- **Typography**: Outfit (UI), Cormorant Garamond (headings), DM Mono (numbers)
- **Layout**: Premium gradient backgrounds, floating navigation, responsive grid

---

## Project Structure

```
FinLens/
├── backend/
│   ├── models/
│   │   ├── User.js              # User schema (auth)
│   │   ├── Transaction.js       # Transaction schema
│   │   └── Loan.js              # Loan assessment schema
│   ├── server.js                # Express API server (main entry)
│   ├── seed.js                  # Database seeder (392 transactions)
│   ├── seed_200.js              # Additional 200 transactions seeder
│   ├── package.json             # Backend dependencies
│   ├── package-lock.json        # Dependency lock file
│   ├── .env                     # Environment variables (MONGODB_URI, etc.)
│   └── node_modules/            # Installed packages
│
├── login.html                   # Authentication portal (login/register)
├── dashboard.html               # Main financial overview
├── transactions.html            # Transaction ledger & management
├── advisor.html                 # AI financial advisor chat
├── loan.html                    # Loan eligibility simulator
├── insights.html                # Smart analytics & patterns
├── behaviour.html               # Discipline scoring & signals
├── influence.html               # Spending influence network
├── reports.html                 # Exportable reports & audit
│
├── 2_Year_FinLens_Transactions.csv  # Sample dataset (392 transactions)
├── gen_data.js                  # Synthetic data generator script
├── import.js                    # CLI bulk transaction importer
├── upload_data.js               # CSV upload helper script
├── run_test.js                  # Integration test script
├── convert.py                   # Data conversion utility (CSV to JSON)
│
└── README.md                    # This documentation file
```

---

## Backend Architecture

### Overview

The backend is built with **Express.js** running on **Node.js**, connecting to **MongoDB Atlas** for data persistence. It follows a RESTful API design pattern with JWT-based authentication.

### Server Configuration (server.js)

```javascript
// Core dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Server setup
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json()); // Parse JSON request bodies

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
```

### Environment Variables (.env)

```env
PORT=5001
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxxx.mongodb.net/finlens?retryWrites=true&w=majority
GEMINI_API_KEY=<your-google-gemini-api-key>
JWT_SECRET=<your-secret-key>
```

### Middleware Stack

1. **CORS**: Allows frontend (running on different port/domain) to communicate with backend
2. **express.json()**: Parses incoming JSON payloads
3. **Multer**: Handles multipart/form-data for file uploads (CSV import)

### Authentication Flow

1. **Registration**:
   - User submits firstName, lastName, email, password
   - Password is hashed using bcryptjs (10 salt rounds)
   - User document created in MongoDB
   - JWT token generated and returned

2. **Login**:
   - User submits email and password
   - Email lookup in database
   - Password comparison with bcrypt
   - JWT token generated (1 day expiry) and returned

3. **Token Storage**:
   - Frontend stores token in `localStorage`
   - Token sent with API requests for protected routes

### Request/Response Cycle

```
Client Request → CORS Check → JSON Parse → Route Handler → MongoDB Query → Response
```

---

## Frontend Components

### 1. Login Page (login.html)

**Purpose**: User authentication portal

**Features**:

- Tabbed interface (Login / Register)
- Form validation
- Password confirmation for registration
- JWT token storage on success
- Redirect to dashboard

**Key Functions**:

```javascript
handleRegister(); // POST /api/register
goToDashboard(); // POST /api/login
```

---

### 2. Dashboard (dashboard.html)

**Purpose**: Central financial overview hub

**Features**:

- Key Performance Indicators (KPIs):
  - Total Income
  - Total Expense
  - Net Savings
  - Discipline Score
- Income vs Expenses bar chart (monthly)
- Spend Categories pie chart
- Time period filters (7D, 1M, 3M, 1Y)
- Quick "Add Transaction" button

**Data Flow**:

```javascript
// Fetch all transactions
const res = await fetch("http://localhost:5001/api/transactions");
const transactions = await res.json();

// Calculate metrics
const income = transactions
  .filter((t) => t.type === "income")
  .reduce((sum, t) => sum + t.amount, 0);
const expense = transactions
  .filter((t) => t.type === "expense")
  .reduce((sum, t) => sum + t.amount, 0);
```

---

### 3. Transactions (transactions.html)

**Purpose**: Complete transaction ledger

**Features**:

- Transaction table with sorting
- Date range filtering
- Category filtering
- Add new transaction form
- CSV import functionality
- Delete transactions
- Export to CSV

**Key Functions**:

```javascript
loadTransactions(); // GET /api/transactions
addTransaction(); // POST /api/transactions
deleteTransaction(id); // DELETE /api/transactions/:id
uploadCSV(); // POST /api/transactions/upload
```

---

### 4. AI Advisor (advisor.html)

**Purpose**: Conversational AI financial guidance

**Features**:

- Chat interface with message history
- Context-aware responses (uses user's financial data)
- Suggested quick prompts
- Gemini API key management
- Conversation clearing

**AI Integration**:

```javascript
// Send prompt with financial context
const response = await fetch("http://localhost:5001/api/advisor", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    prompt: userMessage,
    history: conversationHistory,
    data: {
      income: totalIncome,
      expense: totalExpense,
      saveRatio: savingsRate,
      score: disciplineScore,
    },
  }),
});
```

**System Prompt** (Backend):

```
You are an expert AI financial advisor named FinLens integrated into a user's
local web tracker. Your goal is to give brief, helpful, and highly insightful
financial advice based on the provided user context. Keep responses under 4 sentences.
```

---

### 5. Loan Simulator (loan.html)

**Purpose**: Loan eligibility assessment

**Features**:

- Loan amount input
- Interest rate slider
- Tenure selection (months)
- Real-time EMI calculation
- FOIR (Fixed Obligations Income Ratio) calculation
- Maximum eligible amount
- Verdict display (Approved/Conditional/Rejected)
- Save assessment to database

**EMI Formula**:

```
EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]

Where:
P = Principal loan amount
r = Monthly interest rate (annual rate / 12 / 100)
n = Number of monthly installments (tenure)
```

**FOIR Calculation**:

```
FOIR = (Monthly EMI / Monthly Income) × 100

Verdict Logic:
- FOIR < 40%  → Approved ✅
- FOIR 40-60% → Conditional ⚠️
- FOIR > 60%  → Rejected ❌
```

---

### 6. Insights (insights.html)

**Purpose**: Smart analytics and pattern detection

**Features**:

- Spending trend analysis
- Category breakdown
- Monthly comparison charts
- Anomaly detection
- Seasonal patterns
- Spending velocity metrics

---

### 7. Behaviour Analysis (behaviour.html)

**Purpose**: Financial discipline scoring

**Features**:

- Overall discipline score (0-100)
- Grade assignment (A/B/C/D)
- Score breakdown with deductions
- Category budget monitoring
- 14 behaviour signals tracking
- Monthly trend visualization

**Score Calculation**:

```javascript
// Starting score: 100 points

// Deductions:
- Savings rate < 10%     → -20 pts
- Savings rate < 20%     → -10 pts
- Budget violations      → -5 pts per category
- High discretionary %   → -15 pts (if > 50%)
- Spending volatility    → -5 to -15 pts

// Final score clamped to 0-100
```

**Grade Thresholds**:
| Score Range | Grade | Description |
|-------------|-------|-------------|
| 80-100 | A | Excellent financial behaviour |
| 60-79 | B | Good with room for improvement |
| 40-59 | C | Warning - budgets stretched |
| 0-39 | D | Poor discipline |

---

### 8. Influence Map (influence.html)

**Purpose**: Spending trigger visualization

**Features**:

- Network graph of spending patterns
- Category relationships
- Time-based correlations
- Interactive node exploration

---

### 9. Reports (reports.html)

**Purpose**: Exportable financial documentation

**Features**:

- Monthly financial summary
- Income/expense reports
- Loan assessment history
- PDF export capability
- Audit trail logs

---

## Database Models

### User Model (models/User.js)

```javascript
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true, // Adds createdAt, updatedAt
  },
);
```

### Transaction Model (models/Transaction.js)

```javascript
const TransactionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    cat: {
      type: String,
      required: true,
      enum: [
        "Salary",
        "Freelance",
        "Food & Dining",
        "Shopping",
        "Travel",
        "Entertainment",
        "Healthcare",
        "Education",
        "Utilities",
        "Other",
      ],
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);
```

### Loan Model (models/Loan.js)

```javascript
const LoanSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    tenure: {
      type: Number,
      required: true,
    },
    emi: {
      type: Number,
      required: true,
    },
    foir: {
      type: Number,
      required: true,
    },
    maxEligible: {
      type: Number,
      required: true,
    },
    verdict: {
      type: String,
      required: true,
      enum: ["Approved", "Conditional", "Rejected"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);
```

---

## API Reference

### Base URL

```
http://localhost:5001/api
```

### Authentication Endpoints

#### Register User

```http
POST /api/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

Response (201):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "email": "john@example.com"
  }
}
```

#### Login User

```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "email": "john@example.com"
  }
}
```

### Transaction Endpoints

#### Get All Transactions

```http
GET /api/transactions

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "date": "2024-03-01T00:00:00.000Z",
    "desc": "Monthly Salary",
    "cat": "Salary",
    "type": "income",
    "amount": 75000,
    "createdAt": "2024-03-01T10:30:00.000Z"
  },
  ...
]
```

#### Create Transaction

```http
POST /api/transactions
Content-Type: application/json

{
  "date": "2024-03-15",
  "desc": "Grocery Shopping",
  "cat": "Food & Dining",
  "type": "expense",
  "amount": 2500
}

Response (201):
{
  "_id": "507f1f77bcf86cd799439012",
  "date": "2024-03-15T00:00:00.000Z",
  "desc": "Grocery Shopping",
  "cat": "Food & Dining",
  "type": "expense",
  "amount": 2500,
  "createdAt": "2024-03-15T14:22:00.000Z"
}
```

#### Bulk Upload Transactions (CSV)

```http
POST /api/transactions/upload
Content-Type: application/json

{
  "csvContent": "Date,Description,Category,Type,Amount\n01-03-2024,Salary,Salary,Income,75000\n..."
}

Response (200):
{
  "message": "Successfully imported 150 transactions!"
}
```

#### Delete Transaction

```http
DELETE /api/transactions/:id

Response (200):
{
  "message": "Transaction removed"
}
```

### Loan Endpoints

#### Get All Loan Assessments

```http
GET /api/loans

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "amount": 500000,
    "rate": 10.5,
    "tenure": 60,
    "emi": 10747,
    "foir": 35.8,
    "maxEligible": 620000,
    "verdict": "Approved",
    "date": "2024-03-20T00:00:00.000Z"
  },
  ...
]
```

#### Save Loan Assessment

```http
POST /api/loans
Content-Type: application/json

{
  "amount": 500000,
  "rate": 10.5,
  "tenure": 60,
  "emi": 10747,
  "foir": 35.8,
  "maxEligible": 620000,
  "verdict": "Approved"
}

Response (201):
{
  "_id": "507f1f77bcf86cd799439014",
  "amount": 500000,
  "rate": 10.5,
  "tenure": 60,
  "emi": 10747,
  "foir": 35.8,
  "maxEligible": 620000,
  "verdict": "Approved",
  "date": "2024-03-20T15:45:00.000Z"
}
```

### AI Advisor Endpoint

#### Generate Financial Advice

```http
POST /api/advisor
Content-Type: application/json

{
  "prompt": "How can I improve my savings?",
  "history": [
    {
      "role": "user",
      "parts": [{ "text": "What's my financial status?" }]
    },
    {
      "role": "model",
      "parts": [{ "text": "Based on your data..." }]
    }
  ],
  "data": {
    "income": 150000,
    "expense": 95000,
    "saveRatio": 36.7,
    "score": 78
  }
}

Response (200):
{
  "response": "Your savings rate of 36.7% is good! To improve further, consider automating 10% of income to a separate savings account on payday. Review your top 3 expense categories for potential 5-10% cuts."
}
```

---

## Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB Atlas** account (free tier works)
- **Google Gemini API key** (for AI Advisor feature)

### Step 1: Clone/Download Project

```bash
# Navigate to your project directory
cd "C:\Advay study\VIT\Sem 4 WIN 25-26\Web Programming\Project"
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

This installs:

- express
- mongoose
- cors
- dotenv
- bcryptjs
- jsonwebtoken
- multer
- @google/generative-ai

### Step 3: Configure Environment Variables

Create or edit `backend/.env`:

```env
PORT=5001
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxxx.mongodb.net/finlens?retryWrites=true&w=majority
GEMINI_API_KEY=your_google_gemini_api_key_here
```

**MongoDB Atlas Setup**:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Create a database user (Database Access)
4. Whitelist your IP (Network Access → Add IP Address → Allow Access from Anywhere)
5. Get connection string (Connect → Connect your application)

### Step 4: Seed the Database

```bash
cd backend

# Add initial 392 transactions
node seed.js

# Add 200 more transactions (optional)
node seed_200.js
```

### Step 5: Start the Server

```bash
node server.js
```

Expected output:

```
Server is running on port: 5001
Connected to MongoDB successfully
```

### Step 6: Open Frontend

Open any HTML file in your browser:

- Start with `login.html` for authentication
- Or directly open `dashboard.html` for the main interface

---

## Usage Guide

### First-Time Setup

1. Open `login.html` in your browser
2. Click "Register" tab
3. Create an account with your details
4. You'll be redirected to the dashboard

### Adding Transactions

**Method 1: Manual Entry**

1. Click "+ Add Transaction" on dashboard
2. Fill in date, description, category, type, amount
3. Click "Add"

**Method 2: CSV Import**

1. Go to Transactions page
2. Click "Import CSV"
3. Select your CSV file (format below)
4. Transactions are bulk imported

### Using AI Advisor

1. Go to AI Advisor page
2. Enter your Gemini API key (first time only)
3. Type financial questions
4. Get personalized advice based on your data

### Checking Loan Eligibility

1. Go to Loan Simulator
2. Enter desired loan amount
3. Adjust interest rate and tenure
4. See real-time EMI and eligibility verdict
5. Click "Save Assessment" to record

### Viewing Reports

1. Go to Reports page
2. Select date range
3. Choose report type
4. Export as PDF or view online

---

## Data Format

### CSV Import Format

```csv
Date,Description,Category,Type,Amount
01-03-2024,Monthly Salary,Salary,Income,75000
02-03-2024,Grocery Shopping,Food & Dining,Expense,2500
03-03-2024,Netflix Subscription,Entertainment,Expense,649
```

**Column Specifications**:

| Column      | Format           | Required | Description             |
| ----------- | ---------------- | -------- | ----------------------- |
| Date        | DD-MM-YYYY       | Yes      | Transaction date        |
| Description | Text             | Yes      | Transaction description |
| Category    | Enum (see below) | Yes      | Spending category       |
| Type        | income/expense   | Yes      | Transaction type        |
| Amount      | Number           | Yes      | Amount in ₹ (no commas) |

**Valid Categories**:

- Income: `Salary`, `Freelance`
- Expense: `Food & Dining`, `Shopping`, `Travel`, `Entertainment`, `Healthcare`, `Education`, `Utilities`, `Other`

---

## Security Considerations

### Current Implementation

- ✅ Passwords hashed with bcryptjs (10 salt rounds)
- ✅ JWT tokens for session management
- ✅ CORS enabled for frontend-backend communication
- ✅ Environment variables for secrets

### Production Recommendations

1. **Move JWT_SECRET to .env** (currently hardcoded)
2. **Add rate limiting** to prevent brute force attacks
3. **Implement HTTPS** for encrypted communication
4. **Add input validation** middleware (express-validator)
5. **Implement user-specific data isolation** (currently all users see all transactions)
6. **Add token refresh mechanism** for better security
7. **Sanitize user inputs** to prevent NoSQL injection

### API Security Headers (Recommended)

```javascript
const helmet = require("helmet");
app.use(helmet());
```

---

## Troubleshooting

### Common Issues

**1. "Error connecting to MongoDB: bad auth"**

- Check your MongoDB Atlas username/password in `.env`
- Ensure no special characters in password (or URL-encode them)
- Verify IP is whitelisted in Network Access

**2. "Cannot reach backend" error in browser**

- Ensure server is running (`node server.js`)
- Check server is on port 5001
- Verify no firewall blocking

**3. Transactions not showing**

- Run `node seed.js` to populate database
- Check browser console for errors
- Verify MongoDB connection succeeded

**4. AI Advisor not responding**

- Add valid Gemini API key
- Check API key in browser's localStorage
- Verify internet connection

---

## Contributing

This is an academic project for VIT Web Programming course (Semester 4, Winter 2025-26).

---

## License

Educational use only. All rights reserved.

---

## Author

**Advay V**  
VIT University  
Web Programming Project - Winter 2025-26

---

_Last updated: March 2026_
