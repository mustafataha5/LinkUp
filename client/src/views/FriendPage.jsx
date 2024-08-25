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
    const [value, setValue] = React.useState(0);
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const [userId, setUserId] = React.useState()
    const navigate = useNavigate();





    React.useEffect(() => {
        axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
            .then(async response => {
                console.log(response.data)
                setUserId(response.data.user._id);
                getFollowed(response.data.user._id)
                //setLoading(false) ;
            })
            .catch(error => {
                console.error('Error checking authentication', error);
            })
           
    }, []);

    const getFollowed = async(id) =>{
        await axios.get("http://localhost:8000/api/follows/followed/" + id)
        .then(res => {
           console.log(res.data.followings)
            setUsers(res.data.followings)
            setLoading(false) ; 
        })
        .catch(err => console.log(err))
    }
    const handleChange = (event, newValue) => {
        setLoading(true) ; 
        if (newValue === 0) {
            axios.get("http://localhost:8000/api/follows/followed/" + userId)
                .then(res => {
                   console.log(res.data.followings)
                    setUsers(res.data.followings)
                    setLoading(false) ; 
                })
                .catch(err => console.log(err))
        }
        else if (newValue === 1) {
            axios.get("http://localhost:8000/api/follows/follower/" + userId)
                .then(res => {
                    //console.log(res.data.followers)
                    setUsers(res.data.followers) 
                    setLoading(false) ; 
                })
                .catch(err => console.log(err))
        }
        else if (newValue === 2) {
           
            axios.get("http://localhost:8000/api/follows/notfollowed/" + userId)
                .then(res => {
                    //console.log(res.data.notFollowedUsers)
                    setUsers(res.data.notFollowedUsers) 
                    setLoading(false) ; 
                })
                .catch(err => console.log(err))
        }
       
        setValue(newValue);
    };


    const addFollow = (followed) => {
        axios.post("http://localhost:8000/api/follows",{follower:userId,followed},{withCredentials:true})
        .then(res => {console.log(res)})
        .catch(err => console.log(err)) ;
    }

    const delFollow = (relatioId) => {
        axios.delete("http://localhost:8000/api/follows/"+relatioId,{withCredentials:true})
        .then(res => {console.log(res)})
        .catch(err => console.log(err)) ;
    }

    if (loading) {
        return (
            <Box sx={{ width: '85%', marginTop: 6 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Following" {...a11yProps(0)} />
                    <Tab label="Follower" {...a11yProps(1)} />
                    <Tab label="Suggestion" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <Grid sx={{ border: '1px solid #777', margin: '9px', borderRadius: '10px' }}>
                <CustomTabPanel value={value} index={0}>
                    {console.log(users)}
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
            <Grid sx={{ border: '1px solid #777', margin: '9px', borderRadius: '10px' }}>
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

                    <Grid item xs={6} sx={{ alignSelf: 'flex-start'}} >
                        <BasicTabs />
                    </Grid>
                    {/* <Grid item xs={4} sx={{ alignSelf: 'flex-start', marginTop: 13 }}>
                        <Ads />
                    </Grid> */}

                </Grid>
            </Container>
        </div>
    )
}

export default FriendPage