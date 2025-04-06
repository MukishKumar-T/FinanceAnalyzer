import React, { useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Button,
    Card,
    CardContent,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    Alert
} from '@mui/material';
import {
    Description as DescriptionIcon,
    Upload as UploadIcon,
    CheckCircle as CheckCircleIcon,
    Warning as WarningIcon,
    Error as ErrorIcon
} from '@mui/icons-material';

const TaxReturns = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [returns, setReturns] = useState([
        {
            id: 1,
            year: 'FY 2024-25',
            status: 'In Progress',
            dueDate: '2025-07-31',
            filingType: 'ITR-1',
            documents: [
                { name: 'Form 16', status: 'Uploaded' },
                { name: 'Bank Statement', status: 'Pending' },
                { name: 'Investment Proofs', status: 'Pending' }
            ],
            grossIncome: 1200000,
            taxPaid: 125000,
            refundStatus: null
        },
        {
            id: 2,
            year: 'FY 2023-24',
            status: 'Filed',
            filedDate: '2024-07-15',
            filingType: 'ITR-1',
            documents: [
                { name: 'Form 16', status: 'Verified' },
                { name: 'Bank Statement', status: 'Verified' },
                { name: 'Investment Proofs', status: 'Verified' }
            ],
            grossIncome: 1000000,
            taxPaid: 95000,
            refundStatus: 'Processed',
            refundAmount: 12000
        }
    ]);

    const steps = [
        'Select ITR Form',
        'Upload Documents',
        'Verify Information',
        'File Return'
    ];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Filed':
            case 'Verified':
            case 'Processed':
                return 'success';
            case 'In Progress':
            case 'Pending':
                return 'warning';
            case 'Rejected':
                return 'error';
            default:
                return 'default';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Filed':
            case 'Verified':
            case 'Processed':
                return <CheckCircleIcon color="success" />;
            case 'In Progress':
            case 'Pending':
                return <WarningIcon color="warning" />;
            case 'Rejected':
                return <ErrorIcon color="error" />;
            default:
                return null;
        }
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Select ITR Form Type
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>ITR Form Type</InputLabel>
                                    <Select
                                        value="ITR-1"
                                        label="ITR Form Type"
                                    >
                                        <MenuItem value="ITR-1">ITR-1 (Sahaj)</MenuItem>
                                        <MenuItem value="ITR-2">ITR-2</MenuItem>
                                        <MenuItem value="ITR-3">ITR-3</MenuItem>
                                        <MenuItem value="ITR-4">ITR-4 (Sugam)</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Alert severity="info">
                                    ITR-1 is for individuals having income from salary, one house property, 
                                    and other sources (interest etc.)
                                </Alert>
                            </Grid>
                        </Grid>
                    </Box>
                );
            case 1:
                return (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Required Documents
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <UploadIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Form 16"
                                    secondary="Salary certificate from employer"
                                />
                                <Button variant="outlined" startIcon={<UploadIcon />}>
                                    Upload
                                </Button>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <UploadIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Bank Statement"
                                    secondary="Annual bank statement for interest income"
                                />
                                <Button variant="outlined" startIcon={<UploadIcon />}>
                                    Upload
                                </Button>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <UploadIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Investment Proofs"
                                    secondary="Documents for tax-saving investments"
                                />
                                <Button variant="outlined" startIcon={<UploadIcon />}>
                                    Upload
                                </Button>
                            </ListItem>
                        </List>
                    </Box>
                );
            case 2:
                return (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Verify Information
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Gross Total Income"
                                    value="12,00,000"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Total Tax Paid"
                                    value="1,25,000"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Alert severity="warning">
                                    Please verify all the information before proceeding. Any discrepancy 
                                    may result in a notice from the Income Tax Department.
                                </Alert>
                            </Grid>
                        </Grid>
                    </Box>
                );
            case 3:
                return (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            File Return
                        </Typography>
                        <Alert severity="success" sx={{ mb: 3 }}>
                            All information has been verified. You can now proceed to file your return.
                        </Alert>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            File ITR
                        </Button>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box>
            <Grid container spacing={3}>
                {/* Filing Status */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            File Income Tax Return
                        </Typography>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <Box sx={{ mt: 3 }}>
                            {renderStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    disabled={activeStep === steps.length - 1}
                                >
                                    {activeStep === steps.length - 2 ? 'Finish' : 'Next'}
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                {/* Previous Returns */}
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Previous Returns
                    </Typography>
                    <Grid container spacing={2}>
                        {returns.map((taxReturn) => (
                            <Grid item xs={12} key={taxReturn.id}>
                                <Card>
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    Assessment Year
                                                </Typography>
                                                <Typography variant="body1">
                                                    {taxReturn.year}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={2}>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    Status
                                                </Typography>
                                                <Chip
                                                    label={taxReturn.status}
                                                    color={getStatusColor(taxReturn.status)}
                                                    size="small"
                                                    icon={getStatusIcon(taxReturn.status)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={2}>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    ITR Type
                                                </Typography>
                                                <Typography variant="body1">
                                                    {taxReturn.filingType}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={2}>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    Gross Income
                                                </Typography>
                                                <Typography variant="body1">
                                                    {formatCurrency(taxReturn.grossIncome)}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    Refund Status
                                                </Typography>
                                                {taxReturn.refundStatus ? (
                                                    <Box>
                                                        <Chip
                                                            label={taxReturn.refundStatus}
                                                            color={getStatusColor(taxReturn.refundStatus)}
                                                            size="small"
                                                        />
                                                        {taxReturn.refundAmount && (
                                                            <Typography variant="body2" color="success.main">
                                                                {formatCurrency(taxReturn.refundAmount)}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                ) : (
                                                    <Typography variant="body2" color="text.secondary">
                                                        Not Applicable
                                                    </Typography>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TaxReturns;
