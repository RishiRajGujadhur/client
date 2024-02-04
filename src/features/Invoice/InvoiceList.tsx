import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Card, Grid, Typography } from '@mui/material';
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
    const pageSize = 2, pageNumber = 1;
    const [paginationModel, setPaginationModel] = useState({
        pageSize: pageSize,
        page: pageNumber,
    });
    const [page, setPage] = useState(1);
    const paginationHandler = (model: any) => {
        console.log(model);
        paginationModel.page = model.page;
        setPage(model.page + 1);
    };
    const countPerPage = 10;

    function loadServerRows(pageNumber: number): Promise<any> {
        return agent.Invoices.getMyInvoiceList(pageSize, pageNumber) as Promise<any>;
    }

    const [rows, setRows] = useState<GridRowsProp>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [rowSelectionModel, setRowSelectionModel] =
        useState<GridRowSelectionModel>([]); 
        useEffect(() => {
        let active = true;
        (async () => {
            setLoading(true);
            const newRows = await loadServerRows(paginationModel.page);

            if (!active) {
                return;
            }
            setRows(newRows);
            // Inside the useEffect hook
            setRows(newRows.items);
            setTotalCount(newRows.metaData.totalCount);
            //setTotalCount(newRows);
            setLoading(false);
        })();

        return () => {
            active = false;
        };
    }, [paginationModel.page]);


    return (
        <Grid>
            <Typography variant="h4" style={{ paddingBottom: '16px' }}>My Invoices</Typography>
            <Card>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        rowCount={100}
                        columns={columns}
                        
                        slots={{ toolbar: GridToolbar }} 
                        pagination
                        loading={loading}
                        initialState={{
                            pagination: { paginationModel },
                        }}
                        paginationMode="server"
                        pageSizeOptions={[2]}
                        onPaginationModelChange={paginationHandler}
                        onRowSelectionModelChange={(newRowSelectionModel) => {
                            setRowSelectionModel(newRowSelectionModel);
                        }}
                        rowSelectionModel={rowSelectionModel}
                    />
                </div>
            </Card>
        </Grid>
    );
};

export default InvoiceList;