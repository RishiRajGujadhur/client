import React from 'react';
import './ReceiptPage.css';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, Divider, TableContainer } from '@mui/material';
import { Receipt } from '../../models/receipt/receipt';

interface ReceiptProps {
    receipt: Receipt;
}
function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
}

function subtotal(items: Receipt) {
    return items.products.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

// Todo: get currency from settings
const currency = 'Rs';
const TAX_RATE = 0.15;

const ReceiptPage: React.FC<ReceiptProps> = ({ receipt }) => {
    const { sender, client, information, products, translate } = receipt;
    const ReceiptSubtotal = subtotal(receipt);
    const ReceiptTaxes = TAX_RATE * ReceiptSubtotal;
    const ReceiptTotal = ReceiptTaxes + ReceiptSubtotal;
    return (
        <Paper elevation={12} className="receipt-page">
            <div className="header">
                <div>
                    <img src={receipt.images.logo} alt="Logo" className="logo" />
                </div>
                <div>
                    <Typography variant="h5">Receipt</Typography>
                </div>
            </div>
            <div className="sender-info">
                <Typography variant='subtitle2'>{sender.company}</Typography>
                <Typography variant='body2'>{sender.address}</Typography>
                <Typography variant='body2'>{sender.zip}</Typography>
                <Typography variant='body2'>{sender.city}</Typography>
                <Typography variant='body2'>{sender.country}</Typography>
            </div>
            <Divider sx={{ borderBottomWidth: 5 }} />
            <div className="client-info">
                <div>
                    <Typography variant='subtitle2'>Sold To</Typography>
                    <Typography variant='subtitle2'>{client.company}</Typography>
                    <Typography variant='body2'>{client.address}</Typography>
                    <Typography variant='body2'>{client.zip}</Typography>
                    <Typography variant='body2'>{client.city}</Typography>
                    <Typography variant='body2'>{client.country}</Typography>
                </div>
                <div className="Receipt-info">
                    <Typography variant='caption'>Receipt# <strong>{information.number}</strong></Typography>
                    <Typography variant='body2'><strong>Transaction Date:</strong> {information.date}</Typography> 
                </div>
            </div>

            <TableContainer >
                <Table aria-label="spanning table" size="small" >

                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={3}> 
                            </TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell align="right">Qty.</TableCell>
                            <TableCell align="right">Unit</TableCell>
                            <TableCell align="right">Sum</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell>{product.description}</TableCell>
                                <TableCell align="right">{product.quantity}</TableCell>
                                <TableCell align="right">{currency} {product.price}</TableCell>
                                <TableCell align="right">{currency} {ccyFormat(product.price)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell rowSpan={3} colSpan={2} />
                            <TableCell colSpan={1}> <Typography variant="subtitle2">Subtotal</Typography>   </TableCell>
                            <TableCell align="right">{currency} {ccyFormat(ReceiptSubtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography variant="subtitle2">Tax ({`${(TAX_RATE * 100).toFixed(0)} %`})</Typography></TableCell>

                            <TableCell align="right">{currency} {ccyFormat(ReceiptTaxes)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={1}><Typography variant="subtitle2">Total amount paid</Typography></TableCell>
                            <TableCell align="right"><Typography variant="subtitle2">{currency} {ccyFormat(ReceiptTotal)}</Typography></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider sx={{ borderBottomWidth: 5 }} />

            <div className="bottom-notice">
                <Typography variant="subtitle2">Thanks for shopping with us. </Typography> 
            </div>
        </Paper>
    );
};

export default ReceiptPage;
