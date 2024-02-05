import InvoicePage from "../Invoice/InvoicePage"; 
import { data } from "../Invoice/sampleInvoice";
import { receiptData } from "../receipt/sampleReceipt";
import ReceiptPage from "../receipt/ReceiptPage";   
export default function ContactPage() {  
    return (
        <>
             Contact Page  
             <ReceiptPage receipt={receiptData}></ReceiptPage>
             <InvoicePage invoice={data}></InvoicePage> 
        </>
    )
}