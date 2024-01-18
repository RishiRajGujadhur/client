import React from 'react';

interface InvoiceCustomerProps {
  customerName: string;
  customerAddress: string;
}

const InvoiceCustomer: React.FC<InvoiceCustomerProps> = ({ customerName, customerAddress }) => {
  return (
    <section className="invoice-customer">
      <h2>Bill To:</h2>
      <p>{customerName}</p>
      <p>{customerAddress}</p>
    </section>
  );
};

export default InvoiceCustomer;