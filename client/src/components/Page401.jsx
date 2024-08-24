import React from 'react';
import { useNavigate } from 'react-router-dom';
import page401 from '../images/page401.png';  

const Page401 = () => {
    const navigate = useNavigate();

    // Redirect to the login page or root route
    const handleGoLogin = () => {
        navigate('/');
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
            <img src={page401} alt="401 Unauthorized" className="img-fluid mb-4" style={{ maxWidth: '400px' }} />
            <h1 className=" text-dark">Unauthorized</h1>
            <p className="lead text-muted">
                Sorry, you need to log in to access this page.
            </p>
            <button className="btn btn-dark rounded-pill px-4 py-2" onClick={handleGoLogin}>
                Go to Login Page
            </button>
        </div>
    );
}

export default Page401;
