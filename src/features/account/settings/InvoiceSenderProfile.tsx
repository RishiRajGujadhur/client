import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardHeader, CardContent, Grid, Box } from '@mui/material';
import agent from '../../../app/api/agent';
import { InvoiceSender } from '../../../models/invoice/invoiceSender';

const CreateInvoiceSenderForm = () => {
    const [invoiceSender, setInvoiceSender] = useState<InvoiceSender>({
        Id: 0,
        Address: '',
        City: '',
        Company: '',
        Zip: '',
        Country: '',
    });

    useEffect(() => {
        getInvoiceSender();
    }, []);

    const getInvoiceSender = async () => {
        try {
            const response = await agent.InvoiceSenders.details();
            setInvoiceSender(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInvoiceSender((prevInvoiceSender) => ({
            ...prevInvoiceSender,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await agent.InvoiceSenders.createOrUpdate(invoiceSender);
            console.log(response.data); // Assuming the API returns the saved invoiceSender object
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card>
            <CardHeader title='Update Invoice Sender' />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                label="Name"
                                value={invoiceSender.Company}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="email"
                                label="Email"
                                value={invoiceSender.Country}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="address"
                                label="Address"
                                value={invoiceSender.Address}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="city"
                                label="City"
                                value={invoiceSender.City}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="zip"
                                label="Zip"
                                value={invoiceSender.Zip}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </Box>
                </form>
            </CardContent>
        </Card>
    );
};

export default CreateInvoiceSenderForm;
