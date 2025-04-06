import React, { useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    CardActions,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    LinearProgress,
    Chip
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';

const TaxDeductions = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [deductions, setDeductions] = useState([
        {
            id: 1,
            category: 'Section 80C',
            type: 'PPF',
            amount: 150000,
            maxLimit: 150000,
            date: '2025-01-15',
            status: 'Verified',
            description: 'Public Provident Fund Annual Investment'
        },
        {
            id: 2,
            category: 'Section 80D',
            type: 'Health Insurance',
            amount: 25000,
            maxLimit: 25000,
            date: '2024-12-20',
            status: 'Pending',
            description: 'Family Health Insurance Premium'
        },
        {
            id: 3,
            category: 'Section 80CCD(1B)',
            type: 'NPS',
            amount: 30000,
            maxLimit: 50000,
            date: '2025-02-28',
            status: 'Verified',
            description: 'National Pension System Contribution'
        }
    ]);

    const deductionCategories = {
        'Section 80C': {
            title: 'Section 80C - Tax Saving Investments',
            maxLimit: 150000,
            description: 'Includes PPF, ELSS, Life Insurance, etc.',
            items: ['PPF', 'ELSS', 'Life Insurance', 'NSC', 'Tax Saving FD', 'EPF']
        },
        'Section 80D': {
            title: 'Section 80D - Health Insurance',
            maxLimit: 25000,
            description: 'Health insurance premiums for self and family',
            items: ['Health Insurance Premium', 'Preventive Health Checkup']
        },
        'Section 80CCD(1B)': {
            title: 'Section 80CCD(1B) - NPS',
            maxLimit: 50000,
            description: 'Additional deduction for NPS contribution',
            items: ['NPS Tier 1 Account']
        },
        'Section 80E': {
            title: 'Section 80E - Education Loan',
            maxLimit: null,
            description: 'Interest paid on education loan',
            items: ['Education Loan Interest']
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const calculateProgress = (amount, maxLimit) => {
        return maxLimit ? (amount / maxLimit) * 100 : 0;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Verified':
                return 'success';
            case 'Pending':
                return 'warning';
            case 'Rejected':
                return 'error';
            default:
                return 'default';
        }
    };

    const handleAddDeduction = () => {
        setOpenDialog(true);
    };

    return (
        <Box>
            <Grid container spacing={3}>
                {/* Category Summary */}
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {Object.entries(deductionCategories).map(([category, info]) => {
                            const categoryDeductions = deductions.filter(d => d.category === category);
                            const totalAmount = categoryDeductions.reduce((sum, d) => sum + d.amount, 0);
                            const progress = calculateProgress(totalAmount, info.maxLimit);

                            return (
                                <Grid item xs={12} md={6} key={category}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                {info.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" paragraph>
                                                {info.description}
                                            </Typography>
                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Claimed: {formatCurrency(totalAmount)}
                                                    {info.maxLimit && ` / ${formatCurrency(info.maxLimit)}`}
                                                </Typography>
                                                {info.maxLimit && (
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={progress}
                                                        color={progress >= 100 ? "success" : "primary"}
                                                        sx={{ height: 8, borderRadius: 5, mt: 1 }}
                                                    />
                                                )}
                                            </Box>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {info.items.map((item, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={item}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                ))}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>

                {/* Deductions List */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6">
                                Deduction Claims
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleAddDeduction}
                            >
                                Add Deduction
                            </Button>
                        </Box>
                        <Grid container spacing={2}>
                            {deductions.map((deduction) => (
                                <Grid item xs={12} key={deduction.id}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={4}>
                                                    <Typography variant="subtitle2" color="text.secondary">
                                                        Category
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {deduction.category}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={2}>
                                                    <Typography variant="subtitle2" color="text.secondary">
                                                        Type
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {deduction.type}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={2}>
                                                    <Typography variant="subtitle2" color="text.secondary">
                                                        Amount
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {formatCurrency(deduction.amount)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={2}>
                                                    <Typography variant="subtitle2" color="text.secondary">
                                                        Date
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {new Date(deduction.date).toLocaleDateString('en-IN')}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={2}>
                                                    <Typography variant="subtitle2" color="text.secondary">
                                                        Status
                                                    </Typography>
                                                    <Chip
                                                        label={deduction.status}
                                                        color={getStatusColor(deduction.status)}
                                                        size="small"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                                            <IconButton size="small" color="primary">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton size="small" color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            {/* Add Deduction Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Deduction</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                label="Category"
                                select
                                fullWidth
                                required
                            >
                                {Object.keys(deductionCategories).map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Type"
                                fullWidth
                                required
                            />
                        </Grid>
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
                                multiline
                                rows={2}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setOpenDialog(false)}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TaxDeductions;
