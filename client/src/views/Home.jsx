import React from 'react'
import Footer from '../components/Footer'
import '../css/Home.css' // Import the CSS file
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate()
    const handleRegister = () =>{
        navigate('/register')
    }
    const handleLogIn = () =>{
      navigate('/login')
  }
  return (
    <div>
    <div className='homeFeatures'>
      <h1 className='header'>LinkUp</h1>
      <div className="m-5">
      <button onClick={handleLogIn } className='mx-4 btn  btn-dark border border-2 border-dark btn-lg'>Login</button>
      <button onClick={handleRegister} className='mx-4 btn  btn-dark border border-2 border-dark btn-lg'>Register</button>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Home
