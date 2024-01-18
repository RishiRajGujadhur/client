import React from 'react';

interface InvoiceItemsProps {
    items: {
        id: number;
        name: string;
        description: string;
        quantity: number;
        unitPrice: number;
        total: number;
    }[];
}

const InvoiceItems: React.FC<InvoiceItemsProps> = ({ items }) => {
    return (
        <section className="invoice-items">
            <table>
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Item Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>


                    </tr>


                </thead>


                <tbody>
                    {items.map((item) => (
                        <tr

                            key={item.id}>


                            <td>{item.id}</td>


                            <td>{item.name}</td>


                            <td>{item.description}</td>


                            <td>{item.quantity}</td>
                            <td>{item.unitPrice.toFixed(2)}</td>
                            <td>{item.total.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default InvoiceItems;