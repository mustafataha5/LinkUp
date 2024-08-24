import React from 'react';
import { useNavigate } from 'react-router-dom';
import page404 from '../images/page404.png';  // Ensure you have an image for 404 or reuse an existing image

const Page404 = () => {
    const navigate = useNavigate();

    // Redirect to the home page or root route
    const handleGoHome = () => {
        navigate('/');
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
            <img src={page404} alt="404 Not Found" className="img-fluid mb-4" style={{ maxWidth: '400px' }} />
            <h1 className=" text-dark">Page Not Found</h1>
            <p className="lead text-muted">
                Oops! The page you're looking for doesn't exist.
            </p>
            <button className="btn btn-dark rounded-pill px-4 py-2" onClick={handleGoHome}>
                Go to Home Page
            </button>
        </div>
    );
}

export default Page404;
