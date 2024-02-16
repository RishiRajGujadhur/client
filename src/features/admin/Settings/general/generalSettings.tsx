import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Card, CardContent, CardHeader } from '@mui/material';
import agent from '../../../../app/api/agent';
import { toast } from 'react-toastify';
import { GeneralSettings } from '../../../../models/settings/generalSettings';

const GeneralSettingsForm: React.FC = () => {
    const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
        id: 1,
        logo: 'My logo url',
        appName: 'Store Manager',
        companyName: 'Gubajob',
        defaultCurrency: 'USD',
        defaultLanguage: 'en',
    });

    useEffect(() => {
        const fetchInitialGeneralSettings = async () => {
            try {
                const response = await agent.GeneralSettings.details(); 
                setGeneralSettings(response); 
            } catch (error) {
                console.error('An error occurred while fetching the general settings!', error);
                toast.error('An error occurred while fetching the general settings!');
            }
        };

        fetchInitialGeneralSettings();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setGeneralSettings((prevSettings) => ({
            ...prevSettings,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            let generalSettingsId = 1;
            await agent.GeneralSettings.update(generalSettingsId, generalSettings);
            toast.success('General settings updated successfully!');
        } catch (error) {
            console.error('An error occurred while updating the general settings:', error);
            toast.error('An error occurred while updating the general settings!');
        }
    };

    return (
        <Card>
            <CardHeader title="General Settings" />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="companyName"
                                label="Company Name"
                                value={generalSettings?.companyName || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="appName"
                                label="App Name"
                                value={generalSettings?.appName || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="defaultCurrency"
                                label="Default Currency"
                                value={generalSettings?.defaultCurrency || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="defaultLanguage"
                                label="Default Language"
                                value={generalSettings?.defaultLanguage || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="logo"
                                label="Logo"
                                value={generalSettings?.logo || ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default GeneralSettingsForm;
