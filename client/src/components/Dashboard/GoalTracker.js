import React, { useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    LinearProgress,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    IconButton
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Flag as FlagIcon,
    Timeline as TimelineIcon,
    AccountBalance as AccountBalanceIcon
} from '@mui/icons-material';

const GoalTracker = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [goals, setGoals] = useState([
        {
            id: 1,
            name: 'Emergency Fund',
            targetAmount: 300000,
            currentAmount: 150000,
            targetDate: '2025-06-30',
            type: 'Emergency',
            priority: 'High'
        },
        {
            id: 2,
            name: 'House Down Payment',
            targetAmount: 1500000,
            currentAmount: 500000,
            targetDate: '2026-12-31',
            type: 'Property',
            priority: 'Medium'
        },
        {
            id: 3,
            name: 'Child Education',
            targetAmount: 2000000,
            currentAmount: 400000,
            targetDate: '2030-03-31',
            type: 'Education',
            priority: 'High'
        }
    ]);

    const calculateProgress = (current, target) => {
        return (current / target) * 100;
    };

    const getProgressColor = (progress) => {
        if (progress >= 75) return 'success';
        if (progress >= 40) return 'warning';
        return 'error';
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(value);
    };

    const getTimeRemaining = (targetDate) => {
        const remaining = new Date(targetDate) - new Date();
        const days = Math.ceil(remaining / (1000 * 60 * 60 * 24));
        if (days < 30) return `${days} days`;
        if (days < 365) return `${Math.ceil(days / 30)} months`;
        return `${Math.ceil(days / 365)} years`;
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">
                    Financial Goals
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenDialog(true)}
                >
                    Add Goal
                </Button>
            </Box>

            <Grid container spacing={3}>
                {goals.map((goal) => {
                    const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
                    return (
                        <Grid item xs={12} md={6} key={goal.id}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="h6" component="div">
                                            {goal.name}
                                        </Typography>
                                        <Box>
                                            <IconButton size="small" color="primary">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton size="small" color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>

                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Progress
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={progress}
                                            color={getProgressColor(progress)}
                                            sx={{ height: 8, borderRadius: 5, my: 1 }}
                                        />
                                        <Typography variant="body2" color="text.secondary">
                                            {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                                            {' '}({progress.toFixed(1)}%)
                                        </Typography>
                                    </Box>

                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Target Date
                                            </Typography>
                                            <Typography variant="body1">
                                                {new Date(goal.targetDate).toLocaleDateString('en-IN')}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Time Remaining
                                            </Typography>
                                            <Typography variant="body1">
                                                {getTimeRemaining(goal.targetDate)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Type
                                            </Typography>
                                            <Typography variant="body1">
                                                {goal.type}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Priority
                                            </Typography>
                                            <Typography variant="body1" color={
                                                goal.priority === 'High' ? 'error.main' :
                                                goal.priority === 'Medium' ? 'warning.main' : 'success.main'
                                            }>
                                                {goal.priority}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Add Goal Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New Financial Goal</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                label="Goal Name"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Target Amount"
                                type="number"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Current Amount"
                                type="number"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Target Date"
                                type="date"
                                fullWidth
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Type"
                                select
                                fullWidth
                                required
                                defaultValue="Emergency"
                            >
                                <MenuItem value="Emergency">Emergency Fund</MenuItem>
                                <MenuItem value="Property">Property</MenuItem>
                                <MenuItem value="Education">Education</MenuItem>
                                <MenuItem value="Retirement">Retirement</MenuItem>
                                <MenuItem value="Vehicle">Vehicle</MenuItem>
                                <MenuItem value="Travel">Travel</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Priority"
                                select
                                fullWidth
                                required
                                defaultValue="Medium"
                            >
                                <MenuItem value="High">High</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setOpenDialog(false)}>
                        Add Goal
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default GoalTracker;
