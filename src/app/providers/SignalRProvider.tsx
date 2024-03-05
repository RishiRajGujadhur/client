import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { ReactNode, useEffect, useState } from 'react'
import { User } from '../../models/user';
import { toast } from 'react-toastify';

type Props = {
    children: ReactNode
    user: User | null
}

export default function SignalRProvider({ children }: Props) {
    const [connection, setConnection] = useState<HubConnection | null>(null);
 
    const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://api.store.store/notifications'
        : process.env.NEXT_PUBLIC_NOTIFY_URL

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(apiUrl!)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, [apiUrl]);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Connected to notification hub');

                    connection.on('NotificationCreated', (notification: Notification) => {
                        return  toast.error(notification.title);
                    });

                }).catch(error => console.log(error));
        }

        return () => {
            connection?.stop();
        }
    }, [connection])

    return (
        children
    )
}
