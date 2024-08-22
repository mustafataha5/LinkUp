import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Avatar, Box, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'; // Import the icon

const AdminUserList = () => {
    const [users, setUsers] = useState([]);

    // Handle delete request for a user from admin 
    const onDelete = (userId) => {
        axios.delete(`http://localhost:8000/api/users/${userId}`)
        .then(response => {
            if (response.data.user) {
                setUsers(users.filter(user => user._id !== userId));
            } else {
                console.error('Error deleting user:', response.data);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Get all users to display them in a table in admin page
    useEffect(() => {
        getUsers();
    }, []);
    
    const getUsers = () => {
        axios.get(`http://localhost:8000/api/users`)
        .then(response => {
            console.log(response.data)
            setUsers(response.data.users);   
        })
    }

    return (
        <div>
            <TableContainer component={Paper}> {/* Fix TableContainer component */}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User Name</TableCell>
                            <TableCell>Delete</TableCell>
                            <TableCell>Edit Profile</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar src={user.imageUrl} alt={user.firstName} sx={{ marginRight: 2 }} />
                                        <Box>
                                            {user.firstName} {user.lastName}
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => onDelete(user._id)} color="error">
                                        <PersonRemoveIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/profile/${user._id}`}>Edit</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <AdminUserEdit onDelete={onDelete} /> */}
        </div>
    )
}

export default AdminUserList;
