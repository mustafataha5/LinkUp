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
  const [followers, setFollowers] = useState(initialUsers);
  const [following, setFollowing] = useState(new Set());

  const [users, setUsers] = useState(initialUsers);

  const handleFollowToggle = (id) => {
    setFollowing((prevFollowing) => {
      const newFollowing = new Set(prevFollowing);
      if (newFollowing.has(id)) {
        newFollowing.delete(id);
      } else {
        newFollowing.add(id);
      }
      return newFollowing;
    });
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
    <div>
      <div style={{ padding: 20, marginTop: 40, width: '19rem', border: '1px solid black' }}>
        {users.map((user, i) => (
          <div
            key={i}
            onClick={() => handleUserClick(user._id)}
            style={{ cursor: index === 4 ? 'pointer' : 'default' }} // Make the card clickable when index is 4
          >
            <Card style={{ marginBottom: 16, width: '250px', borderBottom: 'none' }}>
              <CardContent className="flexMe" style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={user.imageUrl} alt={user.name} style={{ marginRight: 10 }} />
                <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <CardActions style={{ padding: 0 }}>
                  {index === 0 && (
                    <IconButton
                      onClick={() => whenclick(user.relationId, user._id)}
                      size="large"
                      aria-label="follow"
                      color="inherit"
                    >
                      <PersonRemoveIcon />
                    </IconButton>
                  )}
                  {index === 1 && (
                    <IconButton
                      onClick={() => whenclick(user.relationId, user._id)}
                      size="large"
                      aria-label="follow"
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
          </div>
        ))}
      </div>
      <div style={{ width: '2px', backgroundColor: 'black', height: '100%', marginLeft: 20 }}></div>
    </div>
  );
};

export default UserList;
