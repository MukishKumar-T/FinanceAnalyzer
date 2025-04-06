import React, { useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    Card,
    CardContent,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';

const ExpenseAnalysis = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [expenses, setExpenses] = useState([
        {
            id: 1,
            category: 'Housing',
            amount: 25000,
            date: '2025-03-01',
            description: 'Monthly Rent'
        },
        {
            id: 2,
            category: 'Groceries',
            amount: 8000,
            date: '2025-03-15',
            description: 'Monthly Groceries'
        },
        {
            id: 3,
            category: 'Transportation',
            amount: 3000,
            date: '2025-03-20',
            description: 'Fuel'
        },
        {
            id: 4,
            category: 'Entertainment',
            amount: 2000,
            date: '2025-03-25',
            description: 'Movie and Dinner'
        }
    ]);

    const categories = [
        { name: 'Housing', color: '#FF8042' },
        { name: 'Groceries', color: '#00C49F' },
        { name: 'Transportation', color: '#FFBB28' },
        { name: 'Entertainment', color: '#0088FE' },
        { name: 'Healthcare', color: '#FF0000' },
        { name: 'Education', color: '#8884D8' },
        { name: 'Shopping', color: '#82CA9D' },
        { name: 'Others', color: '#A0A0A0' }
    ];

    const getCategoryColor = (category) => {
        const found = categories.find(c => c.name === category);
        return found ? found.color : '#A0A0A0';
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(value);
    };

    const calculateCategoryTotals = () => {
        const totals = {};
        expenses.forEach(expense => {
            totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
        });
        return Object.entries(totals).map(([name, value]) => ({ name, value }));
    };

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const renderExpenseBreakdown = () => {
        const categoryTotals = {};
        expenses.forEach(expense => {
            categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
        });

        const total = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);

        return Object.entries(categoryTotals).map(([category, amount]) => (
            <Box key={category} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">{category}</Typography>
                    <Typography variant="body2">
                        {formatCurrency(amount)} ({((amount / total) * 100).toFixed(1)}%)
                    </Typography>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={(amount / total) * 100}
                    sx={{ height: 8, borderRadius: 5 }}
                />
            </Box>
        ));
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">
                    Expense Analysis
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenDialog(true)}
                >
                    Add Expense
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* Summary Cards */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Total Expenses
                            </Typography>
                            <Typography variant="h4">
                                {formatCurrency(totalExpenses)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                This Month
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Expense Distribution
                            </Typography>
                            {renderExpenseBreakdown()}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Expense Table */}
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {expenses.map((expense) => (
                                    <TableRow key={expense.id}>
                                        <TableCell>
                                            {new Date(expense.date).toLocaleDateString('en-IN')}
                                        </TableCell>
                                        <TableCell>{expense.category}</TableCell>
                                        <TableCell>{expense.description}</TableCell>
                                        <TableCell align="right">
                                            {formatCurrency(expense.amount)}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton size="small" color="primary">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton size="small" color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            {/* Add Expense Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                label="Amount"
                                type="number"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Category"
                                select
                                fullWidth
                                required
                                defaultValue="Others"
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.name} value={category.name}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Date"
                                type="date"
                                fullWidth
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={2}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setOpenDialog(false)}>
                        Add Expense
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ExpenseAnalysis;
