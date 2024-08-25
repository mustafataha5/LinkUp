import React, { useState } from 'react';
import { CardContent, Typography, Avatar, IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import BlockIcon from '@mui/icons-material/Block';
import { Link } from 'react-router-dom';

const UserList = ({
  index = 0,
  owner = {},
  reciver = {},
  initialUsers = [
    { _id: 1, firstName: 'John', lastName: 'Doe', imageUrl: 'path/to/john.jpg' },
    { _id: 2, firstName: 'Jane', lastName: 'Smith', imageUrl: 'path/to/jane.jpg' },
    { _id: 3, firstName: 'Alice', lastName: 'Johnson', imageUrl: 'path/to/alice.jpg' },
    { _id: 4, firstName: 'Rand', lastName: 'Farhoud', imageUrl: 'path/to/rand.jpg' },
    { _id: 5, firstName: 'Randa', lastName: 'Tawasha', imageUrl: 'path/to/randa.jpg' },
    { _id: 6, firstName: 'Muath', lastName: 'Ademar', imageUrl: 'path/to/muath.jpg' },
  ],
  onClickTab = () => { },
  onCardClick = () => { }
}) => {
  const [users, setUsers] = useState(initialUsers);

  const whenclick = (relationId, id) => {
    setUsers(users.filter(user => user._id !== id));
    if (index === 0 || index === 1) {
      onClickTab(relationId);
    } else if (index === 2) {
      onClickTab(id);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto', padding: '10px' }}>
      {/* <Typography
        variant="h6"
        sx={{ borderBottom: 2, fontSize: 20, mb: 2, textAlign: "center" }}
      >
        {index === 0 ? 'Following' : index === 1 ? 'Followers' : index === 2 ? 'Suggestions' : 'Users'}
      </Typography> */}

      {users.map((user) => (
        <div
          key={user._id}
          style={{
            marginBottom: 16,
            cursor: index === 4 ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            backgroundColor: user._id === reciver._id ? '#555555' : (index === 4 ? '#f0f0f0' : 'transparent'),
            color: user._id === reciver._id ? 'white' : 'black',
            transition: 'background-color 0.3s ease-in-out',
          }}
          onMouseEnter={(e) => {
            if (index === 4){
              e.currentTarget.style.backgroundColor = '#e0e0e0';
              e.currentTarget.style.color = 'black';
            }
          }}
          onMouseLeave={(e) => {
            if (index === 4 && user._id !== reciver._id) {
              e.currentTarget.style.color = 'black';
              e.currentTarget.style.backgroundColor = '#f0f0f0';}
            else if (index === 4 && user._id === reciver._id){
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.backgroundColor = '#555555';
            } 
          }}
          onClick={() => onCardClick(user._id)}
        >
          <Avatar src={user.imageUrl} alt={user.firstName} style={{ marginRight: 10 }} />
          <Typography variant="body1" component="div" style={{ flexGrow: 1, fontWeight: 'bold', textDecoration: 'none' }}>
            <Link to={`profile/${user._id}`}>{user.firstName} {user.lastName}</Link>
          </Typography>
          <div>
            {index === 0 && (
              <IconButton
                onClick={() => whenclick(user.relationId, user._id)}
                size="large"
                aria-label="remove follower"
                color="inherit"
              >
                <PersonRemoveIcon />
              </IconButton>
            )}
            {index === 1 && (
              <IconButton
                onClick={() => whenclick(user.relationId, user._id)}
                size="large"
                aria-label="block user"
                color="inherit"
              >
                <BlockIcon />
              </IconButton>
            )}
            {index === 2 && (
              <IconButton
                onClick={() => whenclick('', user._id)}
                size="large"
                aria-label="follow"
                color="inherit"
              >
                <PersonAddIcon />
              </IconButton>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
