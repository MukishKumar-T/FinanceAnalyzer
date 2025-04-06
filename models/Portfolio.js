const mongoose = require('mongoose');

const portfolioHoldingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Equity', 'ETF', 'Mutual Fund', 'Bond', 'Commodity', 'Cryptocurrency', 'Other']
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    avgPrice: {
        type: Number,
        required: true,
        min: 0
    },
    currentPrice: {
        type: Number,
        required: true,
        min: 0
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    sector: {
        type: String
    },
    notes: {
        type: String
    },
    transactions: [{
        type: {
            type: String,
            enum: ['BUY', 'SELL'],
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Virtual for current value
portfolioHoldingSchema.virtual('currentValue').get(function() {
    return this.quantity * this.currentPrice;
});

// Virtual for profit/loss
portfolioHoldingSchema.virtual('profitLoss').get(function() {
    return (this.currentPrice - this.avgPrice) * this.quantity;
});

// Virtual for profit/loss percentage
portfolioHoldingSchema.virtual('profitLossPercentage').get(function() {
    return ((this.currentPrice - this.avgPrice) / this.avgPrice) * 100;
});

module.exports = mongoose.model('PortfolioHolding', portfolioHoldingSchema);
