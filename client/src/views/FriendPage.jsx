import * as React from 'react';
import Navbar from '../components/Navbar'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material';
import UserList from '../components/UserList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Ads from '../components/Ads';
import AdminNavbar from '../components/AdminNavbar';
import io from 'socket.io-client';



function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {

    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function BasicTabs() {

    // const { user, setUser } = React.useContext(UserContext);
    const [value, setValue] = React.useState(0);
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const [user, setUser] = React.useState()
    const [socket, setSocket] = React.useState(() => io('http://localhost:8000'));
    const navigate = useNavigate();

    let userId = ''


    React.useEffect(() => {
        axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
            .then(async response => {
                console.log(response.data)
                userId = response.data.user._id ; 
                setUser(response.data.user);
                getFollowed(response.data.user._id)
                //setLoading(false) ;
            })
            .catch(error => {
                // Handle different status codes
                if (error.response.status === 401) {
                    //setError('Unauthorized: Please log in.');
                    navigate('/401'); // Redirect to login
                } else if (error.response.status === 403) {
                    //setError('Access Denied: Your account is deactivated.');
                    navigate('/403'); // Redirect to a 403 Forbidden page
                } else {
                    navigate('/403')
                    // setError('An unexpected error occurred.');
                }
            })

    }, []);

    React.useEffect(() => {
        const handleStatus = (data) => {
          console.log(userId,"-----",data);
          if (userId === data) {
            LogOut();
          }
        };
      
        socket.on('status', handleStatus);
      
        socket.on('disconnect', () => {
          console.log('Socket disconnected');
          // Optionally, you can attempt to reconnect or show a message to the user
        });
      
        // Cleanup on component unmount
        return () => {
          socket.off('status', handleStatus); // Remove the status event listener
          socket.disconnect(); // Disconnect the socket connection
        };
      }, [socket]);

    const getFollowed = async (id) => {
        await axios.get("http://localhost:8000/api/follows/followed/" + id)
            .then(res => {
                console.log(res.data.followings)
                setUsers(res.data.followings)
                setLoading(false);
            })
            .catch(err => console.log(err))
    }
    const handleChange = (event, newValue) => {
        setLoading(true);
        if (newValue === 0) {
            axios.get("http://localhost:8000/api/follows/followed/" + userId)
                .then(res => {
                    console.log(res.data.followings)
                    setUsers(res.data.followings)
                    setLoading(false);
                })
                .catch(err => console.log(err))
        }
        else if (newValue === 1) {
            axios.get("http://localhost:8000/api/follows/follower/" + userId)
                .then(res => {
                    //console.log(res.data.followers)
                    setUsers(res.data.followers)
                    setLoading(false);
                })
                .catch(err => console.log(err))
        }
        else if (newValue === 2) {

            axios.get("http://localhost:8000/api/follows/notfollowed/" + userId)
                .then(res => {
                    //console.log(res.data.notFollowedUsers)
                    setUsers(res.data.notFollowedUsers)
                    setLoading(false);
                })
                .catch(err => console.log(err))
        }

        setValue(newValue);
    };


    const addFollow = (followed) => {
        axios.post("http://localhost:8000/api/follows", { follower: userId, followed }, { withCredentials: true })
            .then(res => { console.log(res) })
            .catch(err => console.log(err));
    }

    const delFollow = (relatioId) => {
        axios.delete("http://localhost:8000/api/follows/" + relatioId, { withCredentials: true })
            .then(res => { console.log(res) })
            .catch(err => console.log(err));
    }

    const LogOut = () => {
        axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
          .then(() => {
            navigate('/');
          })
          .catch(err => console.log(err));
      };


    if (loading) {
        return (
            <div>
                <Navbar />
                loading
            </div>
        )
    }
    return (
        <Box sx={{ width: '85%', marginTop: 6 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Following" {...a11yProps(0)} />
                    <Tab label="Follower" {...a11yProps(1)} />
                    <Tab label="Suggestion" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <Grid>
                <CustomTabPanel value={value} index={0}>
                    <UserList onClickTab={delFollow} initialUsers={users} index={0} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <UserList onClickTab={delFollow} initialUsers={users} index={1} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <UserList onClickTab={addFollow} initialUsers={users} index={2} />
                </CustomTabPanel>
            </Grid>
        </Box>
    );
}

const FriendPage = () => {
    return (
        <div>
            <Navbar />
            <Container>

                <Grid container justifyContent="center" alignItems="center" margin={4} spacing={2}>

                    <Grid item xs={6} sx={{marginTop: 3}}>
                        <BasicTabs />
                    </Grid>
                    <Grid item xs={3} sx={{position: 'fixed', top: '120px', right:"40px"}}>
                        <Ads />
                    </Grid>

                </Grid>
            </Container>
        </div>
    )
}

export default FriendPage
