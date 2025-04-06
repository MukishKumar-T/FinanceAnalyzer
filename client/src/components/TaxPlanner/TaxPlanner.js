import React, { useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Tabs,
    Tab,
    Button,
    Card,
    CardContent,
    Divider
} from '@mui/material';
import TaxCalculator from './TaxCalculator';
import TaxSavingRecommendations from './TaxSavingRecommendations';
import TaxDeductions from './TaxDeductions';
import TaxReturns from './TaxReturns';

const TaxPlanner = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 0:
                return <TaxCalculator />;
            case 1:
                return <TaxDeductions />;
            case 2:
                return <TaxSavingRecommendations />;
            case 3:
                return <TaxReturns />;
            default:
                return <TaxCalculator />;
        }
    };

    const taxSummary = {
        totalIncome: 1200000,
        totalDeductions: 150000,
        taxableIncome: 1050000,
        taxLiability: 115000,
        taxSaved: 45000
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
                {/* Tax Summary Cards */}
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Total Income (FY 2024-25)
                                    </Typography>
                                    <Typography variant="h5">
                                        {formatCurrency(taxSummary.totalIncome)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Gross annual income
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Tax Liability
                                    </Typography>
                                    <Typography variant="h5">
                                        {formatCurrency(taxSummary.taxLiability)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Estimated tax for FY 2024-25
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Tax Saved
                                    </Typography>
                                    <Typography variant="h5" color="success.main">
                                        {formatCurrency(taxSummary.taxSaved)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Through deductions and exemptions
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Quick Actions */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Quick Actions
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button variant="outlined" color="primary">
                                    Download Form 16
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="primary">
                                    View Tax History
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="primary">
                                    Schedule CA Consultation
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Main Content */}
                <Grid item xs={12}>
                    <Paper>
                        <Tabs
                            value={activeTab}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            sx={{ borderBottom: 1, borderColor: 'divider' }}
                        >
                            <Tab label="Tax Calculator" />
                            <Tab label="Deductions" />
                            <Tab label="Saving Recommendations" />
                            <Tab label="Tax Returns" />
                        </Tabs>
                        <Box sx={{ p: 3 }}>
                            {renderTabContent()}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TaxPlanner;
