import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Avatar, Box, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'; 
import AdminUserEdit from '../components/AdminUserEdit';
import AdminNavbar from '../components/AdminNavbar';
import '../css/AdminUserList.css';
import { useNavigate } from 'react-router-dom';

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate() ; 
    // Get the user (we will get the id from the cookies then find the user)
 useEffect(() => {
   getUser();
 }, []);

 const getUser = async () => {
   try {
     const response = await axios.get('http://localhost:8000/api/check-auth', { withCredentials: true });
       console.log(response.data.user)   
     if(response.data.user.role === 'user'){
           navigate('/401');
          }
          setLoading(false)
     
   } catch (error) {
     console.error('Error checking authentication', error);
     navigate('/403'); // Redirect to login if not authenticated
   } finally {
     setLoading(false); // Ensure loading is false even if requests fail
   }
 };

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
    if(loading){
        return (
            <div>
                <AdminNavbar/>
            </div>

        )
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
