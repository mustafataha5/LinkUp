import { AppBar, Box, Container, Grid, Skeleton } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreatePostSection from './CreatePostSection';
import { ToastContainer } from 'react-toastify';
import PostSection from './PostSection';
import UserList from '../components/UserList';
import Ads from '../components/Ads';

const MainPage = () => {
  const [loading, setLoading] = useState(true);      // Loading state
  const [posts, setPosts] = useState([]);            // State to save posts
  const { user, setUser } = useContext(UserContext); // Loged in user 
  const [users, setUsers] = useState([]);            // Follower list 
  const [suggested, setSuggested] = useState([]);    // Suggested list 
  const navigate = useNavigate();

  // Get the user (we will get the id from the cookies then find the user)
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    await axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
      .then(response => {
        getfollowed(response.data.user._id);
        setUser(response.data.user);
        getSuggested(response.data.user._id);
        setLoading(false); // Stop loading after data is fetched
      })
      .catch(error => {
        console.error('Error checking authentication', error);
        navigate('/403'); // Redirect to login if not authenticated
      });
  }

  // Fetch the posts when the component is mounted
  useEffect(() => {
    getPosts();
  }, []);

  // Send get request to the server to get all posts form DB
  const getPosts = () => {
    axios.get('http://localhost:8000/api/posts')
      .then(response => {
        setPosts(response.data.posts);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }

  // Send get request to the server to get following list
  const getfollowed = (id) => {
    axios.get(`http://localhost:8000/api/follows/followed/${id}`)
      .then(response => {
        setUsers(response.data.followings);
      })
      .catch(error => {
        console.error('Error fetching followed users:', error);
      });
  }

  // Send get request to the server to suggested list
  const getSuggested = (id) => {
    axios.get(`http://localhost:8000/api/follows/notfollowed/${id}`)
      .then(response => {
        setSuggested(response.data.notFollowedUsers);
      })
      .catch(error => {
        console.error('Error fetching suggested users:', error);
      });
  }

  // Check if the website finsih loading the data
  // If yes --> show the data 
  // If no --> display skeleton 
  if (loading) {
    return (
      <div>
        <Navbar />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <Container>
            <Grid container spacing={5}>
              <Grid item xs={3} sx={{ marginLeft: '-30px', marginTop: 6, marginRight: 3 }}>
                <Skeleton variant="rectangular" height={400} />
              </Grid>
              <Grid item xs={6}>
                <Skeleton variant="rectangular" height={50} />
                <Skeleton variant="rectangular" height={590} sx={{ marginTop: 2 }} />
              </Grid>
              <Grid item xs={3} sx={{ marginTop: 6 }}>
                <Skeleton variant="rectangular" height={400} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <Container>
          <Grid container spacing={5}>
            <Grid item xs={3} sx={{ marginLeft: '-30px', marginTop: 6, marginRight: 3 }}>
              <UserList initialUsers={users} index={0} sx={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)' }} />
            </Grid>
            <Grid item xs={6}>
              {user && (
                <>
                  <CreatePostSection user={user} getPosts={getPosts} />
                  <Box
                    sx={{
                      maxHeight: '590px',
                      overflowY: 'auto',
                      '&::-webkit-scrollbar': {
                        width: '8px',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: '10px',
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                      },
                    }}
                  >
                    <PostSection user={user} posts={posts} setPosts={setPosts} />
                  </Box>
                </>
              )}
            </Grid>
            <Grid item xs={3} container direction="column" spacing={2} sx={{ marginRight: -10 }}>
              <Grid item sx={{ marginTop: 6 }}>
                <Ads />
              </Grid>
              <Grid item>
                <UserList initialUsers={suggested} index={2} sx={{ boxShadow: '40 10px 40px solid black' }} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default MainPage;