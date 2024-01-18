import React from 'react';

interface InvoiceHeaderProps {
  invoiceNumber: string;
  date: string;
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ invoiceNumber, date }) => {
  return (
    <header className="invoice-header">
      <h1>Invoice</h1>
      <div className="invoice-details">
        <p>Invoice Number: {invoiceNumber}</p>
        <p>Date: {date}</p>
      </div>
    </header>
  );
};

export default InvoiceHeader;