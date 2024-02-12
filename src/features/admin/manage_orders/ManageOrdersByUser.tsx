import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../../app/api/agent";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { currencyFormat } from "../../../app/util/util";
import { Order } from "../../../models/order";
import OrderDetailed from "../../orders/OrderDetailed";
import { useParams } from "react-router-dom";

export default function ManageOrdersByUser() {
    const { id } = useParams<{ id: string }>();
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);

    const setOrderStatus = (orderId: number, orderStatus: string) => {
        agent.Orders.update({
            orderStatus: orderStatus,
            id: orderId
        })
            .then(() => { 
                // Update the order status in the local state
                setOrders(prevOrders => {
                    if (prevOrders) {
                        return prevOrders.map(order => {
                            if (order.id === orderId) {
                                return { ...order, orderStatus: orderStatus };
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
        console.log(parseInt(id!));
        debugger;
        agent.Orders.listOrdersByUser(1)
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
                           
                            <TableCell align="right">
                                <FormControl sx={{ width: 200 }}>
                                    <InputLabel></InputLabel>
                                    <Select
                                        value={order.orderStatus}
                                        onChange={(e) => setOrderStatus(order.id, e.target.value as string)}
                                    >
                                        <MenuItem value="Delivered">Delivered</MenuItem>
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="PaymentFailed">Payment Failed</MenuItem>
                                        <MenuItem value="PaymentReceived">Payment Received</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="right">
                                <Button onClick={() => setSelectedOrderNumber(order.id)}>
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}