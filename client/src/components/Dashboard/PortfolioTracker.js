import React, { useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Chip,
    Card,
    CardContent,
    LinearProgress
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon
} from '@mui/icons-material';

const PortfolioTracker = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [holdings, setHoldings] = useState([
        {
            id: 1,
            symbol: 'RELIANCE',
            name: 'Reliance Industries',
            quantity: 100,
            avgPrice: 2450.75,
            currentPrice: 2567.80,
            type: 'Equity'
        },
        {
            id: 2,
            symbol: 'HDFCBANK',
            name: 'HDFC Bank',
            quantity: 50,
            avgPrice: 1678.90,
            currentPrice: 1725.45,
            type: 'Equity'
        },
        {
            id: 3,
            symbol: 'GOLDBEES',
            name: 'Nippon Gold ETF',
            quantity: 20,
            avgPrice: 4200.00,
            currentPrice: 4350.25,
            type: 'ETF'
        }
    ]);

    const performanceData = [
        { month: 'Jan', value: 500000 },
        { month: 'Feb', value: 520000 },
        { month: 'Mar', value: 515000 },
        { month: 'Apr', value: 535000 },
        { month: 'May', value: 550000 },
        { month: 'Jun', value: 545000 }
    ];

    const calculateProfitLoss = (holding) => {
        const pl = (holding.currentPrice - holding.avgPrice) * holding.quantity;
        const plPercent = ((holding.currentPrice - holding.avgPrice) / holding.avgPrice) * 100;
        return {
            value: pl,
            percent: plPercent
        };
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(value);
    };

    const handleAddHolding = () => {
        setOpenDialog(true);
    };

    // Calculate total portfolio value and performance
    const totalPortfolioValue = holdings.reduce((total, holding) => 
        total + (holding.currentPrice * holding.quantity), 0
    );

    const totalInvestment = holdings.reduce((total, holding) => 
        total + (holding.avgPrice * holding.quantity), 0
    );

    const totalProfitLoss = totalPortfolioValue - totalInvestment;
    const totalProfitLossPercent = (totalProfitLoss / totalInvestment) * 100;

    // Calculate performance trend
    const performanceTrend = performanceData.map((data, index, array) => {
        if (index === 0) return 0;
        return ((data.value - array[index - 1].value) / array[index - 1].value) * 100;
    });

    const averagePerformance = performanceTrend.reduce((sum, value) => sum + value, 0) / 
        (performanceTrend.length - 1);

    return (
        <Box>
            <Grid container spacing={3}>
                {/* Portfolio Summary */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Portfolio Summary
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Total Value
                                        </Typography>
                                        <Typography variant="h5">
                                            {formatCurrency(totalPortfolioValue)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Total Investment
                                        </Typography>
                                        <Typography variant="h5">
                                            {formatCurrency(totalInvestment)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Total P&L
                                        </Typography>
                                        <Typography variant="h5" color={totalProfitLoss >= 0 ? 'success.main' : 'error.main'}>
                                            {formatCurrency(totalProfitLoss)}
                                            <Typography variant="caption" component="span" sx={{ ml: 1 }}>
                                                ({totalProfitLossPercent.toFixed(2)}%)
                                            </Typography>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Monthly Performance
                                        </Typography>
                                        <Typography variant="h5" color={averagePerformance >= 0 ? 'success.main' : 'error.main'}>
                                            {averagePerformance.toFixed(2)}%
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Performance Trend */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Monthly Performance
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            {performanceData.map((data, index) => (
                                <Box key={data.month} sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                        <Typography variant="body2">{data.month}</Typography>
                                        <Typography variant="body2">
                                            {formatCurrency(data.value)}
                                            {index > 0 && (
                                                <Typography
                                                    component="span"
                                                    color={performanceTrend[index] >= 0 ? 'success.main' : 'error.main'}
                                                    sx={{ ml: 1 }}
                                                >
                                                    ({performanceTrend[index].toFixed(2)}%)
                                                </Typography>
                                            )}
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={(data.value / Math.max(...performanceData.map(d => d.value))) * 100}
                                        color={index > 0 && performanceTrend[index] >= 0 ? 'success' : 'error'}
                                        sx={{ height: 8, borderRadius: 5 }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                {/* Holdings Table */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6">
                                Your Holdings
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleAddHolding}
                            >
                                Add Holding
                            </Button>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Symbol</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Avg Price</TableCell>
                                        <TableCell align="right">Current Price</TableCell>
                                        <TableCell align="right">P&L</TableCell>
                                        <TableCell align="center">Type</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {holdings.map((holding) => {
                                        const pl = calculateProfitLoss(holding);
                                        return (
                                            <TableRow key={holding.id}>
                                                <TableCell>{holding.symbol}</TableCell>
                                                <TableCell>{holding.name}</TableCell>
                                                <TableCell align="right">{holding.quantity}</TableCell>
                                                <TableCell align="right">
                                                    {formatCurrency(holding.avgPrice)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {formatCurrency(holding.currentPrice)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                        {pl.value >= 0 ? (
                                                            <TrendingUpIcon color="success" sx={{ mr: 1 }} />
                                                        ) : (
                                                            <TrendingDownIcon color="error" sx={{ mr: 1 }} />
                                                        )}
                                                        <Typography
                                                            color={pl.value >= 0 ? 'success.main' : 'error.main'}
                                                        >
                                                            {formatCurrency(pl.value)}
                                                            <br />
                                                            ({pl.percent.toFixed(2)}%)
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Chip
                                                        label={holding.type}
                                                        color={holding.type === 'Equity' ? 'primary' : 'secondary'}
                                                        size="small"
                                                    />
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
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>

            {/* Add Holding Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New Holding</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                label="Symbol"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Quantity"
                                type="number"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Average Price"
                                type="number"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Type"
                                select
                                fullWidth
                                required
                                defaultValue="Equity"
                            >
                                <MenuItem value="Equity">Equity</MenuItem>
                                <MenuItem value="ETF">ETF</MenuItem>
                                <MenuItem value="Mutual Fund">Mutual Fund</MenuItem>
                                <MenuItem value="Bond">Bond</MenuItem>
                            </TextField>
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

export default PortfolioTracker;
