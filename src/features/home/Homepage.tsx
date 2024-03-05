import { HubConnectionBuilder } from '@microsoft/signalr'
import { Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';

export default function HomePage() {

    // const connection = new HubConnectionBuilder()
    // .withUrl("http://localhost:5227/notifications")
    // .build();
  
    // connection.on("ReceiveMessage", (message) => {
    //   toast.success(`Received message: ${message}`);
    //   console.log(`Received message: ${message}`);
    // });
  
    // connection.start().then(() => {
    //   toast.success("SignalR connection established.");
    //   console.log("SignalR connection established.");
    // }).catch((error) => {
    //   toast.error("SignalR connection failed: ", error);
    //   console.error("SignalR connection failed: ", error);
    // });
  
    // connection.invoke("SendMessage", "Hello from React!");

    return (
        <>
            
            <Box display='flex' justifyContent='center' sx={{ p: 4 }} >
                <Typography variant='h1'>Welcome to the store</Typography>
            </Box>
        </>
    )
}