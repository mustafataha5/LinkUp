import React from 'react'
import Navbar from '../components/Navbar';
import Register from '../components/Register';
import { Link } from 'react-router-dom';
const Profile = () => {

    const imageUrl = 'https://via.placeholder.com/150'; // Replace this with the actual image URL or default picture

    return (
      <>
        <Navbar />
        
        <img 
          src={imageUrl} 
          alt="Profile" 
          style={{ width: '150px', height: '150px', borderRadius: '50%' }} 
        />
        <Link to={'/register'}>Update your profile</Link>
      </>
    );
}

export default Profile
