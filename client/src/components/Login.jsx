
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Paper,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  FormHelperText,
  Typography
} from  '@mui/material'


const styles = {
  paper: {
      width: "20rem", padding: "1rem"
  },
  input: {
      marginBottom: "1rem"
  },
  button: {
    width: "100%",
    marginBottom: "1rem" ,// Add margin bottom to space buttons
    backgroundColor:"#fe520a"
  },
  button1: {
    width: "100%",
    backgroundColor: "#9b1fe9", // Replace with your desired color
    
  }
};
const wrapperStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
   // optional, adds a background color
};




const Login = ({ onSubmitProp, errors={} }) => {
  

    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])
    const navigate = useNavigate()

    const handleRegister = () =>{
      navigate('/register')
  }

    const handleSubmit = (e) => {
      e.preventDefault();
      const payload = {
        email,
        password,
      };
      onSubmitProp(payload);
    };
  return (
    <div style={wrapperStyles}>
    <Paper elevation={9} style={styles.paper}>
    <Typography
      variant="h1"
      sx={{ textAlign: 'center', fontSize : 50 }}
    >
      Login
    </Typography>
              <form onSubmit={handleSubmit}>
                <FormControl variant="outlined"  fullWidth style={styles.input}>
                <InputLabel >E-mail</InputLabel>
                <OutlinedInput type="email" 
                        id="email" 
                        name="email" 
                        value={email}
                        label='Email'
                        onChange={e => setEmail(e.target.value)}  
                        required 
                    />
    {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
                </FormControl>
                <FormControl variant="outlined"  fullWidth style={styles.input}>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput type="password"
                        id="password" 
                        name="password" 
                        label='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                        required 
                    />
    {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
                </FormControl>
                <Button
                type="submit"
                variant="contained"
                color="primary"
                style={styles.button}
              >
                Login
              </Button>
              <Button
                onClick={handleRegister}
                variant="contained"
                color="primary"
                style={styles.button1}
              >
                Register
              </Button>
              
            </form>
            
    </Paper>
    </div>
  )
}

export default Login
