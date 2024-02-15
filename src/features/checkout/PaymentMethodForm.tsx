
import { FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
 
export default function PaymentMethodForm() {

    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="payment-method" name="payment-method">
                <Grid item xs={12}>
                    <FormControlLabel value="PayOnDelivery" control={<Radio />} label="Pay on delivery" />
                </Grid>
                <Grid item xs={12}>
               
                    <FormControlLabel value="InternetBanking" control={<Radio />} label="Internet Banking / Juice Transfer" /> 
                    <Tooltip title="Pay instantly, get confirmation now, and enjoy your product in 2 business days!
Fast & Easy: Secure your purchase & get it in 48 hours.">
                        <IconButton size="small">
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                </Grid> 
                <Grid item xs={12}>
                    <FormControlLabel value="bank-transfer" control={<Radio />} label="Bank Transfer" />
                </Grid>
            </RadioGroup>
        </FormControl>
    );
};

 