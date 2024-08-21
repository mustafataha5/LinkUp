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
    const [loading ,setLoading] = React.useState(true) ;

    const [userId, setUserId] = React.useState()
    const navigate = useNavigate();




    React.useEffect(() => {
        axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
            .then(response => {
                console.log(response.data)
                setUserId(response.data.userId);
                setLoading(false) ;
            })
            .catch(error => {
                console.error('Error checking authentication', error);
            })
    }, []);


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

    if(loading){
        return (
            <div>
                loading
            </div>
        )
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Following" {...a11yProps(0)} />
                    <Tab label="Follower" {...a11yProps(1)} />
                    <Tab label="Suggestion" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <UserList onClickTab={delFollow} initialUsers={users} index={0} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <UserList initialUsers={users} index={1} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <UserList onClickTab={addFollow} initialUsers={users} index={2}/>
            </CustomTabPanel>
        </Box>
    );
}

const FriendPage = () => {
    return (
        <div>
            <Navbar />
            <Container>

                <Grid container margin={4} spacing={2}>

                    <Grid item xs={4}>
                        <BasicTabs />
                    </Grid>

                </Grid>
            </Container>
        </div>
    )
}

export default FriendPage
