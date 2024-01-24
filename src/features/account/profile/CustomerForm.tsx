import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CustomerFormData } from '../../../models/customer_form_data';

interface CustomerFormProps {
  onCreateCustomer: (customerData: CustomerFormData) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onCreateCustomer }) => {
  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreateCustomer(formData);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Customer Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="First Name"
              variant="outlined"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Last Name"
              variant="outlined"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Address"
              variant="outlined"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            <TextField
              label="Phone"
              variant="outlined"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <Button type="submit" variant="contained" color="primary">
              Create Customer Profile
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomerForm;
