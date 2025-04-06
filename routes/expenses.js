const express = require('express');
const router = express.Router();
const auth = require('./auth');
const Expense = require('../models/Expense');

// Get all expenses for a user
router.get('/', auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add new expense
router.post('/', auth, async (req, res) => {
    try {
        const newExpense = new Expense({
            user: req.user.id,
            description: req.body.description,
            amount: req.body.amount,
            category: req.body.category,
            date: req.body.date,
            paymentMethod: req.body.paymentMethod,
            recurring: req.body.recurring,
            tags: req.body.tags,
            notes: req.body.notes
        });

        const expense = await newExpense.save();
        res.json(expense);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update expense
router.put('/:id', auth, async (req, res) => {
    try {
        let expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ msg: 'Expense not found' });

        // Make sure user owns expense
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        expense = await Expense.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(expense);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Delete expense
router.delete('/:id', auth, async (req, res) => {
    try {
        let expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ msg: 'Expense not found' });

        // Make sure user owns expense
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Expense.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Expense removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get expense statistics
router.get('/stats', auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id });
        
        // Calculate total expenses
        const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
        
        // Calculate expenses by category
        const byCategory = {};
        expenses.forEach(expense => {
            if (byCategory[expense.category]) {
                byCategory[expense.category] += expense.amount;
            } else {
                byCategory[expense.category] = expense.amount;
            }
        });

        res.json({
            total,
            byCategory
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
