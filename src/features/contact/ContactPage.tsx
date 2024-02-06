import { receiptData } from "../receipt/sampleReceipt";
import ReceiptPage from "../receipt/ReceiptPage";     
import RevenueChart from "../admin/RevenueChart/RevenueChart";
import RegressionLineChart from "../admin/RevenueChart/RegressionChart";
import { Divider } from "@mui/material";
import { Padding } from "@mui/icons-material";

export default function ContactPage() {   
 

    return (
        <>
             Contact Page  
             {/* <ReceiptPage receipt={receiptData}></ReceiptPage> */}
                <RegressionLineChart></RegressionLineChart>
                <br/>
           
                <RevenueChart></RevenueChart>
             
        </>
    )
}