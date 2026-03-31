const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    date: { type: String, required: true },
    desc: { type: String, required: true },
    cat: { type: String, required: true },
    type: { type: String, required: true, enum: ['income', 'expense'] },
    amount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
