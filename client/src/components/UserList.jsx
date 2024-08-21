import React, { useState } from 'react';
import {  Card, CardContent, Typography, Avatar, CardActions, IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';



import '../views/FollowerSidebar';
import PersonAdd from '@mui/icons-material/PersonAdd';
import BlockIcon from '@mui/icons-material/Block';
// Sample data for followers


const UserList = ({
    index = 0 , 
    initialUsers =[
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

  const [users,setUsers] = useState(initialUsers); 
    // console.log(">>>>>>") ;
    // console.log(users) ; 
    // console.log("<<<<<<") ;
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


  const whenclick = (realationId,id) => {
   // console.log(id)
    setUsers(users.filter(user => user._id != id))
    if(index ===0 || index==1 ){
        onClickTab(realationId) ;
    }
    else{
        onClickTab(id) ; 
    }
  }
  
  return (
    <div>
    <div  style={{ padding: 20, marginTop: 40  , width:'19rem' ,border:'1px black soild'}}>

      {users.map((user,i) => (
        <Card key={i} style={{ marginBottom: 16, width: '250px', borderBottom: "none" }} >
        <CardContent className="flexMe" style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={user.imageUrl} alt={user.name} style={{ marginRight: 10 }} />
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {user.firstName} {user.lastName}
          </Typography>
          <CardActions style={{ padding: 0 }}>
            {
                index == 0 && 
                <IconButton onClick={()=>whenclick(user.relationId,user._id)} size="large" aria-label="follow" color="inherit" >
                <PersonRemoveIcon/>
                </IconButton>
            }
            {
                index == 1 && 
                <IconButton onClick={()=>whenclick(user.relationId,user._id)} size="large" aria-label="follow" color="inherit" >
                <BlockIcon />
                </IconButton>
            }
            {
                index == 2 && 
                <IconButton onClick={()=>whenclick("",user._id)} size="large" aria-label="follow" color="inherit" >
                <PersonAdd />
                </IconButton>
            }
           
          </CardActions>
        </CardContent>
      </Card>
    ))}
  </div>
  <div style={{ width: '2px', backgroundColor: 'black', height: '100%', marginLeft: 20 }}></div>
</div>
  );
};

export default UserList;