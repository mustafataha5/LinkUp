import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Avatar, Box, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'; 
import AdminUserEdit from '../components/AdminUserEdit';
import AdminNavbar from '../components/AdminNavbar';
import '../css/AdminUserList.css';

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
            <div className='navbarUSER'> {<AdminNavbar />} </div>
            <div> <AdminUserEdit onDelete={onDelete} users={users}  />
            </div>
        </div>
    )
}
export default AdminUserList;
