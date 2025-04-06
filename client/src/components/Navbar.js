import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    FinAnalyzer
                </Typography>
                {user ? (
                    <Box>
                        <Button color="inherit" component={RouterLink} to="/deposit-calculators">
                            Deposit Calculators
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/loan-calculator">
                            Loan Calculator
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/investment-calculator">
                            Investment Calculator
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/market-data">
                            Market Data
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/tax-planner">
                            Tax Planner
                        </Button>
                        <Typography variant="body1" sx={{ mx: 2 }}>
                            Welcome, {user.name}
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <Box>
                        <Button color="inherit" component={RouterLink} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/register">
                            Register
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
