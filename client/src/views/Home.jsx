import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import '../css/Home.css' // Import the CSS file
import logo from '../images/logo.png'
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import Login from '../components/Login';
// import { UserContext } from '../context/UserContext';
const styles = {
  paper: {
      width: "20rem", padding: "1rem"
  },
  input: {
      marginBottom: "1rem"
  },
  button: {
      width: "100%"
  }
}
const wrapperStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
   // optional, adds a background color
};

const Home = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
   
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
          setErrors({...errorResponse}); // Merge errors with previous ones
        });
  };
  
    
    

    
  return (
    <div>
    <div className='homeFeatures'>
      <img src={logo} className='header' height="200" width="450" alt='logo'></img>
      <div className="m-5">
        <Login onSubmitProp ={handleLoginSubmit} errors={errors}/>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Home
