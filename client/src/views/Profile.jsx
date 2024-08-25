import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { UserContext } from '../context/UserContext';
import Ads from '../components/Ads';
import CreatePostSection from './CreatePostSection';
import PostSection from './PostSection';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserList from '../components/UserList';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Skeleton } from '@mui/material';
import AdminNavbar from '../components/AdminNavbar'; 

const Profile = () => {
    const { id } = useParams();
    const { user, setUser } = useContext(UserContext);
    const [urlUser, setUrlUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [suggested, setSuggested] = useState([]);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [imageUrl, setNewImageUrl] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const getAuth = async () => {
        await axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
            .then(response => {
                setUser(response.data.user);
            })
            .catch(error => {
                console.error('Error checking authentication', error);
                navigate('/403');
            });
    };

    useEffect(() => {
        if (!user) {
            getAuth();
        }
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        axios.patch(
            'http://localhost:8000/api/users/' + user._id,
            { imageUrl },
            { withCredentials: true }
        )
        .then((res) => {
            setNewImageUrl("");
            setOpen(false);
            navigate('/test');
        })
        .catch((err) => {
            const errorsObject = err.response?.data?.errors || {};
            const errorMessages = {};
            for (let key of Object.keys(errorsObject)) {
                errorMessages[key] = errorsObject[key].message;
            }
            setErrors(errorMessages);
        });
    };

    const sendMessage = async () => {
        try {
            const payload = {
                sender: user._id,
                reciver: urlUser._id, 
                content: "Hello there"
            };
            const response = await axios.post('http://localhost:8000/api/messages/send', payload, { withCredentials: true });
            navigate("/message");
        } catch (error) {
            console.error("Error sending message:", error.response?.data || error.message);
        }
    };

    const handleImageClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            await getUser();
            getPosts();
        };
        fetchData();
    }, [id]);

    const getPosts = () => {
        axios.get('http://localhost:8000/api/posts/user/'+id, { withCredentials: true })
            .then((response) => {
                setPosts(response.data.posts.length > 0 ? response.data.posts : []);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    };

    const getUser = async () => {
        await axios.get('http://localhost:8000/api/users/'+id, { withCredentials: true })
            .then((response) => {
                getfollowed(response.data.user._id);
                setUrlUser(response.data.user);
                getSuggested(response.data.user._id);
            })
            .catch((error) => {
                console.error('Error checking authentication', error);
                navigate('/403');
            });
    };

    const getfollowed = (id) => {
        axios.get('http://localhost:8000/api/follows/followed/'+id)
            .then((response) => {
                setUsers(response.data.followings);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    };

    const getSuggested = (id) => {
        axios.get('http://localhost:8000/api/follows/notfollowed/'+id)
            .then((response) => {
                setSuggested(response.data.notFollowedUsers);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    };

    const edit = () => {
        navigate(`/register/${urlUser._id}`);
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                    <Container>
                        <Grid container spacing={5}>
                            <Grid item xs={3}>
                                <Skeleton variant="rectangular" width="100%" height={300} />
                                <Skeleton variant="text" width="60%" />
                                <Skeleton variant="text" width="40%" />
                            </Grid>
                            <Grid item xs={6}>
                                <Skeleton variant="text" width="80%" />
                                <Skeleton variant="rectangular" width="100%" height={400} />
                            </Grid>
                            <Grid item xs={3}>
                                <Skeleton variant="rectangular" width="100%" height={300} />
                                <Skeleton variant="text" width="60%" />
                                <Skeleton variant="text" width="40%" />
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </>
        );
    }

    if (!urlUser) {
        return <div>User not found</div>;
    }

    return (
        <>
            <ToastContainer />
            {user.role === 'user' ? <Navbar /> : <AdminNavbar />}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                <Container>
                    <Grid container spacing={5}>
                        <Grid item xs={3} sx={{ marginLeft: '-30px', marginTop: 6, marginRight: 3 }}>
                            <Box sx={{ position: 'fixed', left: "80px", width: "20%" }}>
                                <Box sx={{ marginBottom: 3, textAlign: 'center', boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)', padding: 3 }}>
                                    <img
                                        src={urlUser.imageUrl}
                                        alt="Profile"
                                        style={{ width: '90%', borderRadius: '100%', height: "200px", marginBottom: 14 }}
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
                                                backgroundColor: '#fe520a',
                                                color: '#fff',
                                            },
                                        }}
                                    >
                                        Edit your profile
                                    </Button>}
                                    {user._id !== urlUser._id &&
                                        <Button variant='outlined'
                                            onClick={sendMessage}
                                            sx={{
                                                borderColor: '#fe520a',
                                                color: '#fe520a',
                                                '&:hover': {
                                                    borderColor: '#fe520a',
                                                    backgroundColor: '#fe520a',
                                                    color: '#fff',
                                                },
                                            }}
                                        >Message</Button>
                                    }
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            {urlUser && (
                                <>
                                    <CreatePostSection user={urlUser} getPosts={getPosts} />
                                    <Box>
                                        <PostSection user={urlUser} posts={posts} setPosts={setPosts} />
                                    </Box>
                                </>
                            )}
                        </Grid>
                        <Box sx={{ position: 'fixed', right: '65px', top: "80px" }}>
                            <Grid item sx={{ marginTop: 6, position: 'sticky', top: '90px' }}>
                                <Ads />
                            </Grid>
                        </Box>
                    </Grid>
                </Container>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="xs"
                sx={{ '& .MuiDialog-paper': { padding: 3 } }}
            >
                <DialogTitle>Change your profile image</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="imageUrl"
                        label="Image URL"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={imageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Profile;
