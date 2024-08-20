import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Avatar, CardActions } from '@mui/material';
import { styled } from '@mui/system';
import './FollowerSidebar.css';

// Sample data for followers
const initialFollowers = [
  { id: 1, firstName: 'John', lastName: 'Doe', profilePic: 'path/to/john.jpg' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', profilePic: 'path/to/jane.jpg' },
  { id: 3, firstName: 'Alice', lastName: 'Johnson', profilePic: 'path/to/alice.jpg' },
  { id: 4, firstName: 'Rand', lastName: 'Farhoud', profilePic: 'path/to/rand.jpg' },
  { id: 5, firstName: 'Randa', lastName: 'Tawasha', profilePic: 'path/to/randa.jpg' },
  { id: 6, firstName: 'Muath', lastName: 'Ademar', profilePic: 'path/to/muath.jpg' },
];

const FollowerList = () => {
  const [followers, setFollowers] = useState(initialFollowers);
  const [following, setFollowing] = useState(new Set());

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

  return (
    <div style={{ padding: 20 }}>
      {followers.map((follower) => (
        <Card key={follower.id} style={{ marginBottom: 10 }}>
          <CardContent class="flexMe" >
            <Avatar src={follower.profilePic} alt={follower.name} style={{ marginRight: 10 }} />
            <Typography variant="h6" component="div" style={{ display: 'inline' }}>
                {follower.firstName} {follower.lastName}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color={following.has(follower.id) ? 'secondary' : 'primary'}
              onClick={() => handleFollowToggle(follower.id)}
            >
              {following.has(follower.id) ? 'Unfollow' : 'Follow'}
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default FollowerList;
