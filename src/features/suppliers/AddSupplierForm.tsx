import React, { useState } from 'react';
import { Supplier } from '../../models/supplier';

interface AddSupplierFormProps {
  onSubmit: (supplierData: Supplier) => void;
}

const AddSupplierForm: React.FC<AddSupplierFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // ... other supplier fields

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onSubmit({
        name, contactPerson, email, phone,
        id: 0,
        address: {
            street: '',
            city: '',
            state: '',
            zip: '',
            country: ''
        },
        website: '',
        products: []
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Fields for supplier details */}
      <button type="submit">Add Supplier</button>
    </form>
  );
};

export default AddSupplierForm;