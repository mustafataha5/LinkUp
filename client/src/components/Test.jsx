import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Test = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [loading, setLoading] = useState(true);
    const { setUser, user } = useContext(UserContext); 
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
            .then(response => {
                console.log(response.data);
                setIsLoggedIn(response.data.authenticated);
                setUser(response.data.user);
            })
            .catch(error => {
                console.error('Error checking authentication', error);
                navigate('/403');
                setIsLoggedIn(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [navigate, setUser]);

    useEffect(() => {
        if (!loading) {
            if (isLoggedIn) {
                if (user && user.role === 'user') {
                    navigate('/success');  // Navigate to Home page if logged in
                } else if (user && user.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/403');  // Navigate to 403 page if role is unknown
                }
            } else {
                navigate('/403');      // Navigate to 403 page if not logged in
            }
        }
    }, [isLoggedIn, loading, navigate, user]);

    if (loading) {
        return <div>Loading...</div>;
    }
    return <div>Logging in...</div>;       // Nothing to render since navigation will happen    
};

export default Test;
