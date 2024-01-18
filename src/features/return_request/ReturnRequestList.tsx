import React from 'react';

interface ReturnRequest {
  id: number;
  orderId: string;
  itemId: string;
  status: 'pending' | 'approved' | 'rejected';
  // ... other properties
}

interface ReturnRequestListProps {
  requests: ReturnRequest[];
}

const ReturnRequestList: React.FC<ReturnRequestListProps> = ({ requests }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Request ID</th>
          <th>Order ID</th>
          <th>Item ID</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request.id}>
            <td>{request.id}</td>
            <td>{request.orderId}</td>
            <td>{request.itemId}</td>
            <td>{request.status}</td>
            <td>
              {/* Buttons for viewing details, tracking return, etc. */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReturnRequestList;