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
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

const InvestmentCalculator = () => {
  const [initialAmount, setInitialAmount] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');
  const [investmentPeriod, setInvestmentPeriod] = useState('');
  const [compoundingFrequency, setCompoundingFrequency] = useState('monthly');
  const [result, setResult] = useState(null);

  const calculateInvestment = () => {
    const principal = parseFloat(initialAmount);
    const monthly = parseFloat(monthlyContribution);
    const ratePerYear = parseFloat(annualReturn) / 100;
    const years = parseFloat(investmentPeriod);
    
    let compoundsPerYear;
    switch (compoundingFrequency) {
      case 'daily': compoundsPerYear = 365; break;
      case 'monthly': compoundsPerYear = 12; break;
      case 'quarterly': compoundsPerYear = 4; break;
      case 'annually': compoundsPerYear = 1; break;
      default: compoundsPerYear = 12;
    }

    const ratePerPeriod = ratePerYear / compoundsPerYear;
    const totalPeriods = years * compoundsPerYear;
    
    // Calculate future value with regular contributions
    const futureValue = principal * Math.pow(1 + ratePerPeriod, totalPeriods) +
      monthly * ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod);

    // Generate yearly breakdown
    const breakdown = [];
    for (let year = 1; year <= years; year++) {
      const yearlyPeriods = year * compoundsPerYear;
      const valueAtYear = principal * Math.pow(1 + ratePerPeriod, yearlyPeriods) +
        monthly * ((Math.pow(1 + ratePerPeriod, yearlyPeriods) - 1) / ratePerPeriod);
      
      const totalContributed = principal + (monthly * year * 12);
      const interestEarned = valueAtYear - totalContributed;

      breakdown.push({
        year,
        totalValue: valueAtYear,
        totalContributed,
        interestEarned
      });
    }

    setResult({
      futureValue,
      totalContributions: principal + (monthly * years * 12),
      totalInterest: futureValue - (principal + (monthly * years * 12)),
      breakdown
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Investment Calculator
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Initial Investment"
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(e.target.value)}
              InputProps={{ startAdornment: '$' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Monthly Contribution"
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              InputProps={{ startAdornment: '$' }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Annual Return Rate"
              type="number"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              InputProps={{ endAdornment: '%' }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Investment Period (Years)"
              type="number"
              value={investmentPeriod}
              onChange={(e) => setInvestmentPeriod(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Compounding Frequency</InputLabel>
              <Select
                value={compoundingFrequency}
                label="Compounding Frequency"
                onChange={(e) => setCompoundingFrequency(e.target.value)}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
                <MenuItem value="annually">Annually</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={calculateInvestment}
          sx={{ mb: 4 }}
        >
          Calculate
        </Button>

        {result && (
          <>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Future Value</Typography>
                <Typography>${result.futureValue.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Total Contributions</Typography>
                <Typography>${result.totalContributions.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Total Interest Earned</Typography>
                <Typography>${result.totalInterest.toFixed(2)}</Typography>
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom>
              Year by Year Breakdown
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Year</TableCell>
                    <TableCell align="right">Total Value</TableCell>
                    <TableCell align="right">Total Contributed</TableCell>
                    <TableCell align="right">Interest Earned</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.breakdown.map((row) => (
                    <TableRow key={row.year}>
                      <TableCell>{row.year}</TableCell>
                      <TableCell align="right">${row.totalValue.toFixed(2)}</TableCell>
                      <TableCell align="right">${row.totalContributed.toFixed(2)}</TableCell>
                      <TableCell align="right">${row.interestEarned.toFixed(2)}</TableCell>
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

export default InvestmentCalculator;
