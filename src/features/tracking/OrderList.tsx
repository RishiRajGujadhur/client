import React, { useState, useEffect } from 'react';
import OrderItem from './OrderItem';
import { Order } from '../../models/order';

interface OrderListProps {}

const OrderList: React.FC<OrderListProps> = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Fetch order data from your backend API
    // Replace with your actual data fetching logic
    fetch('/api/orders')
      .then(response => response.json())
      .then((data: Order[]) => setOrders(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="order-list">
      <h2>Your Orders</h2>
      <ul>
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
};

export default OrderList;