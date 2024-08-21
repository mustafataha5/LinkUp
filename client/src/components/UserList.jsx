import React, { useState } from 'react';
import { Card, CardContent, Typography, Avatar, CardActions, IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import BlockIcon from '@mui/icons-material/Block';

const UserList = ({
    index = 0, 
    initialUsers = [
        { _id: 1, firstName: 'John', lastName: 'Doe', imageUrl: 'path/to/john.jpg' },
        { _id: 2, firstName: 'Jane', lastName: 'Smith', imageUrl: 'path/to/jane.jpg' },
        { _id: 3, firstName: 'Alice', lastName: 'Johnson', imageUrl: 'path/to/alice.jpg' },
        { _id: 4, firstName: 'Rand', lastName: 'Farhoud', imageUrl: 'path/to/rand.jpg' },
        { _id: 5, firstName: 'Randa', lastName: 'Tawasha', imageUrl: 'path/to/randa.jpg' },
        { _id: 6, firstName: 'Muath', lastName: 'Ademar', imageUrl: 'path/to/muath.jpg' },
    ],
    onClickTab 
}) => {
  const [users, setUsers] = useState(initialUsers);

  const handleFollowToggle = (id) => {
    // Implement follow/unfollow logic
  };

  const whenclick = (relationId, id) => {
    setUsers(users.filter(user => user._id !== id));
    if (index === 0 || index === 1) {
      onClickTab(relationId);
    } else {
      onClickTab(id);
    }
  };

  const handleUserClick = (id) => {
    if (index === 4) {
      onClickTab(id); // Trigger an action with the user's ID
    }
  };

  return (
    <Card style={{ width: '100%', maxWidth: '300px', margin: '0 auto', padding: '10px' ,boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ borderBottom: 2, fontSize: 20, mb: 2, textAlign: "center" }}
        >
          {index === 0 ? 'Followers' : index === 1 ? 'Blocked Users' : index === 2 ? 'Following' : 'Users'}
        </Typography>
        {users.map((user) => (
          <Card key={user._id} style={{ marginBottom: 16, borderBottom: 'none'}}>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={user.imageUrl} alt={user.firstName} style={{ marginRight: 10 }} />
              <Typography variant="p" component="div" style={{ flexGrow: 1}}>
                {user.firstName} {user.lastName}
              </Typography>
              <CardActions style={{ padding: 0 }}>
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
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default UserList;
