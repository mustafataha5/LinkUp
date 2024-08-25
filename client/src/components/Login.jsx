import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  FormHelperText,
  Typography
} from '@mui/material';
import '../css/Login.css'; // Ensure this imports the updated CSS

const styles = {
  paper: {
    width: "100%", // Use 100% to fill the container
    height: "100%", // Use 100% to match the container's height
    padding: "0", // Remove padding since the form padding is handled in the CSS
    position: "relative",
  },
  input: {
    marginBottom: "1rem"
  },
  button: {
    width: "100%",
    margin: "1rem 0 ",
    backgroundColor: "#fe8228"
  },
  button1: {
    width: "100%",
    backgroundColor: "#524C42",
  }
};

const wrapperStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  position: "relative",
};

const Login = ({ onSubmitProp, errors = {} }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

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
      <div className="animated-frame">
        <form onSubmit={handleSubmit}>
          <Typography variant="h1" sx={{ textAlign: 'center', fontSize: 50, marginBottom: "1rem", color: 'black' }}>
            Login
          </Typography>
          <FormControl variant="outlined" fullWidth style={styles.input} error={!!errors.email}>
            <InputLabel>E-mail</InputLabel>
            <OutlinedInput
              type="email"
              id="email"
              name="email"
              value={email}
              label='E-mail'
              onChange={e => setEmail(e.target.value)}
              required
            />
            {errors.email && <FormHelperText style={{ color: 'red', fontSize: '14px' }}>{errors.email}</FormHelperText>}
          </FormControl>

          <FormControl variant="outlined" fullWidth style={styles.input} error={!!errors.password}>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              type="password"
              id="password"
              name="password"
              label='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {errors.password && <FormHelperText style={{ color: 'red', fontSize: '14px' }}>{errors.password}</FormHelperText>}
          </FormControl>

          <Button type="submit" variant="contained" color="primary" style={styles.button}>
            Login
          </Button>
          <Button onClick={handleRegister} variant="contained" color="primary" style={styles.button1}>
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
