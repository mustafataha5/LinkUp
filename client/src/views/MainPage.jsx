import { AppBar, Box, Container, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PostList from '../components/PostList';
import FollowerList from './FollowerList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreatePostSection from './CreatePostSection';
import { ToastContainer } from 'react-toastify';
import PostSection from './PostSection';

const MainPage = () => {
  // To save the logged in user object 
  const [user, setUser] = useState(null); // Use null initially
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Get the user (we will get the id from the cookies then find the user)
  useEffect(() => {
    getUser()
    console.log(user)
  }, []);

  const getUser = async () => {
     await axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
      .then(response => {
        console.log("inside", response.data.user)
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Error checking authentication', error);
        navigate('/login'); // Redirect to login if not authenticated
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  }

  if (loading) {
    return <div>Loading...</div>; // Optionally, replace with a spinner or skeleton UI
  }

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
              {/* Only render the CreatePostSection and PostSection if user data is available */}
              {user && (
                <>
                  <CreatePostSection user={user} />
                  <PostSection user={user} />
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default MainPage;
