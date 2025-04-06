const express = require('express');
const router = express.Router();
const auth = require('./auth');
const Investment = require('../models/Investment');

// Get all investment recommendations for a user
router.get('/', auth, async (req, res) => {
    try {
        const investments = await Investment.find({ user: req.user.id });
        res.json(investments);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add new investment recommendation
router.post('/', auth, async (req, res) => {
    try {
        const newInvestment = new Investment({
            user: req.user.id,
            name: req.body.name,
            type: req.body.type,
            riskLevel: req.body.riskLevel,
            expectedReturns: req.body.expectedReturns,
            minimumInvestment: req.body.minimumInvestment,
            recommendedHorizon: req.body.recommendedHorizon,
            description: req.body.description,
            features: req.body.features,
            taxBenefits: req.body.taxBenefits,
            taxBenefitDetails: req.body.taxBenefitDetails,
            status: req.body.status
        });

        const investment = await newInvestment.save();
        res.json(investment);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update investment recommendation
router.put('/:id', auth, async (req, res) => {
    try {
        let investment = await Investment.findById(req.params.id);
        if (!investment) return res.status(404).json({ msg: 'Investment not found' });

        // Make sure user owns investment
        if (investment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        investment = await Investment.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(investment);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Delete investment recommendation
router.delete('/:id', auth, async (req, res) => {
    try {
        let investment = await Investment.findById(req.params.id);
        if (!investment) return res.status(404).json({ msg: 'Investment not found' });

        // Make sure user owns investment
        if (investment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Investment.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Investment removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get filtered recommendations
router.post('/filter', auth, async (req, res) => {
    try {
        const { riskLevel, minReturn, maxInvestment, investmentType } = req.body;
        
        let query = { user: req.user.id };
        
        if (riskLevel) {
            query.riskLevel = riskLevel;
        }
        
        if (minReturn) {
            query.expectedReturns = { $gte: minReturn };
        }
        
        if (maxInvestment) {
            query.minimumInvestment = { $lte: maxInvestment };
        }
        
        if (investmentType) {
            query.type = investmentType;
        }

        const recommendations = await Investment.find(query);
        res.json(recommendations);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
