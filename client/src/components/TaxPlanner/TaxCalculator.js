import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Divider,
    Alert
} from '@mui/material';

const TaxCalculator = () => {
    const [formData, setFormData] = useState({
        regime: 'new',
        age: 'below60',
        salary: 0,
        rentalIncome: 0,
        otherIncome: 0,
        standardDeduction: 50000,
        section80C: 0,
        section80D: 0,
        hra: 0,
        lta: 0,
        nps: 0
    });

    const [taxBreakdown, setTaxBreakdown] = useState({
        grossIncome: 0,
        totalDeductions: 0,
        taxableIncome: 0,
        taxAmount: 0,
        cess: 0,
        totalTax: 0
    });

    const calculateTax = () => {
        // Calculate gross income
        const grossIncome = formData.salary + formData.rentalIncome + formData.otherIncome;

        // Calculate deductions based on regime
        let totalDeductions = formData.standardDeduction;
        if (formData.regime === 'old') {
            totalDeductions += Math.min(formData.section80C, 150000);
            totalDeductions += Math.min(formData.section80D, 25000);
            totalDeductions += formData.hra;
            totalDeductions += formData.lta;
            totalDeductions += Math.min(formData.nps, 50000);
        }

        // Calculate taxable income
        const taxableIncome = Math.max(0, grossIncome - totalDeductions);

        // Calculate tax based on regime and slabs
        let taxAmount = 0;
        if (formData.regime === 'new') {
            // New Tax Regime FY 2024-25
            if (taxableIncome <= 300000) {
                taxAmount = 0;
            } else if (taxableIncome <= 600000) {
                taxAmount = (taxableIncome - 300000) * 0.05;
            } else if (taxableIncome <= 900000) {
                taxAmount = 15000 + (taxableIncome - 600000) * 0.10;
            } else if (taxableIncome <= 1200000) {
                taxAmount = 45000 + (taxableIncome - 900000) * 0.15;
            } else if (taxableIncome <= 1500000) {
                taxAmount = 90000 + (taxableIncome - 1200000) * 0.20;
            } else {
                taxAmount = 150000 + (taxableIncome - 1500000) * 0.30;
            }
        } else {
            // Old Tax Regime FY 2024-25
            if (taxableIncome <= 250000) {
                taxAmount = 0;
            } else if (taxableIncome <= 500000) {
                taxAmount = (taxableIncome - 250000) * 0.05;
            } else if (taxableIncome <= 1000000) {
                taxAmount = 12500 + (taxableIncome - 500000) * 0.20;
            } else {
                taxAmount = 112500 + (taxableIncome - 1000000) * 0.30;
            }
        }

        // Calculate cess (4% of tax amount)
        const cess = taxAmount * 0.04;

        // Calculate total tax
        const totalTax = taxAmount + cess;

        setTaxBreakdown({
            grossIncome,
            totalDeductions,
            taxableIncome,
            taxAmount,
            cess,
            totalTax
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'regime' || name === 'age' ? value : Number(value)
        }));
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    useEffect(() => {
        calculateTax();
    }, [formData]);

    return (
        <Box>
            <Grid container spacing={3}>
                {/* Input Form */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Income Details
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Tax Regime</InputLabel>
                                    <Select
                                        name="regime"
                                        value={formData.regime}
                                        label="Tax Regime"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="new">New Regime</MenuItem>
                                        <MenuItem value="old">Old Regime</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Age Group</InputLabel>
                                    <Select
                                        name="age"
                                        value={formData.age}
                                        label="Age Group"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="below60">Below 60 years</MenuItem>
                                        <MenuItem value="60to80">60 to 80 years</MenuItem>
                                        <MenuItem value="above80">Above 80 years</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Annual Salary"
                                    name="salary"
                                    type="number"
                                    value={formData.salary}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Rental Income"
                                    name="rentalIncome"
                                    type="number"
                                    value={formData.rentalIncome}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Other Income"
                                    name="otherIncome"
                                    type="number"
                                    value={formData.otherIncome}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            {formData.regime === 'old' && (
                                <>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Deductions
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Section 80C (Max 1.5L)"
                                            name="section80C"
                                            type="number"
                                            value={formData.section80C}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Section 80D - Health Insurance (Max 25K)"
                                            name="section80D"
                                            type="number"
                                            value={formData.section80D}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="HRA Exemption"
                                            name="hra"
                                            type="number"
                                            value={formData.hra}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="LTA Exemption"
                                            name="lta"
                                            type="number"
                                            value={formData.lta}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="NPS Contribution (Max 50K)"
                                            name="nps"
                                            type="number"
                                            value={formData.nps}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Paper>
                </Grid>

                {/* Tax Breakdown */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Tax Breakdown
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Gross Income
                                    </Typography>
                                    <Typography variant="h6">
                                        {formatCurrency(taxBreakdown.grossIncome)}
                                    </Typography>
                                </Box>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Total Deductions
                                    </Typography>
                                    <Typography variant="h6" color="success.main">
                                        - {formatCurrency(taxBreakdown.totalDeductions)}
                                    </Typography>
                                </Box>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Taxable Income
                                    </Typography>
                                    <Typography variant="h6">
                                        {formatCurrency(taxBreakdown.taxableIncome)}
                                    </Typography>
                                </Box>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Income Tax
                                    </Typography>
                                    <Typography variant="h6">
                                        {formatCurrency(taxBreakdown.taxAmount)}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Health & Education Cess (4%)
                                    </Typography>
                                    <Typography variant="h6">
                                        {formatCurrency(taxBreakdown.cess)}
                                    </Typography>
                                </Box>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2">
                                        Total Tax Liability
                                    </Typography>
                                    <Typography variant="h4" color="error.main">
                                        {formatCurrency(taxBreakdown.totalTax)}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Alert severity="info">
                                    {formData.regime === 'new' ? 
                                        "New tax regime has lower tax rates but no major deductions available." :
                                        "Old tax regime has higher tax rates but allows various deductions and exemptions."}
                                </Alert>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TaxCalculator;
