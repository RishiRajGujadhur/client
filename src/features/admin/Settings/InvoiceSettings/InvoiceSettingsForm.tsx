import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Card, CardContent, CardHeader } from '@mui/material';
import { InvoiceSettings } from '../../../../models/invoice/InvoiceSettings/InvoiceSettings';
import agent from '../../../../app/api/agent';

const InvoiceSettingsForm: React.FC = () => {
    const [invoiceSettings, setInvoiceSettings] = useState<InvoiceSettings>({
        companyName: 'Sample Company',
        address: '123 Main St',
        currency: 'USD',
        locale: 'en-US',
        taxNotation: 'GST',
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 10,
        showLogo: true,
        logoUrl: 'https://example.com/logo.png',
        logoHeight: '50px',
        logoWidth: '100px',
        fontSize: '12px',
        fontName: 'Arial',
        color: '#000000',
        accentColor: '#FF0000',
        description: 'Sample invoice description',
        format: 'A4',
        height: '297mm',
        width: '210mm',
        orientation: 'portrait',
    });

    useEffect(() => {
        // Fetch the initial liked status from the server based on the user's information.
        const fetchInitialInvoiceSettings = async () => {
            try {
                const response = await agent.InvoicesSettings.details();
                setInvoiceSettings(response.data);
                console.log(invoiceSettings);
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
            await agent.InvoicesSettings.update(invoiceSettings);
        } catch (error) {
            console.error('Error toggling like status:', error);
        }
    };

    return (
        <Card>
            <CardHeader title="Invoice Settings" />
            <CardContent>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="currency"
                        label="Currency"
                        value={invoiceSettings?.currency || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="locale"
                        label="Locale"
                        value={invoiceSettings?.locale || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="taxNotation"
                        label="Tax Notation"
                        value={invoiceSettings?.taxNotation || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="marginTop"
                        label="Margin Top"
                        value={invoiceSettings?.marginTop || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="marginRight"
                        label="Margin Right"
                        value={invoiceSettings?.marginRight || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="marginBottom"
                        label="Margin Bottom"
                        value={invoiceSettings?.marginBottom || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="marginLeft"
                        label="Margin Left"
                        value={invoiceSettings?.marginLeft || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="showLogo"
                        label="Show Logo"
                        value={invoiceSettings?.showLogo || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="logoUrl"
                        label="Logo URL"
                        value={invoiceSettings?.logoUrl || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="logoHeight"
                        label="Logo Height"
                        value={invoiceSettings?.logoHeight || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="logoWidth"
                        label="Logo Width"
                        value={invoiceSettings?.logoWidth || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="fontSize"
                        label="Font Size"
                        value={invoiceSettings?.fontSize || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="fontName"
                        label="Font Name"
                        value={invoiceSettings?.fontName || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="color"
                        label="Color"
                        value={invoiceSettings?.color || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="accentColor"
                        label="Accent Color"
                        value={invoiceSettings?.accentColor || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="description"
                        label="Description"
                        value={invoiceSettings?.description || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="format"
                        label="Format"
                        value={invoiceSettings?.format || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="height"
                        label="Height"
                        value={invoiceSettings?.height || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="width"
                        label="Width"
                        value={invoiceSettings?.width || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="orientation"
                        label="Orientation"
                        value={invoiceSettings?.orientation || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
           
            <Grid item xs={12}>
            {/* Add more fields for other invoice settings */}
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

export default InvoiceSettingsForm;
