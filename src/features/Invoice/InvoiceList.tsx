import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Card, Grid, Typography } from '@mui/material';
import { InvoiceListData } from '../../models/invoice/invoiceListData';
import agent from '../../app/api/agent';
import moment from 'moment';

function InvoiceList() {
    const columns: GridColDef[] = [
        { field: 'number', headerName: 'Invoice Number', width: 200, renderCell: (params) => <Link to={`/invoice/${params.value}`}>{params.value}</Link> },
        { field: 'paymentDueDate', headerName: 'Due Date', width: 150, valueFormatter: (params) => moment(params.value).format('YYYY-MM-DD') },
        { field: 'issueDate', headerName: 'Issue Date', width: 200, valueFormatter: (params) => moment(params.value).format('YYYY-MM-DD') },
        { field: 'logo', headerName: 'Sender', width: 200, renderCell: (params) => <img src={params.value} alt="Logo" style={{ width: '50px', height: '50px' }} /> },
        { field: 'view', headerName: 'Action', width: 100, renderCell: (params) => <Link to={`/invoice/${params.row.number}`}>View</Link> },
    ];
    const pageSize = 10, pageNumber = 1;
    const [invoiceListData, setInvoiceListData] = useState<InvoiceListData[]>([]);

    useEffect(() => {
        agent.Invoices.getMyInvoiceList(pageSize, pageNumber).then(response => {
            setInvoiceListData(response);
        });
    }, []);

    return (
        <Grid>
            <Typography variant="h4" style={{ paddingBottom: '16px' }}>My Invoices</Typography>
            <Card>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={invoiceListData}
                        columns={columns}
                        slots={{ toolbar: GridToolbar }}
                        pagination
                    // paginationModel={'server'}
                    />
                </div>
            </Card>
        </Grid>
    );
};

export default InvoiceList;