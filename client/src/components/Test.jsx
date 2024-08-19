import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';

const Test = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
            .then(response => {
                setIsLoggedIn(response.data.authenticated);
            })
            .catch(error => {
                console.error('Error checking authentication', error);
                setIsLoggedIn(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {isLoggedIn ? <h1>You are logged in</h1> : <h1>Please log in</h1>}
        </div>
    );
}

export default Test
