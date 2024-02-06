import { Paper, Skeleton, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import './InvoicePage.css';

export default function InvoiceDetailsSkeleton() {   
    return (
        <>
              <Paper elevation={12} className="invoice-page">
                {/* Skeleton for header */}
                <div className="header">
                    <div>
                        <Skeleton variant="rectangular" width={100} height={40} animation="wave" />
                    </div>
                    <div>
                        <Skeleton variant="text" width={100} height={40} animation="wave" />
                    </div>
                </div>
                {/* Skeleton for sender info */}
                <div className="sender-info" style={{ textAlign: "right" }}>
                    <Skeleton variant="text" width={200} height={20} animation="wave" />
                    <Skeleton variant="text" width={200} height={20} animation="wave" />
                    <Skeleton variant="text" width={200} height={20} animation="wave" />
                    <Skeleton variant="text" width={200} height={20} animation="wave" />
                    <Skeleton variant="text" width={200} height={20} animation="wave" />
                </div>
                <Divider sx={{ borderBottomWidth: 5 }} />
                {/* Skeleton for customer info */}
                <div className="customer-info">
                    <div>
                        <Skeleton variant="text" width={200} height={20} animation="wave" />
                        <Skeleton variant="text" width={200} height={20} animation="wave" />
                        <Skeleton variant="text" width={200} height={20} animation="wave" />
                        <Skeleton variant="text" width={200} height={20} animation="wave" />
                        <Skeleton variant="text" width={200} height={20} animation="wave" />
                    </div>
                    <div className="invoice-info">
                        <Skeleton variant="text" width={200} height={20} animation="wave" />
                        <Skeleton variant="text" width={200} height={20} animation="wave" />
                        <Skeleton variant="text" width={200} height={20} animation="wave" />
                    </div>
                </div>
                {/* Skeleton for table */}
                <TableContainer>
                    <Table aria-label="spanning table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={3}></TableCell>
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
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <Skeleton variant="text" width={200} height={20} animation="wave" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <Skeleton variant="text" width={200} height={20} animation="wave" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <Skeleton variant="text" width={200} height={20} animation="wave" />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Divider sx={{ borderBottomWidth: 5 }} />
                {/* Skeleton for bottom notice */}
                <div className="bottom-notice">
                    <Skeleton variant="text" width={200} height={20} animation="wave" />
                    <Skeleton variant="text" width={200} height={20} animation="wave" />
                </div>
            </Paper>
          
        </>
    )
}