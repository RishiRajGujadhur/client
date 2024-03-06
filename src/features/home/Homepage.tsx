import { HubConnectionBuilder } from "@microsoft/signalr";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";

export default function HomePage() {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5001/notifications")
      .build(); 

    connection.on("ReceiveMessage", (message) => {
      toast.success(`Received message: ${message}`);
      console.log(`Received message: ${message}`);
    });

    const startConnection = async () => {
      try {
        await connection.start();
        toast.success("SignalR connection established.");
        console.log("SignalR connection established.");
 
      } catch (error) {
        toast.error(`SignalR connection failed: error`);
        console.error("SignalR connection failed: ", error);
      }
    };

    startConnection();

    return (
        <>
            <Box display='flex' justifyContent='center' sx={{ p: 4 }} >
                <Typography variant='h1'>Welcome to the store</Typography>
            </Box>
        </>
    )
}