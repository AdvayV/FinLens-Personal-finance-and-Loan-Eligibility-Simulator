const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    rate: { type: Number, required: true },
    tenure: { type: Number, required: true },
    emi: { type: Number, required: true },
    foir: { type: Number, required: true },
    maxEligible: { type: Number, required: true },
    verdict: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Loan', loanSchema);
