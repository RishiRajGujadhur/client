import InvoicePage from "../../app/util/Invoice/InvoicePage"; 
import { data } from "../../app/util/Invoice/sampleInvoice";
export default function ContactPage() { 
    return (
        <>
             Contact Page
             <InvoicePage invoice={data}></InvoicePage>
        </>
    )
}