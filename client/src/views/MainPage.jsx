import { AppBar, Box, Container, Grid, Skeleton, useMediaQuery } from '@mui/material';
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
import AdminNavbar from "../components/AdminNavbar";
import io from 'socket.io-client';


const MainPage = () => {
  const [loading, setLoading] = useState(true);      // Loading state
  const [posts, setPosts] = useState([]);            // State to save posts
  const { user, setUser } = useContext(UserContext); // Logged-in user 
  const [users, setUsers] = useState([]);            // Follower list 
  const [suggested, setSuggested] = useState([]);    // Suggested list 
  const navigate = useNavigate();
  const resposive = useMediaQuery('(max-width: 600px)')
  const resposive1= useMediaQuery('(max-width: 900px)')
  const [socket, setSocket] = useState(() => io('http://localhost:8000')); 


  // Get the user (we will get the id from the cookies then find the user)
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/check-auth', { withCredentials: true });
      setUser(response.data.user);

      // Use Promise.allSettled to handle both successful and failed requests
      await Promise.allSettled([
        getPosts(),
        getFollowed(response.data.user._id),
        getSuggested(response.data.user._id),
      ]);
    } catch (error) {
      console.error('Error checking authentication', error);
      navigate('/403'); // Redirect to login if not authenticated
    } finally {
      setLoading(false); // Ensure loading is false even if requests fail
    }
  };

  useEffect(() => {
    const handleStatus = (data) => {
      console.log(data);
      if (user._id === data) {
        LogOut();
      }
    };
  
    socket.on('status', handleStatus);
  
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      // Optionally, you can attempt to reconnect or show a message to the user
    });
  
    // Cleanup on component unmount
    return () => {
      socket.off('status', handleStatus); // Remove the status event listener
      socket.disconnect(); // Disconnect the socket connection
    };
  }, [socket]);
  // Send get request to the server to get all posts from DB
  const getPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/posts');
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Send get request to the server to get following list
  const getFollowed = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/follows/followed/${id}`);
      setUsers(response.data.followings);
    } catch (error) {
      console.error('Error fetching followed users:', error);
    }
  };

  // Send get request to the server to get suggested list
  const getSuggested = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/follows/notfollowed/${id}`);
      setSuggested(response.data.notFollowedUsers);
    } catch (error) {
      console.error('Error fetching suggested users:', error);
    }
  };

  const LogOut = () => {
    axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        navigate('/');
      })
      .catch(err => console.log(err));
  };
  // Render skeleton while loading, show the data once loading is complete
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
      {
          user.role === 'user' ? 
        <Navbar />
        :
        <AdminNavbar />
        }
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <Container>
          <Grid container spacing={5}>
          <Grid item xs={3} sx={{ marginLeft: '-30px', marginTop: 6, marginRight: 3 }}>
    {!resposive && (

<Box sx={{ position: 'fixed' }}>
  <UserList
    initialUsers={users}
    index={0}
    sx={{
      position: 'sticky',
      top: '90px', // Adjust this value to control the distance from the top
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    }}
  />
</Box>
    )}      
</Grid>
            <Grid item xs={6}>
              {/* Only render the CreatePostSection and PostSection if user data is available */}
              {user && (
                <>
                  <CreatePostSection user={user} getPosts={getPosts} />
                  <Box>
                    <PostSection user={user} posts={posts} setPosts={setPosts} />
                  </Box>
                </>
              )}
            </Grid>
            {!resposive1 && (

              <Grid item xs={3} container direction="column" spacing={2} sx={{ marginRight: -10 }}>
              <Box sx={{ position: 'fixed' }}>
                <Grid item sx={{ marginTop: 6, position: 'sticky', top: '90px' }}>
                  <Ads />
                </Grid>
                <Grid item sx={{ marginTop: 2, position: 'sticky', top: '500px' }}>
                  <UserList initialUsers={suggested} index={2} sx={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)' }} />
                  </Grid>
              </Box>
                  </Grid>
                )}
                  </Grid>
                </Container>
      </Box>
    </div>
  );
};

export default MainPage;
