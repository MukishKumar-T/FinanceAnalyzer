import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const FinanceContext = createContext();

export const useFinance = () => {
    return useContext(FinanceContext);
};

export const FinanceProvider = ({ children }) => {
    const { user } = useAuth();
    const [expenses, setExpenses] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const [investments, setInvestments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all data when user changes
    useEffect(() => {
        if (user) {
            fetchExpenses();
            fetchPortfolio();
            fetchInvestments();
        }
    }, [user]);

    // Expenses
    const fetchExpenses = async () => {
        try {
            const res = await axios.get('/api/expenses');
            setExpenses(res.data);
        } catch (err) {
            setError(err.response?.data?.msg || 'Error fetching expenses');
        }
    };

    const addExpense = async (expenseData) => {
        try {
            const res = await axios.post('/api/expenses', expenseData);
            setExpenses([res.data, ...expenses]);
            return res.data;
        } catch (err) {
            setError(err.response?.data?.msg || 'Error adding expense');
            throw err;
        }
    };

    const updateExpense = async (id, expenseData) => {
        try {
            const res = await axios.put(`/api/expenses/${id}`, expenseData);
            setExpenses(expenses.map(expense => 
                expense._id === id ? res.data : expense
            ));
            return res.data;
        } catch (err) {
            setError(err.response?.data?.msg || 'Error updating expense');
            throw err;
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`/api/expenses/${id}`);
            setExpenses(expenses.filter(expense => expense._id !== id));
        } catch (err) {
            setError(err.response?.data?.msg || 'Error deleting expense');
            throw err;
        }
    };

    // Portfolio
    const fetchPortfolio = async () => {
        try {
            const res = await axios.get('/api/portfolio');
            setPortfolio(res.data);
        } catch (err) {
            setError(err.response?.data?.msg || 'Error fetching portfolio');
        }
    };

    const addHolding = async (holdingData) => {
        try {
            const res = await axios.post('/api/portfolio', holdingData);
            setPortfolio([res.data, ...portfolio]);
            return res.data;
        } catch (err) {
            setError(err.response?.data?.msg || 'Error adding holding');
            throw err;
        }
    };

    const updateHolding = async (id, holdingData) => {
        try {
            const res = await axios.put(`/api/portfolio/${id}`, holdingData);
            setPortfolio(portfolio.map(holding => 
                holding._id === id ? res.data : holding
            ));
            return res.data;
        } catch (err) {
            setError(err.response?.data?.msg || 'Error updating holding');
            throw err;
        }
    };

    const deleteHolding = async (id) => {
        try {
            await axios.delete(`/api/portfolio/${id}`);
            setPortfolio(portfolio.filter(holding => holding._id !== id));
        } catch (err) {
            setError(err.response?.data?.msg || 'Error deleting holding');
            throw err;
        }
    };

    const addTransaction = async (holdingId, transactionData) => {
        try {
            const res = await axios.post(`/api/portfolio/${holdingId}/transactions`, transactionData);
            setPortfolio(portfolio.map(holding => 
                holding._id === holdingId ? res.data : holding
            ));
            return res.data;
        } catch (err) {
            setError(err.response?.data?.msg || 'Error adding transaction');
            throw err;
        }
    };

    // Investments
    const fetchInvestments = async () => {
        try {
            const res = await axios.get('/api/investments');
            setInvestments(res.data);
        } catch (err) {
            setError(err.response?.data?.msg || 'Error fetching investments');
        }
    };

    const addInvestment = async (investmentData) => {
        try {
            const res = await axios.post('/api/investments', investmentData);
            setInvestments([res.data, ...investments]);
            return res.data;
        } catch (err) {
            setError(err.response?.data?.msg || 'Error adding investment');
            throw err;
        }
    };

    const updateInvestment = async (id, investmentData) => {
        try {
            const res = await axios.put(`/api/investments/${id}`, investmentData);
            setInvestments(investments.map(investment => 
                investment._id === id ? res.data : investment
            ));
            return res.data;
        } catch (err) {
            setError(err.response?.data?.msg || 'Error updating investment');
            throw err;
        }
    };

    const deleteInvestment = async (id) => {
        try {
            await axios.delete(`/api/investments/${id}`);
            setInvestments(investments.filter(investment => investment._id !== id));
        } catch (err) {
            setError(err.response?.data?.msg || 'Error deleting investment');
            throw err;
        }
    };

    const filterInvestments = async (filterData) => {
        try {
            const res = await axios.post('/api/investments/filter', filterData);
            return res.data;
        } catch (err) {
            setError(err.response?.data?.msg || 'Error filtering investments');
            throw err;
        }
    };

    const value = {
        expenses,
        portfolio,
        investments,
        loading,
        error,
        addExpense,
        updateExpense,
        deleteExpense,
        addHolding,
        updateHolding,
        deleteHolding,
        addTransaction,
        addInvestment,
        updateInvestment,
        deleteInvestment,
        filterInvestments
    };

    return (
        <FinanceContext.Provider value={value}>
            {children}
        </FinanceContext.Provider>
    );
};

export default FinanceContext;
