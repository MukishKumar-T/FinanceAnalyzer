const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const expensesRoutes = require('./routes/expenses');
const portfolioRoutes = require('./routes/portfolio');
const investmentsRoutes = require('./routes/investments');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/finanalyzer')
.then(() => {
    console.log('MongoDB Connected');
}).catch(err => console.log(err));

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/investments', investmentsRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
