import { FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Controller, useFormContext } from 'react-hook-form';

export default function PaymentMethodForm() {
    const { control } = useFormContext();
    return (
        <Controller
            rules={{ required: true }}
            control={control}
            name="paymentMethod"
            defaultValue={null}
            render={({ field }) => (
                <FormControl component="fieldset">
                    <RadioGroup aria-label="payment-method" row value={field.value} onChange={field.onChange} >
                        <Grid item xs={12}>
                            <FormControlLabel value="Cash On Delivery" control={<Radio />} label="Cash on delivery" />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel value="Internet Banking" control={<Radio />} label="Internet Banking / Juice Transfer" />
                            <Tooltip title="Pay instantly, get confirmation now, and enjoy your product in 2 business days!
Fast & Easy: Secure your purchase & get it in 48 hours.">
                                <IconButton size="small">
                                    <InfoIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel value="Bank Transfer" control={<Radio />} label="Bank Transfer" />
                        </Grid>
                    </RadioGroup>
                </FormControl>
            )}
        />
    );
};
