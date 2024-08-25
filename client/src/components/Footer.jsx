import React from 'react';
import '../css/Footer.css' // Import the CSS file
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="footer" style={{position:'absolute' ,bottom: 0 , backgroundColor:'#555', color:'white'}}>
            <div className="footer-links" style={{ color:'white'}} >
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/services">Services</Link>
                <Link to="/contact">Contact</Link>
            </div>
            <p>&copy; 2024 LinkUp. All rights reserved.</p>
        </div>
    );
}

export default Footer;
