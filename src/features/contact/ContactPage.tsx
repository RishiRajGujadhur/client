import InvoicePage from "../Invoice/InvoicePage"; 
import { data } from "../Invoice/sampleInvoice";
import { receiptData } from "../receipt/sampleReceipt";
import ReceiptPage from "../receipt/ReceiptPage";
import InvoiceList from "../Invoice/InvoiceList";
export default function ContactPage() { 
    
    var invoicelistData = [{"id":1, "invoiceNumber": "INV-123", "dueDate": "2022-12-31", "senderLogo": "logo1.png"}];
    return (
        <>
             Contact Page
             <InvoiceList data={invoicelistData} ></InvoiceList>
             <ReceiptPage receipt={receiptData}></ReceiptPage>
             <InvoicePage invoice={data}></InvoicePage>

        </>
    )
}