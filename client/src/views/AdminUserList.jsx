import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Avatar, Box, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'; 
import AdminUserEdit from '../components/AdminUserEdit';
import AdminNavbar from '../components/AdminNavbar';
import '../css/AdminUserList.css';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate() ; 

    const socketUrl = 'http://51.20.56.131:8000'; // Update this to your public IP or domain
const [socket, setSocket] = useState(() => io(socketUrl, { transports: ['websocket'] }));
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
    const onDeactive= (userId) => {
        axios.patch(`http://localhost:8000/api/users/deactive/${userId}`,{withCredentials:true})
        .then(response => {
            //console.log("Deactive ",response.data.user) ; 
            if (response.data.user) {
                socket.emit("activeUser",{userId,status:'deactive'}) ; 
                setUsers(users.map(user => {
                    if(user._id === userId){
                        return { ...user, status: "deactive" };
                    }
                    return user ; 
                }));
            } else {
                console.error('Error deleting user:', response.data);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    //on active click 
    const onActive= (userId) => {
        axios.patch(`http://localhost:8000/api/users/active/${userId}`,{withCredentials:true})
        .then(response => {
            //console.log("Active ",response.data.user) ; 
            if (response.data.user) {
                setUsers(users.map(user => {
                    if(user._id === userId){
                        return { ...user, status: "active" };
                    }
                    return user ; 
                }));
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
            <div> <AdminUserEdit onDeactive={onDeactive} onActive={onActive} users={users}  />
            </div>
        </div>
    )
}
export default AdminUserList;