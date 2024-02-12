import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import agent from "../../../app/api/agent";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { currencyFormat } from "../../../app/util/util";
import { Order } from "../../../models/order";
import OrderDetailed from "../../orders/OrderDetailed";

export default function ManageOrders() {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);

    function setAsFulfilled(orderId: number) {
        agent.Orders.update(orderId, "Fulfilled")
            .then(() => {
                // Update the order status in the local state
                setOrders(prevOrders => {
                    if (prevOrders) {
                        return prevOrders.map(order => {
                            if (order.id === orderId) {
                                return { ...order, orderStatus: "Fulfilled" };
                            }
                            return order;
                        });
                    }
                    return null;
                });
            })
            .catch(error => console.log(error));
    }
 
    useEffect(() => {
        setLoading(true);
        agent.Orders.listAllOrders()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, []);


    if (loading) return <LoadingComponent message="Loading orders..." />

    if (selectedOrderNumber > 0 && orders) return (
        <OrderDetailed
            order={orders.find(o => o.id === selectedOrderNumber)!}
            setSelectedOrder={setSelectedOrderNumber}
        />
    )

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Order Number</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Order Date</TableCell>
                        <TableCell align="right">Order Status</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order) => (
                        <TableRow
                            key={order.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {order.id}
                            </TableCell>
                            <TableCell align="right">{currencyFormat(order.total)}</TableCell>
                            <TableCell align="right">{order.orderDate.split('T')[0]}</TableCell>
                            <TableCell align="right">{order.orderStatus}</TableCell>
                            <TableCell align="right">
                                <Button onClick={() => setAsFulfilled(order.id)}>
                                    Set as Fulfilled
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}