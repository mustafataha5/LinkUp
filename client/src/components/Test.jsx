import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Test = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [loading, setLoading] = useState(true);
    //const [userId,setUserId] = useState('') ;
    const { setUser } = useContext(UserContext); 
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
            .then(response => {
                console.log(response.data)
                setIsLoggedIn(response.data.authenticated);
      //          setUserId(response.data.userId) ; 
                console.log("ddddddddllll"+response.data.user._id)
                setUser(response.data.user);
            })
            .catch(error => {
                console.error('Error checking authentication', error);
                navigate('/403')
                setIsLoggedIn(false);

            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!loading) {
            if (isLoggedIn) {
                navigate('/success');  // Navigate to Home page if logged in
            } else {
                navigate('/403');      // Navigate to 403 page if not logged in
            }
        }
    }, [isLoggedIn, loading]);

    if (loading) {
        return <div>Loading...</div>;
    }
    return <div>loging...</div>;       // Nothing to render since navigation will happen    
}

export default Test