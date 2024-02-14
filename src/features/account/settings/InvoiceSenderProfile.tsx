import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardHeader, CardContent } from '@mui/material';
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
            const response = await agent.InvoiceSender.details();
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
            const response = await agent.InvoiceSender.createOrUpdate(invoiceSender);
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
                    <TextField
                        name="name"
                        label="Name"
                        value={invoiceSender.Company}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        name="email"
                        label="Email"
                        value={invoiceSender.Country}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        name="address"
                        label="Address"
                        value={invoiceSender.Address}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        name="city"
                        label="City"
                        value={invoiceSender.City}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        name="zip"
                        label="Zip"
                        value={invoiceSender.Zip}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button> 
                </form>
            </CardContent>
        </Card>
    );
};

export default CreateInvoiceSenderForm;
