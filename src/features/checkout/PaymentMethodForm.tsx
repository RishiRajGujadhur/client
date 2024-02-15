import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface PaymentFormProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

const PaymentMethodForm: React.FC<PaymentFormProps> = ({ paymentMethod, onPaymentMethodChange }) => {
  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onPaymentMethodChange(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="payment-method" name="payment-method" value={paymentMethod} onChange={handlePaymentMethodChange}>
        <FormControlLabel value="credit-card" control={<Radio />} label="Credit Card" />
        <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
        <FormControlLabel value="bank-transfer" control={<Radio />} label="Bank Transfer" />
      </RadioGroup>
    </FormControl>
  );
};

export default PaymentMethodForm;