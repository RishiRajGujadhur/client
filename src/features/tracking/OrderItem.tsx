import React, { useState } from 'react';
import { Order } from '../../models/order';
import TrackOrder from './TrackOrder';

interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
    const [isTrackingOpen, setIsTrackingOpen] = useState(false);

    const handleTrackOrder = () => {
      setIsTrackingOpen(true);
    };

  return (
    <li className="order-item">
      <h3>Order #{order.id}</h3>
      {/* <p>Date: {order.date}</p>
      <p>Status: {order.status}</p> */}
      <p>Total: ${order.total}</p>
      <button onClick={() => handleTrackOrder}>Track Order</button>
      {isTrackingOpen && (
        <TrackOrder orderId={order.id} onClose={() => setIsTrackingOpen(false)} />
      )}
    </li>
  );
};

export default OrderItem;