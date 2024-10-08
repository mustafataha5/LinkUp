import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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
import { UserContext } from '../context/UserContext';
import '../css/Register.css'
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
    width: "100%",
    margin: "1rem 0 ",
    backgroundColor: "#fe8228"
  },
  button1: {
    width: "100%",
    backgroundColor: "#524C42",
  },
  // button: {
  //   width: '100%',
  //   marginBottom: '1.00rem',
  //   backgroundColor: "#fe520a"
  // },
  // button1: {
  //   width: "100%",
  //   backgroundColor: "#9b1fe9",
  // },
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
  position: 'relative',
  backgroundColor: '#f0f0f0',
};

const Register = ({ flag = true, intialFirst = "", intialLast = "", initialEmail = "", intialPassword = "", intialConfirm = "", intialBirthday = "",
  intialGender = ""
}) => {
  const { id } = useParams()
  const [firstName, setFirstName] = useState(intialFirst);
  const [lastName, setLastName] = useState(intialLast);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(intialPassword);
  const [confirmPassword, setConfirm] = useState(intialConfirm);
  const [birthday, setBirthday] = useState(intialBirthday ? new Date(intialBirthday).toISOString().split('T')[0] : "");
  const [gender, setGender] = useState(intialGender);
  const [errors, setErrors] = useState({});
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/')
  }
  const profile = () => {
    navigate(`/profile/${user._id}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (flag) {

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
    }
    else {
      axios
        .patch(
          'http://localhost:8000/api/users/' + user._id,
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
          console.log('successful Update');
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
          console.log('Error response:', err.response);
          console.log('Error data:', err.response?.data);

          const errorsObject = err.response?.data?.errors || {};
          console.log('Errors object:', errorsObject);
          const errorMessages = {};
          for (let key of Object.keys(errorsObject)) {
            errorMessages[key] = errorsObject[key].message;
          }
          setErrors(errorMessages);
        });

    }

  };

  const frameClassName = flag ? 'animated-frame-register' : 'animated-frame-update';
  return (

    <div style={wrapperStyles}>
      <div className={frameClassName}>

        <Paper elevation={10} style={styles.paper}>
          <Typography
            variant="h1"
            sx={{ textAlign: 'center', fontSize: 50, mb: 2 }}
          >
            {flag ? 'Register' : 'Update Profile'}
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
                      label='First Name'
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
                      label='Last Name'
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
                      label='Email'
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
              {
                flag && (
                  <>
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
                            label='Password'
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
                            label='ConfirmPassword'
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
                  </>
                )
              }

              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth style={styles.input}>
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
                      label='Gender'
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
                  {flag ? 'Submit' : 'Update'}
                </Button>
                <Button
                  onClick={flag ? goHome : profile}
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
    </div>
  );
};

export default Register;
