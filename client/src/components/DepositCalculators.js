import React, { useState } from 'react';
import {
    Container,
    Paper,
    Tabs,
    Tab,
    Typography,
    TextField,
    Button,
    Box,
    Grid,
    Alert
} from '@mui/material';

const DepositCalculators = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [result, setResult] = useState(null);
    const [formData, setFormData] = useState({
        principal: '',
        rate: '',
        time: '',
        frequency: '12', // monthly compounding by default
        monthlyDeposit: '' // for RD calculator
    });

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setResult(null);
        setFormData({
            principal: '',
            rate: '',
            time: '',
            frequency: '12',
            monthlyDeposit: ''
        });
    };

    const calculateFD = () => {
        const p = parseFloat(formData.principal);
        const r = parseFloat(formData.rate) / 100;
        const t = parseFloat(formData.time);
        const n = parseInt(formData.frequency);

        const amount = p * Math.pow(1 + r/n, n*t);
        const interest = amount - p;

        setResult({
            maturityAmount: amount.toFixed(2),
            interestEarned: interest.toFixed(2),
            totalInvestment: p.toFixed(2)
        });
    };

    const calculateRD = () => {
        const p = parseFloat(formData.monthlyDeposit);
        const r = parseFloat(formData.rate) / 100 / 12; // monthly rate
        const t = parseFloat(formData.time) * 12; // time in months
        
        const amount = p * ((Math.pow(1 + r, t) - 1) / r);
        const totalInvestment = p * t;
        const interest = amount - totalInvestment;

        setResult({
            maturityAmount: amount.toFixed(2),
            interestEarned: interest.toFixed(2),
            totalInvestment: totalInvestment.toFixed(2)
        });
    };

    const calculateSI = () => {
        const p = parseFloat(formData.principal);
        const r = parseFloat(formData.rate);
        const t = parseFloat(formData.time);

        const interest = (p * r * t) / 100;
        const amount = p + interest;

        setResult({
            maturityAmount: amount.toFixed(2),
            interestEarned: interest.toFixed(2),
            totalInvestment: p.toFixed(2)
        });
    };

    const calculateCI = () => {
        const p = parseFloat(formData.principal);
        const r = parseFloat(formData.rate) / 100;
        const t = parseFloat(formData.time);
        const n = parseInt(formData.frequency);

        const amount = p * Math.pow(1 + r/n, n*t);
        const interest = amount - p;

        setResult({
            maturityAmount: amount.toFixed(2),
            interestEarned: interest.toFixed(2),
            totalInvestment: p.toFixed(2)
        });
    };

    const handleCalculate = () => {
        switch(activeTab) {
            case 0:
                calculateFD();
                break;
            case 1:
                calculateRD();
                break;
            case 2:
                calculateSI();
                break;
            case 3:
                calculateCI();
                break;
            default:
                break;
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const renderCalculator = () => {
        switch(activeTab) {
            case 0: // FD Calculator
                return (
                    <>
                        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                            A Fixed Deposit (FD) is ideal for individuals looking for a secure and predictable investment option with guaranteed returns. 
                            Banks and financial institutions offer FD accounts where you deposit a lump sum for a fixed tenure at a predetermined interest rate. 
                            The higher the tenure, the better the interest rate, and it is compounded periodically (monthly, quarterly, or annually).
                        </Typography>
                        <Typography variant="body1" paragraph>
                            FDs are beneficial for risk-averse investors who want to earn better returns than a regular savings account while ensuring their capital remains safe. 
                            Additionally, senior citizens often receive higher interest rates, making FDs an excellent choice for retirement planning.
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Principal Amount (₹)"
                                    name="principal"
                                    type="number"
                                    value={formData.principal}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Interest Rate (%)"
                                    name="rate"
                                    type="number"
                                    value={formData.rate}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Time Period (Years)"
                                    name="time"
                                    type="number"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Compounding Frequency"
                                    name="frequency"
                                    value={formData.frequency}
                                    onChange={handleInputChange}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="1">Annually</option>
                                    <option value="2">Semi-Annually</option>
                                    <option value="4">Quarterly</option>
                                    <option value="12">Monthly</option>
                                    <option value="365">Daily</option>
                                </TextField>
                            </Grid>
                        </Grid>
                    </>
                );

            case 1: // RD Calculator
                return (
                    <>
                        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                            A Recurring Deposit (RD) is perfect for individuals who want to build savings gradually rather than investing a lump sum. 
                            In RD, you deposit a fixed amount every month, and it earns interest over time, similar to FDs.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            This makes it a great option for salaried individuals or those with a steady income who want to cultivate a disciplined savings habit. 
                            The returns are predictable, and the interest is compounded quarterly or annually, ensuring stable and risk-free growth. 
                            RD is useful for short- to medium-term financial goals like planning for a vacation, purchasing gadgets, or funding a child's education.
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Monthly Deposit (₹)"
                                    name="monthlyDeposit"
                                    type="number"
                                    value={formData.monthlyDeposit}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Interest Rate (%)"
                                    name="rate"
                                    type="number"
                                    value={formData.rate}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Time Period (Years)"
                                    name="time"
                                    type="number"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                    </>
                );

            case 2: // Simple Interest
                return (
                    <>
                        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                            Simple Interest (SI) is easy to calculate and is commonly used for short-term loans, car loans, or education loans where interest does not compound. 
                            It follows a straightforward formula: SI = (P × R × T) / 100, where P is the principal, R is the interest rate, and T is the time period in years.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            The biggest advantage of simple interest is that the interest amount remains fixed throughout the loan tenure, making it ideal for those who prefer transparent and predictable payments. 
                            However, since the interest does not accumulate over time, simple interest investments are less beneficial compared to compound interest-based options like FDs or mutual funds.
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Principal Amount (₹)"
                                    name="principal"
                                    type="number"
                                    value={formData.principal}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Interest Rate (%)"
                                    name="rate"
                                    type="number"
                                    value={formData.rate}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Time Period (Years)"
                                    name="time"
                                    type="number"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                    </>
                );

            case 3: // Compound Interest
                return (
                    <>
                        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                            Compound Interest (CI) is the most powerful tool for long-term wealth accumulation, as it allows your money to grow exponentially over time. 
                            Unlike simple interest, where interest is calculated only on the principal amount, compound interest reinvests the earned interest, creating a "snowball effect."
                        </Typography>
                        <Typography variant="body1" paragraph>
                            The formula is: A = P × (1 + r/n)^(nt), where A is the maturity amount, P is the principal, r is the annual interest rate, 
                            n is the number of compounding periods per year, and t is the number of years. The more frequently interest is compounded (daily, monthly, quarterly), 
                            the higher the returns. This makes CI ideal for investments like mutual funds, fixed deposits, PPF, NPS, and long-term savings plans.
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Principal Amount (₹)"
                                    name="principal"
                                    type="number"
                                    value={formData.principal}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Interest Rate (%)"
                                    name="rate"
                                    type="number"
                                    value={formData.rate}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Time Period (Years)"
                                    name="time"
                                    type="number"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Compounding Frequency"
                                    name="frequency"
                                    value={formData.frequency}
                                    onChange={handleInputChange}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="1">Annually</option>
                                    <option value="2">Semi-Annually</option>
                                    <option value="4">Quarterly</option>
                                    <option value="12">Monthly</option>
                                    <option value="365">Daily</option>
                                </TextField>
                            </Grid>
                        </Grid>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Deposit Calculators
                </Typography>
                
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ mb: 3 }}
                >
                    <Tab label="Fixed Deposit (FD)" />
                    <Tab label="Recurring Deposit (RD)" />
                    <Tab label="Simple Interest" />
                    <Tab label="Compound Interest" />
                </Tabs>

                {renderCalculator()}

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCalculate}
                        disabled={!formData.rate || !formData.time || 
                            (activeTab === 0 && !formData.principal) ||
                            (activeTab === 1 && !formData.monthlyDeposit) ||
                            (activeTab === 2 && !formData.principal) ||
                            (activeTab === 3 && !formData.principal)}
                    >
                        Calculate
                    </Button>
                </Box>

                {result && (
                    <Box sx={{ mt: 3 }}>
                        <Alert severity="success">
                            <Typography variant="subtitle1">
                                Maturity Amount: ₹{result.maturityAmount}
                            </Typography>
                            <Typography variant="subtitle1">
                                Interest Earned: ₹{result.interestEarned}
                            </Typography>
                            <Typography variant="subtitle1">
                                Total Investment: ₹{result.totalInvestment}
                            </Typography>
                        </Alert>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default DepositCalculators;
