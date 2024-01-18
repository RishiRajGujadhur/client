import React, { useState } from 'react';

interface ReturnRequestFormProps {
  onSubmit: (requestData: any) => void; // Assuming request data structure
}

const ReturnRequestForm: React.FC<ReturnRequestFormProps> = ({ onSubmit }) => {
  const [orderId, setOrderId] = useState('');
  const [itemId, setItemId] = useState('');
  const [reason, setReason] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ orderId, itemId, reason, additionalDetails });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="orderId">Order ID:</label>
      <input type="text" id="orderId" value={orderId} onChange={(e) => setOrderId(e.target.value)} required />
      {/* ... similar fields for itemId, reason, additionalDetails */}
      <button type="submit">Submit Return Request</button>
    </form>
  );
};

export default ReturnRequestForm;