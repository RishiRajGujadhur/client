import { Box, Typography, Button, Grid, TableRow, TableCell, Paper, Table, TableBody, TableContainer } from "@mui/material";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";
import { Order } from "../../models/order";
import { BasketItem } from "../../models/basket";

interface Props {
    order: Order;
    setSelectedOrder: (id: number) => void;
}

export default function OrderDetailed({ order, setSelectedOrder }: Props) {
    const subtotal = order.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} gutterBottom variant='h4'>Order# {order.id} - {order.orderStatus}</Typography>

                <Button onClick={() => setSelectedOrder(0)} sx={{ m: 2 }} size='large' variant='contained'>Back to orders</Button>
            </Box>
            <BasketTable items={order.orderItems as BasketItem[]} isBasket={false} />
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary subtotal={subtotal} /> 
                    <Table component={Paper} variant={'outlined'}>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2">Shipping Address: </Typography >
                                <Typography variant="body2">{order.shippingAddress?.address1} {order.shippingAddress?.address2}</Typography>
                                <Typography variant="body2">{order.shippingAddress?.zip} | {order.shippingAddress?.state}</Typography>
                                <Typography variant="body2">{order.shippingAddress?.city} | {order.shippingAddress?.country}</Typography>
                            </TableCell>
                        </TableRow>
                    </Table>
                </Grid>
            </Grid>
        </>
    )
}