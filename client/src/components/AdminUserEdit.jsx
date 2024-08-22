import React, { useState, useContext } from 'react';
import { Box, Avatar, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

// const initialUsers = [
//     { id: 1, firstName: 'Mustafa', lastName: 'Taha', imageUrl: 'path/to/taha.jpg' },
//     { id: 2, firstName: 'Jane', lastName: 'Smith', imageUrl: 'path/to/jane.jpg' },
//     { id: 3, firstName: 'Alice', lastName: 'Johnson', imageUrl: 'path/to/alice.jpg' },
//     { id: 4, firstName: 'Rand', lastName: 'Farhoud', imageUrl: 'path/to/rand.jpg' },
//     { id: 5, firstName: 'Randa', lastName: 'Tawasha', imageUrl: 'path/to/randa.jpg' },
//     { id: 6, firstName: 'Muath', lastName: 'Ademar', imageUrl: 'path/to/muath.jpg' },
// ];

const AdminUserEdit = ({onDelete, users}) => {
    const { user } = useContext(UserContext);

    
    const handleDelete = (userId) => {
      onDelete(userId)
    };

    return (
        <TableContainer component={Paper}>
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
                        <TableRow key={user.id}>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    <Avatar src={user.imageUrl} alt={user.firstName} sx={{ marginRight: 2 }} />
                                    <Box>
                                        {user.firstName} {user.lastName}
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleDelete(user._id)} color="error">
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
    );
};

export default AdminUserEdit;


// import React, { useState, useContext } from 'react';
// import { Card, CardContent, Typography, Avatar, CardActions, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import { Link } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';
// import axios from 'axios';

// const initialUsers = [
//     { id: 1, firstName: 'Mustafa', lastName: 'Taha', imageUrl: 'path/to/taha.jpg' },
//     { id: 2, firstName: 'Jane', lastName: 'Smith', imageUrl: 'path/to/jane.jpg' },
//     { id: 3, firstName: 'Alice', lastName: 'Johnson', imageUrl: 'path/to/alice.jpg' },
//     { id: 4, firstName: 'Rand', lastName: 'Farhoud', imageUrl: 'path/to/rand.jpg' },
//     { id: 5, firstName: 'Randa', lastName: 'Tawasha', imageUrl: 'path/to/randa.jpg' },
//     { id: 6, firstName: 'Muath', lastName: 'Ademar', imageUrl: 'path/to/muath.jpg' },
// ];

// const AdminUserEdit = () => {
//     const { user } = useContext(UserContext);
//     const [users, setUsers] = useState(initialUsers);

//     const handleDelete = (userId) => {
//         axios.delete(`/profile/${userId}`)
//             .then(response => {
//                 if (response.data.user) {
//                     setUsers(users.filter(user => user.id !== userId));
//                 } else {
//                     console.error('Error deleting user:', response.data);
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     };

//     return (
//         <TableContainer component={Paper}>
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>User Name</TableCell>
//                         <TableCell>Delete</TableCell>
//                         <TableCell>Edit Profile</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {users.map((user) => (
//                         <TableRow key={user.id}>
//                             <TableCell>
//                                 <Avatar src={user.imageUrl} alt={user.firstName} />
//                                 {user.firstName} {user.lastName}
//                             </TableCell>
//                             <TableCell>
//                                 <IconButton onClick={() => handleDelete(user.id)} color="error">
//                                     <PersonRemoveIcon />
//                                 </IconButton>
//                             </TableCell>
//                             <TableCell>
//                                 <Link to={`/profile/${user.id}`}>Edit</Link>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// };
// export default AdminUserEdit;


// import React, { useState, useContext } from 'react';
// import { Card, CardContent, Typography, Avatar, CardActions, IconButton } from '@mui/material';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import { Link } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';
// import axios from 'axios';

// const initialUsers = [
//     { id: 1, firstName: 'Mustafa', lastName: 'Taha', imageUrl: 'path/to/taha.jpg' },
//     { id: 2, firstName: 'Jane', lastName: 'Smith', imageUrl: 'path/to/jane.jpg' },
//     { id: 3, firstName: 'Alice', lastName: 'Johnson', imageUrl: 'path/to/alice.jpg' },
//     { id: 4, firstName: 'Rand', lastName: 'Farhoud', imageUrl: 'path/to/rand.jpg' },
//     { id: 5, firstName: 'Randa', lastName: 'Tawasha', imageUrl: 'path/to/randa.jpg' },
//     { id: 6, firstName: 'Muath', lastName: 'Ademar', imageUrl: 'path/to/muath.jpg' },
// ];

// const AdminUserEdit = () => {
//     const { user } = useContext(UserContext);
//     const [users, setUsers] = useState(initialUsers);

//     const handleDelete = (userId) => {
//         axios.delete(`/profile/${userId}`)
//             // .then(response => response.json())
//             .then(data => {
//                 if (data.user) {
//                     // updateing userlist after deleting this user 
//                     setUsers(users.filter(user => user.id !== userId));
//                 } else {
//                     console.error('Error deleting user:', data);
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     };

//     return (
//         <table>
//             <thead>
//                 <tr>
//                     <th>User Name</th>
//                     <th>Delete</th>
//                     <th>Edit Profile</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {users.map((user) => (
//                     <tr key={user.id}>
//                         <td>
//                             <Avatar src={user.imageUrl} alt={user.firstName} />
//                             {user.firstName} {user.lastName}
//                         </td>
//                         <td>
//                             <IconButton onClick={() => handleDelete(user.id)} color="error">
//                                 <PersonRemoveIcon />
//                             </IconButton>
//                         </td>
//                         <td>
//                             <Link to={`/profile/${user.id}`}>Edit </Link>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

// export default AdminUserEdit;