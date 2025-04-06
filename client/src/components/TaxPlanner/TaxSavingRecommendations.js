import React, { useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    LinearProgress,
    Rating
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    Security as SecurityIcon,
    Timeline as TimelineIcon,
    AccountBalance as AccountBalanceIcon
} from '@mui/icons-material';

const TaxSavingRecommendations = () => {
    const [selectedRecommendation, setSelectedRecommendation] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const recommendations = [
        {
            id: 1,
            category: 'Section 80C',
            name: 'ELSS Mutual Funds',
            description: 'Tax-saving mutual funds with potential for high returns',
            expectedReturns: '12-15%',
            lockInPeriod: '3 years',
            riskLevel: 4,
            minInvestment: 500,
            taxBenefit: 'Up to ₹46,800 tax savings under 30% slab',
            features: [
                'Shortest lock-in period among 80C options',
                'Potential for high returns through equity investment',
                'SIP option available',
                'Professional fund management'
            ],
            recommendedFor: ['Long-term investors', 'High-risk appetite', 'SIP investors']
        },
        {
            id: 2,
            category: 'Section 80C',
            name: 'Public Provident Fund (PPF)',
            description: 'Government-backed long-term savings scheme',
            expectedReturns: '7.1%',
            lockInPeriod: '15 years',
            riskLevel: 1,
            minInvestment: 500,
            taxBenefit: 'Up to ₹46,800 tax savings under 30% slab',
            features: [
                'Sovereign guarantee',
                'Tax-free returns',
                'Partial withdrawal allowed after 7 years',
                'Loan facility available'
            ],
            recommendedFor: ['Risk-averse investors', 'Long-term savings', 'Retirement planning']
        },
        {
            id: 3,
            category: 'Section 80D',
            name: 'Health Insurance',
            description: 'Comprehensive health coverage with tax benefits',
            expectedReturns: 'NA',
            lockInPeriod: '1 year',
            riskLevel: 1,
            minInvestment: 10000,
            taxBenefit: 'Up to ₹7,500 tax savings under 30% slab',
            features: [
                'Comprehensive health coverage',
                'Cashless claims',
                'No claim bonus',
                'Pre and post hospitalization coverage'
            ],
            recommendedFor: ['Family protection', 'Medical emergency preparation', 'Tax saving']
        },
        {
            id: 4,
            category: 'Section 80CCD(1B)',
            name: 'National Pension System (NPS)',
            description: 'Government-sponsored pension scheme',
            expectedReturns: '8-10%',
            lockInPeriod: 'Until retirement',
            riskLevel: 2,
            minInvestment: 500,
            taxBenefit: 'Additional ₹15,000 tax savings under 30% slab',
            features: [
                'Professional fund management',
                'Choice of investment options',
                'Low cost',
                'Market-linked returns'
            ],
            recommendedFor: ['Retirement planning', 'Additional tax savings', 'Long-term investors']
        }
    ];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const getRiskLevelColor = (level) => {
        switch (level) {
            case 1:
                return 'success';
            case 2:
                return 'info';
            case 3:
                return 'warning';
            case 4:
            case 5:
                return 'error';
            default:
                return 'default';
        }
    };

    const handleLearnMore = (recommendation) => {
        setSelectedRecommendation(recommendation);
        setOpenDialog(true);
    };

    return (
        <Box>
            <Grid container spacing={3}>
                {/* Recommendations */}
                {recommendations.map((recommendation) => (
                    <Grid item xs={12} md={6} key={recommendation.id}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="h6">
                                        {recommendation.name}
                                    </Typography>
                                    <Chip
                                        label={recommendation.category}
                                        color="primary"
                                        size="small"
                                    />
                                </Box>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {recommendation.description}
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Expected Returns
                                        </Typography>
                                        <Typography variant="body2">
                                            {recommendation.expectedReturns}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Lock-in Period
                                        </Typography>
                                        <Typography variant="body2">
                                            {recommendation.lockInPeriod}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Risk Level
                                        </Typography>
                                        <Rating
                                            value={recommendation.riskLevel}
                                            readOnly
                                            max={5}
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Min. Investment
                                        </Typography>
                                        <Typography variant="body2">
                                            {formatCurrency(recommendation.minInvestment)}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Recommended For
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {recommendation.recommendedFor.map((item, index) => (
                                            <Chip
                                                key={index}
                                                label={item}
                                                size="small"
                                                variant="outlined"
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    onClick={() => handleLearnMore(recommendation)}
                                >
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Recommendation Detail Dialog */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                maxWidth="md"
                fullWidth
            >
                {selectedRecommendation && (
                    <>
                        <DialogTitle>
                            {selectedRecommendation.name}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText paragraph>
                                {selectedRecommendation.description}
                            </DialogContentText>

                            <Typography variant="h6" gutterBottom>
                                Key Features
                            </Typography>
                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                {selectedRecommendation.features.map((feature, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Typography variant="body2">
                                            • {feature}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>

                            <Typography variant="h6" gutterBottom>
                                Investment Details
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Expected Returns
                                            </Typography>
                                            <Typography variant="h6">
                                                {selectedRecommendation.expectedReturns}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Tax Benefit
                                            </Typography>
                                            <Typography variant="h6">
                                                {selectedRecommendation.taxBenefit}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Lock-in Period
                                            </Typography>
                                            <Typography variant="h6">
                                                {selectedRecommendation.lockInPeriod}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Minimum Investment
                                            </Typography>
                                            <Typography variant="h6">
                                                {formatCurrency(selectedRecommendation.minInvestment)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDialog(false)}>Close</Button>
                            <Button variant="contained">
                                Start Investing
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
};

export default TaxSavingRecommendations;
