const express = require('express');
const router = express.Router();

// Example route to fetch all users
router.get('/', (req, res) => {
    res.send('Users route is working!');
});

// Example route to get a specific user by ID
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Fetching details for user ID: ${userId}`);
});

// Example route to add a new user
router.post('/', (req, res) => {
    const newUser = req.body;
    res.status(201).json({
        message: 'New user added!',
        user: newUser,
    });
});

// Example route to update a user's details
router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    res.json({
        message: `User ID: ${userId} updated!`,
        updatedData: updatedData,
    });
});

// Example route to delete a user
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    res.json({
        message: `User ID: ${userId} deleted!`,
    });
});

module.exports = router;
