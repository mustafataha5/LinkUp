import React, { useContext } from 'react'
import Navbar from '../components/Navbar';
import Register from '../components/Register';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Profile = () => {

    const imageUrl = 'https://via.placeholder.com/150'; // Replace this with the actual image URL or default picture
    const {user} = useContext(UserContext)
    return (
        <>
            <Navbar />
            
            <div style={styles.container}>
                <img 
                    src={imageUrl} 
                    alt="Profile" 
                    style={styles.image} 
                />
                <h6>{user.firstName} {user.lastName}</h6>
                <Link to={`/register/${user._id}`} style={styles.link}>
                    Update your profile
                </Link>
            </div>
        </>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '2rem',
        marginRight: '2rem',
    },
    image: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
    },
    link: {
        marginTop: '1rem',
        textDecoration: 'none',
        color: '#fe520a', // Optional: Customize link color
        fontSize: '1rem',
    },
};


export default Profile
