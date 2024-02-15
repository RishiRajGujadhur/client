import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import Review from "./Review";
import { useForm, FieldValues, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './checkoutValidation';
import { useAppDispatch } from '../../app/store/configureStore';
import agent from '../../app/api/agent';
import { clearBasket } from '../basket/basketSlice';
import { LoadingButton } from '@mui/lab';
import PaymentMethodForm from "./PaymentMethodForm";

// Define the steps for the checkout process
const steps = ['Shipping address', 'Payment method', 'Review your order'];

export default function CheckoutPage() {
    // State variables to keep track of the active step, order number, loading state, payment message, and payment success
    const [activeStep, setActiveStep] = useState(0);
    const [orderNumber, setOrderNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const [paymentMessage, setPaymentMessage] = useState('');
    const [paymentSucceeded, setPaymentSucceeded] = useState(false);
 
    // Function to get the content for the current step
    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <AddressForm />;
            case 1:
                return <PaymentMethodForm />;
            case 2:
                return <Review />;
            default:
                throw new Error('Unknown step');
        }
    }

    // Get the validation schema for the current step
    const currentValidationSchema = validationSchema[activeStep];

    // Initialize the form methods using react-hook-form
    const methods = useForm({
        mode: 'onTouched',
        resolver: yupResolver(currentValidationSchema)
    });

    // Fetch the user's address from the server when the component mounts
    useEffect(() => {
        agent.Account.fetchAddress()
            .then(response => {
                if (response) {
                    // Reset the form values with the fetched address data
                    methods.reset({ ...methods.getValues(), ...response, saveAddress: false })
                }
            })
    }, [methods]);

    // Function to submit the order
    const submitOrder = async (data: FieldValues) => { 
        setLoading(true);
        const { saveAddress, ...shippingAddress } = data;
        try {
            // Simulate a payment process
            if ('succeeded') {
                // Create the order on the server
                const orderNumber = await agent.Orders.create({ saveAddress, shippingAddress });
                setOrderNumber(orderNumber);
                setPaymentSucceeded(true);
                setPaymentMessage('Thank you - we have received your order');
                setActiveStep(activeStep + 1);
                dispatch(clearBasket());
                setLoading(false);
            } else {
                // Payment failed
                setPaymentSucceeded(false);
                setLoading(false);
                setActiveStep(activeStep + 1);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // Function to handle the "Next" button click
    const handleNext = async (data: FieldValues) => { 
        console.log(activeStep, 'activeStep in handleNext'); 
        if (activeStep === steps.length - 1) {
            // If it's the last step, submit the order
            await submitOrder(data);
        } else {
            // Otherwise, move to the next step
            setActiveStep(activeStep + 1);
        }
    };

    // Function to handle the "Back" button click
    const handleBack = () => {
        // Move to the previous step
        setActiveStep(activeStep - 1);
    };


    return (
        <FormProvider {...methods}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    Checkout
                </Typography>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <>
                    {activeStep === steps.length ? (
                        // If it's the last step, show the payment message and order number
                        <>
                            <Typography variant="h5" gutterBottom>
                                {paymentMessage}
                            </Typography>
                            {paymentSucceeded ? (
                                <Typography variant="subtitle1">
                                    Your order number is #{orderNumber}.
                                </Typography>
                            ) : (
                                // If payment failed, show a button to go back and try again
                                <Button variant='contained' onClick={handleBack}>
                                    Go back and try again
                                </Button>
                            )}
                        </>
                    ) : (
                        // If it's not the last step, show the form for the current step
                        <form onSubmit={methods.handleSubmit(handleNext)}>
                            console.log(activeStep, 'activeStep');
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    // Show the "Back" button if it's not the first step
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                <LoadingButton
                                    loading={loading}
                                    type='submit'
                                    variant="contained"
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </LoadingButton>
                            </Box>
                        </form>
                    )}
                </>
            </Paper>
        </FormProvider>
    );
}