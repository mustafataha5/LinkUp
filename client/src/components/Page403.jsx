import React from 'react';
import { useNavigate } from 'react-router-dom';
import page403 from '../images/page403.png';

const Page403 = () => {
    const navigate = useNavigate();

    // Redirect to the login page or root route
    const handleGoLogin = () => {
        navigate('/login');
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
            <img src={page403} alt="403 Forbidden" className="img-fluid mb-4" style={{ maxWidth: '400px' }} />
            <h1 className=" text-dark">Access Denied</h1>
            <p className="lead text-muted">
                Sorry, you don't have permission to access this page.
            </p>
            <button className="btn btn-dark rounded-pill px-4 py-2" onClick={handleGoLogin}>
                Go to Login Page
            </button>
        </div>
    );
}

export default Page403;