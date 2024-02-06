import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Invoice } from "../../models/invoice/invoice";
import agent from "../../app/api/agent";
import InvoiceDetails from "./InvoiceDetails";
import InvoiceDetailsSkeleton from "./InvoiceDetailsSkeleton"; // Import the InvoiceDetailsSkeleton component
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

export default function InvoiceDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Add a loading state

    useEffect(() => {
        const fetchInvoiceData = async () => {
            try {
                const data = await agent.Invoices.details(parseInt(id || ""));
                setInvoice(data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error(error);
                setLoading(false); // Set loading to false in case of error
            }
        };
        fetchInvoiceData();
    }, [id]);

    return (
        <>
            <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 2, width: 'fit-content' }}
                component={Link}
                to="/my-invoices"
            >
                View Invoices
            </Button>
            {loading ? ( // Render InvoiceDetailsSkeleton while loading is true
                <InvoiceDetailsSkeleton />
            ) : (
                invoice ? <InvoiceDetails invoice={invoice} /> : null
            )}
        </>
    );
}