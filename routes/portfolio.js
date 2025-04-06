const express = require('express');
const router = express.Router();
const auth = require('./auth');

// Get all portfolio holdings for a user
router.get('/', auth, async (req, res) => {
    try {
        const holdings = await PortfolioHolding.find({ user: req.user.id });
        res.json(holdings);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add new holding
router.post('/', auth, async (req, res) => {
    try {
        const newHolding = new PortfolioHolding({
            user: req.user.id,
            symbol: req.body.symbol,
            name: req.body.name,
            type: req.body.type,
            quantity: req.body.quantity,
            avgPrice: req.body.avgPrice,
            currentPrice: req.body.currentPrice,
            purchaseDate: req.body.purchaseDate,
            sector: req.body.sector,
            notes: req.body.notes
        });

        if (req.body.transaction) {
            newHolding.transactions.push(req.body.transaction);
        }

        const holding = await newHolding.save();
        res.json(holding);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update holding
router.put('/:id', auth, async (req, res) => {
    try {
        let holding = await PortfolioHolding.findById(req.params.id);
        if (!holding) return res.status(404).json({ msg: 'Holding not found' });

        // Make sure user owns holding
        if (holding.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Update lastUpdated timestamp
        req.body.lastUpdated = Date.now();

        holding = await PortfolioHolding.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(holding);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add transaction to holding
router.post('/:id/transactions', auth, async (req, res) => {
    try {
        const holding = await PortfolioHolding.findById(req.params.id);
        if (!holding) return res.status(404).json({ msg: 'Holding not found' });

        // Make sure user owns holding
        if (holding.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        holding.transactions.push(req.body);
        
        // Update quantity and average price based on transaction
        if (req.body.type === 'BUY') {
            const newTotalQuantity = holding.quantity + req.body.quantity;
            const newTotalValue = (holding.quantity * holding.avgPrice) + (req.body.quantity * req.body.price);
            holding.quantity = newTotalQuantity;
            holding.avgPrice = newTotalValue / newTotalQuantity;
        } else if (req.body.type === 'SELL') {
            holding.quantity -= req.body.quantity;
        }

        await holding.save();
        res.json(holding);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Delete holding
router.delete('/:id', auth, async (req, res) => {
    try {
        let holding = await PortfolioHolding.findById(req.params.id);
        if (!holding) return res.status(404).json({ msg: 'Holding not found' });

        // Make sure user owns holding
        if (holding.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await PortfolioHolding.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Holding removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get portfolio statistics
router.get('/stats', auth, async (req, res) => {
    try {
        const holdings = await PortfolioHolding.find({ user: req.user.id });
        
        const stats = {
            totalValue: 0,
            totalInvestment: 0,
            profitLoss: 0,
            profitLossPercentage: 0,
            byType: {},
            bySector: {}
        };

        holdings.forEach(holding => {
            const currentValue = holding.quantity * holding.currentPrice;
            const investment = holding.quantity * holding.avgPrice;
            
            stats.totalValue += currentValue;
            stats.totalInvestment += investment;

            // By type
            if (!stats.byType[holding.type]) {
                stats.byType[holding.type] = { value: 0, investment: 0 };
            }
            stats.byType[holding.type].value += currentValue;
            stats.byType[holding.type].investment += investment;

            // By sector
            if (holding.sector) {
                if (!stats.bySector[holding.sector]) {
                    stats.bySector[holding.sector] = { value: 0, investment: 0 };
                }
                stats.bySector[holding.sector].value += currentValue;
                stats.bySector[holding.sector].investment += investment;
            }
        });

        stats.profitLoss = stats.totalValue - stats.totalInvestment;
        stats.profitLossPercentage = (stats.profitLoss / stats.totalInvestment) * 100;

        res.json(stats);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
