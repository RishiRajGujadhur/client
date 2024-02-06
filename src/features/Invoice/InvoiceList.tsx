import React, { useState, useEffect } from 'react';
import moment from 'moment';
import agent from '../../app/api/agent';
import { InvoiceListData } from '../../models/invoice/invoiceListData';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, CardContent, Card, Typography, Grid, CardActions, Link, CircularProgress, Skeleton } from '@mui/material';
import { NavLink } from 'react-router-dom';

const InvoiceList: React.FC = () => {
    const [invoices, setInvoices] = useState<InvoiceListData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageNumber, setTotalPageNumber] = useState(0);
    const [totalResults, setTotalResults] = useState(0); // Added totalResults state
    const [isLoading, setIsLoading] = useState(false); // Added isLoading state
    const pageSize = 10;
    useEffect(() => {
        // Fetch data from API and update state
        const fetchData = async () => {
            setIsLoading(true); // Set isLoading to true before fetching data
            const newRows = await loadServerRows(currentPage);
            const data = await newRows;
            setInvoices(data.items);
            setTotalPageNumber(Math.ceil(data.metaData.totalCount / pageSize)); // Update calculation of total page number
            setTotalResults(data.metaData.totalCount); // Update totalResults state
            setIsLoading(false); // Set isLoading to false after fetching data
        };

        fetchData();
    }, [currentPage]);


    function loadServerRows(pageNumber: number): Promise<any> {
        return agent.Invoices.getMyInvoiceList(pageSize, pageNumber) as Promise<any>;
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Grid>
            <Typography variant='h4' style={{ marginBottom: '1rem' }}>My invoices</Typography>
            <Card>
                <Table> {/* Add CSS style for default height */}
                    {/* Render table headers */}
                    <TableHead>
                        <TableRow>
                            <TableCell>Issue Date</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Invoice #</TableCell>
                            <TableCell>Sender</TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableHead>
                    {/* Render table rows */}
                    <TableBody>
                        {isLoading ? (
                            // Show skeleton loaders if isLoading is true
                            Array.from({ length: pageSize }, (_, index) => (
                                <TableRow key={index} sx={{ '& > *': { py: 3.5 } }}>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            invoices.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell>{moment(invoice.issueDate).format('MMM-DD-YYYY')}</TableCell>
                                    <TableCell>{moment(invoice.paymentDueDate).format('MMM-DD-YYYY')}</TableCell>
                                    <TableCell>
                                        <Typography variant="body2" component={NavLink} to={`/invoice/${invoice.id}`}>
                                            {invoice.number}{invoice.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <img src={invoice.logo} alt="Sender's Logo" style={{ width: '50px', height: '50px' }} />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            component={NavLink} to={`/invoice/${invoice.id}`} // Use NavLink instead of Link
                                            size="small"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <CardActions>
                    {Array.from({ length: totalPageNumber }, (_, index) => (
                        <Button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            size="small"
                            style={{
                                backgroundColor: currentPage === index + 1 ? '#1976d2' : 'inherit',
                                color: currentPage === index + 1 ? 'white' : 'inherit',
                            }}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </CardActions>
                <CardContent>
                    <Typography variant='body2'>
                        {totalResults} invoices found.
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default InvoiceList;