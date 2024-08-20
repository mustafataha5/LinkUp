import { AppBar, Box, Container, Grid } from '@mui/material';
import React from 'react';
import Navbar from '../components/Navbar';
import PostList from '../components/PostList';
import CreatePost from '../components/PostForm';
import FollowerSidebar from './FollowerSidebar';
import FollowerList from './FollowerList';

const MainPage = () => {
  const handlePostSubmit = (post) => {
    // Handle the submitted post here (e.g., send to API, update state)
    console.log('New post:', post);
  };

  return (
    <div>
      <Navbar />
      <Container
        display="flex"
        flexDirection="row"
        justifyContent="center"
        
      >
        <Grid container >

        <Grid item xs={3}   >
          <FollowerList />
        </Grid>
        <Grid item xs={8} >
          <CreatePost
            userImage="https://example.com/user-image.jpg"
            onPostSubmit={handlePostSubmit}
            />
          <PostList />
        </Grid>
      </Grid>
      </Container>
    </div>
  );
};

export default MainPage;
