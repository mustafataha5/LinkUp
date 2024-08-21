import { AppBar, Box, Container, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PostList from '../components/PostList';
import FollowerSidebar from './FollowerSidebar';
import FollowerList from './FollowerList';
import axios from 'axios';
import PostForm from '../components/PostForm';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom

const MainPage = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate(); // For navigation
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
      .then(response => {
        console.log(response.data);
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Error checking authentication', error);
        navigate('/login'); // Redirect to login if not authenticated
      });
  }, [navigate]);

  const handlePostSubmit = (post) => {
    axios.post('http://localhost:8000/api/posts', post)

      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err.response.data.errors)
        const errorResponse = err.response.data.errors;
        setErrors(errorResponse);
      })
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <FollowerList />
            </Grid>
            <Grid item xs={8}>
              <PostForm
                errors={errors}
                name={user.firstName + " " + user.lastName}
                userImage="https://example.com/user-image.jpg"
                onPostSubmit={handlePostSubmit}
                userId = {user._id}
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
