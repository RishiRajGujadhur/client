import { Invoice } from '../../models/invoice/invoice';
import './InvoicePage.css';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, Divider, TableContainer } from '@mui/material';
import moment from 'moment';
 
 
function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
}

function subtotal(items: Invoice) {
    return items.products.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

// Todo: get currency from settings
const currency = 'Rs';
const TAX_RATE = 0.15;

interface InvoiceDetailsProps {
    invoice: Invoice; 
  }

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ invoice }) => { 
    const { sender, customer, products, bottomNotice } = invoice;
    const invoiceSubtotal = subtotal(invoice);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;
    return (
        <Paper elevation={12} className="invoice-page">
            <div className="header">
                <div>
                    <img src={invoice.logo} alt="Logo" className="logo" />
                </div>
                <div>
                    <Typography variant="h5">INVOICE</Typography>
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
            <div className="customer-info">
                <div>
                    <Typography variant='subtitle2'>Bill To</Typography>
                    <Typography variant='subtitle2'>{customer.name} | {customer.company}</Typography>
                    <Typography variant='body2'>{customer.address}</Typography>
                    <Typography variant='body2'>{customer.zip}</Typography>
                    <Typography variant='body2'>{customer.city}</Typography>
                    <Typography variant='body2'>{customer.country}</Typography>
                </div>
                <div className="invoice-info">
                    <Typography variant='caption'>Invoice# <strong>{invoice.number}</strong></Typography>
                   
                    <Typography variant='body2'><strong>Invoice Date:</strong> {moment(invoice.issueDate).format('MMMM DD, YYYY')}</Typography>
                    <Typography variant='body2'><strong>Due Date:</strong> {moment(invoice.dueDate).format('MMMM DD, YYYY')}</Typography>
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
                            <TableCell align="right">{currency} {ccyFormat(invoiceSubtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography variant="subtitle2">Tax ({`${(TAX_RATE * 100).toFixed(0)} %`})</Typography></TableCell>

                            <TableCell align="right">{currency} {ccyFormat(invoiceTaxes)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={1}><Typography variant="subtitle2">Total</Typography></TableCell>
                            <TableCell align="right"><Typography variant="subtitle2">{currency} {ccyFormat(invoiceTotal)}</Typography></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider sx={{ borderBottomWidth: 5 }} />

            <div className="bottom-notice">
                <Typography variant="subtitle2">Terms and Conditions</Typography>
                <Typography variant="body2">{bottomNotice}</Typography>
            </div>
        </Paper>
    );
};

export default InvoiceDetails; 