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
    Slider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';
import {
    Timeline as TimelineIcon,
    TrendingUp as TrendingUpIcon,
    Security as SecurityIcon,
    Assessment as AssessmentIcon
} from '@mui/icons-material';

const InvestmentRecommendations = () => {
    const [riskProfile, setRiskProfile] = useState('Moderate');
    const [investmentAmount, setInvestmentAmount] = useState(100000);
    const [investmentHorizon, setInvestmentHorizon] = useState(5);
    const [selectedRecommendation, setSelectedRecommendation] = useState(null);

    const recommendations = {
        Conservative: [
            {
                id: 1,
                name: 'Fixed Deposit Portfolio',
                description: 'A mix of bank FDs and corporate deposits for stable returns',
                expectedReturn: '6-7%',
                risk: 'Low',
                allocation: [
                    { type: 'Bank FDs', percentage: 60 },
                    { type: 'Corporate FDs', percentage: 30 },
                    { type: 'Liquid Funds', percentage: 10 }
                ]
            },
            {
                id: 2,
                name: 'Debt Fund Portfolio',
                description: 'Conservative debt mutual funds with focus on capital preservation',
                expectedReturn: '7-8%',
                risk: 'Low to Medium',
                allocation: [
                    { type: 'Government Securities', percentage: 40 },
                    { type: 'Corporate Bonds', percentage: 40 },
                    { type: 'Money Market', percentage: 20 }
                ]
            }
        ],
        Moderate: [
            {
                id: 3,
                name: 'Balanced Portfolio',
                description: 'Mix of equity and debt for moderate growth with stability',
                expectedReturn: '10-12%',
                risk: 'Medium',
                allocation: [
                    { type: 'Large Cap Equity', percentage: 30 },
                    { type: 'Debt Funds', percentage: 40 },
                    { type: 'Gold', percentage: 10 },
                    { type: 'Hybrid Funds', percentage: 20 }
                ]
            },
            {
                id: 4,
                name: 'SIP Portfolio',
                description: 'Systematic investment in mutual funds for long-term wealth creation',
                expectedReturn: '12-14%',
                risk: 'Medium',
                allocation: [
                    { type: 'Large Cap Funds', percentage: 40 },
                    { type: 'Mid Cap Funds', percentage: 20 },
                    { type: 'Debt Funds', percentage: 30 },
                    { type: 'International Funds', percentage: 10 }
                ]
            }
        ],
        Aggressive: [
            {
                id: 5,
                name: 'High Growth Portfolio',
                description: 'Focus on equity for maximum growth potential',
                expectedReturn: '15-18%',
                risk: 'High',
                allocation: [
                    { type: 'Mid Cap Stocks', percentage: 40 },
                    { type: 'Small Cap Stocks', percentage: 30 },
                    { type: 'International Stocks', percentage: 20 },
                    { type: 'Sector Funds', percentage: 10 }
                ]
            },
            {
                id: 6,
                name: 'Aggressive Growth Portfolio',
                description: 'High-risk, high-reward portfolio with focus on emerging opportunities',
                expectedReturn: '18-20%',
                risk: 'Very High',
                allocation: [
                    { type: 'Small Cap Stocks', percentage: 50 },
                    { type: 'Sector Funds', percentage: 30 },
                    { type: 'International Stocks', percentage: 20 }
                ]
            }
        ]
    };

    const handleRecommendationClick = (recommendation) => {
        setSelectedRecommendation(recommendation);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <Box>
            <Grid container spacing={3}>
                {/* Investment Profile */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Your Investment Profile
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Risk Profile</InputLabel>
                                    <Select
                                        value={riskProfile}
                                        label="Risk Profile"
                                        onChange={(e) => setRiskProfile(e.target.value)}
                                    >
                                        <MenuItem value="Conservative">Conservative</MenuItem>
                                        <MenuItem value="Moderate">Moderate</MenuItem>
                                        <MenuItem value="Aggressive">Aggressive</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography gutterBottom>
                                    Investment Amount
                                </Typography>
                                <Slider
                                    value={investmentAmount}
                                    onChange={(e, value) => setInvestmentAmount(value)}
                                    min={10000}
                                    max={1000000}
                                    step={10000}
                                    valueLabelDisplay="auto"
                                    valueLabelFormat={formatCurrency}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    {formatCurrency(investmentAmount)}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography gutterBottom>
                                    Investment Horizon (Years)
                                </Typography>
                                <Slider
                                    value={investmentHorizon}
                                    onChange={(e, value) => setInvestmentHorizon(value)}
                                    min={1}
                                    max={20}
                                    valueLabelDisplay="auto"
                                    marks
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Recommendations */}
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Recommended Portfolios
                    </Typography>
                    <Grid container spacing={3}>
                        {recommendations[riskProfile].map((recommendation) => (
                            <Grid item xs={12} md={6} key={recommendation.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {recommendation.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph>
                                            {recommendation.description}
                                        </Typography>
                                        <Box sx={{ mb: 2 }}>
                                            <Chip
                                                label={`Expected Return: ${recommendation.expectedReturn}`}
                                                color="primary"
                                                sx={{ mr: 1 }}
                                            />
                                            <Chip
                                                label={`Risk: ${recommendation.risk}`}
                                                color={
                                                    recommendation.risk === 'Low' ? 'success' :
                                                    recommendation.risk === 'Medium' ? 'warning' : 'error'
                                                }
                                            />
                                        </Box>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Asset Allocation
                                        </Typography>
                                        {recommendation.allocation.map((asset, index) => (
                                            <Box key={index} sx={{ mb: 1 }}>
                                                <Typography variant="body2">
                                                    {asset.type}: {asset.percentage}%
                                                </Typography>
                                            </Box>
                                        ))}
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={() => handleRecommendationClick(recommendation)}
                                        >
                                            Learn More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            {/* Recommendation Detail Dialog */}
            <Dialog
                open={Boolean(selectedRecommendation)}
                onClose={() => setSelectedRecommendation(null)}
                maxWidth="md"
                fullWidth
            >
                {selectedRecommendation && (
                    <>
                        <DialogTitle>{selectedRecommendation.name}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {selectedRecommendation.description}
                            </DialogContentText>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Portfolio Details
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2">
                                            Expected Returns
                                        </Typography>
                                        <Typography paragraph>
                                            {selectedRecommendation.expectedReturn} per annum
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Risk Level
                                        </Typography>
                                        <Typography paragraph>
                                            {selectedRecommendation.risk}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2">
                                            Recommended Investment Amount
                                        </Typography>
                                        <Typography paragraph>
                                            {formatCurrency(investmentAmount)}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Suggested Time Horizon
                                        </Typography>
                                        <Typography paragraph>
                                            {investmentHorizon} years
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setSelectedRecommendation(null)}>Close</Button>
                            <Button variant="contained">
                                Get Started
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
};

export default InvestmentRecommendations;
