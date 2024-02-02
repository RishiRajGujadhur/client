import { useFormContext } from 'react-hook-form';
import AppTextInput from '../../app/components/AppTextInput';
import { Typography, Grid, TextField } from '@mui/material';
 
 

interface Props { 
  onCardInputChange: (event: any) => void;
}

export default function PaymentForm({onCardInputChange}: Props) {
  const {control} = useFormContext();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AppTextInput 
            name='nameOnCard'
            label='Name on card'
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="outlined"
            InputLabelProps={{shrink: true}}
            InputProps={{
              inputProps: {
               
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="outlined"
            InputLabelProps={{shrink: true}}
            InputProps={{
              
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            id="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="outlined"
            InputLabelProps={{shrink: true}}
          />
        </Grid>
      </Grid>
    </>
  );
}