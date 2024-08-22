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
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const Profile = () => {
    const { id } = useParams();
    const { user, setUser } = useContext(UserContext); // Logged in user
    const [urlUser, setUrlUser ] = useState({});             // user from url
    const [loading, setLoading] = useState(true);
    const [suggested, setSuggested] = useState([])
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([])
    const [imageUrl, setNewImageUrl] = useState('');
    const [open, setOpen] = useState(false); 
    const navigate = useNavigate();




    const getAuth = async () => {
        await  axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
           .then(response => {
             console.log(response.data);
             setUser(response.data.user);
           })
           .catch(error => {
     
             console.error('Error checking authentication', error);
             navigate('/403');
           })
       }
     useEffect(() => {
     
         if (!user) {
             getAuth()
         }
     
       }, []); 
     

    const handleSave = (e) => {
        e.preventDefault();
        axios
            .patch(
                'http://localhost:8000/api/users/' + user._id,
                {
                    imageUrl
                },
                { withCredentials: true }
            )
            .then((res) => {
                console.log('successful Update');
                console.log(res);
                // Reset form fields after successful submission
                setNewImageUrl("");
                setOpen(false);
                navigate('/test');
            })
            .catch((err) => {
                console.log('Error response:', err.response);
                console.log('Error data:', err.response?.data);
                
                const errorsObject = err.response?.data?.errors || {};
                console.log('Errors object:', errorsObject);
                const errorMessages = {};
                for (let key of Object.keys(errorsObject)) {
                    errorMessages[key] = errorsObject[key].message;
                }
                setErrors(errorMessages);
            });
    };



    const handleImageClick = () => {
        setOpen(true); // Open the dialog when the image is clicked
    };

    const handleClose = () => {
        setOpen(false); // Close the dialog
    };

    useEffect(() => {
        const fetchData = async () => {
            await getUser();
            getPosts();
            // getfollowed(id);
            // getSuggested(id)
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
            await axios.get('http://localhost:8000/api/users/'+id, { withCredentials: true })
            .then((response) => { 
            console.log(response.data.user)
            console.log("Before", users, suggested)
            getfollowed(response.data.user._id);
            setUrlUser(response.data.user);
            getSuggested(response.data.user._id)
            console.log("After", users, suggested)
            navigate('/profile/'+response.data.user._id)
        }) .catch ((error) => {
            console.error('Error checking authentication', error);
            navigate('/403');
        })
    };
    
    const getfollowed = (id) => {
        console.log(id)
         axios.get('http://localhost:8000/api/follows/followed/'+id)
          .then((response) => {
            
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
          setSuggested(response.data.notFollowedUsers)
          console.log('Suggested Users:', suggested);
    
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
                                    style={{ width: '100%', borderRadius: '100%', height:"200px", marginBottom: 14 }} 
                                    onClick={handleImageClick}
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
                            <UserList initialUsers={users} index={0} sx={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)' }}/>
                            </Box>
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
                                <UserList initialUsers={suggested} index={2} sx={{ boxShadow: '40 10px 40px solid black' }}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Dialog
    open={open}
    onClose={handleClose}
    maxWidth="xs" 
    sx={{width: "100%", textAlign: "center"}}// You can use 'xs', 'sm', 'md', 'lg', 'xl'
    fullWidth // Makes the dialog use the full width within the maxWidth
>
    <DialogTitle>Change Profile Picture</DialogTitle>
    <DialogContent>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <img
                src={user.imageUrl}
                alt="Profile"
                style={{ width: '200px', borderRadius: '100%', marginBottom: 14, height: '200px', cursor: 'pointer', alignContent: "center" }}
                onClick={handleImageClick} // Open the dialog on image click
            />
        </Box>
        <TextField
            autoFocus
            margin="dense"
            label="Image URL"
            type="url"
            fullWidth
            variant="standard"
            value={imageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose} color="primary">
            Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
            Save
        </Button>
    </DialogActions>
</Dialog>

        </>
    );
};

export default Profile;
