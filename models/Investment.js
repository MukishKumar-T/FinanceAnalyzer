const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Stocks', 'Mutual Funds', 'ETFs', 'Fixed Deposits', 'Bonds', 
               'Real Estate', 'Gold', 'Cryptocurrency', 'Other']
    },
    riskLevel: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High']
    },
    expectedReturns: {
        type: Number,
        required: true
    },
    minimumInvestment: {
        type: Number,
        required: true
    },
    recommendedHorizon: {
        type: Number, // in months
        required: true
    },
    description: {
        type: String,
        required: true
    },
    features: [{
        type: String
    }],
    taxBenefits: {
        type: Boolean,
        default: false
    },
    taxBenefitDetails: {
        type: String
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Investment', investmentSchema);
