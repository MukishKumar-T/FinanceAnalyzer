import React, { useState } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Card,
    CardContent,
    CardHeader,
    Button,
    CircularProgress,
    Tab,
    Tabs
} from '@mui/material';
import {
    AccountBalance as AccountBalanceIcon,
    TrendingUp as TrendingUpIcon,
    Assessment as AssessmentIcon,
    Timeline as TimelineIcon
} from '@mui/icons-material';
import PortfolioTracker from './PortfolioTracker';
import GoalTracker from './GoalTracker';
import ExpenseAnalysis from './ExpenseAnalysis';
import InvestmentRecommendations from './InvestmentRecommendations';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const portfolioSummary = {
        totalValue: 500000,
        todayChange: 2500,
        todayChangePercent: 0.5,
        monthlyReturn: 12000,
        monthlyReturnPercent: 2.4
    };

    const goalsSummary = {
        totalGoals: 3,
        onTrackGoals: 2,
        nextMilestone: 'Emergency Fund',
        targetDate: '2025-06-30'
    };

    const renderMainContent = () => {
        switch (activeTab) {
            case 0:
                return <PortfolioTracker />;
            case 1:
                return <GoalTracker />;
            case 2:
                return <ExpenseAnalysis />;
            case 3:
                return <InvestmentRecommendations />;
            default:
                return <PortfolioTracker />;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Welcome Section */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3, backgroundColor: 'primary.main', color: 'white' }}>
                        <Typography variant="h4" gutterBottom>
                            Welcome to Your Financial Dashboard
                        </Typography>
                        <Typography variant="subtitle1">
                            Track, analyze, and grow your wealth with our comprehensive tools
                        </Typography>
                    </Paper>
                </Grid>

                {/* Quick Stats Cards */}
                <Grid item xs={12} md={6} lg={3}>
                    <Card>
                        <CardHeader
                            avatar={<AccountBalanceIcon color="primary" />}
                            title="Portfolio Value"
                            titleTypographyProps={{ variant: 'subtitle2' }}
                        />
                        <CardContent>
                            <Typography variant="h4">
                                ₹{portfolioSummary.totalValue.toLocaleString('en-IN')}
                            </Typography>
                            <Typography
                                variant="body2"
                                color={portfolioSummary.todayChange >= 0 ? 'success.main' : 'error.main'}
                            >
                                {portfolioSummary.todayChange >= 0 ? '+' : ''}
                                {portfolioSummary.todayChange.toLocaleString('en-IN')} ({portfolioSummary.todayChangePercent}%)
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Card>
                        <CardHeader
                            avatar={<TrendingUpIcon color="primary" />}
                            title="Monthly Returns"
                            titleTypographyProps={{ variant: 'subtitle2' }}
                        />
                        <CardContent>
                            <Typography variant="h4">
                                ₹{portfolioSummary.monthlyReturn.toLocaleString('en-IN')}
                            </Typography>
                            <Typography
                                variant="body2"
                                color={portfolioSummary.monthlyReturnPercent >= 0 ? 'success.main' : 'error.main'}
                            >
                                {portfolioSummary.monthlyReturnPercent}% this month
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Card>
                        <CardHeader
                            avatar={<AssessmentIcon color="primary" />}
                            title="Financial Goals"
                            titleTypographyProps={{ variant: 'subtitle2' }}
                        />
                        <CardContent>
                            <Typography variant="h4">
                                {goalsSummary.onTrackGoals}/{goalsSummary.totalGoals}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Goals on track
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Card>
                        <CardHeader
                            avatar={<TimelineIcon color="primary" />}
                            title="Next Milestone"
                            titleTypographyProps={{ variant: 'subtitle2' }}
                        />
                        <CardContent>
                            <Typography variant="h6">
                                {goalsSummary.nextMilestone}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Target: {new Date(goalsSummary.targetDate).toLocaleDateString('en-IN')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Main Content Area */}
                <Grid item xs={12}>
                    <Paper sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                                variant="fullWidth"
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab label="Portfolio" />
                                <Tab label="Goals" />
                                <Tab label="Expenses" />
                                <Tab label="Recommendations" />
                            </Tabs>
                        </Box>
                        <Box sx={{ p: 3 }}>
                            {loading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                renderMainContent()
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
