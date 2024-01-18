import React, { useState, useEffect } from 'react';

interface Order {
    id: number;
    date: string;
    total: number;
    status: string;
}

const OrderHistory: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        // Fetch order data from your backend
        fetch('/api/orders')
            .then((response) => response.json())
            .then((data: Order[]) => setOrders(data));
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>


                    <th>Date</th>


                    <th>Total</th>


                    <th>Status</th>


                    <th>Actions</th>


                </tr>


            </thead>


            <tbody>
                {orders.map((order) => (
                    <tr

                        key={order.id}>


                        <td>{order.id}</td>


                        <td>{order.date}</td>
                        <td>{order.total}</td>
                        <td>{order.status}</td>
                        <td>
                            <button>View Details</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default OrderHistory;