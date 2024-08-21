import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Test = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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