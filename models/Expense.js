const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Housing', 'Transportation', 'Food', 'Utilities', 'Insurance', 
               'Healthcare', 'Savings', 'Personal', 'Entertainment', 'Other']
    },
    date: {
        type: Date,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Other']
    },
    recurring: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String
    }],
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Expense', expenseSchema);
