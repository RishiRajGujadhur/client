import { receiptData } from "../receipt/sampleReceipt";
import ReceiptPage from "../receipt/ReceiptPage";     
import RevenueChart from "../admin/revenueChart/RevenueChart";
import RegressionLineChart from "../admin/revenueChart/RegressionChart";
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