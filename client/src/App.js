import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import LoanCalculator from './components/LoanCalculator';
import InvestmentCalculator from './components/InvestmentCalculator';
import DepositCalculators from './components/DepositCalculators';
import MarketData from './components/MarketData';
import TaxPlanner from './components/TaxPlanner/TaxPlanner';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FinanceProvider } from './context/FinanceContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <FinanceProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/loan-calculator" element={
                <PrivateRoute>
                  <LoanCalculator />
                </PrivateRoute>
              } />
              <Route path="/investment-calculator" element={
                <PrivateRoute>
                  <InvestmentCalculator />
                </PrivateRoute>
              } />
              <Route path="/deposit-calculators" element={
                <PrivateRoute>
                  <DepositCalculators />
                </PrivateRoute>
              } />
              <Route path="/market-data" element={
                <PrivateRoute>
                  <MarketData />
                </PrivateRoute>
              } />
              <Route path="/tax-planner" element={
                <PrivateRoute>
                  <TaxPlanner />
                </PrivateRoute>
              } />
            </Routes>
          </Router>
        </FinanceProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
