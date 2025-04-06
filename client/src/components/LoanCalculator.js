import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [result, setResult] = useState(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const numberOfPayments = parseFloat(loanTerm) * 12; // Total number of months

    const monthlyPayment = (principal * rate * Math.pow(1 + rate, numberOfPayments)) /
      (Math.pow(1 + rate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    // Generate amortization schedule
    let balance = principal;
    const schedule = [];
    
    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = balance * rate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month: i,
        payment: monthlyPayment,
        principalPayment,
        interestPayment,
        remainingBalance: balance > 0 ? balance : 0
      });
    }

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      schedule: schedule.slice(0, 12) // Show first year only
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Loan Calculator
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Loan Amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              InputProps={{ startAdornment: '$' }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Annual Interest Rate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              InputProps={{ endAdornment: '%' }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Loan Term (Years)"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={calculateLoan}
          sx={{ mb: 4 }}
        >
          Calculate
        </Button>

        {result && (
          <>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Monthly Payment</Typography>
                <Typography>${result.monthlyPayment.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Total Payment</Typography>
                <Typography>${result.totalPayment.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Total Interest</Typography>
                <Typography>${result.totalInterest.toFixed(2)}</Typography>
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom>
              First Year Amortization Schedule
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell align="right">Payment</TableCell>
                    <TableCell align="right">Principal</TableCell>
                    <TableCell align="right">Interest</TableCell>
                    <TableCell align="right">Remaining Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.schedule.map((row) => (
                    <TableRow key={row.month}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell align="right">${row.payment.toFixed(2)}</TableCell>
                      <TableCell align="right">${row.principalPayment.toFixed(2)}</TableCell>
                      <TableCell align="right">${row.interestPayment.toFixed(2)}</TableCell>
                      <TableCell align="right">${row.remainingBalance.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default LoanCalculator;
