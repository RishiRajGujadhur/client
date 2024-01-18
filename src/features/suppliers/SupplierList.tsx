import React from 'react';

interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  // ... other properties
}

interface SupplierListProps {
  suppliers: Supplier[];
  onEditSupplier: (supplierId: number) => void;
  onDeleteSupplier: (supplierId: number) => void;
}

const SupplierList: React.FC<SupplierListProps> = ({ suppliers, onEditSupplier, onDeleteSupplier }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Supplier Name</th>
          <th>Contact Person</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {suppliers.map((supplier) => (
          <tr key={supplier.id}>
            <td>{supplier.name}</td>
            <td>{supplier.contactPerson}</td>
            <td>{supplier.email}</td>
            <td>{supplier.phone}</td>
            <td>
              <button onClick={() => onEditSupplier(supplier.id)}>Edit</button>
              <button onClick={() => onDeleteSupplier(supplier.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SupplierList;