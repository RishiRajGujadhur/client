import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Card, CardContent, CardHeader } from '@mui/material';
import { toast } from 'react-toastify';
import agent from '../../../app/api/agent';
import { InvoiceSender } from '../../../models/invoice/invoiceSender';

const InvoiceSenderProfile: React.FC = () => {
    const [invoiceSender, setInvoiceSender] = useState<InvoiceSender>({
        id: 0,
        address: 'Company Address',
        city: 'City',
        company: 'Company Name',
        zip: 'Zip Code',
        country: 'Country',
    });

    useEffect(() => { 
        const fetchInitialInvoiceSender = async () => {
            try {
                const response = await agent.InvoiceSenders.details();
                setInvoiceSender(response);
            } catch (error) {
                console.error('An error occured while fetching the invoice sender profile!', error);
                toast.error('An error occured while fetching the invoice sender profile!');
            }
        };

        fetchInitialInvoiceSender();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInvoiceSender((prevSettings) => ({
            ...prevSettings,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            await agent.InvoiceSenders.createOrUpdate(invoiceSender);
            toast.success('Invoice sender profile saved successfully!');
        } catch (error) {
            console.error('Error toggling like status:', error);
            toast.error('An error occured while updating the invoice sender profile!');
        }
    };

    return (
        <Card>
            <CardHeader title="Invoice Sender Config" />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="company"
                                label="Company"
                                value={invoiceSender?.company || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="country"
                                label="Country"
                                value={invoiceSender?.country || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="city"
                                label="City"
                                value={invoiceSender?.city || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="address"
                                label="Address"
                                value={invoiceSender?.address || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="zip"
                                label="ZIP"
                                value={invoiceSender?.zip || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default InvoiceSenderProfile;
