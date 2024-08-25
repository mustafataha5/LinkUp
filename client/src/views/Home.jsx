import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import '../css/Home.css'
import logo from '../images/logo.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from '../components/Login';

const Home = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const texts = ["Connecting you to possibilities.", "Welcome to Link Up."];
  const [currentText, setCurrentText] = useState(texts[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentText(prev => texts[(texts.indexOf(prev) + 1) % texts.length]);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("Updated errors:", errors);
  }, [errors]);

  const handleLoginSubmit = (payload) => {
    axios
      .post('http://localhost:8000/api/login', payload, { withCredentials: true })
      .then((res) => {
        console.log('Login successful:', res);
        navigate('/test');
      })
      .catch((err) => {
        console.log('Error response:', err.response?.data); // Log the error response
        const errorResponse = err.response?.data || {};
        setErrors({ ...errorResponse }); // Merge errors with previous ones
      });
  };





  return (
    <div className='row'>
      <div className='col-md-6 homeFeatures2'>
        <div className='homeFeatures'>
          <img src={logo} className='header' height="130" width="350" alt='logo'></img>
          <div className='textContainer'>
            <div style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
              {currentText}
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <Login onSubmitProp={handleLoginSubmit} errors={errors} />
      </div>
      <Footer />
    </div>
  )
}

export default Home
