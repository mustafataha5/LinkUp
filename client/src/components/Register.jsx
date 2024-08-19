import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  MenuItem,
  Select
} from '@mui/material';

const styles = {
    paper: {
      padding: '2rem',  // Reduced padding
      width: '100%',
      maxWidth: '500px',  // Reduced maxWidth
    },
    input: {
      marginBottom: '0.75rem',  // Reduced margin between input fields
    },
    button: {
      width: '100%',
      marginBottom: '1.00rem'
    },
    button1: {
    width: "100%",
    backgroundColor: "rgb(66 183 42)", // Replace with your desired color

  }

  };
  
  const wrapperStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  };

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');

  const navigate = useNavigate();

  const goHome = () =>{
    navigate('/')
}

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        'http://localhost:8000/api/register',
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          birthday,
          gender,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log('successful reg');
        console.log(res);
        // Reset form fields after successful submission
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirm('');
        setBirthday('');
        setGender('');
        navigate('/test');
      })
      .catch((err) => console.log(err));
  };

  
  return (
    <div style={wrapperStyles}>
      <Paper elevation={3} style={styles.paper}>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth style={styles.input}>
                <InputLabel>First Name</InputLabel>
                <OutlinedInput
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth style={styles.input}>
                <InputLabel>Last Name</InputLabel>
                <OutlinedInput
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth style={styles.input}>
                <InputLabel>E-mail</InputLabel>
                <OutlinedInput
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth style={styles.input}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth style={styles.input}>
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth style={styles.input}>
                <OutlinedInput
                  type="date"
                  id="birthday"
                  name="birthday"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth style={styles.input}>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <MenuItem value="" disabled>
                    Select your gender
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={styles.button}
              >
                Submit
              </Button>
              <Button
                onClick={goHome}
                variant="contained"
                color="primary"
                style={styles.button1}
              >
                Home
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default Register;
