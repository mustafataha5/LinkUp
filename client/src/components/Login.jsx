import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])
    const navigate = useNavigate()
    const handleSubmit = e =>{
      e.preventDefault();
      axios.post('http://localhost:8000/api/register', {

          email,
          password,
      })
      .then(res => {
          console.log(res);
          setEmail("");
          setPassword("");
          navigate("/success")
          
      })
      .catch(err => console.log(err));
  };
  return (
    <div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}  
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn">Submit</button>
            </form>
    </div>
  )
}

export default Login
