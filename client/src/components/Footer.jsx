import React from 'react';
import '../css/Footer.css' // Import the CSS file

function Footer() {
    return (
        <div className="footer">
            <div className="footer-links">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
            </div>
            <p>&copy; 2024 LinkUp. All rights reserved.</p>
        </div>
    );
}

export default Footer;
