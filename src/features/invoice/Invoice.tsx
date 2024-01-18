import React from 'react';
import InvoiceHeader from './InvoiceHeader';
import InvoiceCustomer from './InvoiceCustomer';
import InvoiceItems from './InvoiceItems';
import InvoiceTotals from './InvoiceTotals';

interface InvoiceProps {
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerAddress: string;
  items: {
    id: number;
    name: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  taxes: number;
  total: number;
}

const Invoice: React.FC<InvoiceProps> = ({
  invoiceNumber,
  date,
  customerName,
  customerAddress,
  items,
  subtotal,
  taxes,
  total,
}) => {
  return (
    <div className="invoice">
      <InvoiceHeader invoiceNumber={invoiceNumber} date={date} />
      <InvoiceCustomer customerName={customerName} customerAddress={customerAddress} />
      <InvoiceItems items={items} />
      <InvoiceTotals subtotal={subtotal} taxes={taxes} total={total} />
      <footer className="invoice-footer">
        {/* Additional footer content, such as terms and conditions, contact information, etc. */}
      </footer>
    </div>
  );
};

export default Invoice;