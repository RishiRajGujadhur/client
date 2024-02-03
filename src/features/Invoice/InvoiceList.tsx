import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

interface InvoiceData {
    invoiceNumber: string;
    dueDate: string;
    senderLogo: string;
}

interface InvoiceTableProps {
    data: InvoiceData[ ];
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ data }) => {
    const columns: GridColDef[] = [
        { field: 'invoiceNumber', headerName: 'Invoice Number', width: 200, renderCell: (params) => <Link to={`/invoice/${params.value}`}>{params.value}</Link> },
        { field: 'dueDate', headerName: 'Due Date', width: 150 },
        { field: 'senderLogo', headerName: 'Sender Logo', width: 200 },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                pagination {...data}
            />
        </div>
    );
};

export default InvoiceTable;