import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { UserContext } from '../context/UserContext';
import Ads from '../components/Ads';
import CreatePostSection from './CreatePostSection';
import PostSection from './PostSection';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Profile = () => {
    const imageUrl = 'https://via.placeholder.com/150'; // Replace this with the actual image URL or default picture
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true); // Loading state
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate(); // Added to handle navigation

    useEffect(() => {
        // Fetch user data and posts on component mount
        const fetchData = async () => {
            await getUser();
            getPosts();
        };
        fetchData();
    }, []);

    const getPosts = () => {
        axios.get('http://localhost:8000/api/posts')
            .then((response) => {
                console.log("Posts= ", response.data.posts);
                setPosts(response.data.posts); // Assuming the API returns { posts: [] }
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    };

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/check-auth', { withCredentials: true });
            setUser(response.data.user);
        } catch (error) {
            console.error('Error checking authentication', error);
            navigate('/403'); // Redirect to login if not authenticated
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Render loading state or user profile
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <>
            <Navbar />
            <div style={styles.container}>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={styles.profileSection}>
                        <img 
                            src={imageUrl} 
                            alt="Profile" 
                            style={styles.image} 
                        />
                        <h6>{user.firstName} {user.lastName}</h6>
                        <Link to={`/register/${user._id}`} style={styles.link}>
                            Update your profile
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={8} style={styles.postContainer}>
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
                    </Grid>
                    <Grid item xs={12} md={4} style={styles.adsContainer}>
                        <Ads />
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

const styles = {
    container: {
        marginTop: '7rem',
        marginLeft: '2rem',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
    profileSection: {
        textAlign: 'center',
    },
    image: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        marginBottom: '1rem',
    },
    link: {
        marginTop: '1rem',
        textDecoration: 'none',
        color: '#fe520a',
        fontSize: '1rem',
    },
    postContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    adsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default Profile;
