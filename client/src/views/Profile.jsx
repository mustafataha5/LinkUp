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
import Container from '@mui/material/Container'; // Assuming you're using Container
import { ToastContainer } from 'react-toastify'; // Ensure you import ToastContainer correctly
import 'react-toastify/dist/ReactToastify.css'; // Add ToastContainer's CSS if not already included
import UserList from '../components/UserList';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import AdminNavbar from '../components/AdminNavbar';
import MessageIcon from '@mui/icons-material/Message';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { PersonRemove } from '@mui/icons-material';



const Profile = () => {
    const { id } = useParams();
    const { user, setUser } = useContext(UserContext); // Logged in user
    const [urlUser, setUrlUser] = useState({});             // user from url
    const [loading, setLoading] = useState(true);
    const [suggested, setSuggested] = useState([])
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([])
    const [imageUrl, setNewImageUrl] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [Followed, setFollowed] = useState('')
    const navigate = useNavigate();




    const getAuth = async () => {
        await axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
            .then(response => {
                console.log(response.data.user._id);
                isFollowed(response.data.user._id,id)
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

    // useEffect(() => {
    //     const checkFollowStatus =  () => {
    //         const following = isFollowed(user, urlUser);
    //         setFollowed(following);
    //     };
    //     checkFollowStatus();
    // }, [user, urlUser]);


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

    const isFollowed = async (userId,urlId) =>{
        
        await axios.get(`http://localhost:8000/api/follows/isfollow/${userId}/${urlId}`, {},{ withCredentials: true })
        .then(res =>{
            console.log(res)
            setFollowed(res.data.followId)

        }).catch(err => console.log(err))
    }

    const sendMessage = async () => {
        try {
            const payload = {
                sender: user._id,
                reciver: urlUser._id,
                content: "Hello there"
            };

            const response = await axios.post('http://localhost:8000/api/messages/send', payload, { withCredentials: true });
            console.log("Message sent successfully:", response.data);
            navigate("/message")
        } catch (error) {
            console.error("Error sending message:", error.response?.data || error.message);
        }
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
        axios.get('http://localhost:8000/api/posts/user/' + id, { withCredentials: true })
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
        await axios.get('http://localhost:8000/api/users/' + id, { withCredentials: true })
            .then((response) => {
                console.log(response.data.user)
                console.log("Before", users, suggested)
                getfollowed(response.data.user._id);
                setUrlUser(response.data.user);
                getSuggested(response.data.user._id)
                console.log("After", users, suggested)
                navigate('/profile/' + response.data.user._id)
            }).catch((error) => {
                console.error('Error checking authentication', error);
                navigate('/403');
            })
    };

    const getfollowed = (id) => {
        console.log(id)
        axios.get('http://localhost:8000/api/follows/followed/' + id)
            .then((response) => {

                setUsers(response.data.followings)
                // setLoading(false); // Stop loading
                //  setPosts(response.data.posts); // Assuming the API returns { posts: [] }
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }
    const getSuggested = (id) => {
        axios.get('http://localhost:8000/api/follows/notfollowed/' + id)
            .then((response) => {
                setSuggested(response.data.notFollowedUsers)
                console.log('Suggested Users:', suggested);

                setLoading(false); // Stop loading
                //  setPosts(response.data.posts); // Assuming the API returns { posts: [] }
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }

    const deleteFollowed =async (followId) => {
        await axios.delete('http://localhost:8000/api/follows/'+followId)
        .then(res =>{
            console.log(res)
            setFollowed('');
        
        } )    
        .catch(err => console.log(err)) ; 
    }

    const addFollowed =async (userId,urlId) => {
        await axios.post('http://localhost:8000/api/follows/',{follower:userId, followed:urlId},{withCredentials:true})
        .then(res =>{
            console.log(res.data.follow)
            setFollowed(res.data.follow._id);
        
        } )    
        .catch(err => console.log(err)) ; 
    }

    const edit = () => {
        navigate(`/register/${urlUser._id}`)
    }

    const GoToFriend = () => {
        navigate('/people')
    }


    if (loading) {
        return <div>
            <Navbar />
            Loading...</div>;
    }

    if (!urlUser) {
        return <div>User not found</div>;
    }



    return (
        <>
            <ToastContainer /> {/* Ensure ToastContainer is imported if needed */}
            {
                user.role === 'user' ?
                    <Navbar />
                    :
                    <AdminNavbar />
            }
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 7 }}>
                <Container>
                    <Grid container spacing={5}>
                        {/* Profile Section (Left) */}

                        <Grid item xs={3} sx={{ marginLeft: '-30px', marginTop: 6, marginRight: 3 }}>
                            <Box sx={{ position: 'fixed', left: "80px", width: "20%" }}>
                                <Box sx={{
                                    marginBottom: 3,
                                    textAlign: 'center',
                                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                                    padding: 3,
                                    borderRadius: '8px',
                                    backgroundColor: '#f9f9f9'
                                }}>
                                    <img
                                        src={urlUser.imageUrl}
                                        alt="Profile"
                                        style={{
                                            width: '100%',
                                            maxWidth: '180px',
                                            borderRadius: '50%',
                                            height: "180px",
                                            marginBottom: '20px',
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                                        }}
                                        onClick={handleImageClick}
                                    />
                                    <h6 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        marginBottom: '10px',
                                        color: '#333'
                                    }}>
                                        {urlUser.firstName} {urlUser.lastName}
                                    </h6>
                                    {user._id === urlUser._id &&
                                        <Button
                                            onClick={edit}
                                            variant='outlined'
                                            sx={{
                                                backgroundColor: '#fe520a', // Bright orange
                                                borderColor: '#fe520a',
                                                color: 'white',
                                                padding: '6px 12px',
                                                fontSize: '14px',
                                                borderRadius: '10px',
                                                textTransform: 'none',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                                width: '60%',
                                                '&:hover': {
                                                    backgroundColor: '#f57c00', // Darker orange
                                                    borderColor: '#f57c00',
                                                },
                                            }}
                                        >
                                            Edit your profile
                                        </Button>
                                    }
                                    <Box sx={{ width:'100%' ,display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                                        {user._id !== urlUser._id &&
                                            <>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2, width: '100%' }}>
    {user._id !== urlUser._id &&
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MessageIcon
                onClick={sendMessage}
                sx={{
                    fontSize: 30,
                    color: '#fe520a',
                    cursor: 'pointer',
                    marginRight: 2
                }}
            />
            {   
               (Followed && Followed.length>0) ? 
                <PersonRemove
                onClick={() => deleteFollowed(Followed)}
                sx={{
                    fontSize: 30,
                    color: '#fe520a',
                    cursor: 'pointer'
                }}
                />
                :
                <PersonAddIcon
                onClick={() => addFollowed(user._id,id)}
                sx={{
                    fontSize: 30,
                    color: '#fe520a',
                    cursor: 'pointer'
                }}
                />
            }
        </Box>
    }
</Box>

                                            </>
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            {urlUser._id === user._id && (
                                <>
                                    <CreatePostSection user={urlUser} getPosts={getPosts} />
                                    <Box

                                    >
                                        <PostSection user={urlUser} posts={posts} setPosts={setPosts} />
                                    </Box>
                                </>
                            )}
                        </Grid>
                        <Box sx={{ position: 'fixed', right: '65px', top: "60px" }}>
                            <Grid item sx={{ marginTop: 5.5, position: 'sticky', top: '90px' }}>
                                <Ads />
                            </Grid>
                            <Box
                                sx={{
                                    marginTop: 1,
                                    padding: 2,
                                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                                    borderRadius: '8px',
                                    backgroundColor: '#fff'
                                }}
                            >
                                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '3px' }}>Friend List</h4>
                                <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
                                    Connect with like-minded people and grow together.
                                </p>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#fe520a', // Bright orange
                                        borderColor: '#fe520a',
                                        color: 'white',
                                        padding: '6px 12px',
                                        fontSize: '14px',
                                        borderRadius: '10px',
                                        textTransform: 'none',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                        width: '60%',
                                        '&:hover': {
                                            backgroundColor: '#f57c00', // Darker orange
                                            borderColor: '#f57c00',
                                        },
                                    }}
                                    onClick={GoToFriend}
                                >
                                    Connect Now !
                                </Button>

                            </Box>
                        </Box>

                    </Grid>
                </Container>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="xs"
                sx={{ width: "100%", textAlign: "center" }}// You can use 'xs', 'sm', 'md', 'lg', 'xl'
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
