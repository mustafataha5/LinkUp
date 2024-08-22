import { Container, Grid } from '@mui/material'
import React, { useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import UserList from '../components/UserList';
import Navbar from '../components/Navbar';
import Chat from '../components/Chat';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext'
import axios from 'axios';

const MessagePage = () => {
  const { user, setUser } = useContext(UserContext)
  const [friends,setFriends] = useState([])
  const [loading, setLoading] =useState(true);

  const navigate = useNavigate() ; 
  useEffect(() => {
    if (!user) {
      axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
        .then(async response => {

          console.log(response.data);
          setUser(response.data.user);
          getAllFrind(response.data.user._id) ;
        })
        .catch(error => {
          
          console.error('Error checking authentication', error);
          navigate('/403');
        })
    }
    else{
      getAllFrind(user._id) ;
      
    }

  }, []);


  const getAllFrind = (id)=>{
    axios.get("http://localhost:8000/api/follows/allfrind/"+id)
    .then(res =>{
      console.log(res.data.friends)
      setFriends(res.data.friends)
      setLoading(false);
    }) 
    .catch(err => console.log(err)) ;
  }
  if (loading) {
    return <div>loading ... </div>
  }

  if(loading){
    return <div>loading ...</div>
  }
  return (
    <div>
      <Navbar />
      <Container  >
        <Grid container spacing={1}  >

          <Grid item xs={4} marginTop={15}>
            <UserList initialUsers={friends} index={3}  />
          </Grid>
          <Grid
            item xs={8}
            sx={{
              height: "100vh",
            }}
          >
            <Chat

              name="you"
              messages={''}

            ></Chat>
          </Grid>

        </Grid>
      </Container>
    </div>
  )
}

export default MessagePage
