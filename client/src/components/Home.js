import React from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Welcome to FinAnalyzer
      </Typography>
      <Typography variant="h6" gutterBottom align="center" color="textSecondary">
        Your Personal Financial Calculator Suite
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Loan Calculator
            </Typography>
            <Typography variant="body1" paragraph align="center">
              Calculate monthly payments, total interest, and amortization schedule for your loans.
            </Typography>
            <Button variant="contained" component={Link} to="/loan-calculator">
              Get Started
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Investment Calculator
            </Typography>
            <Typography variant="body1" paragraph align="center">
              Plan your investments and calculate potential returns with different scenarios.
            </Typography>
            <Button variant="contained" component={Link} to="/investment-calculator">
              Start Planning
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Deposit Calculators
            </Typography>
            <Typography variant="body1" paragraph align="center">
              Calculate returns on FD, RD, and explore Simple & Compound Interest options.
            </Typography>
            <Button variant="contained" component={Link} to="/deposit-calculators">
              Calculate Returns
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
