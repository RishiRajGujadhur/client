import React from 'react';

interface InvoiceTotalsProps {
  subtotal: number;
  taxes: number;
  total: number;
}

const InvoiceTotals: React.FC<InvoiceTotalsProps> = ({ subtotal, taxes, total }) => {
  return (
    <section className="invoice-totals">
      <table>
        <tr>
          <td>Subtotal:</td>
          <td>{subtotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Taxes:</td>
          <td>{taxes.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Total:</td>
          <td>{total.toFixed(2)}</td>
        </tr>
      </table>
    </section>
  );
};

export default InvoiceTotals;