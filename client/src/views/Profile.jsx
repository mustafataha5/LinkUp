import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { UserContext } from '../context/UserContext';
import Ads from '../components/Ads';
import CreatePostSection from './CreatePostSection';
import PostSection from './PostSection';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'; // Assuming you're using Container
import { ToastContainer } from 'react-toastify'; // Ensure you import ToastContainer correctly
import 'react-toastify/dist/ReactToastify.css'; // Add ToastContainer's CSS if not already included
import UserList from '../components/UserList';
import { Button } from '@mui/material';

const Profile = () => {
    const imageUrl = 'https://via.placeholder.com/150'; // Replace this with the actual image URL or default picture
    const { id } = useParams();
    const { user, setUser } = useContext(UserContext); // Logged in user
    const [urlUser, setUrlUser ] = useState({});             // urlUser from url
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await getUser();
            getPosts();
        };
        fetchData();
    }, [id]);

    const getPosts = () => {
        axios.get('http://localhost:8000/api/posts/user/'+id,{ withCredentials: true })
            .then((response) => {
                if (response.data.posts.length > 0)
                    setPosts(response.data.posts);
                else
                setPosts([]);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    };

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/users/'+id, { withCredentials: true });
            // console.log(response.data.user)
            setUrlUser(response.data.user);
            navigate('/profile/'+response.data.user._id)
        } catch (error) {
            console.error('Error checking authentication', error);
            navigate('/403');
        } finally {
            setLoading(false);
        }
    };
    
    const getfollowed = (id) => {
        axios.get('http://localhost:8000/api/follows/followed/'+id)
          .then((response) => {
            console.log( response.data)
            setUsers( response.data.followings)
            setLoading(false); // Stop loading
          //  setPosts(response.data.posts); // Assuming the API returns { posts: [] }
          })
          .catch((error) => {
            console.error('Error fetching posts:', error);
          });
      }
          const edit = ()=>{
            navigate(`/register/${urlUser._id}`)
          }
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!urlUser) {
        return <div>User not found</div>;
    }

    return (
        <>
            <ToastContainer /> {/* Ensure ToastContainer is imported if needed */}
            <Navbar />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                <Container>
                    <Grid container spacing={5}>
                        {/* Profile Section (Left) */}
                        <Grid item xs={3} sx={{ marginLeft: '-30px', marginTop: 6, marginRight: 3 }}>
                            <Box sx={{ marginBottom: 3, textAlign: 'center', boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)', padding: 3}} > {/* Adds space between profile and UserList */}
                                <img 
                                    src={urlUser.imageUrl} 
                                    alt="Profile" 
                                    style={{ width: '100%', borderRadius: '50%', marginBottom: 14 }} 
                                />
                                <h6>{urlUser.firstName} {urlUser.lastName}</h6>
                            {user._id === urlUser._id && <Button
                                onClick={edit}
                                variant='outlined'
                                sx={{
                                    borderColor: '#fe520a',
                                    color: '#fe520a',
                                    '&:hover': {
                                    borderColor: '#fe520a',
                                    backgroundColor: 'rgba(254, 82, 10, 0.1)', // Optional: Change background color on hover
                                    color: '#fe520a',
                                    },
                                }}
                                >
                                Edit your profile
                            </Button>}
                            </Box>
                            {/* UserList component */}
                            <UserList initialUsers={users} index={0} sx={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)' }}/>
                        </Grid>
                        <Grid item xs={6}>
                            {urlUser && (
                                <>
                                    <CreatePostSection user={urlUser} getPosts={getPosts} />
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
                                        <PostSection user={urlUser} posts={posts} setPosts={setPosts} />
                                    </Box>
                                </>
                            )}
                        </Grid>
                        <Grid item xs={3} container direction="column" spacing={2} sx={{ marginRight: -10 }}>
                            <Grid item sx={{ marginTop: 6 }}>
                                <Ads />
                            </Grid>
                            <Grid item>
                                <UserList initialUsers={users} index={2} sx={{ boxShadow: '40 10px 40px solid black' }}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Profile;
