import { AppBar, Box, Container, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PostList from '../components/PostList';
import FollowerSidebar from './FollowerSidebar';
import FollowerList from './FollowerList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import CreatePostSection from './CreatePostSection';
import { ToastContainer } from 'react-toastify';


const MainPage = () => {
  // To save the logged in user object 
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Get the user (we will get the id from the cookies then find the user)
  useEffect(() => {
    axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Error checking authentication', error);
        navigate('/login'); // Redirect to login if not authenticated
      });
  }, [navigate]);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <FollowerList />
            </Grid>
            <Grid item xs={8}>
              {/* In create post section we need to pass user to display his/her information (profile image + name)  */}
              <CreatePostSection
                user={user}
              />
              <PostList />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default MainPage;
