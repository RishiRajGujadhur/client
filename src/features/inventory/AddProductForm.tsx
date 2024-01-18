import React, { useState } from 'react';
import { Product } from '../../models/product';

interface AddProductFormProps {
  onSubmit: (productData: Product) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantityInStock, setQuantity] = useState(0);
  // ... other product fields

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onSubmit({
        name, description, price, quantityInStock,
        id: 0,
        pictureUrl: '',
        brand: '',
        discountPercentage: 0
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Fields for product details */}
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;