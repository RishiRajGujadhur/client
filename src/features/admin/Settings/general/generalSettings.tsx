import React, { useEffect, useState } from 'react';
import { Button, Grid, Card, CardContent, CardHeader, Box, CircularProgress } from '@mui/material';
import agent from '../../../../app/api/agent';
import { toast } from 'react-toastify';
import { GeneralSettings } from '../../../../models/settings/generalSettings';
import AppDropzone from '../../../../app/components/AppDropzone';
import { FieldValues, useForm } from 'react-hook-form';
import AppTextInput from '../../../../app/components/AppTextInput';

const GeneralSettingsForm: React.FC = () => {
    // Initializing the react-hook-form
    const { control, reset, handleSubmit, watch, formState: { isDirty } } = useForm({
        mode: 'onTouched',
        //resolver: yupResolver<any>(validationSchema)
    });

    // Watching for changes in the 'file' field
    const watchFile = watch('file', null);

    const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
        id: 1,
        logoURL: 'My logo url',
        appName: 'Store Manager',
        companyName: 'Store Manager',
        defaultCurrency: 'USD',
        defaultLanguage: 'en',
    });

    const [isLoading, setIsLoading] = useState(false); // Add isLoading state

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

    // Resetting the form when the product, watchFile, or isDirty changes
    useEffect(() => {
        if (generalSettings && !watchFile && !isDirty) reset(generalSettings);
        return () => {
            if (watchFile) URL.revokeObjectURL(watchFile.preview);
        }
    }, [generalSettings, reset, watchFile, isDirty]);

    // Handling form submission
    async function handleSubmitData(data: FieldValues) {  
        try {
            setIsLoading(true); // Set isLoading to true when form is submitted

            let response: GeneralSettings;
            
            if (generalSettings) {
                let generalSettingsId = 1; // Set the generalSettingsId to 1 for now because we only have one general settings record
                response = await agent.GeneralSettings.update(generalSettingsId, data);
            } else {
                response = await agent.GeneralSettings.create(data);
            }
            toast.success('General Settings Changes Saved Successfully!');
            setIsLoading(false); // Set isLoading to false after form submission
        } catch (error) {
            console.log(error);
            toast.error('Could not save changes! Please try again later or contact your Super Admin.');
            setIsLoading(false); // Set isLoading to false if an error occurs during form submission
        }
    }

    return (
        <Card>
            <CardHeader title="General Settings" />
            <CardContent>
                <form onSubmit={handleSubmit(handleSubmitData)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}> 
                            <AppTextInput control={control} name='companyName' label="Company Name" /> 
                        </Grid>
                        <Grid item xs={12} sm={6}> 
                            <AppTextInput control={control} name='appName' label="App Name" /> 
                        </Grid>
                        <Grid item xs={12} sm={6}> 
                            <AppTextInput control={control} name='defaultCurrency' label="Default Currency" />
                        </Grid>
                        <Grid item xs={12} sm={6}> 
                            <AppTextInput control={control} name='defaultLanguage' label="Default Language" />
                        </Grid> 
                        <Grid item xs={12} sm={6}>
                            <Box display='flex' justifyContent='space-between' alignItems='center'>
                                <AppDropzone control={control} name='file' />
                                
                                {watchFile ? (
                                    <img src={watchFile.preview} alt='preview' style={{ maxHeight: 200, paddingLeft:25 }} />
                                ) : ( 
                                    <img src={generalSettings?.logoURL} alt={generalSettings?.companyName} style={{ maxHeight: 200, paddingLeft:25 }} />
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                                {isLoading ? <CircularProgress size={24} /> : 'Save'} {/* Show loading spinner when isLoading is true */}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default GeneralSettingsForm;
