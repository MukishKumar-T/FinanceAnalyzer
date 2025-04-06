import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Grid,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    IconButton,
    Tooltip,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import { Refresh as RefreshIcon, TrendingUp, TrendingDown } from '@mui/icons-material';

const MarketData = () => {
    const [stockData, setStockData] = useState({});
    const [metalData, setMetalData] = useState({});
    const [loading, setLoading] = useState({
        stocks: false,
        metals: false
    });
    const [lastUpdated, setLastUpdated] = useState({
        stocks: null,
        metals: null
    });
    const [exchangeRate, setExchangeRate] = useState(83); // Approximate USD to INR rate

    // Indian stock symbols
    const stockSymbols = [
        'RELIANCE.BSE',  // Reliance Industries
        'TCS.BSE',       // Tata Consultancy Services
        'HDFCBANK.BSE',  // HDFC Bank
        'INFY.BSE',      // Infosys
        'HINDUNILVR.BSE' // Hindustan Unilever
    ];

    const fetchStockData = async () => {
        setLoading(prev => ({ ...prev, stocks: true }));
        try {
            const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
            
            const stockPromises = stockSymbols.map(async (symbol) => {
                const response = await fetch(
                    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
                );
                const data = await response.json();
                console.log(`Data for ${symbol}:`, data);
                return {
                    symbol,
                    data: data['Global Quote'] || null
                };
            });

            const results = await Promise.all(stockPromises);
            const stockDataObj = {};
            results.forEach(result => {
                if (result.data) {
                    stockDataObj[result.symbol] = result.data;
                }
            });

            console.log('Processed stock data:', stockDataObj);
            setStockData(stockDataObj);
            setLastUpdated(prev => ({ ...prev, stocks: new Date() }));
        } catch (error) {
            console.error('Error fetching stock data:', error);
        } finally {
            setLoading(prev => ({ ...prev, stocks: false }));
        }
    };

    const fetchMetalData = async () => {
        setLoading(prev => ({ ...prev, metals: true }));
        try {
            const apiKey = process.env.REACT_APP_METALS_API_KEY;
            
            // Using placeholder data with approximate rates in INR per kg
            const placeholderData = {
                rates: {
                    XAU: 0.00050, // Gold rate
                    XAG: 0.04,    // Silver rate
                    XPT: 0.001,   // Platinum rate
                    XPD: 0.00125  // Palladium rate
                }
            };
            
            setMetalData(placeholderData.rates);
            setLastUpdated(prev => ({ ...prev, metals: new Date() }));
        } catch (error) {
            console.error('Error fetching metal data:', error);
        } finally {
            setLoading(prev => ({ ...prev, metals: false }));
        }
    };

    useEffect(() => {
        fetchStockData();
        fetchMetalData();

        const interval = setInterval(() => {
            fetchStockData();
            fetchMetalData();
        }, 300000);

        return () => clearInterval(interval);
    }, []);

    const formatPrice = (price) => {
        if (!price || isNaN(price)) return 'N/A';
        // Convert USD to INR and format
        const priceInINR = parseFloat(price) * exchangeRate;
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        }).format(priceInINR);
    };

    const formatPercentage = (percentage) => {
        if (!percentage || isNaN(percentage)) return 'N/A';
        return `${(parseFloat(percentage)).toFixed(2)}%`;
    };

    // Convert troy ounces to kilograms (1 troy oz ≈ 0.031103 kg)
    const troyOzToKg = (troyOz) => troyOz * 0.031103;

    const renderStockTable = () => (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Company</TableCell>
                        <TableCell align="right">Price (₹)</TableCell>
                        <TableCell align="right">Change</TableCell>
                        <TableCell align="right">Change %</TableCell>
                        <TableCell align="right">Volume</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(stockData).map(([symbol, quote]) => {
                        if (!quote) return null;
                        
                        const price = quote['05. price'];
                        const change = quote['09. change'];
                        const changePercent = quote['10. change percent'];
                        const volume = quote['06. volume'];
                        
                        // Convert BSE symbol to company name
                        const companyName = symbol.split('.')[0];

                        return (
                            <TableRow key={symbol}>
                                <TableCell component="th" scope="row">
                                    <Typography variant="body1" fontWeight="bold">
                                        {companyName}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    {formatPrice(price)}
                                </TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        {parseFloat(change) >= 0 ? (
                                            <TrendingUp color="success" />
                                        ) : (
                                            <TrendingDown color="error" />
                                        )}
                                        {formatPrice(change)}
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Chip
                                        label={formatPercentage(changePercent)}
                                        color={parseFloat(changePercent) >= 0 ? 'success' : 'error'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    {volume ? parseInt(volume).toLocaleString('en-IN') : 'N/A'}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const renderMetalCards = () => (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Gold
                        </Typography>
                        <Typography variant="h4">
                            {formatPrice((1 / metalData?.XAU) * troyOzToKg(1))}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            per kilogram
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Silver
                        </Typography>
                        <Typography variant="h4">
                            {formatPrice((1 / metalData?.XAG) * troyOzToKg(1))}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            per kilogram
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Platinum
                        </Typography>
                        <Typography variant="h4">
                            {formatPrice((1 / metalData?.XPT) * troyOzToKg(1))}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            per kilogram
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Palladium
                        </Typography>
                        <Typography variant="h4">
                            {formatPrice((1 / metalData?.XPD) * troyOzToKg(1))}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            per kilogram
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4">Market Data</Typography>
                    <Box>
                        <Tooltip title="Refresh data">
                            <IconButton 
                                onClick={() => {
                                    fetchStockData();
                                    fetchMetalData();
                                }}
                                disabled={loading.stocks || loading.metals}
                            >
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                    Indian Stock Market
                </Typography>
                {loading.stocks ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    renderStockTable()
                )}

                <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                    Precious Metals
                </Typography>
                {loading.metals ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    renderMetalCards()
                )}

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography variant="caption" color="textSecondary">
                        Last updated: {lastUpdated.stocks?.toLocaleTimeString()}
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default MarketData;
