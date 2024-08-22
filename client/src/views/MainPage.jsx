import { AppBar, Box, Container, Grid } from '@mui/material';
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
  // To save the logged in user object 
  //const [user, setUser] = useState(null); // Use null initially
  const [loading, setLoading] = useState(true); // Loading state
  // State to hold the posts
  const [posts, setPosts] = useState([]);
  const { user,setUser } = useContext(UserContext); 
  const [users,setUsers] = useState([]) ; 
  const [suggested, setSuggested] = useState([])
  const navigate = useNavigate();

  // Get the user (we will get the id from the cookies then find the user)
  useEffect(() => {
    // console.log(">>>>><<<<<"+user);
    // console.log(user)
    //setLoading(false);
    getUser()
  }, []);

  

  const getUser = async () => {
    await axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
      .then( response => {
       // console.log("inside", response.data.user)
        getfollowed(response.data.user._id);
        setUser(response.data.user);
        getSuggested(response.data.user._id)
      })
      .catch(error => {
        console.error('Error checking authentication', error);
        navigate('/403'); // Redirect to login if not authenticated
      })
      // .finally(() => {
      //   setLoading(false); // Stop loading
      // });
  }

  // Fetch the posts when the component is mounted
  useEffect(() => {
    getPosts()
  }, []);

  const getPosts = () => {
    axios.get('http://localhost:8000/api/posts')
      .then((response) => {
        console.log("Posts= ", response.data.posts)
        setPosts(response.data.posts); // Assuming the API returns { posts: [] }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }


  const getfollowed = (id) => {
    axios.get('http://localhost:8000/api/follows/followed/'+id)
      .then((response) => {
        console.log( response.data)
        setUsers( response.data.followings)
       // setLoading(false); // Stop loading
      //  setPosts(response.data.posts); // Assuming the API returns { posts: [] }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }
  const getSuggested = (id) =>{
    axios.get('http://localhost:8000/api/follows/notfollowed/'+id)
    .then ((response) =>{
      console.log(response.data.notFollowedUsers)
      setSuggested(response.data.notFollowedUsers)
      console.log('Suggested Users:', suggested);

      setLoading(false); // Stop loading
      //  setPosts(response.data.posts); // Assuming the API returns { posts: [] }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  } 
  

  if (loading) {
    return <div>Loading...</div>; // Optionally, replace with a spinner or skeleton UI
  }

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <Container>
          <Grid container spacing={5}>
            <Grid item xs={3} sx={{ marginLeft: '-30px', marginTop: 6, marginRight: 3 }}>
              <UserList initialUsers={users} index={0} sx={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)' }}/>
            </Grid>
            <Grid item xs={6} >
              {/* Only render the CreatePostSection and PostSection if user data is available */}
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
                  <PostSection user={user}  posts={posts} setPosts={setPosts} />
                  </Box>
                </>
              )}
            </Grid>
            <Grid item xs={3} container direction="column" spacing={3} sx={{ marginRight: -10 }}>
              <Grid item sx={{marginTop: 6}}>
                <Ads />
              </Grid>
              <Grid item>
                <UserList initialUsers={suggested} index={2} sx={{ boxShadow: '40 10px 40px solid black' }}/>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default MainPage;