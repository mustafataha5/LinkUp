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
  Select,
  Typography,
  Tooltip
} from '@mui/material';

const styles = {
  paper: {
    padding: '2rem',
    width: '100%',
    maxWidth: '500px',
  },
  input: {
    marginBottom: '0.5rem',
  },
  button: {
    width: '100%',
    marginBottom: '1.00rem',
    backgroundColor: "#fe520a"
  },
  button1: {
    width: "100%",
    backgroundColor: "#9b1fe9",
  },
  error: {
    color: 'red',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  tooltip: {
    fontSize: '0.75rem',
    backgroundColor: 'red',
    color: 'white',
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
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const goHome = () => {
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
      .catch((err) => {
        console.log(err.response.data);
        const errorsObject = err.response.data.errors;
        const errorMessages = {};
        for (let key of Object.keys(errorsObject)) {
          errorMessages[key] = errorsObject[key].message;
        }
        setErrors(errorMessages);
      });
  };

  return (
    <div style={wrapperStyles}>
      <Paper elevation={10} style={styles.paper}>
        <Typography
          variant="h1"
          sx={{ textAlign: 'center', fontSize: 50, mb: 2 }}
        >
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth style={styles.input}>
                <InputLabel>First Name</InputLabel>
                <Tooltip
                  title={errors.firstName || ''}
                  open={!!errors.firstName}
                  placement="right"
                  arrow
                  sx={styles.tooltip}
                >
                  <OutlinedInput
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    sx={{
                      height: '50px',
                      '& input': {
                        padding: '10px',
                        backgroundColor: 'white', // Set background color to white
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)', // Set border color
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.87)', // Set border color on hover
                      },
                    }}
                  />
                </Tooltip>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth style={styles.input}>
                <InputLabel>Last Name</InputLabel>
                <Tooltip
                  title={errors.lastName || ''}
                  open={!!errors.lastName}
                  placement="right"
                  arrow
                  sx={styles.tooltip}
                >
                  <OutlinedInput
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    sx={{
                      height: '50px',
                      '& input': {
                        padding: '10px',
                        backgroundColor: 'white',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.87)',
                      },
                    }}
                  />
                </Tooltip>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth style={styles.input}>
                <InputLabel>E-mail</InputLabel>
                <Tooltip
                  title={errors.email || ''}
                  open={!!errors.email}
                  placement="right"
                  arrow
                  sx={styles.tooltip}
                >
                  <OutlinedInput
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{
                      height: '50px',
                      '& input': {
                        padding: '10px',
                        backgroundColor: 'white',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.87)',
                      },
                    }}
                  />
                </Tooltip>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth style={styles.input}>
                <InputLabel>Password</InputLabel>
                <Tooltip
                  title={errors.password || ''}
                  open={!!errors.password}
                  placement="right"
                  arrow
                  sx={styles.tooltip}
                >
                  <OutlinedInput
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{
                      height: '50px',
                      '& input': {
                        padding: '10px',
                        backgroundColor: 'white',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.87)',
                      },
                    }}
                  />
                </Tooltip>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth style={styles.input}>
                <InputLabel>Confirm Password</InputLabel>
                <Tooltip
                  title={errors.confirmPassword || ''}
                  open={!!errors.confirmPassword}
                  placement="right"
                  arrow
                  sx={styles.tooltip}
                >
                  <OutlinedInput
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    sx={{
                      height: '50px',
                      '& input': {
                        padding: '10px',
                        backgroundColor: 'white',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.87)',
                      },
                    }}
                  />
                </Tooltip>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth style={styles.input}>
                <InputLabel>Birthday</InputLabel>
                <Tooltip
                  title={errors.birthday || ''}
                  open={!!errors.birthday}
                  placement="right"
                  arrow
                  sx={styles.tooltip}
                >
                  <OutlinedInput
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                    sx={{
                      height: '50px',
                      '& input': {
                        padding: '10px',
                        backgroundColor: 'white',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.87)',
                      },
                    }}
                  />
                </Tooltip>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth style={styles.input}>
                <InputLabel>Gender</InputLabel>
                <Tooltip
                  title={errors.gender || ''}
                  open={!!errors.gender}
                  placement="right"
                  arrow
                  sx={styles.tooltip}
                >
                  <Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    sx={{
                      height: '50px',
                      '& .MuiSelect-select': {
                        padding: '10px',
                        backgroundColor: 'white',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.87)',
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select your gender
                    </MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </Tooltip>
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
