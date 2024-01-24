import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CustomerForm from './CustomerForm';
import agent from '../../../app/api/agent';
import { CustomerFormData } from '../../../models/customer_form_data';

const CustomerCreationPage: React.FC = () => {
  const handleCreateCustomer = async (customerData: CustomerFormData) => {
    try {
      // Make the API request to create the customer
      const response = await agent.Customers.create(customerData);

      // Handle the successful response (e.g., show a success message)
      console.log('Customer created successfully:', response.data);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error creating customer:', error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ display: 'flex' }}> 
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Customer Profile
        </Typography>
        <CustomerForm onCreateCustomer={handleCreateCustomer} />
      </div>
    </Container>
  );
};

export default CustomerCreationPage;
