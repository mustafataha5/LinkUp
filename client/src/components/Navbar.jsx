import React, { useState, useContext } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import MoreIcon from '@mui/icons-material/More';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import logo from '../images/logo.png';
import SearchBar from './SearchBar';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '70%',   // randa was here
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%', // Ensures the input takes full width in larger screens
      // width: '60ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  // Get the user (we will get the id from the cookies then find the user)

  const LogOut = () => {
    axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  const profile = () => {
    navigate(`/profile/${user._id}`);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const peopleClick = () => {
    navigate("/people");
  };

  const homeClick = () => {
    navigate("/success");
  };

  const mailClick = () => {
    navigate("/message");
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={profile}>Profile</MenuItem>
      <MenuItem onClick={LogOut}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <PeopleIcon />
          </Badge>
        </IconButton>
        <p>Followers</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
        <AppBar sx={{ backgroundColor: "#555" }} position="static">
        <Toolbar sx={{ paddingLeft: -2, paddingRight: -2, justifyContent: 'space-around' }}>
            {/* Adjust marginLeft to control the distance from the edge */}
            <img src={logo} style={{ width: "250px", height: "64px", marginLeft: '0px' }} /> 
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <SearchBar />
            </Box>

            {/* <Box sx={{ flexGrow: 1 }} /> // comment out */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }} >
            <Box sx={{ display: 'flex', gap: 4 }}>    {/* randa added */}
              <IconButton
                size="large"
                aria-label="home"
                color="inherit"
                // added ml: 2
                sx={{ mr: 2, ml: 2 }} 
                onClick={homeClick}
              >
              <HomeIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new mails"
                color="inherit"
                onClick={mailClick}
              >
                <Badge badgeContent={17} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show new notifications"
                color="inherit"
                onClick={peopleClick}
              >
                <Badge badgeContent="+" color="error">
                  <PeopleIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>  </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </Box>
  );
}