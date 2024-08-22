import { Container, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UserList from '../components/UserList';
import Navbar from '../components/Navbar';
import Chat from '../components/Chat';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext'
import axios from 'axios';

const MessagePage = () => {
  const { user, setUser } = useContext(UserContext)
  const [friends, setFriends] = useState([])
  const [messages, setMessages] = useState([]);
  const [reciver, setReciver] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      axios.get('http://localhost:8000/api/check-auth', { withCredentials: true })
        .then(async response => {

          console.log(response.data);
          setUser(response.data.user);
          getAllFrind(response.data.user._id);
        })
        .catch(error => {

          console.error('Error checking authentication', error);
          navigate('/403');
        })
    }
    else {
      getAllFrind(user._id);

    }

  }, []);


  const getAllFrind = (id) => {
    axios.get("http://localhost:8000/api/follows/allfrind/" + id)
      .then(res => {
        console.log(res.data.friends)
        res.data.friends.length > 0 && getMessages(res.data.friends[0]._id);
        setFriends(res.data.friends)
        setLoading(false);
      })
      .catch(err => console.log(err));
  }

  const createMessage = async (sender, reciver,content) => {
    await axios.post(`http://localhost:8000/api/messages/send` ,{sender,reciver,content}, { withCredentials: true })
      .then(res => {
          const message = res.data.message ; 
          setMessages( (prevMessages) => {
            return [...prevMessages,message]
          })
      })
      .catch(err => console.log(err));
  }
  const getMessages = async (friendId) => {
    //  setLoading(true)
    const recv = friends.filter(friend => friend._id === friendId)[0];
    setMessages([]);
    setReciver(recv);
    await axios.get(`http://localhost:8000/api/messages/${friendId}/${user._id}`, { withCredentials: true })
      .then(res => {
        console.log(res.data.messages)
        setMessages(res.data.messages)
        setLoading(false);
      })
      .catch(err => console.log(err));
  }

  if (loading) {
    return <div>loading ... </div>
  }

  return (
    <div>
      <Navbar />
      <Container  >
        <Grid container spacing={1}  >

          <Grid item xs={4} marginTop={15}>
            <UserList
              onCardClick={getMessages}
              owner={user}
              initialUsers={friends}
              reciver={reciver}
              index={4} />
          </Grid>
          <Grid
            item xs={8}
            sx={{
              height: "100vh",
            }}
          >
            <Chat
              owner={user}
              reciver={reciver}
              // name={user.fristName}
              messages={messages}
              createMessage={createMessage}

            ></Chat>
          </Grid>

        </Grid>
      </Container>
    </div>
  )
}

export default MessagePage
