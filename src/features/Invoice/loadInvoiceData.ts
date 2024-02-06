import agent from "../../app/api/agent";
import { Invoice } from "../../models/invoice/invoice";
let invoice: Invoice; 

async function loadInvoiceData(invoiceId: number): Promise<Invoice> {
    try {
        const data = await agent.Invoices.details(invoiceId);
        invoice = data;
        return invoice;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default { loadInvoiceData };