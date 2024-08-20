import React, { useState } from 'react';
import {  Card, CardContent, Typography, Avatar, CardActions, IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';



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
    <div>
    <div className='border-end   border-secondary border-1' style={{ padding: 20, marginTop: 40  , width:'19rem' ,border:'1px black soild'}}>

            <Typography
            variant="h1"
            sx={{ borderBottom: 2 , fontSize : 26, mb: 5, marginLeft: 1, textAlign: "center" }}
            >
      Following
    </Typography>
      {followers.map((follower) => (
        <Card key={follower.id} style={{ marginBottom: 16, width: '250px', borderBottom: "none" }} >
        <CardContent className="flexMe" style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={follower.profilePic} alt={follower.name} style={{ marginRight: 10 }} />
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {follower.firstName} {follower.lastName}
          </Typography>
          <CardActions style={{ padding: 0 }}>
            <IconButton size="large" aria-label="follow" color="inherit" >
            <PersonRemoveIcon/>
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    ))}
  </div>
  <div style={{ width: '2px', backgroundColor: 'black', height: '100%', marginLeft: 20 }}></div>
</div>
  );
};

export default FollowerList;
