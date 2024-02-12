import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import agent from '../../../app/api/agent';
import { NavLink } from 'react-router-dom';

interface User {
    id: number;
    fullName: string;
    email: string;
}

const UserTable = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        agent.Account.fetchAllUsers()
            .then(data => setUsers(data));
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.fullName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Button
                                    component={NavLink} to={`/ManageOrdersByUser/${user.id}`}
                                    size="small"
                                    style={{ textDecoration: 'none' }}
                                >
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;
