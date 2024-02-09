import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { InvoiceSettings } from '../../../../models/invoice/InvoiceSettings/InvoiceSettings';
import agent from '../../../../app/api/agent';

const InvoiceSettingsForm: React.FC = () => {
    const [invoiceSettings, setInvoiceSettings] = useState<InvoiceSettings>({
        companyName: '',
        address: '',
    });

    useEffect(() => {
        // Fetch the initial liked status from the server based on the user's information.
        const fetchInitialInvoiceSettings = async () => {
            try {
                const response = await agent.InvoicesSettings.details();
                setInvoiceSettings(response.data);
            } catch (error) {
                console.error('Error fetching initial liked status:', error);
            }
        };

        fetchInitialInvoiceSettings();
    }, []);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInvoiceSettings((prevSettings) => ({
            ...prevSettings,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            await agent.InvoicesSettings.create(invoiceSettings);
        } catch (error) {
            console.error('Error toggling like status:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                name="companyName"
                label="Company Name"
                value={invoiceSettings.companyName}
                onChange={handleInputChange}
            />
            <TextField
                name="address"
                label="Address"
                value={invoiceSettings.address}
                onChange={handleInputChange}
            />
            {/* Add more fields for other invoice settings */}
            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Save
            </Button>
        </form>
    );
};

export default InvoiceSettingsForm;
